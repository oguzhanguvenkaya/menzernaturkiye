import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "../src/db/schema";
import { eq } from "drizzle-orm";

// Load .env.local
const envFile = readFileSync(".env.local", "utf-8");
for (const line of envFile.split("\n")) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

const client = neon(DATABASE_URL);
const db = drizzle(client);

const newProducts = [
  {
    sku: "24017.261.080",
    barcode: "24017.261.080",
    brand: "MENZERNA",
    product_name: "MENZERNA Premium Power Cut 200 (PPC 200) - Ağır Kesim Tekne Cilası - 1 lt",
    price: 0,
    image_url: "https://www.menzerna.com/fileadmin/user_upload/Menzerna_Automotive_PPC200.jpg",
    template_group: "abrasive_polish",
    template_sub_type: "heavy_cut_compound",
    category: {
      main_cat: "MARİN",
      sub_cat: "Tekne Cilası",
      sub_cat2: "Ağır Kesim Pasta",
    },
    content: {
      short_description: "Premium Power Cut 200 (PPC 200), jelkot, topcoat, GFC, CFRP, kompozit, perspex, PE reçine ve tekne boyaları üzerinde maksimum kesim gücü ve parlak sonuç sunan ağır kesim cilasıdır.",
      full_description: "Premium Power Cut 200 (PPC 200), jelkot, topcoat, GFC, CFRP, kompozit, perspex, PE reçine ve tekne boyaları üzerinde maksimum kesim ve güzel bir parlaklık sağlayan üstün performanslı ağır kesim cilasıdır. Endüstriyel tekne ve karavan üretiminde olduğu kadar detailing işlemlerinde de mükemmel sonuçlar verir.\n\nMenzerna Premium Power Cut 200, maksimum kesim gücü sunan ağır kesim tekne cilasıdır. Jelkot ve diğer kompozit yüzeylerdeki çizikleri ve kusurları güvenilir ve verimli şekilde giderir. Yoğun kullanıma maruz kalan yüzeyler için ideal seçimdir!",
      how_to_use: "1. Yüzeyi iyice temizleyin.\n2. Şişeyi çalkalayın; çift taraflı kuzu postuna yaklaşık 15g ürün uygulayın.\n3. Düşük hızda, güçlü ve eşit basınçla çapraz hareketlerle çalışın.\n4. Hafif şeffaf/yağlı bir film görünene kadar cilalamaya devam edin.\n5. Kalıntıları mikrofiber bezle temizleyin.\n6. İsteğe bağlı olarak Menzerna Control Cleaner ile yüzeyi temizleyin.",
      when_to_use: "Jelkot ve kompozit yüzeylerdeki ağır çiziklerin, oksidasyon izlerinin ve yüzey kusurlarının giderilmesi gerektiğinde kullanılır. Endüstriyel tekne/karavan üretimi ve profesyonel detailing işlemlerinde maksimum kesim gücü gereken durumlarda idealdir.",
      target_surface: "Jelkot (Gelcoat), Topcoat, GFRP, CFRP, Kompozitler, Perspex, PE Reçine, Tekne boyaları",
      why_this_product: "Maksimum kesim gücü ile jelkot ve kompozit yüzeylerdeki en derin çizikleri bile tek adımda giderir. Düşük tüketimle maliyet tasarrufu sağlar, her tür jelkot için idealdir.",
      gallery: [
        "https://www.menzerna.com/fileadmin/user_upload/Menzerna_Automotive_PPC200.jpg",
        "https://www.menzerna.com/fileadmin/user_upload/Menzerna-Bootsmotiv1-mid_51_.jpg",
      ],
      menzerna_url: "https://www.menzerna.com/boat-care/boat-polish/details/premium-power-cut-200",
      menzerna_scrape: {
        subtitle: "Heavy Cut Polish: Very high abrasiveness for maximum cut",
        subtitle_en: "Heavy Cut Polish: Very high abrasiveness for maximum cut",
        description: "Premium Power Cut 200 (PPC 200) is the ultimate cutting polish for maximum cut and a beautiful shine on gelcoat, topcoat, GFC, CFRP, composites, perspex, PE resin and boat paints. Premium Power Cut 200 delivers perfect results in industrial boat and caravan construction as well as in detailing.",
        description_en: "Premium Power Cut 200 (PPC 200) is the ultimate cutting polish for maximum cut and a beautiful shine on gelcoat, topcoat, GFC, CFRP, composites, perspex, PE resin and boat paints. Premium Power Cut 200 delivers perfect results in industrial boat and caravan construction as well as in detailing.",
        steps: [
          { number: 1, label: "Heavy Cut", label_tr: "Ağır Kesim", isActive: true, isHalfActive: false },
          { number: 2, label: "Medium Cut", label_tr: "Orta Kesim", isActive: false, isHalfActive: false },
          { number: 3, label: "Finish", label_tr: "Cila/Parlatma", isActive: false, isHalfActive: false },
          { number: 4, label: "Protection", label_tr: "Koruma", isActive: false, isHalfActive: false },
        ],
        benefits: [
          "Maksimum kesim gücü",
          "Gerekli cilalama süresini önemli ölçüde azaltır",
          "Düşük tüketim ile maliyet tasarrufu",
          "Her tür jelkot için ideal",
        ],
        optimised_for: [
          { name: "Crater Shaped Lambswool Pad", name_tr: "Krater Kuzu Postu Ped" },
          { name: "Double Sided Lambswool Pad", name_tr: "Çift Taraflı Kuzu Postu Ped" },
        ],
        suitable_for: [
          "Gelcoat (Jelkot)",
          "Topcoat",
          "GFRP, CFRP-Composites",
          "Perspex",
          "PE-resin",
          "Boat paints (Tekne boyaları)",
        ],
        compound_type: "Gelcoat & Composites Polish",
        cut_gloss_rating: "10/6",
      },
      downloads: [
        {
          label: "Technical Datasheet Premium Power Cut 200",
          url: "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Dokumente/Technische_Datenblaetter/Bootpolituren/EN/TDB_PPC200.pdf",
          size: "91.30 KB",
        },
        {
          label: "Overview Polishing Process for Composite Surfaces",
          url: "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Dokumente/Polishing_Process_Composite.pdf",
          size: "520.79 KB",
        },
      ],
    },
    template_fields: {
      cut_level: 10,
      finish_level: 6,
      volume_ml: 1000,
      machine_compatibility: ["Rotary", "Orbital"],
      recommended_pad_types: ["Crater Shaped Lambswool Pad", "Double Sided Lambswool Pad"],
      silicone_free: null,
      voc_free: null,
      filler_free: null,
      made_in: "Germany",
    },
    relations: {
      use_before: [],
      use_after: [],
      use_with: [],
      accessories: ["Crater Shaped Lambswool Pad", "Double Sided Lambswool Pad"],
      alternatives: [],
    },
    faq: [],
  },
  {
    sku: "26.942.099.001",
    barcode: "4260063020247",
    brand: "MENZERNA",
    product_name: "MENZERNA Mikrofiber Bez Seti 320 GSM 4'lü Paket - 40x40cm",
    price: 0,
    image_url: "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26942099001.jpg?v=2",
    template_group: "accessory",
    template_sub_type: null,
    category: {
      main_cat: "AKSESUAR",
      sub_cat: "Yardımcı Ürünler",
    },
    content: {
      full_description: "Yüksek kaliteli mikrofiber bez seti, koruyucu cila waxların silinmesinden boyaya parlaklık vermeye, pasta tozlarının yüzeyden arındırılmasından iç detaylı temizliğe kadar çok yönlü kullanım alanlarına sahiptir. 4 farklı renk bez, Menzerna polisaj sistemi ile tamamen uyumludur.\n\nRenk Kodları:\n- Kırmızı: Kalın pasta (Heavy Cut) kalıntıları\n- Sarı: Ara kat (Medium Cut) işlemleri\n- Yeşil: Hare giderici ve cila (Finish) aşaması\n- Mavi: Koruma (Wax/Sealant) ve son kontrol\n\nÖzellikler:\n- 320 GSM (Kısa tüylü, hav bırakmayan)\n- 40x40 cm boyutlarında\n- %80 polyester - %20 poliamid\n- Birinci kalite Çin menşei mikrofiber\n- 40°C'de yıkanabilir, sıkma yapılmamalı, asarak kurutulmalı\n- Yumuşatıcı ve ağartıcı kullanmayın",
      gallery: [
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26942099001.jpg?v=2",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26942099001_1.jpg?v=2",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26942099001_2.jpg?v=2",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26942099001_3.jpg?v=2",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26942099001_4.jpg?v=2",
      ],
    },
    template_fields: null,
    relations: null,
    faq: null,
  },
  {
    sku: "26.900.223.011",
    barcode: "4262517331268",
    brand: "MENZERNA",
    product_name: "MENZERNA Rotary ve Orbital Uyumlu İnce Pasta Süngeri 130/150mm - Sarı",
    price: 0,
    image_url: "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011.jpg?v=1",
    template_group: "polishing_pad",
    template_sub_type: "foam_pad",
    category: {
      main_cat: "AKSESUAR",
      sub_cat: "Polisaj Pedleri ve Keçeler",
      sub_cat2: "Orbital Süngerler",
    },
    content: {
      full_description: "İnce Pasta Süngeri, polisaj işleminin ikinci adımı olan keçe ya da sert süngerin bıraktığı hafif çizikleri gidermede tasarlanmış, yüksek performanslı, profesyonel, uzun ömürlü orijinal polisaj süngeridir. Hafif aşındırma gücü, orta seviye parlaklık ve sert sünger yapısı özellikleri sunar. 130mm velcro tabanlı, 150mm yüzey çapında rotary/orbital makinelerle uyumludur.\n\nÖzellikler:\n- Yıkanabilir\n- Güvenlik Kenarı\n- Yüksek kaliteli sünger\n- Avrupa'da üretilmiştir\n- Taban Çapı: 130 mm\n- Yüzey Çapı: 150 mm / 6\"\n- Renk: Sarı\n- Kullanım: Rotary ve Orbital",
      gallery: [
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223011.jpg?v=1",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1500x1500_thumb_26900223011.jpg?v=1",
      ],
    },
    template_fields: {
      color: "Sarı",
      hardness: "Medium",
      diameter_mm: 150,
      base_diameter_mm: 130,
      washable: true,
      safety_edge: true,
      machine_compatibility: ["Rotary", "Orbital"],
    },
    relations: null,
    faq: null,
  },
  {
    sku: "26.900.223.010",
    barcode: "4262517331176",
    brand: "MENZERNA",
    product_name: "MENZERNA Rotary ve Orbital Uyumlu Kalın Pasta Süngeri 130/150mm - Kırmızı",
    price: 0,
    image_url: "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010.jpg?v=1",
    template_group: "polishing_pad",
    template_sub_type: "foam_pad",
    category: {
      main_cat: "AKSESUAR",
      sub_cat: "Polisaj Pedleri ve Keçeler",
      sub_cat2: "Orbital Süngerler",
    },
    content: {
      full_description: "Kalın Pasta Süngeri, polisaj işleminin ilk adımı olan çizik gidermede kalın pasta ürünleri ile çalışmak üzere tasarlanmış, yüksek performanslı, profesyonel, uzun ömürlü polisaj süngeridir. Yüksek aşındırma gücü, sert sünger yapısı ve Menzerna sistemine tam uyumluluğu öne çıkmaktadır. 130mm velcro tabanı ve 150mm sünger çapıyla 125mm tabanlı rotary/orbital makinelerle kullanılabilir.\n\nÖzellikler:\n- Yıkanabilir\n- Güvenlik Kenarı\n- Yüksek kaliteli sünger\n- Pratik ve dayanıklı yapı\n- Avrupa üretimi\n- Taban Çapı: 130 mm\n- Yüzey Çapı: 150 mm / 6\"\n- Renk: Kırmızı\n- Kullanım: Rotary ve Orbital\n\nUyumlu Pastalar: Super Heavy Cut Compound 300, Cut Force Pro, Heavy Cut Compound 400/1000/1100, Universal Paste AS 30",
      gallery: [
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223010.jpg?v=1",
      ],
    },
    template_fields: {
      color: "Kırmızı",
      hardness: "Hard",
      diameter_mm: 150,
      base_diameter_mm: 130,
      washable: true,
      safety_edge: true,
      machine_compatibility: ["Rotary", "Orbital"],
    },
    relations: null,
    faq: null,
  },
  {
    sku: "26.900.223.012",
    barcode: "4262517331282",
    brand: "MENZERNA",
    product_name: "MENZERNA Rotary ve Orbital Uyumlu Hare Giderici Sünger 130/150mm - Yeşil",
    price: 0,
    image_url: "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012.jpg",
    template_group: "polishing_pad",
    template_sub_type: "foam_pad",
    category: {
      main_cat: "AKSESUAR",
      sub_cat: "Polisaj Pedleri ve Keçeler",
      sub_cat2: "Orbital Süngerler",
    },
    content: {
      full_description: "Profesyonel polisaj süngeri olup, hare/hologram giderme ve boyaya derinlik verme aşamasında kullanılmak üzere tasarlanmıştır. Hafif aşındırma gücü, yüksek parlaklık ve orta yumuşak yapısı vardır. Yıkanabilir, güvenlik kenarı, dayanıklı ve Avrupa'da üretilmiştir. 125mm tabanlı rotary/orbital makinelerde kullanılabilir.\n\nÖzellikler:\n- Yıkanabilir\n- Güvenlik Kenarı\n- Yüksek kaliteli sünger\n- Avrupa'da üretilmiştir\n- Taban Çapı: 130 mm\n- Yüzey Çapı: 150 mm / 6\"\n- Renk: Yeşil\n- Kullanım: Rotary ve Orbital\n\nUyumlu Ürünler: Final Finish 3000/3500/3800, One Step Polish 3in1",
      gallery: [
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012.jpg",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_1.jpg",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_2.jpg",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_3.jpg",
        "https://u6ukhqk0z5jj.merlincdn.net/Resim/Minik/1000x1000_thumb_26900223012_4.jpg",
      ],
    },
    template_fields: {
      color: "Yeşil",
      hardness: "Soft",
      diameter_mm: 150,
      base_diameter_mm: 130,
      washable: true,
      safety_edge: true,
      machine_compatibility: ["Rotary", "Orbital"],
    },
    relations: null,
    faq: null,
  },
];

async function addProducts() {
  console.log(`${newProducts.length} ürün ekleniyor...\n`);

  for (const product of newProducts) {
    // Check if SKU already exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.sku, product.sku));

    if (existing.length > 0) {
      console.log(`⚠ SKU ${product.sku} zaten mevcut, atlanıyor: ${product.product_name}`);
      continue;
    }

    await db.insert(products).values(product);
    console.log(`✓ Eklendi: ${product.product_name}`);
  }

  console.log("\n✅ Tamamlandı!");
}

addProducts().catch(console.error);
