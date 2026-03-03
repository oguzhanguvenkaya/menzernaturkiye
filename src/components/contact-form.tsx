"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/iletisim/actions";

const initialState: ContactFormState | null = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Mesajınız başarıyla iletildi!", {
        description:
          "En kısa sürede sizinle iletişime geçeceğiz.",
        duration: 5000,
      });
      formRef.current?.reset();
    } else {
      toast.error("Mesaj gönderilemedi", {
        description: state.error,
        duration: 5000,
      });
    }
  }, [state]);

  const getFieldError = (field: string) => {
    if (!state || state.success) return null;
    return state.fieldErrors?.[field]?.[0] ?? null;
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      aria-label="İletişim formu"
      className="space-y-5"
    >
      {/* Ad Soyad */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-name" className="text-[#002b3d] font-bold uppercase tracking-wider text-xs">
          Ad Soyad <span className="text-[#e3000f]" aria-hidden="true">*</span>
        </Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          placeholder="Adınız ve soyadınız"
          autoComplete="name"
          required
          aria-required="true"
          aria-describedby={getFieldError("name") ? "contact-name-error" : undefined}
          aria-invalid={!!getFieldError("name")}
          disabled={isPending}
          className={`h-11 text-sm border-gray-300 focus-visible:ring-[#e3000f] focus-visible:border-[#e3000f] ${
            getFieldError("name") ? "border-[#e3000f]" : ""
          }`}
        />
        {getFieldError("name") && (
          <p id="contact-name-error" role="alert" className="text-xs text-[#e3000f] mt-1">
            {getFieldError("name")}
          </p>
        )}
      </div>

      {/* E-posta */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-email" className="text-[#002b3d] font-bold uppercase tracking-wider text-xs">
          E-posta <span className="text-[#e3000f]" aria-hidden="true">*</span>
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="ornek@email.com"
          autoComplete="email"
          required
          aria-required="true"
          aria-describedby={getFieldError("email") ? "contact-email-error" : undefined}
          aria-invalid={!!getFieldError("email")}
          disabled={isPending}
          className={`h-11 text-sm border-gray-300 focus-visible:ring-[#e3000f] focus-visible:border-[#e3000f] ${
            getFieldError("email") ? "border-[#e3000f]" : ""
          }`}
        />
        {getFieldError("email") && (
          <p id="contact-email-error" role="alert" className="text-xs text-[#e3000f] mt-1">
            {getFieldError("email")}
          </p>
        )}
      </div>

      {/* Konu */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-subject" className="text-[#002b3d] font-bold uppercase tracking-wider text-xs">
          Konu <span className="text-[#e3000f]" aria-hidden="true">*</span>
        </Label>
        <Input
          id="contact-subject"
          name="subject"
          type="text"
          placeholder="Mesajınızın konusu"
          required
          aria-required="true"
          aria-describedby={getFieldError("subject") ? "contact-subject-error" : undefined}
          aria-invalid={!!getFieldError("subject")}
          disabled={isPending}
          className={`h-11 text-sm border-gray-300 focus-visible:ring-[#e3000f] focus-visible:border-[#e3000f] ${
            getFieldError("subject") ? "border-[#e3000f]" : ""
          }`}
        />
        {getFieldError("subject") && (
          <p id="contact-subject-error" role="alert" className="text-xs text-[#e3000f] mt-1">
            {getFieldError("subject")}
          </p>
        )}
      </div>

      {/* Mesaj */}
      <div className="space-y-1.5">
        <Label htmlFor="contact-message" className="text-[#002b3d] font-bold uppercase tracking-wider text-xs">
          Mesaj <span className="text-[#e3000f]" aria-hidden="true">*</span>
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Mesajınızı buraya yazınız..."
          rows={6}
          required
          aria-required="true"
          aria-describedby={getFieldError("message") ? "contact-message-error" : undefined}
          aria-invalid={!!getFieldError("message")}
          disabled={isPending}
          className={`text-sm resize-none border-gray-300 focus-visible:ring-[#e3000f] focus-visible:border-[#e3000f] min-h-[150px] ${
            getFieldError("message") ? "border-[#e3000f]" : ""
          }`}
        />
        {getFieldError("message") && (
          <p id="contact-message-error" role="alert" className="text-xs text-[#e3000f] mt-1">
            {getFieldError("message")}
          </p>
        )}
      </div>

      {/* General error (non-field) */}
      {state && !state.success && !state.fieldErrors && (
        <p role="alert" className="text-sm text-[#e3000f] bg-red-50 border border-red-200 px-4 py-3">
          {state.error}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending}
        aria-disabled={isPending}
        className="w-full bg-[#e3000f] hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold uppercase tracking-widest text-sm px-8 py-4 transition-colors flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            <span>Gönderiliyor...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Mesaj Gönder</span>
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center">
        <span className="text-[#e3000f]">*</span> ile işaretli alanlar zorunludur.
      </p>
    </form>
  );
}
