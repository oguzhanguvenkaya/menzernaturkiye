import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ProductCard } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function CategoryProducts() {
  const { category } = useParams();
  
  const categoryTitles: Record<string, string> = {
    "car-polish": "Araç Bakım - Pasta, Cila ve Boya Korumalar",
    "marine-polish": "Marin - Tekne Bakım Ürünleri",
    "solid-compounds": "Endüstriyel - Katı Pasta ve Cilalar",
    "boat-polish": "Marin Pasta ve Cilalar",
    "accessories": "Sünger, Keçe ve Aksesuarlar"
  };

  const title = categoryTitles[category as string] || category?.replace('-', ' ');

  const { data: products, isLoading } = useQuery({
    queryKey: [`/data/${category}.json`],
    queryFn: () => fetch(`/data/${category}.json`).then((res) => res.json()),
  });

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="bg-[#002b3d] pt-20 pb-16 relative overflow-hidden border-t-4 border-[#e3000f]">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest mb-4">
            {title}
          </h1>
          <div className="w-16 h-1.5 bg-[#e3000f] mb-6"></div>
          <p className="text-gray-300 text-lg max-w-3xl font-light leading-relaxed">
            Menzerna'nın endüstri standartlarını belirleyen, kusursuz yüzeyler için tasarlanmış yenilikçi teknolojilerini keşfedin.
          </p>
        </div>
      </div>

      <div className="border-b border-gray-200 py-4 mb-12 bg-gray-50">
        <div className="container mx-auto px-4 flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 flex-wrap gap-y-2">
          <Link href="/"><span className="hover:text-[#e3000f] cursor-pointer transition-colors">Ana Sayfa</span></Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#002b3d] uppercase">{title}</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[480px] w-full rounded-none bg-gray-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products?.map((product: any, idx: number) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
