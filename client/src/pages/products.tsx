import { useState, useMemo } from "react";
import { useProducts, useCategories } from "@/lib/data";
import { Layout } from "@/components/layout";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "wouter";

export default function Products() {
  const { data: products, isLoading } = useProducts();
  const { data: categories } = useCategories();
  const [location] = useLocation();
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory = urlParams.get("category");
  
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchesSearch = product.product_name.toLowerCase().includes(search.toLowerCase()) || 
                            product.sku.includes(search);
      const matchesCategory = selectedCategory ? product.category.main_cat === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const Sidebar = () => (
    <div className="space-y-8">
      <div>
        <h3 className="font-bold text-lg mb-4 text-neutral-900">Kategoriler</h3>
        <div className="space-y-2">
          <Button 
            variant={selectedCategory === null ? "default" : "ghost"} 
            className={`w-full justify-start ${selectedCategory === null ? "bg-primary text-white" : "hover:text-primary"}`}
            onClick={() => setSelectedCategory(null)}
          >
            Tüm Ürünler
          </Button>
          {categories?.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "ghost"}
              className={`w-full justify-start ${selectedCategory === cat ? "bg-primary text-white" : "hover:text-primary"}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-neutral-100 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-neutral-900 mb-2">Ürünlerimiz</h1>
          <p className="text-neutral-500">Menzerna'nın profesyonel polisaj çözümlerini keşfedin.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-center bg-white p-4 border rounded-lg shadow-sm">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
                <Input 
                  placeholder="Ürün adı veya kodu ile ara..." 
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-neutral-500 whitespace-nowrap hidden sm:inline">
                  {filteredProducts.length} ürün bulundu
                </span>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="lg:hidden w-full">
                      <SlidersHorizontal className="mr-2 h-4 w-4" /> Filtrele
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="mt-6">
                      <Sidebar />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                 {[1,2,3,4,5,6].map(i => (
                   <div key={i} className="h-96 bg-neutral-100 animate-pulse rounded-lg" />
                 ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.sku} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-neutral-50 rounded-lg border border-dashed">
                <p className="text-neutral-500 text-lg">Aradığınız kriterlere uygun ürün bulunamadı.</p>
                <Button 
                  variant="link" 
                  className="text-primary mt-2"
                  onClick={() => {setSearch(""); setSelectedCategory(null);}}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
