import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, Building2 } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "MG Polisaj ile iletişime geçin. Menzerna Türkiye yetkili distribütörü — Ankara, Türkiye.",
};

const contactDetails = [
  {
    icon: Building2,
    label: "Firma",
    value: "MG Polisaj",
  },
  {
    icon: Phone,
    label: "Telefon",
    value: "+90 (312) 000 00 00",
    href: "tel:+903120000000",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "info@mgpolisaj.com",
    href: "mailto:info@mgpolisaj.com",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Ankara, Türkiye",
    href: "https://maps.google.com/?q=Ankara,+Türkiye",
    target: "_blank",
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Pazartesi - Cuma: 09:00 - 18:00",
  },
];

export default function IletisimPage() {
  return (
    <div>
      {/* Page Banner */}
      <section className="bg-[#002b3d] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-12 h-1 bg-[#e3000f] mx-auto mb-5" />
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
            İletişim
          </h1>
          <p className="mt-4 text-gray-300 text-base md:text-lg max-w-xl mx-auto">
            Sorularınız için bize ulaşın. En kısa sürede yanıt vereceğiz.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

            {/* Left Column — Contact Form */}
            <div className="bg-white border border-gray-200 p-8 md:p-10 shadow-sm">
              <div className="mb-7">
                <div className="w-8 h-1 bg-[#e3000f] mb-4" />
                <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-tight">
                  Bize Yazın
                </h2>
                <p className="text-sm text-gray-500 mt-2">
                  Formu doldurun, ekibimiz en kısa sürede sizinle iletişime geçsin.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Right Column — Company Info + Map */}
            <div className="space-y-8">

              {/* Firma Bilgileri card */}
              <div className="bg-white border border-gray-200 p-8 md:p-10 shadow-sm">
                <div className="mb-6">
                  <div className="w-8 h-1 bg-[#e3000f] mb-4" />
                  <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-tight">
                    Firma Bilgileri
                  </h2>
                </div>

                <ul className="space-y-5" aria-label="İletişim bilgileri">
                  {contactDetails.map(({ icon: Icon, label, value, href, target }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div
                        className="flex-shrink-0 w-10 h-10 bg-[#002b3d] flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                          {label}
                        </p>
                        {href ? (
                          <a
                            href={href}
                            target={target}
                            rel={target === "_blank" ? "noopener noreferrer" : undefined}
                            className="text-sm text-[#002b3d] font-semibold hover:text-[#e3000f] transition-colors"
                          >
                            {value}
                          </a>
                        ) : (
                          <p className="text-sm text-[#002b3d] font-semibold">{value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Google Maps embed */}
              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-8 pt-8 pb-4 md:px-10">
                  <div className="w-8 h-1 bg-[#e3000f] mb-4" />
                  <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-tight mb-1">
                    Konum
                  </h2>
                  <p className="text-xs text-gray-400 mb-4">
                    Haritaya tıklayarak Google Maps&apos;te açabilirsiniz.
                  </p>
                </div>
                <a
                  href="https://maps.google.com/?q=Ankara,+Türkiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ankara konumunu Google Maps'te aç"
                  className="block"
                >
                  <div className="relative w-full aspect-video">
                    <iframe
                      title="MG Polisaj Konumu — Ankara, Türkiye"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d195862.74699895327!2d32.6563827!3d39.9035807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db5%3A0xbdc57b0ca9b0a0d6!2sAnkara!5e0!3m2!1str!2str!4v1711000000000!5m2!1str!2str"
                      style={{ border: 0 }}
                      className="w-full h-full"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      aria-hidden="true"
                      tabIndex={-1}
                    />
                    {/* Transparent overlay to make the whole area clickable as a link */}
                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
