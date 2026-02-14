export interface Category {
  main_cat: string;
  sub_cat: string;
  sub_cat_2?: string; // Kept for compatibility if some files use it
  sub_cat2?: string;  // Added to match raw product data
}

export interface Product {
  sku: string;
  product_name: string;
  price: number;
  image_url?: string;
  category: Category;
  content?: {
    short_description?: string;
    full_description?: string;
    how_to_use?: string;
    when_to_use?: string;
    target_surface?: string;
    why_this_product?: string;
  };
  template_fields?: {
    cut_level?: number;
    finish_level?: number;
    volume_ml?: number;
    machine_compatibility?: string[] | string;
    recommended_pad_types?: string[];
    silicone_free?: boolean;
    voc_free?: boolean;
    filler_free?: boolean;
  };
}

export interface ProductData {
  products: Product[];
}
