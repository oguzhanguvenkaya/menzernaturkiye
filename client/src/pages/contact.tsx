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
      <div className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-contact-title">İletişim</h1>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Sorularınız, teknik destek talepleriniz veya bayilik başvurularınız için bize ulaşın.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 rounded-lg shadow-lg border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Bize Mesaj Gönderin</h2>

            {contactMutation.isSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 mb-6" data-testid="status-success">
                Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.
              </div>
            )}

            {contactMutation.isError && (
              <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6" data-testid="status-error">
                Mesaj gönderilemedi. Lütfen tekrar deneyin.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adınız</label>
                  <Input
                    placeholder="Adınız Soyadınız"
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
                  className="min-h-[150px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  data-testid="input-message"
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-red-700 text-white h-12 text-lg"
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
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
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
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
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
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
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
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
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
