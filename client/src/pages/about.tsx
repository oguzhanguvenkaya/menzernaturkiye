import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Users, Award, Globe, BookOpen, Lightbulb, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <>
      <div className="bg-[#202020] text-white py-20 md:py-28 relative overflow-hidden border-t-4 border-[#e3000f]">
        <div className="absolute inset-0 opacity-15">
          <img src="/images/hero-car.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <span className="text-[#e3000f] font-bold uppercase tracking-widest text-sm mb-4 block">MG Polisaj</span>
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-6" data-testid="text-about-title">
            Hakkımızda
          </h1>
          <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl font-light leading-relaxed">Sektörde 17 yılı aşkın tecrübe ile profesyonel polisaj ve araç bakım çözümleri.</p>
        </div>
      </div>
      <section className="bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="/images/factory.jpg"
              alt="MG Polisaj"
              className="w-full h-[300px] md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
            <span className="text-[#e3000f] font-bold uppercase tracking-widest text-sm mb-4 block">
              Biz Kimiz?
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6 leading-tight">
              Polisajda güvenilir çözüm ortağınız.
            </h2>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-4">
              MG Polisaj, 2008'den bugüne otomotiv ve marin sektörlerinde satış sonrası ürün ve hizmetler alanında faaliyet göstermektedir.
            </p>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed mb-8">
              On beş yılı aşkın deneyimimiz ile sektöre yön veren profesyonel, yüksek kaliteli otomotiv, marin ve endüstriyel temizlik ürünlerimizle, araçların tüm iç ve dış yüzeylerinde bakım, koruma, tamamlayıcı materyaller ve ekipmanlar tedariğinde güvenilir bir kaynak haline gelmekten gurur duyuyoruz.
            </p>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#e3000f]" />
              <span className="font-bold text-neutral-900 uppercase tracking-wider text-sm">Sektörde 15+ Yıl</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-neutral-200 hover:border-[#e3000f] transition-colors">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Misyonumuz</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                MG Polisaj olarak, en iyi ürünleri doğru kombinasyonlar ve kullanım bilgisiyle kullanıcılara ulaştırmaya odaklanmış durumdayız. Distribütörü olduğumuz markaların birbirleriyle uyumlarını her geçen gün ileriye taşıyoruz.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200 hover:border-[#e3000f] transition-colors">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Ürün Çeşitliliği</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Ürün yelpazemiz, en son teknoloji ile formüle edilmiş temizlik kimyasalları, polisaj ürünleri, seramik kaplamalar, mikrofiber bezler ve polisaj makinelerini içermektedir.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200 hover:border-[#e3000f] transition-colors">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#e3000f] mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">Eğitim ve Destek</h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                Müşterilerimizin en son teknikler ve trendler konusunda güncel kalmalarına yardımcı olmak için eğitim kaynakları sunuyor, ürünlerimizi test edip mükemmelleştiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#e3000f] font-bold uppercase tracking-widest text-sm mb-4 block">
              Güçlü Ortaklıklar
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-6">
              İş Ortaklıklarımız
            </h2>
            <div className="w-16 h-1.5 bg-[#e3000f] mx-auto mb-8"></div>
            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              Grup firmamız <strong>MTS Kimya</strong> ile birlikte yurt içi ve dışında ithalat ve ihracat çalışmaları yürütüyoruz. Dünya'da sektörümüzde bulunan en değerli markaları Türk kullanıcılar ile buluşturmak için heyecanımızı koruyor ve yoğun çaba sarf ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#e3000f] shrink-0" />
              <span className="font-bold text-sm text-neutral-900">120+ İş Ortağı</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#e3000f] shrink-0" />
              <span className="font-bold text-sm text-neutral-900">Global Markalar</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#e3000f] shrink-0" />
              <span className="font-bold text-sm text-neutral-900">Mobil Satış Ağı</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-neutral-50 border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#e3000f] shrink-0" />
              <span className="font-bold text-sm text-neutral-900">Teknik Destek</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 md:py-20 bg-neutral-50 border-t border-neutral-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-200">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                Tanıştığımıza çok memnun olacağız.
              </h2>
              <p className="text-sm md:text-base text-neutral-600 max-w-2xl">
                Otomotiv detaylandırma sanatı ve bilimi konusunda tutkuluyuz. Müşterilerimizin üstün sonuçlar elde etmesini sağlayan yüksek kaliteli ürünleri sağlamakta kararlıyız.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link href="/contact">
                <Button size="lg" className="bg-[#e3000f] hover:bg-red-800 text-white rounded-none h-12 px-8 text-sm w-full md:w-auto" data-testid="link-contact">
                  İletişime Geçin <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-neutral-300 hover:bg-neutral-50 rounded-none h-12 px-8 text-sm w-full md:w-auto" data-testid="link-products">
                  Ürünleri İnceleyin
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
