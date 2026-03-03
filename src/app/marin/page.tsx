import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/db/queries";
import { ProductCard } from "@/components/product-card";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Marin Bakım",
  description:
    "Menzerna marin bakım ürünleri. Jelkot ve GRP tekne yüzeyleri için özel formüle edilmiş polisaj ve koruma ürünleri.",
  keywords: [
    "marin bakım",
    "tekne polisaj",
    "jelkot polisaj",
    "gelcoat polish",
    "tekne cilası",
    "GRP polisaj",
    "menzerna marin",
  ],
};

// Marin özellik listesi
const FEATURES = [
  {
    title: "Jelkot Uyumlu",
    description:
      "Özel formülü ile gelcoat/jelkot yüzeylerde güvenle uygulanabilir.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "3'ü 1 Arada",
    description:
      "Tek üründe düzeltme, parlatma ve koruma hazırlığı işlemlerini tamamlar.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "UV & Tuz Koruması",
    description:
      "Deniz ortamındaki UV ışınları ve tuzlu su etkisine karşı yüzeyi korur.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Rotary Uyumlu",
    description:
      "Profesyonel rotary polisaj makineleri ile en yüksek verimlilikte kullanım.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
  },
];

export default async function MarinPage() {
  const allProducts = await getAllProducts();

  // Marin ürünleri — main_cat: "MARİN"
  const marinProducts = allProducts.filter((p) => {
    const cat = p.category as { main_cat: string };
    return cat?.main_cat === "MARİN";
  });

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-[#002b3d] text-white overflow-hidden">
        {/* Dalga efekti arka plan */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="absolute bottom-0 left-0 w-full"
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100C240 100 240 40 480 40C720 40 720 160 960 160C1200 160 1200 60 1440 60V200H0V100Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#009b77]" />

        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#009b77]" />
              <span className="text-[#009b77] text-xs font-bold uppercase tracking-widest">
                Tekne & Jelkot Bakımı
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
              Marin{" "}
              <span className="text-[#009b77]">Bakım</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed">
              Jelkot yüzeyler için özel formüle edilmiş polisaj ürünleri — denizin
              sert koşullarına karşı teknenizi koruyun.
            </p>
          </div>
        </div>
      </section>

      {/* Video Bölümü */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#009b77] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#009b77] mb-1">
                Uygulama Rehberi
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#002b3d] uppercase tracking-tight leading-none">
                Tekne Polisaj Uygulaması
              </h2>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="aspect-video bg-[#002b3d] flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#002b3d] via-[#003d56] to-[#009b77]/20" />
              {/* Dalga animasyonu */}
              <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30">
                <svg viewBox="0 0 1200 80" className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M0 40C200 40 200 10 400 10C600 10 600 70 800 70C1000 70 1000 20 1200 20V80H0V40Z"
                    fill="#009b77"
                  />
                </svg>
              </div>
              <div className="relative flex flex-col items-center gap-4 text-white">
                <div className="w-16 h-16 border-2 border-[#009b77]/50 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#009b77] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-sm font-bold uppercase tracking-widest text-white/70">
                  Marin Polisaj Videosu
                </p>
                <p className="text-xs text-white/40">Yakında Eklenecek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Giriş Bilgisi */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
              Menzerna marin bakım ürünleri, jelkot (gelcoat) yüzeylerin benzersiz
              özelliklerine göre özel olarak formüle edilmiştir. Teknenizin yüzeyini
              UV ışınlarının soluklaştırıcı etkisinden, tuzlu su korozyonundan ve
              kirlilik birikiminden korurken parlak görünümünü yıllarca muhafaza
              eder.
            </p>

            {/* Özellik listesi */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-4 border border-gray-100 p-5 bg-[#f8f9fa]"
                >
                  <div className="text-[#009b77] shrink-0 mt-0.5">{feature.icon}</div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-[#002b3d] mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ürünler */}
      <section className="py-16 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#009b77] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#009b77] mb-1">
                Marin Ürün Serisi
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#002b3d] uppercase tracking-tight leading-none mb-2">
                Tekne Bakım Ürünleri
              </h2>
              <p className="text-sm text-gray-500 max-w-xl">
                Jelkot ve GRP (cam elyaf takviyeli plastik) tekneler için özel
                geliştirilen polisaj ve koruma ürünleri.
              </p>
            </div>
          </div>

          {marinProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {marinProducts.map((product) => {
                const cat = product.category as { main_cat: string; sub_cat: string; sub_cat2?: string };
                const tf = product.template_fields as {
                  cut_level?: number;
                  finish_level?: number;
                  volume?: string;
                  function?: string;
                  target_surface?: string;
                  machine_compatibility?: string[];
                } | null;

                return (
                  <div
                    key={product.sku}
                    className="bg-white border border-gray-200 hover:border-[#009b77] hover:shadow-lg transition-all group"
                  >
                    {/* Ürün görseli */}
                    <div className="relative aspect-square bg-[#f8f9fa] overflow-hidden">
                      {product.image_url ? (
                        <Image
                          src={product.image_url}
                          alt={product.product_name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                          <svg
                            className="w-16 h-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                      {/* Marin etiketi */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#009b77] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">
                          Marin
                        </span>
                      </div>
                    </div>

                    {/* İçerik */}
                    <div className="p-6">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#009b77] mb-2 block">
                        {cat?.sub_cat || "Pasta Cila"}
                      </span>

                      <h3 className="text-base font-black text-[#002b3d] uppercase leading-tight group-hover:text-[#009b77] transition-colors mb-4">
                        {product.product_name}
                      </h3>

                      {/* Teknik özellikler */}
                      {tf && (
                        <div className="space-y-2 mb-5">
                          {tf.function && (
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-16 shrink-0 pt-0.5">
                                Fonksiyon
                              </span>
                              <span className="text-xs text-gray-700 font-medium">
                                {tf.function}
                              </span>
                            </div>
                          )}
                          {tf.target_surface && (
                            <div className="flex items-start gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-16 shrink-0 pt-0.5">
                                Yüzey
                              </span>
                              <span className="text-xs text-gray-700 font-medium">
                                {tf.target_surface}
                              </span>
                            </div>
                          )}
                          {tf.volume && (
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-16 shrink-0">
                                Hacim
                              </span>
                              <span className="text-xs text-gray-700 font-medium">
                                {tf.volume}
                              </span>
                            </div>
                          )}

                          {/* Kesim / Parlaklık barları */}
                          {(tf.cut_level || tf.finish_level) && (
                            <div className="pt-2 space-y-1.5">
                              {tf.cut_level != null && tf.cut_level > 0 && (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-16 shrink-0">
                                    Kesim
                                  </span>
                                  <div className="flex-1 h-2 bg-red-100">
                                    <div
                                      className="h-full bg-[#e3000f]"
                                      style={{ width: `${(tf.cut_level / 10) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-500 w-4 text-right">
                                    {tf.cut_level}
                                  </span>
                                </div>
                              )}
                              {tf.finish_level != null && tf.finish_level > 0 && (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 w-16 shrink-0">
                                    Parlaklık
                                  </span>
                                  <div className="flex-1 h-2 bg-green-100">
                                    <div
                                      className="h-full bg-[#009b77]"
                                      style={{ width: `${(tf.finish_level / 10) * 100}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] font-bold text-gray-500 w-4 text-right">
                                    {tf.finish_level}
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/urunler/${product.sku}`}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#009b77] hover:text-[#002b3d] transition-colors border border-[#009b77] hover:border-[#002b3d] px-4 py-2"
                      >
                        Ürün Detayı
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <p className="text-sm font-bold uppercase tracking-widest">
                Ürünler yükleniyor...
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Nasıl Kullanılır */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 mb-10">
            <div className="w-1 self-stretch min-h-[3rem] bg-[#f5a623] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5a623] mb-1">
                Uygulama Kılavuzu
              </p>
              <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-tight leading-none">
                Nasıl Uygulanır?
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Yüzeyi Hazırla",
                desc: "Tekne yüzeyini iyice yıkayın ve kurulayın. Büyük kirlilik ve tuz birikintilerini temizleyin.",
              },
              {
                step: "02",
                title: "Ürünü Uygula",
                desc: "Rotary polisaj makinesi veya el ile ürünü yüzeye küçük dairesel hareketlerle yayın.",
              },
              {
                step: "03",
                title: "Polisaj Yap",
                desc: "Makineli uygulamada orta hız kullanın. Ürün donmadan önce işlemi tamamlayın.",
              },
              {
                step: "04",
                title: "Temizle & Parlat",
                desc: "Artık ürünü temiz mikrofiber bezle silin. Pırıl pırıl jelkot yüzeyinizin tadını çıkarın.",
              },
            ].map((s) => (
              <div key={s.step} className="relative pl-6 border-l-2 border-[#009b77]">
                <div className="text-4xl font-black text-gray-100 absolute -left-2 top-0 select-none leading-none">
                  {s.step}
                </div>
                <div className="relative pt-1">
                  <h3 className="text-sm font-black uppercase tracking-wide text-[#002b3d] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#002b3d] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-8 h-0.5 bg-[#009b77] mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-4">
            Marin bakım ürünleri hakkında bilgi alın
          </h2>
          <p className="text-gray-300 mb-8 max-w-lg mx-auto">
            Teknenizin jelkot yüzeyine özel bakım programı oluşturmak için
            uzmanlarımızla iletişime geçin.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#009b77] hover:bg-[#007a5e] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Bilgi Al
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
