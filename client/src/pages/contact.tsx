import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="bg-neutral-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
          <p className="text-neutral-400 max-w-xl mx-auto">
            Sorularınız, teknik destek talepleriniz veya bayilik başvurularınız için bize ulaşın.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg border border-neutral-100">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Bize Mesaj Gönderin</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adınız</label>
                  <Input placeholder="Adınız Soyadınız" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">E-posta</label>
                  <Input placeholder="ornek@firma.com" type="email" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Konu</label>
                <Input placeholder="Mesajınızın konusu" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Mesajınız</label>
                <Textarea placeholder="Size nasıl yardımcı olabiliriz?" className="min-h-[150px]" />
              </div>
              <Button className="w-full bg-primary hover:bg-red-700 text-white h-12 text-lg">
                Gönder
              </Button>
            </form>
          </div>

          {/* Info */}
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
                         MG Polisaj San. ve Tic. Ltd. Şti.<br/>
                         İkitelli Organize Sanayi Bölgesi<br/>
                         Metal İş Sanayi Sitesi, 14. Blok No: 12<br/>
                         Başakşehir / İstanbul
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
                         +90 (212) 555 00 00<br/>
                         +90 (555) 555 00 00 (Whatsapp)
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
    </Layout>
  );
}
