import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useLocation } from "wouter";

interface Product {
  name: string;
  image: string;
  url: string;
}

interface Section {
  id: string;
  title: string;
  description: string;
  products: Product[];
}

interface CategoryProductsProps {
  categoryType: 'car-polish' | 'accessories' | 'solid-compounds' | 'marine-polish';
  title: string;
  description: string;
}

export default function CategoryProducts({ categoryType, title, description }: CategoryProductsProps) {
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/data/${categoryType}.json`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data for ${categoryType}`);
        }
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [categoryType]);

  return (
    <Layout>
      <div className="bg-neutral-900 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
          <p className="text-xl text-neutral-400 max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-24 space-y-20">
        {isLoading ? (
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-4">
                <div className="h-8 bg-neutral-100 w-1/3 rounded animate-pulse" />
                <div className="h-4 bg-neutral-100 w-2/3 rounded animate-pulse" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-64 bg-neutral-100 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <div className="mb-8 border-b border-neutral-200 pb-4">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">{section.title}</h2>
                <p className="text-neutral-600 text-lg">{section.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {section.products.map((product) => (
                  <a 
                    key={product.name} 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex flex-col h-full bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-square p-6 bg-white flex items-center justify-center">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="p-4 flex flex-col flex-1 border-t border-neutral-100 bg-neutral-50 group-hover:bg-white transition-colors">
                      <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-auto flex items-center text-primary font-medium text-sm">
                        <span>Ürünü İncele</span>
                        <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
}
