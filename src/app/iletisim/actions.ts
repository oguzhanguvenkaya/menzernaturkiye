"use server";

import { z } from "zod";
import { createContactMessage } from "@/db/queries";
import { Resend } from "resend";

const contactSchema = z.object({
  name: z.string().min(2, "Ad Soyad en az 2 karakter olmalıdır."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  subject: z.string().min(3, "Konu en az 3 karakter olmalıdır."),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır."),
});

export type ContactFormState =
  | { success: true }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export async function submitContactForm(
  _prevState: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors as Record<
      string,
      string[]
    >;
    const firstError =
      Object.values(fieldErrors).flat()[0] ?? "Lütfen tüm alanları doldurunuz.";
    return { success: false, error: firstError, fieldErrors };
  }

  const { name, email, subject, message } = parsed.data;

  // Save to DB — this is the primary operation; must always succeed
  try {
    await createContactMessage({ name, email, subject, message });
  } catch (dbError) {
    console.error("[ContactForm] DB insert failed:", dbError);
    return {
      success: false,
      error:
        "Mesajınız kaydedilemedi. Lütfen daha sonra tekrar deneyiniz.",
    };
  }

  // Send email notification via Resend — secondary operation; graceful degradation on failure
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "noreply@menzernaturkiye.com",
      to: "info@mgpolisaj.com",
      subject: `Yeni İletişim Formu Mesajı: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #1d1d1d; padding: 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">
              Menzerna Türkiye
            </h1>
            <p style="color: #af1d1f; margin: 6px 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">
              Yeni İletişim Formu Mesajı
            </p>
          </div>
          <div style="background-color: #f8f9fa; padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1d1d1d; width: 120px; vertical-align: top;">Ad Soyad:</td>
                <td style="padding: 10px 0; color: #333;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1d1d1d; vertical-align: top;">E-posta:</td>
                <td style="padding: 10px 0; color: #333;">
                  <a href="mailto:${email}" style="color: #af1d1f; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1d1d1d; vertical-align: top;">Konu:</td>
                <td style="padding: 10px 0; color: #333;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #1d1d1d; vertical-align: top;">Mesaj:</td>
                <td style="padding: 10px 0; color: #333; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="background-color: #1d1d1d; padding: 16px; text-align: center;">
            <p style="color: #9ca3af; margin: 0; font-size: 12px;">
              Bu e-posta Menzerna Türkiye iletişim formu aracılığıyla gönderilmiştir.
            </p>
          </div>
        </div>
      `,
    });
  } catch (emailError) {
    // Email failure is non-critical — message is already saved to DB
    console.error("[ContactForm] Resend email failed:", emailError);
  }

  return { success: true };
}
