export interface Category {
  main_cat: string;
  sub_cat: string;
  sub_cat_2?: string;
  sub_cat2?: string;
}

export interface MenzernaScrape {
  subtitle?: string;
  subtitle_en?: string;
  description?: string;
  description_en?: string;
  steps?: {
    number: number;
    label: string;
    label_tr?: string;
    isActive?: boolean;
    isHalfActive?: boolean;
  }[];
  optimised_for?: {
    name: string;
    name_tr?: string;
  }[];
  processing?: {
    rotary?: { start?: string; end?: string };
    orbital?: string;
  };
  compound_type?: string;
  grease_content?: string;
  color?: string;
  suitable_for?: string[];
}

export interface Product {
  sku: string;
  product_name: string;
  price: number;
  image_url?: string;
  category: Category;
  template_group?: string;
  template_sub_type?: string;
  content?: {
    short_description?: string;
    full_description?: string;
    how_to_use?: string;
    when_to_use?: string;
    target_surface?: string;
    why_this_product?: string;
    gallery?: string[];
    menzerna_scrape?: MenzernaScrape;
    downloads?: { label: string; url: string; size: string }[];
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
    grit_removal?: string;
    dusting_level?: string;
    made_in?: string;
    [key: string]: unknown;
  };
  relations?: {
    related_products?: { code: string; name: string; name_tr: string }[];
    use_before?: string[];
    use_after?: string[];
    use_with?: string[];
    accessories?: string[];
    alternatives?: string[];
  };
  faq?: {
    question: string;
    answer: string;
  }[];
}

export interface ProductData {
  products: Product[];
}
