import { useProduct } from "@/lib/data";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, ShoppingCart, Info, Download, ArrowLeft } from "lucide-react";
import { useRoute, Link } from "wouter";

export default function ProductDetail() {
  const [match, params] = useRoute("/product/:sku");
  const sku = params?.sku || "";
  const { data: product, isLoading } = useProduct(sku);

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[50vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Ürün Bulunamadı</h1>
          <Link href="/products"><Button>Ürünlere Dön</Button></Link>
        </div>
      </Layout>
    );
  }

  const formattedPrice = new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
  }).format(product.price);

  return (
    <Layout>
      {/* Breadcrumbish */}
      <div className="bg-neutral-50 border-b">
        <div className="container mx-auto px-4 py-4 flex items-center text-sm text-neutral-500">
          <Link href="/" className="hover:text-primary">Ana Sayfa</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/products" className="hover:text-primary">Ürünler</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-neutral-900 font-medium truncate max-w-[200px]">{product.product_name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Image Gallery */}
          <div className="space-y-4">
             <div className="aspect-square bg-white border rounded-lg overflow-hidden flex items-center justify-center p-12 shadow-sm">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.product_name} className="max-w-full max-h-full object-contain mix-blend-multiply" />
                ) : (
                  <span className="text-neutral-300">Görsel Yok</span>
                )}
             </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <Badge variant="outline" className="text-neutral-500 border-neutral-300 uppercase tracking-wider text-[10px]">
                {product.category.main_cat} / {product.category.sub_cat}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 leading-tight">
              {product.product_name}
            </h1>

            <div className="text-neutral-500 mb-6 font-mono text-sm">
              SKU: {product.sku}
            </div>

            {/* Price removed as requested */}
            {/* <div className="text-3xl font-bold text-primary mb-8">
              {formattedPrice}
            </div> */}

            {/* Performance Metrics */}
            {product.template_fields?.cut_level !== undefined && (
               <div className="grid grid-cols-2 gap-8 mb-8 bg-neutral-50 p-6 rounded-lg border border-neutral-100">
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>Cut (Kesim)</span>
                      <span>{product.template_fields.cut_level}/10</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: `${product.template_fields.cut_level * 10}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>Gloss (Parlaklık)</span>
                      <span>{product.template_fields.finish_level}/10</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${(product.template_fields.finish_level || 0) * 10}%` }} />
                    </div>
                  </div>
               </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
               <a href="https://mgpolishing.com/yetkili-saticilar/" target="_blank" rel="noopener noreferrer" className="flex-1">
                 <Button size="lg" className="w-full bg-primary hover:bg-red-700 text-white rounded-none h-14 text-lg uppercase font-bold tracking-wide">
                    Satıcı Bul <ChevronRight className="ml-2 h-5 w-5" />
                 </Button>
               </a>
            </div>

            <div className="prose prose-neutral max-w-none text-neutral-600">
               {product.content?.full_description?.slice(0, 200)}...
            </div>
          </div>
        </div>

        {/* Detailed Info Tabs */}
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-8">
              <TabsTrigger 
                value="description" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-4 text-base font-bold bg-transparent shadow-none"
              >
                Ürün Açıklaması
              </TabsTrigger>
              <TabsTrigger 
                value="usage" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-4 text-base font-bold bg-transparent shadow-none"
              >
                Nasıl Kullanılır?
              </TabsTrigger>
              {/* <TabsTrigger value="downloads" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-4 text-base font-bold bg-transparent shadow-none">
                Dokümanlar
              </TabsTrigger> */}
              <TabsTrigger 
                value="faq" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary px-0 py-4 text-base font-bold bg-transparent shadow-none"
              >
                Sıkça Sorulan Sorular
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed whitespace-pre-line">
                {product.content?.full_description || product.content?.short_description}
              </div>
              
              {product.content?.target_surface && (
                <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-lg">
                   <h4 className="font-bold text-blue-900 mb-2">Hedef Yüzeyler</h4>
                   <p className="text-blue-800">{product.content.target_surface}</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="usage" className="py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                       <Info className="text-primary" /> Uygulama Adımları
                    </h3>
                    <div className="prose prose-neutral whitespace-pre-line">
                       {product.content?.how_to_use || "Kullanım talimatı bulunmamaktadır."}
                    </div>
                  </div>
                  <div>
                     {product.template_fields?.machine_compatibility && (
                       <div className="bg-neutral-50 p-6 rounded-lg border">
                          <h4 className="font-bold mb-4">Makine Uyumluluğu</h4>
                          <div className="flex gap-2 flex-wrap">
                             {Array.isArray(product.template_fields.machine_compatibility) 
                               ? product.template_fields.machine_compatibility.map((m: any, i: number) => (
                                 <Badge key={i} variant="secondary" className="px-3 py-1 text-sm">{m}</Badge>
                               )) 
                               : product.template_fields.machine_compatibility
                             }
                          </div>
                       </div>
                     )}
                  </div>
               </div>
            </TabsContent>
            <TabsContent value="faq" className="py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
               {product.faq && product.faq.length > 0 ? (
                 <Accordion type="single" collapsible className="w-full">
                    {product.faq.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-semibold text-neutral-900">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-neutral-600 leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                 </Accordion>
               ) : (
                 <p className="text-neutral-500 italic">Bu ürün için sıkça sorulan sorular bulunmamaktadır.</p>
               )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
