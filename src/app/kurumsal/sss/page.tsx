import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "Menzerna ürünleri ve polisaj uygulamaları hakkında sıkça sorulan soruların yanıtları.",
};

export const revalidate = 3600;

const faqItems = [
  {
    id: "item-1",
    question: "Menzerna nedir?",
    answer:
      "Menzerna, 1888 yılında Almanya'nın Öhringen şehrinde kurulmuş, dünya genelinde profesyonel polisaj ürünleri alanında lider bir Alman markasıdır. 130 yılı aşkın tecrübesiyle katı polisaj pastası, polisaj emülsiyonu ve sıvı araç/tekne cilası başta olmak üzere geniş bir ürün gamı sunmaktadır. Menzerna ürünleri; otomotiv, endüstriyel ve marin sektörlerindeki profesyoneller tarafından tercih edilmektedir.",
  },
  {
    id: "item-2",
    question: "Hangi sektörlere hizmet veriyorsunuz?",
    answer:
      "Menzerna Türkiye olarak üç ana sektöre odaklanmaktayız: Araç Bakım (oto detay atölyeleri, boyahaneler, araç hazırlık merkezleri), Endüstriyel Polisaj (metal, alüminyum, paslanmaz çelik ve plastik yüzey işleme tesisleri) ve Marin Bakım (jelkot yüzey bakımı, tekne ve yat bakım merkezleri). Her sektör için özel formüle edilmiş ürün çözümleri sunulmaktadır.",
  },
  {
    id: "item-3",
    question: "Ürünlerinizi nereden satın alabilirim?",
    answer:
      "Menzerna ürünlerine Türkiye genelindeki yetkili satıcılar aracılığıyla ulaşabilirsiniz. Türkiye yetkili satıcı listesine mgpolishing.com adresinden erişebilirsiniz. Toplu sipariş ve kurumsal satın alma talepleri için doğrudan bizimle iletişime geçebilirsiniz.",
  },
  {
    id: "item-4",
    question: "Eğitim programlarınız var mı?",
    answer:
      "Evet, düzenli aralıklarla profesyonel polisaj eğitimleri düzenlenmektedir. Ankara merkezli seminerlerimizde araç polisaj teknikleri, endüstriyel uygulamalar, ürün seçimi ve makine-pad eşleştirmesi gibi konular hem teorik hem de uygulamalı olarak aktarılmaktadır. Eğitim programı detaylarına ulaşmak için Eğitim sayfamızı ziyaret edebilirsiniz.",
    link: { href: "/kurumsal/egitim", label: "Eğitim Programı sayfasına git" },
  },
  {
    id: "item-5",
    question: "Cut ve Gloss seviyeleri ne anlama geliyor?",
    answer:
      "Cut (kesme) seviyesi, bir ürünün yüzeydeki çizik, hız tuzu izi ve boya kusurlarını giderme kapasitesini ifade eder — yüksek cut, daha agresif aşındırma demektir. Gloss (parlaklık) seviyesi ise işlem sonrasında elde edilen yüzey parlaklığını gösterir. Genel kural olarak, yüksek cut'lı ürünler başlangıç işlemlerinde; yüksek gloss'lu ürünler ise son kat bitirme adımlarında kullanılır. Menzerna ürünleri, her iki ölçekte 1'den 5'e kadar derecelendirilerek ambalaj üzerinde belirtilmektedir.",
  },
  {
    id: "item-6",
    question: "Hangi pad'i hangi pasta ile kullanmalıyım?",
    answer:
      "Genel bir rehber olarak: Sert foam veya microfiber pad ağır çizik giderme için yüksek cut'lı pastalarla, orta sertlikte pad boya düzeltme aşamasında, yumuşak foam pad ise son parlatma ve bitirme aşamasında düşük cut'lı veya finishing pasta ile kullanılır. Makine tipi de (rotary veya DA) kombinasyonu etkiler. Ürün ambalajındaki pad önerilerini ve teknik veri sayfalarını incelemenizi tavsiye ederiz. Daha detaylı rehberlik için bizimle iletişime geçebilirsiniz.",
  },
  {
    id: "item-7",
    question: "Ürünleriniz silikon içeriyor mu?",
    answer:
      "Menzerna ürünlerinin büyük çoğunluğu silikon içermemektedir (silicone-free). Bu özellik; boyahane öncesi yüzey hazırlığı, fish-eye riskini azaltma ve profesyonel araç detay uygulamaları açısından önemli bir avantaj sağlar. İlgili ürünlerin teknik veri sayfalarında silikon içerik bilgisi açıkça belirtilmektedir. Spesifik bir ürün hakkında bilgi almak için bizimle iletişime geçebilirsiniz.",
  },
  {
    id: "item-8",
    question: "Teknik destek alabilir miyim?",
    answer:
      "Evet. Doğru ürün seçimi, uygulama teknikleri, makine-pad kombinasyonları ve sektöre özel çözümler için teknik destek sağlamaktayız. İletişim sayfamız üzerinden telefon veya e-posta ile bize ulaşabilirsiniz. Hafta içi 09:00–18:00 saatleri arasında hizmet vermekteyiz.",
    link: { href: "/iletisim", label: "İletişim sayfasına git" },
  },
];

export default function SSSPage() {
  return (
    <div>
      {/* Banner */}
      <section className="relative bg-[#1d1d1d] py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px)",
          }}
        />
        <div className="relative container mx-auto px-4 text-center">
          <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
            Kurumsal
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Sıkça Sorulan
            <br />
            Sorular
          </h1>
          <div className="w-16 h-1 bg-[#af1d1f] mx-auto" />
        </div>
      </section>

      {/* FAQ Bölümü */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 bg-[#1d1d1d] flex items-center justify-center shrink-0">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {faqItems.length} soru
                </p>
                <p className="text-sm font-black uppercase tracking-wider text-[#1d1d1d]">
                  Tüm Yanıtlar
                </p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border border-gray-200 data-[state=open]:border-[#af1d1f] px-6 transition-colors"
                >
                  <AccordionTrigger className="text-sm font-black uppercase tracking-wider text-[#1d1d1d] hover:no-underline hover:text-[#af1d1f] py-5 gap-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-gray-600 leading-relaxed pb-5">
                    <p>{item.answer}</p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        className="inline-flex items-center gap-1.5 text-[#af1d1f] font-bold text-xs uppercase tracking-wider mt-3 hover:underline"
                      >
                        {item.link.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Ayırıcı bilgi bandı */}
      <section className="bg-[#f8f9fa] border-y border-gray-200 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-black text-[#af1d1f]">1888</p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">
                Kuruluş Yılı
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#1d1d1d]">130+</p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">
                Yıllık Tecrübe
              </p>
            </div>
            <div>
              <p className="text-3xl font-black text-[#006b52]">3</p>
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mt-1">
                Ana Sektör
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Sorunuzu Bulamadınız mı?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Aklınızdaki soruyu bize doğrudan iletebilirsiniz. En kısa sürede
            teknik ekibimiz size geri dönecektir.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Bize Sorun
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
