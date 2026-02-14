import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useContactForm } from "@/lib/data";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const contactMutation = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(
      { name, email, subject, message },
      {
        onSuccess: () => {
          setName("");
          setEmail("");
          setSubject("");
          setMessage("");
        },
      }
    );
  };

  return (
    <>
      <div className="bg-[#202020] text-white py-16 md:py-20 border-t-4 border-[#e3000f]">
        <div className="container mx-auto px-6 md:px-8">
          <span className="text-[#e3000f] font-bold uppercase tracking-widest text-sm mb-4 block">
            Bize Ulaşın
          </span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4" data-testid="text-contact-title">İletişim</h1>
          <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>
          <p className="text-gray-400 max-w-xl font-light">
            Sorularınız, teknik destek talepleriniz veya bayilik başvurularınız için bize ulaşın.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 border border-neutral-200">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Bize Mesaj Gönderin</h2>

            {contactMutation.isSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 p-4 mb-6" data-testid="status-success">
                Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
              </div>
            )}

            {contactMutation.isError && (
              <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-6" data-testid="status-error">
                Mesaj gönderilemedi. Lütfen tekrar deneyin.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adınız</label>
                  <Input
                    placeholder="Adınız Soyadınız"
                    className="rounded-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input
                    placeholder="ornek@firma.com"
                    type="email"
                    className="rounded-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Konu</label>
                <Input
                  placeholder="Mesajınızın konusu"
                  className="rounded-none"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  data-testid="input-subject"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mesajınız</label>
                <Textarea
                  placeholder="Size nasıl yardımcı olabiliriz?"
                  className="min-h-[150px] rounded-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  data-testid="input-message"
                />
              </div>
              <Button
                className="w-full bg-[#e3000f] hover:bg-red-800 text-white h-12 text-base rounded-none"
                type="submit"
                disabled={contactMutation.isPending}
                data-testid="button-submit"
              >
                {contactMutation.isPending ? "Gönderiliyor..." : "Gönder"}
              </Button>
            </form>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-8">İletişim Bilgileri</h3>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] shrink-0">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Adres</h4>
                    <p className="text-neutral-600 leading-relaxed">
                      MG POLİSAJ OTOMOTİV İTH. İHR. A.Ş.<br/>
                      Ümit Mh. 1411/7 Sk. No: 4/I<br/>
                      35060 Bornova / İZMİR
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] shrink-0">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Telefon</h4>
                    <p className="text-neutral-600">
                      +90 (535) 251 74 11
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] shrink-0">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">E-Posta</h4>
                    <p className="text-neutral-600">
                      info@menzernaturkiye.com<br/>
                      satis@menzernaturkiye.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] shrink-0">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Çalışma Saatleri</h4>
                    <p className="text-neutral-600">
                      Pazartesi - Cuma: 08:30 - 18:00<br/>
                      Cumartesi: 09:00 - 14:00
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
