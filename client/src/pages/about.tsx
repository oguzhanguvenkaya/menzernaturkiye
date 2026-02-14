import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, Users, Award, Globe, BookOpen, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <>
      {/* Hero Banner */}
      <div className="bg-neutral-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <img src="/images/hero-car.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-6">Hakkımızda</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Sektörde 15 yılı aşkın tecrübe ile profesyonel polisaj ve araç bakım çözümleri.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              <Award className="w-4 h-4" /> <span>Sektörde 15. Yılımız</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Biz Kimiz?</h2>
            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
              MG Polisaj, 2008’den bugüne otomotiv ve marin sektörlerinde satış sonrası ürün ve hizmetler alanında faaliyet göstermektedir.
            </p>
            <p className="text-neutral-600 leading-relaxed">
              On beş yılı aşkın deneyimimiz ile sektöre yön veren profesyonel, yüksek kaliteli otomotiv, marin ve endüstiriyel temizlik ürünlerimizle, araçların tüm iç ve dış yüzeylerinde bakım, koruma, tamamlayıcı materyaller ve ekipmanlar tedariğinde güvenilir bir kaynak haline gelmekten gurur duyuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-neutral-100 rounded-2xl h-64 w-full"></div>
             <div className="bg-neutral-200 rounded-2xl h-64 w-full mt-8"></div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Misyonumuz</h3>
            <p className="text-neutral-600">
              MG Polisaj olarak, en iyi ürünleri doğru kombinasyonlar ve kullanım bilgisiyle kullanıcılara ulaştırmaya odaklanmış durumdayız. Distribütörü olduğumuz markaların birbirleriyle uyumlarını her geçen gün ileriye taşıyoruz.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-primary mb-6">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Ürün Çeşitliliği</h3>
            <p className="text-neutral-600">
              Ürün yelpazemiz, en son teknoloji ile formüle edilmiş temizlik kimyasalları, polisaj ürünleri, seramik kaplamalar, mikrofiber bezler ve polisaj makinelerini içermektedir.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Eğitim ve Destek</h3>
            <p className="text-neutral-600">
              Müşterilerimizin en son teknikler ve trendler konusunda güncel kalmalarına yardımcı olmak için eğitim kaynakları sunuyor, ürünlerimizi test edip mükemmelleştiriyoruz.
            </p>
          </div>
        </div>

        {/* Partnerships Section */}
        <div className="bg-neutral-50 rounded-3xl p-8 md:p-16 mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
              <Globe className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-6">İş Ortaklıklarımız</h2>
            <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
              Grup firmamız <strong>MTS Kimya</strong> ile birlikte yurt içi ve dışında ithalat ve ihracat çalışmaları yürütüyoruz. Dünya’da sektörümüzde bulunan en değerli markaları Türk kullanıcılar ile buluşturmak için heyecanımızı koruyor ve yoğun çaba sarf ediyoruz.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">80+ İş Ortağı</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Global Markalar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Mobil Satış Ağı</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Teknik Destek</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Tanıştığımıza çok memnun olacağız.</h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Otomotiv detaylandırma sanatı ve bilimi konusunda tutkuluyuz. Müşterilerimizin üstün sonuçlar elde etmesini sağlayan yüksek kaliteli ürünleri sağlamakta kararlıyız.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-red-700 text-white h-14 px-8 text-lg">
                İletişime Geçin
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-neutral-300 hover:bg-neutral-50 h-14 px-8 text-lg">
                Ürünleri İnceleyin
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}
