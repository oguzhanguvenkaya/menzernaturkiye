import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ChevronRight, CheckCircle2, Settings, ShieldCheck, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const { category, id } = useParams();

  const { data: products, isLoading } = useQuery({
    queryKey: [`/data/${category}.json`],
    queryFn: () => fetch(`/data/${category}.json`).then((res) => res.json()),
  });

  const product = products?.find((p: any) => p.id === id);

  const getStepColor = (step?: string | number) => {
    const s = String(step || "");
    if (s.includes("1")) return "bg-[#e3000f]";
    if (s.includes("2")) return "bg-[#f5a623]";
    if (s.includes("3")) return "bg-[#009b77]";
    if (s.includes("4")) return "bg-[#005b9f]";
    return "bg-[#002b3d]"; 
  };

  if (isLoading) return <div className="container mx-auto px-4 py-16"><Skeleton className="h-[600px] w-full rounded-none bg-gray-200" /></div>;
  if (!product) return <div className="container mx-auto py-32 text-center text-2xl font-black text-[#002b3d] uppercase tracking-widest">Ürün bulunamadı.</div>;

  const themeColor = getStepColor(product.step);
  const textColor = themeColor.replace('bg-', 'text-').replace(']', '').replace('[', '');

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="bg-gray-50 py-4 border-b border-gray-200">
        <div className="container mx-auto px-4 flex items-center text-xs uppercase tracking-widest font-black text-gray-500 flex-wrap gap-y-2">
          <Link href="/"><span className="hover:text-[#e3000f] cursor-pointer">Ana Sayfa</span></Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href={`/category/${category}`}>
            <span className="hover:text-[#e3000f] cursor-pointer uppercase">{category?.replace('-', ' ')}</span>
          </Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#002b3d] uppercase">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          <div className="bg-white p-12 flex justify-center items-center relative border border-gray-200 min-h-[500px] shadow-sm">
            {product.step && (
              <div className={`absolute top-0 left-0 ${themeColor} text-white text-sm font-black px-6 py-2 uppercase tracking-widest shadow-md`}>
                {product.step === "Endüstriyel" || product.step === "Aksesuar" ? product.step : `Step ${product.step}`}
              </div>
            )}
            <img 
              src={product.image || "https://placehold.co/500x500/fff/002b3d?text=Menzerna+Product"} 
              alt={product.name}
              className="max-h-[600px] w-auto object-contain drop-shadow-2xl"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-black text-[#002b3d] mb-4 tracking-tight uppercase">
              {product.name}
            </h1>
            <div className={`w-16 h-1.5 ${themeColor} mb-6`}></div>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10">
              {product.description}
            </p>

            {(product.cut !== undefined && product.gloss !== undefined && product.cut > 0) && (
              <div className="grid grid-cols-1 gap-8 p-8 bg-[#f8f9fa] border border-gray-200 mb-10 rounded-none shadow-inner">
                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-black text-[#002b3d] uppercase tracking-widest text-sm">Kesicilik (Cut)</span>
                    <span className="font-black text-4xl text-[#e3000f] leading-none">{product.cut}<span className="text-lg text-gray-400 ml-1">/10</span></span>
                  </div>
                  <div className="flex gap-1.5 h-4 w-full">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`flex-1 ${i < product.cut ? 'bg-[#e3000f]' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-3">
                    <span className="font-black text-[#002b3d] uppercase tracking-widest text-sm">Parlaklık (Gloss)</span>
                    <span className="font-black text-4xl text-[#009b77] leading-none">{product.gloss}<span className="text-lg text-gray-400 ml-1">/10</span></span>
                  </div>
                  <div className="flex gap-1.5 h-4 w-full">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className={`flex-1 ${i < product.gloss ? 'bg-[#009b77]' : 'bg-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Tabs defaultValue="benefits" className="w-full">
              <TabsList className="w-full grid grid-cols-2 rounded-none bg-gray-200 p-0 h-14">
                <TabsTrigger value="benefits" className="text-sm rounded-none uppercase tracking-widest font-black data-[state=active]:bg-[#002b3d] data-[state=active]:text-white h-full transition-colors">Avantajlar</TabsTrigger>
                <TabsTrigger value="processing" className="text-sm rounded-none uppercase tracking-widest font-black data-[state=active]:bg-[#002b3d] data-[state=active]:text-white h-full transition-colors">Kullanım Adımları</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="benefits" className="space-y-4">
                  {product.benefits?.length > 0 ? (
                    <ul className="space-y-4">
                      {product.benefits.map((benefit: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-4 text-gray-700 font-medium text-lg bg-gray-50 p-4 border border-gray-100">
                          <CheckCircle2 className={`w-6 h-6 text-[#e3000f] shrink-0 mt-0.5`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-gray-500 font-medium text-lg italic">Detay bulunmuyor.</p>}
                </TabsContent>

                <TabsContent value="processing" className="space-y-4">
                  {product.processing?.length > 0 ? (
                    <ul className="space-y-4">
                      {product.processing.map((step: string, idx: number) => (
                        <li key={idx} className="flex gap-5 items-center p-5 bg-gray-50 border border-gray-100 border-l-4" style={{borderLeftColor: '#002b3d'}}>
                           <span className={`flex items-center justify-center w-10 h-10 ${themeColor} text-white font-black shrink-0 text-xl`}>
                             {idx + 1}
                           </span>
                           <span className="font-medium text-gray-800 text-lg">{step}</span>
                        </li>
                      ))}
                    </ul>
                  ) : <p className="text-gray-500 font-medium text-lg italic">Kullanım talimatı bulunmuyor.</p>}
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-4">
              <button className="bg-[#e3000f] hover:bg-[#002b3d] text-white rounded-none flex-1 h-16 font-black text-lg uppercase tracking-widest transition-colors duration-300">
                Yetkili Satıcı Bul
              </button>
              
              {/* Orijinal Menzerna Sitesine Yönlendirme */}
              {product.originalUrl && (
                <a 
                  href={product.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-[#002b3d] hover:bg-gray-50 text-[#002b3d] rounded-none w-full sm:w-auto h-16 px-8 flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest transition-colors duration-300"
                >
                  Orijinal Sitede Gör <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
