import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import CategoryProducts from "@/pages/category-products";
import ProductDetail from "@/pages/product-detail";
import { Layout } from "@/components/layout";
import Products from "@/pages/products";
import Contact from "@/pages/contact";
import About from "@/pages/about";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        
        {/* Kategoriler ve Detayları */}
        <Route path="/category/:category" component={CategoryProducts} />
        <Route path="/category/:category/:id" component={ProductDetail} />
        
        {/* Dealer Route Placeholder from Layout */}
        <Route path="/dealers" component={() => {
          window.location.href = "https://mgpolishing.com/yetkili-saticilar";
          return <div className="container mx-auto py-20 text-center"><h1 className="text-3xl font-bold mb-4">Yönlendiriliyorsunuz...</h1><p>Yetkili satıcılar sayfasına yönlendiriliyorsunuz.</p></div>;
        }} />

        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
