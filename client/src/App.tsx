import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Products from "@/pages/products";
import ProductDetail from "@/pages/product-detail";
import Contact from "@/pages/contact";
import About from "@/pages/about";

import CategoryProducts from "@/pages/category-products";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/product/:sku" component={ProductDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      
      {/* New Category Routes */}
      <Route path="/car-care/car-polish">
        <CategoryProducts 
          categoryType="car-polish" 
          title="Pasta, Cila ve Boya Korumalar" 
          description="Profesyonel araç bakımı için üstün performanslı ürünler. Çizik giderme, parlatma ve koruma için Menzerna kalitesi."
        />
      </Route>
      <Route path="/car-care/accessories">
        <CategoryProducts 
          categoryType="accessories" 
          title="Sünger, Keçe ve Tabanlıklar" 
          description="Menzerna polisaj ürünleri ile mükemmel uyum sağlayan profesyonel aksesuarlar."
        />
      </Route>
      <Route path="/industrial/solid-compounds">
        <CategoryProducts 
          categoryType="solid-compounds" 
          title="Katı Pasta ve Cilalar" 
          description="Endüstriyel polisaj işlemleri için yüksek performanslı katı bileşikler."
        />
      </Route>
      <Route path="/marine/boat-polish">
        <CategoryProducts 
          categoryType="marine-polish" 
          title="Tekne Pasta ve Cilaları" 
          description="Tekne ve yat bakımı için özel geliştirilmiş, zorlu deniz koşullarına dayanıklı ürünler."
        />
      </Route>

      <Route path="/dealers" component={() => <div className="container mx-auto py-20 text-center"><h1 className="text-3xl font-bold mb-4">Yetkili Satıcılar</h1><p>Bu sayfa yapım aşamasındadır.</p></div>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
