import { Product } from "@/lib/types";
import { Link } from "wouter";

function getCategorySlug(product: Product): string {
  const cat = product.category;
  if (!cat) return "car-polish";
  const mainCat = cat.main_cat || "";
  if (mainCat === "ENDÜSTRİYEL") return "solid-compounds";
  if (mainCat === "MARİN") return "boat-polish";
  if (mainCat === "AKSESUAR" || mainCat === "MAKİNE-EKİPMAN") return "accessories";
  return "car-polish";
}

export function ProductCard({ product, categorySlug }: { product: Product; categorySlug?: string }) {
  const slug = categorySlug || getCategorySlug(product);
  const cutLevel = product.template_fields?.cut_level;
  const glossLevel = product.template_fields?.finish_level;

  const getTypeBadge = () => {
    if (product.template_sub_type === "sanding_paste") {
      return <span className="bg-neutral-800 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">Sanding</span>;
    }
    if (product.template_sub_type === "heavy_cut_compound" || (cutLevel && cutLevel > 8)) {
      return <span className="bg-[#e3000f] text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">Heavy Cut</span>;
    }
    if (product.template_sub_type === "one_step_polish" || product.product_name?.toLowerCase().includes("3in1") || product.product_name?.toLowerCase().includes("3 in 1")) {
      return <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">3in1</span>;
    }
    if (product.template_sub_type === "medium_cut_polish" || product.template_sub_type === "polish" || (cutLevel && cutLevel >= 5 && cutLevel <= 8)) {
      return <span className="bg-yellow-500 text-black text-[10px] font-black px-3 py-1 uppercase tracking-wider">Medium Cut</span>;
    }
    if (product.template_sub_type === "finish" || (glossLevel && glossLevel > 8)) {
      return <span className="bg-green-500 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">Finish</span>;
    }
    if (product.template_sub_type?.includes("sealant") || product.template_sub_type?.includes("protection") || product.category?.sub_cat?.toLowerCase().includes("koruma")) {
      return <span className="bg-cyan-500 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">Protection</span>;
    }
    return null;
  };

  return (
    <Link href={`/category/${slug}/${product.sku}`}>
      <div className="group h-full bg-white border border-gray-200 hover:border-[#e3000f] transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col" data-testid={`card-product-${product.sku}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50 p-6">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.product_name}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm font-bold uppercase tracking-widest">
              Görsel Yok
            </div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.product_name?.toLowerCase().includes("green line") && (
              <span className="bg-green-600 text-white text-[10px] font-black px-3 py-1 uppercase tracking-wider">Green Line</span>
            )}
            {getTypeBadge()}
          </div>
        </div>
        
        <div className="p-5 flex-1 flex flex-col">
          <div className="text-[10px] text-gray-400 mb-2 font-black uppercase tracking-[0.15em]">
            {product.category?.sub_cat2 || product.category?.sub_cat || ""}
          </div>
          <h3 className="font-bold text-[#002b3d] text-sm leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-[#e3000f] transition-colors mb-3">
            {product.product_name}
          </h3>
          
          {(cutLevel !== undefined || glossLevel !== undefined) && (
            <div className="mt-auto space-y-2 pt-3 border-t border-gray-100">
              {cutLevel !== undefined && (
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-8 text-gray-500 font-bold uppercase">Cut</span>
                  <div className="flex-1 flex gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`flex-1 h-1.5 ${i < cutLevel ? 'bg-[#e3000f]' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <span className="w-4 text-right font-black text-gray-700">{cutLevel}</span>
                </div>
              )}
              {glossLevel !== undefined && (
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="w-8 text-gray-500 font-bold uppercase">Gloss</span>
                  <div className="flex-1 flex gap-0.5">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`flex-1 h-1.5 ${i < glossLevel ? 'bg-[#009b77]' : 'bg-gray-200'}`} />
                    ))}
                  </div>
                  <span className="w-4 text-right font-black text-gray-700">{glossLevel}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="px-5 pb-4">
          <span className="text-[#e3000f] font-black text-xs uppercase tracking-widest group-hover:underline">
            Detayları Gör &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
