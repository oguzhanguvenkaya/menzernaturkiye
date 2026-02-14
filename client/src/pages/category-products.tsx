import { useParams, Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useProducts } from "@/lib/data";

const categoryMap: Record<string, { title: string; description: string; mainCats: string[] }> = {
  "car-polish": {
    title: "Pasta, Cila ve Boya Korumalar",
    description: "Menzerna'nın endüstri standartlarını belirleyen, araç boyası için tasarlanmış profesyonel pasta, cila ve koruma ürünlerini keşfedin.",
    mainCats: ["DIŞ YÜZEY"],
  },
  "accessories": {
    title: "Sünger, Keçe ve Aksesuarlar",
    description: "Polisaj sürecinizi tamamlayan profesyonel sünger, keçe, tabanlık ve temizlik aksesuarları.",
    mainCats: ["AKSESUAR", "MAKİNE-EKİPMAN"],
  },
  "solid-compounds": {
    title: "Endüstriyel - Katı Pasta ve Cilalar",
    description: "Metal, alüminyum, paslanmaz çelik ve pirinç yüzeyler için tasarlanmış endüstriyel katı polisaj pastaları.",
    mainCats: ["ENDÜSTRİYEL"],
  },
  "boat-polish": {
    title: "Marin - Tekne Pasta ve Cilaları",
    description: "Jelkot yüzeyler için profesyonel tekne polisaj ürünleri. Çizik giderme, sararma giderme ve parlak koruma.",
    mainCats: ["MARİN"],
  },
  "marine-polish": {
    title: "Marin - Tekne Pasta ve Cilaları",
    description: "Jelkot yüzeyler için profesyonel tekne polisaj ürünleri.",
    mainCats: ["MARİN"],
  },
};

export default function CategoryProducts() {
  const { category } = useParams();
  const catKey = category as string;
  const catInfo = categoryMap[catKey] || { title: catKey?.replace(/-/g, " ") || "", description: "", mainCats: [] as string[] };

  const { data: allProducts, isLoading } = useProducts();

  const products = allProducts?.filter((p) => {
    const cat = p.category as any;
    if (!cat) return false;
    return catInfo.mainCats.some((mc: string) => cat.main_cat === mc);
  }) || [];

  return (
    <div className="min-h-screen bg-white pb-24" data-testid="page-category">
      <div className="bg-[#002b3d] pt-20 pb-16 relative overflow-hidden border-t-4 border-[#e3000f]">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4" data-testid="text-category-title">
            {catInfo.title}
          </h1>
          <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl font-light leading-relaxed">
            {catInfo.description}
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200 py-4 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 flex-wrap gap-y-2">
          <Link href="/"><span className="hover:text-[#e3000f] cursor-pointer transition-colors">Ana Sayfa</span></Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#002b3d] uppercase">{catInfo.title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-[480px] w-full rounded-none bg-gray-200" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-medium">Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-500 mb-8 font-bold uppercase tracking-widest">
              {products.length} ürün listeleniyor
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.sku} product={product} categorySlug={catKey} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
