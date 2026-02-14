import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Beaker, Factory, Award, Settings, GraduationCap, Wrench, Shield, Anchor } from "lucide-react";
import { Link } from "wouter";
import { useProducts } from "@/lib/data";

export default function Home() {
  const { data: products } = useProducts();
  
  // Get specific products for "Featured" section if needed, or just random
  const carCareProducts = products?.filter(p => p.category.main_cat === "DIŞ YÜZEY").slice(0, 4) || [];

  return (
    <>
      {/* Hero Section - Split Layout */}
      <section className="flex flex-col md:flex-row h-[calc(100vh-80px)] min-h-[600px]">
        {/* Left Side: Industrial */}
        <div className="flex-1 relative group overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-neutral-900">
             <img src="/images/hero-industrial.jpg" alt="Industrial Polishing" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <div className="absolute bottom-0 left-0 p-12 md:p-16 w-full">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">Endüstriyel Polisaj</h2>
            <Link href="/products?category=ENDÜSTRİYEL">
              <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none px-8 h-14 text-lg">
                Katı Cilalar ve Emülsiyonlar <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side: Automotive */}
        <div className="flex-1 relative group overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-neutral-800">
             <img src="/images/hero-car.png" alt="Car Care" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
          <div className="absolute bottom-0 left-0 p-12 md:p-16 w-full">
            <h2 className="text-white text-4xl md:text-5xl font-bold mb-6">Menzerna Araç Cilaları</h2>
            <Link href="/products">
              <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none px-8 h-14 text-lg">
                Premium Araç Cilaları & Aksesuarlar <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Text Section */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">1888'den Beri</span>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8 leading-tight">
            Profesyonel polisaj bileşikleri ve cilaları
          </h2>
          <p className="text-xl text-neutral-600 leading-relaxed mb-12">
            Menzerna, 1888'den beri endüstri ve zanaat için profesyonel polisaj pastalarının geliştirilmesi ve üretiminde standartları belirlemektedir. Katı bileşikler, emülsiyonlar, araç cilaları veya tekne cilaları – Menzerna her yüzey ve her uygulama için doğru cilaya sahiptir. Yenilikçi karışımlarımız ve polisaj süreçlerimizle, ilham veren ve etkileyen premium sonuçlar elde etmenizi sağlıyoruz.
          </p>
        </div>
      </section>

      {/* Features Grid Icons */}
      <section className="py-20 bg-neutral-50 border-y border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img src="/icons/menzerna/research.svg" alt="Ar-Ge" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Araştırma ve Geliştirme</h3>
              <p className="text-neutral-600 max-w-xs">Uzmanlar, son teknoloji laboratuvarlarda yüksek performanslı formüller geliştirir.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img src="/icons/menzerna/formulas.svg" alt="Özel Formüller" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Özel Formüller</h3>
              <p className="text-neutral-600 max-w-xs">Yüzlerce özel geliştirilmiş formülle, her görev ve yüzey için özel ürünler sunuyoruz.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img src="/icons/menzerna/production.svg" alt="Üretim" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Büyük Ölçekli Üretim</h3>
              <p className="text-neutral-600 max-w-xs">Derin süreç mühendisliği bilgisine dayalı, üstün kalite ve dakiklikle karmaşık parti üretimi.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img src="/icons/menzerna/industry.svg" alt="Endüstri" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Endüstri Uzmanlığı</h3>
              <p className="text-neutral-600 max-w-xs">Endüstriyel polisaj söz konusu olduğunda, finisaj kalitesinin yanı sıra maliyet etkinliği de merkezdredir.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img src="/icons/menzerna/automotive.svg" alt="Otomotiv" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Otomotiv Uzmanlığı</h3>
              <p className="text-neutral-600 max-w-xs">Otomobil üreticileri, otomotiv ticareti, detaycılar ve otomobil meraklıları için profesyonel araç cilaları sunuyoruz.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center mb-6">
                <img src="/icons/menzerna/training.svg" alt="Eğitim" className="w-16 h-16" />
              </div>
              <h3 className="text-xl font-bold mb-3">Süreç Geliştirme & Eğitim</h3>
              <p className="text-neutral-600 max-w-xs">Polisaj süreçlerinizi iyileştirmenizde sizi destekliyor ve yoğun polisaj eğitimleri sunuyoruz.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Banner */}
      <section className="relative py-32 bg-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="/images/hero-car.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Hakkımızda</span>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Menzerna premium markalara parlaklık verir.
            </h2>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Bir asırlık deneyimle desteklenen Menzerna, 1888'den beri yüksek kaliteli katı polisaj pastaları, polisaj emülsiyonları ve araç ve tekne cilaları geliştirip üretmektedir.
            </p>
            <p className="text-lg text-neutral-300 leading-relaxed">
              Mükemmellik tutkusu her Menzerna ürününe dahil edilmiştir, bu da nihai kalite ve ekonomik verimliliği garanti eder.
            </p>
            <Link href="/about">
              <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none px-8 h-14 text-lg mt-4">
                Şirket Hakkında <ChevronRight className="ml-2" />
              </Button>
            </Link>
          </div>
          <div className="flex-1 hidden md:block">
            {/* Right side spacer or image could go here */}
          </div>
        </div>
      </section>

      {/* Category Teasers */}
      <section className="py-0">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Industrial */}
          <div className="group relative bg-neutral-100 h-[600px] overflow-hidden border-r border-white">
            <div className="absolute inset-0">
              <img src="/images/hero-industrial.jpg" className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="relative z-10 p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-4 block group-hover:text-white transition-colors">Endüstriyel Polisaj</span>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-white transition-colors">Polisajda Mükemmellik</h3>
                <p className="text-neutral-600 mb-8 group-hover:text-neutral-200 transition-colors">
                  Menzerna, birçok farklı yüzeyin endüstriyel işlenmesi için polisaj pastaları ve emülsiyonları geliştirir ve üretir.
                </p>
              </div>
              <Link href="/products?category=ENDÜSTRİYEL">
                <Button variant="link" className="text-primary hover:text-white p-0 text-lg font-bold justify-start group-hover:text-white">
                  Bileşikler & Emülsiyonlara Git <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Car Care */}
          <div className="group relative bg-neutral-100 h-[600px] overflow-hidden border-r border-white">
             <div className="absolute inset-0">
              <img src="/images/hero-car.png" className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="relative z-10 p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-4 block group-hover:text-white transition-colors">Araç Cilası</span>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-white transition-colors">İlham Veren Araç Cilaları</h3>
                <p className="text-neutral-600 mb-8 group-hover:text-neutral-200 transition-colors">
                  Yüksek parlaklıkta otomotiv cilası: Menzerna, dört yaygın polisaj aşaması için otomotiv cilaları sunar. Detaycılar ve boya atölyeleri için tasarlandı.
                </p>
              </div>
              <Link href="/products">
                <Button variant="link" className="text-primary hover:text-white p-0 text-lg font-bold justify-start group-hover:text-white">
                  Araç Bakımına Git <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Boat Care */}
          <div className="group relative bg-neutral-100 h-[600px] overflow-hidden">
             <div className="absolute inset-0">
               {/* Placeholder for boat image, reusing industrial for now or a solid color if no image */}
               <div className="w-full h-full bg-blue-900 opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
            </div>
            <div className="relative z-10 p-12 h-full flex flex-col justify-between">
              <div>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-sm mb-4 block group-hover:text-white transition-colors">Tekne Cilası</span>
                <h3 className="text-3xl font-bold mb-6 group-hover:text-white transition-colors">İlham Veren Tekne Cilaları</h3>
                <p className="text-neutral-600 mb-8 group-hover:text-neutral-200 transition-colors">
                  Menzerna, her türlü jel kaplama için profesyonel tekne cilaları sunar: Yüzey hazırlığı, çizik giderme, sararma ve mat lekelerin giderilmesi.
                </p>
              </div>
              <Link href="/products?category=MARİN">
                <Button variant="link" className="text-primary hover:text-white p-0 text-lg font-bold justify-start group-hover:text-white">
                  Tekne Bakımına Git <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dealer Network Banner */}
      <section className="bg-primary py-16 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Satıcı Ağımız</h2>
          <a href="https://mgpolishing.com/yetkili-saticilar/" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary rounded-none px-8 h-14 text-lg">
              Tüm Yetkili Satıcıları Keşfet
            </Button>
          </a>
        </div>
      </section>

      {/* News Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Güncel Kalın</span>
              <h2 className="text-4xl font-bold text-neutral-900">Haberlerimiz</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* News Item 1 */}
            <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
                 <img src="https://www.menzerna.com/fileadmin/user_upload/1767948586407.png" alt="News 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4 bg-white p-2 text-center min-w-[60px]">
                   <span className="block text-xs font-bold text-neutral-500">ŞUB</span>
                   <span className="block text-xl font-bold text-neutral-900">06</span>
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Yeni Menzerna kurumsal filmi yayında!</h3>
              <p className="text-neutral-500 text-sm mb-4">menzerna polishing compounds GmbH & Co. KG</p>
              <span className="text-primary font-bold text-sm flex items-center">Devamını Oku <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>

             {/* News Item 2 */}
             <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
                 <img src="https://www.menzerna.com/fileadmin/_processed_/8/5/csm_Screenshot_2025-12-08_132700_3f06b085b9.png" alt="News 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4 bg-white p-2 text-center min-w-[60px]">
                   <span className="block text-xs font-bold text-neutral-500">ŞUB</span>
                   <span className="block text-xl font-bold text-neutral-900">04</span>
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">VDA ve ISO'ya göre Çifte Sertifikasyon!</h3>
              <p className="text-neutral-500 text-sm mb-4">menzerna polishing compounds GmbH & Co. KG</p>
              <span className="text-primary font-bold text-sm flex items-center">Devamını Oku <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>

             {/* News Item 3 */}
             <div className="group cursor-pointer">
              <div className="aspect-[4/3] bg-neutral-100 mb-6 overflow-hidden relative">
                 <img src="https://www.menzerna.com/fileadmin/user_upload/Academy_1.png" alt="News 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-4 left-4 bg-white p-2 text-center min-w-[60px]">
                   <span className="block text-xs font-bold text-neutral-500">KAS</span>
                   <span className="block text-xl font-bold text-neutral-900">08</span>
                 </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Menzerna Saxdor Academy ile işbirliği yapıyor!</h3>
              <p className="text-neutral-500 text-sm mb-4">menzerna polishing compounds GmbH & Co. KG</p>
              <span className="text-primary font-bold text-sm flex items-center">Devamını Oku <ChevronRight className="w-4 h-4 ml-1" /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-neutral-100 border-t border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-neutral-300 mb-2">1888</div>
              <div className="text-lg font-bold text-neutral-700 uppercase tracking-widest">Kuruluş Yılı</div>
            </div>
            <div>
              <div className="text-5xl font-black text-neutral-300 mb-2">150</div>
              <div className="text-lg font-bold text-neutral-700 uppercase tracking-widest">Formülasyon</div>
            </div>
            <div>
              <div className="text-5xl font-black text-neutral-300 mb-2">50</div>
              <div className="text-lg font-bold text-neutral-700 uppercase tracking-widest">Çalışan</div>
            </div>
            <div>
              <div className="text-5xl font-black text-neutral-300 mb-2">70</div>
              <div className="text-lg font-bold text-neutral-700 uppercase tracking-widest">Ülke</div>
            </div>
          </div>
          
          <div className="mt-20 max-w-4xl mx-auto text-center">
             <p className="text-xl text-neutral-600 leading-relaxed mb-8">
               Menzerna, cila ve bileşik üreticileri arasında uzmandır. Mükemmel polisaj için her zaman bir adım öteye gideriz. Menzerna, neredeyse her yüzey için yüksek kaliteli cilalar, polisaj pastaları ve polisaj aksesuarları sunar.
             </p>
             <h3 className="text-2xl font-bold mb-8">Size nasıl yardımcı olabiliriz?</h3>
             <p className="text-neutral-500 mb-8">Ürünlerimiz ve hizmetlerimiz hakkında herhangi bir sorunuz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.</p>
             <div className="flex justify-center gap-4">
               <Link href="/contact">
                 <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none h-14 px-8 text-lg">
                   İletişim Formu
                 </Button>
               </Link>
               <a href="tel:+905352517411">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none h-14 px-8 text-lg">
                    +90 (535) 251 74 11
                  </Button>
               </a>
             </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-neutral-900 text-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
           <div className="max-w-xl">
             <span className="text-primary font-bold uppercase tracking-widest text-sm mb-4 block">Her Zaman Güncel</span>
             <h2 className="text-4xl font-bold mb-4">Kaçırmayın! Bültenimize abone olun!</h2>
             <p className="text-neutral-400">Ücretsiz Menzerna Bültenine şimdi abone olun ve polisaj hakkında ilginç gerçekler ve bilgiler edinin.</p>
           </div>
           <div>
             <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none h-14 px-12 text-lg">
               Kayıt Ol
             </Button>
           </div>
        </div>
      </section>
    </>
  );
}
