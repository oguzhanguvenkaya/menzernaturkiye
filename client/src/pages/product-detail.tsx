import { useParams, Link } from "wouter";
import { ChevronRight, CheckCircle2, HelpCircle, Droplets, Shield, Settings, Beaker, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/lib/data";

export default function ProductDetail() {
  const { category, id } = useParams();
  const sku = id as string;

  const { data: product, isLoading } = useProduct(sku);

  const categoryTitles: Record<string, string> = {
    "car-polish": "Pasta, Cila ve Boya Korumalar",
    "marine-polish": "Marin Pasta ve Cilalar",
    "solid-compounds": "Katı Pasta ve Cilalar",
    "boat-polish": "Marin Pasta ve Cilalar",
    "accessories": "Sünger, Keçe ve Aksesuarlar"
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Skeleton className="h-[600px] w-full rounded-none bg-gray-200" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-32 text-center">
        <h1 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest">Ürün bulunamadı.</h1>
        <Link href={`/category/${category}`}>
          <span className="text-[#e3000f] font-bold mt-4 inline-block cursor-pointer hover:underline">Kategoriye Dön</span>
        </Link>
      </div>
    );
  }

  const content = product.content as any || {};
  const fields = product.template_fields as any || {};
  const faq = product.faq as any[] || [];
  const cutLevel = fields.cut_level;
  const glossLevel = fields.finish_level;

  const features: { label: string; value: string; icon: React.ReactNode }[] = [];
  if (fields.volume_ml) features.push({ label: "Hacim", value: `${fields.volume_ml} ml`, icon: <Droplets className="w-5 h-5" /> });
  if (fields.silicone_free) features.push({ label: "Silikon", value: "İçermez", icon: <Shield className="w-5 h-5" /> });
  if (fields.filler_free) features.push({ label: "Dolgu Maddesi", value: "İçermez", icon: <Shield className="w-5 h-5" /> });
  if (fields.voc_free) features.push({ label: "VOC", value: "İçermez", icon: <Shield className="w-5 h-5" /> });
  if (fields.grit_removal) features.push({ label: "Zımpara İzi Giderme", value: fields.grit_removal, icon: <Settings className="w-5 h-5" /> });
  if (fields.dusting_level) features.push({ label: "Tozuma Seviyesi", value: fields.dusting_level === "Low" ? "Düşük" : fields.dusting_level === "High" ? "Yüksek" : fields.dusting_level, icon: <Beaker className="w-5 h-5" /> });
  if (fields.made_in) features.push({ label: "Üretim", value: fields.made_in, icon: <CheckCircle2 className="w-5 h-5" /> });

  const machineCompat = Array.isArray(fields.machine_compatibility) ? fields.machine_compatibility : fields.machine_compatibility ? [fields.machine_compatibility] : [];

  return (
    <div className="bg-white min-h-screen pb-24" data-testid="page-product-detail">
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center text-xs uppercase tracking-widest font-black text-gray-500 flex-wrap gap-y-2">
          <Link href="/"><span className="hover:text-[#e3000f] cursor-pointer">Ana Sayfa</span></Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href={`/category/${category}`}>
            <span className="hover:text-[#e3000f] cursor-pointer uppercase">{categoryTitles[category as string] || category}</span>
          </Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#002b3d] uppercase truncate max-w-[200px]">{product.product_name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="bg-white p-8 lg:p-12 flex justify-center items-center relative border border-gray-200 min-h-[400px] lg:min-h-[500px] shadow-sm sticky top-24">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.product_name}
                className="max-h-[500px] w-auto object-contain drop-shadow-2xl"
                data-testid="img-product"
              />
            ) : (
              <div className="text-gray-300 font-bold text-lg uppercase tracking-widest">Görsel Yok</div>
            )}
          </div>

          <div className="flex flex-col">
            <div className="text-[11px] text-gray-400 font-black uppercase tracking-[0.15em] mb-2">
              {product.category?.sub_cat2 || product.category?.sub_cat || ""} &bull; SKU: {product.sku}
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-[#002b3d] mb-4 tracking-tight uppercase leading-tight" data-testid="text-product-name">
              {product.product_name}
            </h1>
            <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>

            {content.short_description && (
              <p className="text-gray-600 leading-relaxed mb-6 text-base">
                {content.short_description}
              </p>
            )}

            {(cutLevel !== undefined || glossLevel !== undefined) && (
              <div className="grid grid-cols-1 gap-6 p-6 bg-[#f8f9fa] border border-gray-200 mb-8">
                {cutLevel !== undefined && (
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-black text-[#002b3d] uppercase tracking-widest text-sm">Kesicilik (Cut)</span>
                      <span className="font-black text-3xl text-[#e3000f] leading-none">{cutLevel}<span className="text-base text-gray-400 ml-1">/10</span></span>
                    </div>
                    <div className="flex gap-1.5 h-3 w-full">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 ${i < cutLevel ? 'bg-[#e3000f]' : 'bg-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                )}
                {glossLevel !== undefined && (
                  <div>
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-black text-[#002b3d] uppercase tracking-widest text-sm">Parlaklık (Gloss)</span>
                      <span className="font-black text-3xl text-[#009b77] leading-none">{glossLevel}<span className="text-base text-gray-400 ml-1">/10</span></span>
                    </div>
                    <div className="flex gap-1.5 h-3 w-full">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`flex-1 ${i < glossLevel ? 'bg-[#009b77]' : 'bg-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {features.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {features.map((f, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-200 p-3 flex flex-col items-center text-center">
                    <div className="text-[#e3000f] mb-1">{f.icon}</div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{f.label}</span>
                    <span className="text-sm font-black text-[#002b3d]">{f.value}</span>
                  </div>
                ))}
                {machineCompat.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 p-3 flex flex-col items-center text-center">
                    <div className="text-[#e3000f] mb-1"><Settings className="w-5 h-5" /></div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Makine</span>
                    <span className="text-sm font-black text-[#002b3d]">{machineCompat.join(" / ")}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <a href="https://mgpolishing.com/yetkili-saticilar/" target="_blank" rel="noopener noreferrer" className="bg-[#e3000f] hover:bg-[#002b3d] text-white flex-1 h-14 font-black text-sm uppercase tracking-widest transition-colors duration-300 flex items-center justify-center">
                Yetkili Satıcı Bul
              </a>
            </div>
          </div>
        </div>

        {content.full_description && (
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Ürün Açıklaması</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {content.full_description.split(/\n\n+/).map((paragraph: string, i: number) => {
                const trimmed = paragraph.trim();
                if (!trimmed) return null;
                if (trimmed.startsWith("•")) {
                  const items = trimmed.split("\n").filter((l: string) => l.trim());
                  return (
                    <ul key={i} className="space-y-2 my-4">
                      {items.map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3 bg-gray-50 p-3 border-l-4 border-[#e3000f]">
                          <CheckCircle2 className="w-5 h-5 text-[#e3000f] shrink-0 mt-0.5" />
                          <span className="font-medium">{item.replace(/^[•\s]+/, "")}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\./.test(trimmed)) {
                  const items = trimmed.split("\n").filter((l: string) => l.trim());
                  return (
                    <ol key={i} className="space-y-2 my-4">
                      {items.map((item: string, j: number) => (
                        <li key={j} className="flex items-start gap-3 bg-gray-50 p-4 border-l-4 border-[#002b3d]">
                          <span className="flex items-center justify-center w-8 h-8 bg-[#002b3d] text-white font-black shrink-0 text-sm">{j + 1}</span>
                          <span className="font-medium">{item.replace(/^\d+[\.\)]\s*/, "")}</span>
                        </li>
                      ))}
                    </ol>
                  );
                }
                const isBold = trimmed.length < 80 && !trimmed.includes(".");
                if (isBold) {
                  return <h3 key={i} className="text-xl font-black text-[#002b3d] uppercase tracking-wide mt-8 mb-3">{trimmed}</h3>;
                }
                return <p key={i} className="mb-4">{trimmed}</p>;
              })}
            </div>
          </div>
        )}

        {content.how_to_use && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Kullanım Talimatları</h2>
            <div className="space-y-3">
              {content.how_to_use.split("\n").filter((l: string) => l.trim()).map((step: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 border-l-4 border-l-[#002b3d]">
                  <span className="flex items-center justify-center w-10 h-10 bg-[#002b3d] text-white font-black shrink-0 text-lg">{i + 1}</span>
                  <span className="font-medium text-gray-800 text-base leading-relaxed">{step.replace(/^\d+[\.\)]\s*/, "")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.why_this_product && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Neden Bu Ürün?</h2>
            <div className="space-y-3">
              {content.why_this_product.split("\n").filter((l: string) => l.trim()).map((point: string, i: number) => (
                <div key={i} className="flex items-start gap-4 bg-gray-50 p-4 border border-gray-100">
                  <CheckCircle2 className="w-6 h-6 text-[#e3000f] shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-800">{point.replace(/^[•\s]+/, "")}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {content.when_to_use && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Ne Zaman Kullanılır?</h2>
            <div className="bg-[#002b3d] text-white p-8">
              <p className="leading-relaxed text-gray-200">{content.when_to_use}</p>
            </div>
          </div>
        )}

        {content.target_surface && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Hedef Yüzey</h2>
            <div className="bg-gray-50 border border-gray-200 p-6">
              <p className="font-medium text-gray-700">{content.target_surface}</p>
            </div>
          </div>
        )}

        {faq && faq.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-black text-[#002b3d] uppercase tracking-widest mb-8">Sıkça Sorulan Sorular</h2>
            <div className="space-y-4">
              {faq.map((item: any, i: number) => (
                <div key={i} className="border border-gray-200 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <HelpCircle className="w-5 h-5 text-[#e3000f] shrink-0 mt-0.5" />
                    <h3 className="font-black text-[#002b3d] text-base">{item.question}</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-8">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
