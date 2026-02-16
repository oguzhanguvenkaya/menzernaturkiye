import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Users, Award, BookOpen, Lightbulb, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <>
      <section className="relative w-full h-[200px] md:h-[280px] lg:h-[340px] overflow-hidden" data-testid="about-banner">
        <div className="absolute inset-0">
          <img
            src="/images/about-banner.png"
            alt="Menzerna"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 h-full flex items-end pb-10 md:pb-14">
          <div className="container mx-auto px-6 md:px-8">
            <span className="text-[#ae1d1e] font-bold uppercase tracking-widest text-[13px] md:text-[14px] mb-3 block">MG Polisaj</span>
            <h1 className="text-white text-[32px] md:text-[44px] lg:text-[52px] font-black uppercase tracking-wider leading-[1.1]" data-testid="text-about-title">
              Hakkımızda
            </h1>
            <div className="w-16 h-1.5 bg-[#ae1d1e] mt-4 mb-4"></div>
            <p className="text-[15px] md:text-[17px] text-gray-300 max-w-2xl font-light leading-relaxed">
              Sektörde 17 yılı aşkın tecrübe ile profesyonel polisaj ve araç bakım çözümleri.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="/images/about-factory.png"
              alt="MG Polisaj"
              className="w-full h-[300px] md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
            <span className="text-[#ae1d1e] font-bold uppercase tracking-widest text-[13px] md:text-[14px] mb-4 block">
              Biz Kimiz?
            </span>
            <h2 className="text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#1d1d1d] mb-6 leading-[1.2]">
              Polisajda güvenilir çözüm ortağınız.
            </h2>
            <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.75] mb-4">
              MG Polisaj, 2008'den bugüne otomotiv ve marin sektörlerinde satış sonrası ürün ve hizmetler alanında faaliyet göstermektedir.
            </p>
            <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.75] mb-8">
              On beş yılı aşkın deneyimimiz ile sektöre yön veren profesyonel, yüksek kaliteli otomotiv, marin ve endüstriyel temizlik ürünlerimizle, araçların tüm iç ve dış yüzeylerinde bakım, koruma, tamamlayıcı materyaller ve ekipmanlar tedariğinde güvenilir bir kaynak haline gelmekten gurur duyuyoruz.
            </p>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-[#ae1d1e]" />
              <span className="font-bold text-[#1d1d1d] uppercase tracking-wider text-[13px]">Sektörde 17+ Yıl</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#f3f3f3]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-neutral-200 hover:border-[#ae1d1e] transition-colors">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#ae1d1e] mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#1d1d1d]">Misyonumuz</h3>
              <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.7]">
                MG Polisaj olarak, en iyi ürünleri doğru kombinasyonlar ve kullanım bilgisiyle kullanıcılara ulaştırmaya odaklanmış durumdayız. Distribütörü olduğumuz markaların birbirleriyle uyumlarını her geçen gün ileriye taşıyoruz.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200 hover:border-[#ae1d1e] transition-colors">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#ae1d1e] mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#1d1d1d]">Ürün Çeşitliliği</h3>
              <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.7]">
                Ürün yelpazemiz, en son teknoloji ile formüle edilmiş temizlik kimyasalları, polisaj ürünleri, seramik kaplamalar, mikrofiber bezler ve polisaj makinelerini içermektedir.
              </p>
            </div>

            <div className="bg-white p-8 border border-neutral-200 hover:border-[#ae1d1e] transition-colors">
              <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center text-[#ae1d1e] mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold mb-3 text-[#1d1d1d]">Eğitim ve Destek</h3>
              <p className="text-[14px] md:text-[15px] text-[#555] leading-[1.7]">
                Müşterilerimizin en son teknikler ve trendler konusunda güncel kalmalarına yardımcı olmak için eğitim kaynakları sunuyor, ürünlerimizi test edip mükemmelleştiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-[#ae1d1e] font-bold uppercase tracking-widest text-[13px] md:text-[14px] mb-4 block">
              Güçlü Ortaklıklar
            </span>
            <h2 className="text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#1d1d1d] mb-6 leading-[1.2]">
              İş Ortaklıklarımız
            </h2>
            <div className="w-16 h-1.5 bg-[#ae1d1e] mx-auto mb-8"></div>
            <p className="text-[15px] md:text-[16px] text-[#555] leading-[1.75]">
              Grup firmamız <strong>MTS Kimya</strong> ile birlikte yurt içi ve dışında ithalat ve ihracat çalışmaları yürütüyoruz. Dünya'da sektörümüzde bulunan en değerli markaları Türk kullanıcılar ile buluşturmak için heyecanımızı koruyor ve yoğun çaba sarf ediyoruz.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#ae1d1e] shrink-0" />
              <span className="font-bold text-[13px] text-[#1d1d1d]">120+ İş Ortağı</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#ae1d1e] shrink-0" />
              <span className="font-bold text-[13px] text-[#1d1d1d]">Global Markalar</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#ae1d1e] shrink-0" />
              <span className="font-bold text-[13px] text-[#1d1d1d]">Mobil Satış Ağı</span>
            </div>
            <div className="flex items-center gap-3 p-4 bg-[#f3f3f3] border border-neutral-200">
              <CheckCircle className="w-5 h-5 text-[#ae1d1e] shrink-0" />
              <span className="font-bold text-[13px] text-[#1d1d1d]">Teknik Destek</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-[#f3f3f3]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="bg-white p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-neutral-200">
            <div>
              <h2 className="text-[22px] md:text-[28px] font-bold text-[#1d1d1d] mb-3 leading-[1.3]">
                Tanıştığımıza çok memnun olacağız.
              </h2>
              <p className="text-[14px] md:text-[16px] text-[#555] max-w-2xl leading-[1.7]">
                Otomotiv detaylandırma sanatı ve bilimi konusunda tutkuluyuz. Müşterilerimizin üstün sonuçlar elde etmesini sağlayan yüksek kaliteli ürünleri sağlamakta kararlıyız.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link href="/contact">
                <Button size="lg" className="bg-[#ae1d1e] hover:bg-red-800 text-white rounded-none h-12 px-8 text-sm w-full md:w-auto" data-testid="link-contact">
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
