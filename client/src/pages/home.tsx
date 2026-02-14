import { useProducts } from "@/lib/data";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Shield, Truck } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  const featuredProducts = products?.slice(0, 4) || [];
  const bestSellers = products?.slice(4, 8) || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[600px] w-full bg-black overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/images/hero-car.png" 
            alt="Menzerna Hero" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
          <div className="max-w-2xl text-white space-y-6 animate-in slide-in-from-left-10 duration-700 fade-in">
            <div className="inline-block bg-primary px-3 py-1 text-sm font-bold uppercase tracking-widest mb-2">
              Türkiye Distribütörü
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Mükemmellik <br/>
              <span className="text-primary">Detaylarda</span> Gizlidir.
            </h1>
            <p className="text-xl text-neutral-300 max-w-lg leading-relaxed">
              1888'den beri Alman mühendisliği ile üretilen premium polisaj pastaları ve boya koruma ürünleri.
            </p>
            <div className="flex gap-4 pt-4">
              <Link href="/products">
                <Button size="lg" className="bg-primary hover:bg-red-700 text-white border-none h-14 px-8 text-lg rounded-none">
                  Ürünleri Keşfet
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-black h-14 px-8 text-lg rounded-none">
                  Hakkımızda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-neutral-100 py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Orijinal Ürün Garantisi</h3>
                <p className="text-sm text-neutral-500">Menzerna Türkiye Resmi Distribütörü güvencesiyle.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Profesyonel Destek</h3>
                <p className="text-sm text-neutral-500">Uzman ekibimizden teknik destek ve eğitim.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-primary">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Hızlı Teslimat</h3>
                <p className="text-sm text-neutral-500">Tüm Türkiye'ye aynı gün kargo imkanı.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold uppercase tracking-wider text-sm">Keşfet</span>
              <h2 className="text-4xl font-bold mt-2 text-neutral-900">Ürün Kategorileri</h2>
            </div>
            <Link href="/products">
              <Button variant="link" className="text-neutral-500 hover:text-primary p-0">
                Tümünü Gör <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["DIŞ YÜZEY", "AKSESUAR", "ENDÜSTRİYEL", "MARİN"].map((cat, idx) => (
              <Link key={idx} href={`/products?category=${cat}`}>
                <div className="group relative h-80 overflow-hidden bg-neutral-100 cursor-pointer">
                  {/* Placeholder Image Generation would happen here, but creating divs for now */}
                  <div className={`absolute inset-0 bg-neutral-200 transition-transform duration-700 group-hover:scale-110 flex items-center justify-center`}>
                     <span className="text-neutral-300 text-6xl font-black opacity-20">{cat.substring(0, 1)}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-white text-2xl font-bold mb-2 group-hover:translate-x-2 transition-transform">{cat}</h3>
                    <div className="h-1 w-12 bg-primary group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto">
              Profesyonellerin tercihi, en çok satan Menzerna pasta ve cila ürünlerini keşfedin.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8 rounded-none">
                Tüm Ürünleri İncele
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About / CTA Section */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Parlaklığın Arkasındaki <span className="text-primary">Bilim</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Menzerna, endüstriyel polisaj konusunda 130 yılı aşkın deneyimiyle standartları belirliyor. 
              Otomotivden denizciliğe, mobilyadan müzik aletlerine kadar her yüzey için mükemmel finisaj çözümleri sunuyoruz.
            </p>
            <Button size="lg" className="bg-primary hover:bg-red-700 text-white rounded-none h-14 px-8">
              MG Polisaj Hakkında
            </Button>
          </div>
          <div className="flex-1 relative">
             <div className="aspect-video bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700">
               <span className="text-neutral-600">Menzerna Factory Video Placeholder</span>
             </div>
             {/* Decor elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 border-4 border-primary/20 rounded-full" />
             <div className="absolute -bottom-10 -left-10 w-60 h-60 border-2 border-white/10 rounded-full" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
