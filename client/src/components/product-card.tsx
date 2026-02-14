import { Product } from "@/lib/types";
import { Link } from "wouter";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from "lucide-react";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.sku}`}>
      <Card className="group h-full overflow-hidden border-neutral-200 hover:border-primary/50 transition-all hover:shadow-lg cursor-pointer bg-white">
        <div className="relative aspect-square overflow-hidden bg-neutral-100 p-8">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.product_name}
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-300">
              Görsel Yok
            </div>
          )}
          
          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button size="icon" variant="secondary" className="rounded-full shadow-md hover:bg-primary hover:text-white">
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {/* Green Line Badge */}
            {product.product_name?.toLowerCase().includes("green line") && (
              <Badge className="bg-green-600 text-white hover:bg-green-700">
                Green Line
              </Badge>
            )}

            {/* Product Type Badges - Logic to ensure only ONE type badge is shown */}
            {(() => {
              if (product.template_sub_type === "sanding_paste") {
                return (
                  <Badge className="bg-neutral-800 text-white hover:bg-neutral-900">
                    Sanding
                  </Badge>
                );
              }
              if (product.template_sub_type === "heavy_cut_compound" || (product.template_fields?.cut_level && product.template_fields.cut_level > 8)) {
                return (
                  <Badge className="bg-red-600 text-white hover:bg-red-700">
                    Heavy Cut
                  </Badge>
                );
              }
              if (product.template_sub_type === "one_step_polish" || product.product_name?.toLowerCase().includes("3in1") || product.product_name?.toLowerCase().includes("3 in 1")) {
                return (
                  <Badge className="bg-blue-600 text-white hover:bg-blue-700">
                    3in1
                  </Badge>
                );
              }
              if (product.template_sub_type === "polish" || product.template_sub_type === "medium_cut_polish" || (product.template_fields?.cut_level && product.template_fields.cut_level >= 5)) {
                return (
                  <Badge className="bg-yellow-500 text-black hover:bg-yellow-600 border-none">
                    Medium Cut
                  </Badge>
                );
              }
              if (product.template_sub_type === "finish" || (product.template_fields?.finish_level && product.template_fields.finish_level > 8)) {
                return (
                  <Badge className="bg-green-500 text-white hover:bg-green-600">
                    Finish
                  </Badge>
                );
              }
              if (product.template_sub_type?.includes("sealant") || product.template_sub_type?.includes("protection") || product.category?.sub_cat?.toLowerCase().includes("koruma")) {
                return (
                   <Badge className="bg-cyan-500 text-white hover:bg-cyan-600">
                     Protection
                   </Badge>
                );
              }
              return null;
            })()}
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="text-xs text-neutral-500 mb-2 font-medium uppercase tracking-wide truncate">
            {product.category?.sub_cat}
          </div>
          <h3 className="font-bold text-neutral-800 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
            {product.product_name}
          </h3>
          
          {/* Performance Bars (Mock for visual) */}
          <div className="mt-3 space-y-1">
             <div className="flex items-center gap-2 text-[10px] text-neutral-500">
               <span className="w-12">Cut:</span>
               <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-red-600" 
                   style={{ width: `${(product.template_fields?.cut_level || 5) * 10}%` }}
                 />
               </div>
               <span className="w-4 text-right">{product.template_fields?.cut_level || "-"}</span>
             </div>
             <div className="flex items-center gap-2 text-[10px] text-neutral-500">
               <span className="w-12">Gloss:</span>
               <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
                 <div 
                   className="h-full bg-green-500" 
                   style={{ width: `${(product.template_fields?.finish_level || 5) * 10}%` }}
                 />
               </div>
               <span className="w-4 text-right">{product.template_fields?.finish_level || "-"}</span>
             </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-red-50 p-0 h-auto font-semibold ml-auto">
            İncele
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
