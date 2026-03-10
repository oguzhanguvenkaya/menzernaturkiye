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

// ---------------------------------------------------------------------------
// 1A — 3 Sünger Ped Zenginleştirme
// ---------------------------------------------------------------------------

const padEnrichments: Record<string, {
  short_description: string;
  how_to_use: string;
  when_to_use: string;
  why_this_product: string;
  target_surface: string;
  subtitle: string;
  optimised_for: { name: string; name_tr: string }[];
  downloads: { label: string; url: string; size: string }[];
  faq: { question: string; answer: string }[];
  relations: { use_with?: string[]; use_before?: string[]; use_after?: string[] };
  cut_level: string;
  suitable_backing_plate: string;
}> = {
  // Kırmızı — Heavy Cut
  "26.900.223.010": {
    short_description: "Kalın pasta uygulamaları için tasarlanmış, yüksek aşındırma gücüne sahip profesyonel polisaj süngeri. 130mm velcro tabanlı, 150mm yüzey çaplı.",
    how_to_use: `1. Polisaj makinenize 125mm tabanlık takın.
2. Pedi tabanlığa yerleştirin ve düzgün oturduğundan emin olun.
3. Ped yüzeyine kalın pasta (Heavy Cut Compound 400, 1000 vb.) damlatın.
4. Makineyi düşük-orta devirde başlatarak ürünü yüzeye yayın.
5. Orta basınçla panel bazlı çalışın, çapraz geçişlerle uygulayın.
6. Kullanım sonrası pedi ılık suyla yıkayın ve kurutun.`,
    when_to_use: "Ağır çizik giderme, zımpara izi temizleme, derin kusur düzeltme işlemlerinde kullanılır. Polisaj sürecinin ilk adımı olan kalın pasta uygulamasında tercih edilir.",
    why_this_product: `• Sert yapısı ile maksimum kesim gücü sağlar
• Güvenlik kenarı destek diskinden kaynaklanan hasarı önler
• Yıkanabilir ve uzun ömürlü tasarım
• Menzerna kalın pastalarla optimize edilmiş performans
• Avrupa'da üretilmiş premium kalite`,
    target_surface: "Otomotiv boyası, vernik, tüm boya tipleri",
    subtitle: "Aşındırıcı pastalar için premium polisaj süngeri",
    optimised_for: [
      { name: "Heavy Cut Compound 1000", name_tr: "Heavy Cut Compound 1000" },
      { name: "Heavy Cut Compound 400", name_tr: "Heavy Cut Compound 400" },
      { name: "Heavy Cut Compound 400 GREEN LINE", name_tr: "Heavy Cut Compound 400 GREEN LINE" },
      { name: "Super Heavy Cut Compound 300", name_tr: "Super Heavy Cut Compound 300" },
      { name: "Cut Force Pro", name_tr: "Cut Force Pro" },
    ],
    downloads: [
      {
        url: "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Dokumente/Technische_Datenblaetter/Zubehoer/EN/TDB_2_Heavy_Cut_Foam_Pad_EN_09.2021.pdf",
        size: "120.50 KB",
        label: "Technical datasheet Heavy Cut Foam Pad",
      },
    ],
    faq: [
      { question: "Bu ped hangi pastalarla kullanılır?", answer: "Super Heavy Cut 300, Heavy Cut 400, Heavy Cut 1000, Heavy Cut 1100, Universal Paste AS 30 ve Cut Force Pro ile optimize edilmiştir." },
      { question: "Hangi tabanlık boyutu gerekir?", answer: "125mm (5 inç) çapında tabanlık diskleri ile uyumludur. Taban çapı 130mm, yüzey çapı 150mm'dir." },
      { question: "Kullanım sonrası nasıl temizlenir?", answer: "Ilık su ve hafif sabunla yıkayabilirsiniz. Çamaşır makinesi kullanmayın. Hava kurutması yapın." },
      { question: "Hangi makinelerle kullanılır?", answer: "Rotary ve orbital (DA) polisaj makineleriyle uyumludur." },
    ],
    relations: {
      use_with: ["22.828.251.001", "22.828.261.001", "22.200.400.004", "22.200.400.003"],
      use_after: ["26.900.223.011", "26.900.223.012"],
    },
    cut_level: "Heavy Cut",
    suitable_backing_plate: "Max 125mm",
  },

  // Sarı — Medium Cut
  "26.900.223.011": {
    short_description: "Orta kesim pasta uygulamaları için tasarlanmış, dengeli aşındırma ve parlaklık sunan profesyonel polisaj süngeri. 130mm velcro tabanlı, 150mm yüzey çaplı.",
    how_to_use: `1. Polisaj makinenize 125mm tabanlık takın.
2. Pedi tabanlığa yerleştirin ve düzgün oturduğundan emin olun.
3. Ped yüzeyine orta kesim pasta (Medium Cut Polish 2400, 2500 vb.) damlatın.
4. Makineyi düşük-orta devirde başlatarak ürünü yüzeye yayın.
5. Hafif-orta basınçla panel bazlı çalışın, çapraz geçişlerle uygulayın.
6. Kullanım sonrası pedi ılık suyla yıkayın ve kurutun.`,
    when_to_use: "Kalın pasta sonrası ara kat uygulamalarında, orta düzey çizik gideriminde, tek adım polisaj işlemlerinde kullanılır. Polisaj sürecinin ikinci adımıdır.",
    why_this_product: `• Orta sertlik ile dengeli kesim ve parlaklık
• Güvenlik kenarı destek diskinden kaynaklanan hasarı önler
• Yıkanabilir ve uzun ömürlü tasarım
• Menzerna orta kesim pastalarla optimize edilmiş performans
• Avrupa'da üretilmiş premium kalite`,
    target_surface: "Otomotiv boyası, vernik, tüm boya tipleri",
    subtitle: "İnce aşındırıcı pastalar için premium polisaj süngeri",
    optimised_for: [
      { name: "Medium Cut Polish 2000", name_tr: "Medium Cut Polish 2000" },
      { name: "Medium Cut Polish 2400", name_tr: "Medium Cut Polish 2400" },
      { name: "Medium Cut Polish 2500", name_tr: "Medium Cut Polish 2500" },
      { name: "One-Step Polish 3in1", name_tr: "One-Step Polish 3in1" },
    ],
    downloads: [
      {
        url: "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Dokumente/Technische_Datenblaetter/Zubehoer/EN/TDB_3_Medium_Cut_Foam_Pad_EN_09.2021.pdf",
        size: "117.35 KB",
        label: "Technical datasheet Medium Cut Foam Pad",
      },
    ],
    faq: [
      { question: "Bu ped hangi pastalarla kullanılır?", answer: "Medium Cut Polish 2000, 2400, 2500 ve One Step Polish 3in1 ile optimize edilmiştir." },
      { question: "Hangi tabanlık boyutu gerekir?", answer: "125mm (5 inç) çapında tabanlık diskleri ile uyumludur. Taban çapı 130mm, yüzey çapı 150mm'dir." },
      { question: "Kırmızı ped sonrası kullanılmalı mı?", answer: "Evet, ağır kesim (kırmızı ped) sonrası ara kat olarak kullanılarak kalan çizikleri giderir." },
      { question: "Hangi makinelerle kullanılır?", answer: "Rotary ve orbital (DA) polisaj makineleriyle uyumludur." },
    ],
    relations: {
      use_after: ["26.900.223.010"],
      use_before: ["26.900.223.012"],
    },
    cut_level: "Medium Cut",
    suitable_backing_plate: "Max 125mm",
  },

  // Yeşil — Finish
  "26.900.223.012": {
    short_description: "Hare giderme ve son kat parlaklık için tasarlanmış, yumuşak yapılı profesyonel polisaj süngeri. 130mm velcro tabanlı, 150mm yüzey çaplı.",
    how_to_use: `1. Polisaj makinenize 125mm tabanlık takın.
2. Pedi tabanlığa yerleştirin ve düzgün oturduğundan emin olun.
3. Ped yüzeyine hare giderici cila (Final Finish 3000, 3500, 3800) damlatın.
4. Makineyi düşük-orta devirde başlatarak ürünü yüzeye yayın.
5. Hafif basınçla panel bazlı çalışın, çapraz geçişlerle uygulayın.
6. Kullanım sonrası pedi ılık suyla yıkayın ve kurutun.`,
    when_to_use: "Polisaj sonrası hare ve hologram gideriminde, son kat parlaklık uygulamalarında, koruyucu ürün öncesi yüzey hazırlığında kullanılır. Polisaj sürecinin son adımıdır.",
    why_this_product: `• Yumuşak yapısı ile hare ve hologram bırakmadan parlatır
• Güvenlik kenarı destek diskinden kaynaklanan hasarı önler
• Yıkanabilir ve uzun ömürlü tasarım
• Menzerna cilaları ile optimize edilmiş performans
• Avrupa'da üretilmiş premium kalite`,
    target_surface: "Otomotiv boyası, vernik, tüm boya tipleri, hassas yüzeyler",
    subtitle: "Yüksek parlaklık cilaları için premium polisaj süngeri",
    optimised_for: [
      { name: "Final Finish 3000", name_tr: "Final Finish 3000" },
      { name: "Super Finish 3500", name_tr: "Super Finish 3500" },
      { name: "Super Finish Plus 3800", name_tr: "Super Finish Plus 3800" },
    ],
    downloads: [
      {
        url: "https://www.menzerna.com/fileadmin/ns_theme_menzerna/Dokumente/Technische_Datenblaetter/Zubehoer/EN/TDB_4_Soft_Cut_Foam_Pad_EN_09.2021.pdf",
        size: "119.10 KB",
        label: "Technical datasheet Soft Cut Foam Pad",
      },
    ],
    faq: [
      { question: "Bu ped hangi Menzerna ürünleriyle kullanılır?", answer: "Final Finish 3000, 3500, 3800 ve Power Protect Ultra 2in1 ile kullanım için optimize edilmiştir." },
      { question: "Hare nedir ve nasıl oluşur?", answer: "Hare, polisaj sırasında oluşan ince dairesel çiziklerdir. Sert ped veya agresif pasta kullanımından kaynaklanır ve yumuşak ped ile ince cila ile giderilir." },
      { question: "Kullanım sonrası nasıl temizlenir?", answer: "Ilık su ve hafif sabunla yıkayabilirsiniz. Çamaşır makinesi kullanmayın. Hava kurutması yapın." },
      { question: "Hangi makinelerle kullanılır?", answer: "Rotary ve orbital (DA) polisaj makineleriyle uyumludur." },
    ],
    relations: {
      use_after: ["26.900.223.010", "26.900.223.011"],
      use_with: ["22.611.300.002", "22.611.350.002"],
    },
    cut_level: "Finish",
    suitable_backing_plate: "Max 125mm",
  },
};

// ---------------------------------------------------------------------------
// 1C — Mikrofiber Bez Seti Zenginleştirme
// ---------------------------------------------------------------------------

const mikrofiberEnrichment = {
  short_description: "Polisaj sonrası kalıntı temizliği ve yüzey bakımı için 4 renkli mikrofiber bez seti",
  how_to_use: `1. Her renk bezi farklı işlem aşamasında kullanın:
   - Kırmızı: Kalın pasta (Heavy Cut) kalıntılarını silin
   - Sarı: Ara kat (Medium Cut) işlemleri sonrası temizleyin
   - Yeşil: Hare giderici ve cila (Finish) aşamasında kullanın
   - Mavi: Koruma (Wax/Sealant) uygulaması ve son kontrol
2. Bezi katlayarak temiz yüzeylerini kullanın.
3. Kirlenen bezi değiştirin, aynı bezle devam etmeyin.
4. 40°C'de yıkayın, yumuşatıcı ve ağartıcı kullanmayın.
5. Asarak kurutun, kurutma makinesi kullanmayın.`,
  faq: [
    { question: "Bezler nasıl yıkanır?", answer: "40°C'de çamaşır makinesinde yıkayabilirsiniz. Yumuşatıcı ve ağartıcı kullanmayın. Asarak kurutun, sıkmayın." },
    { question: "Her renk bez ne için kullanılır?", answer: "Kırmızı: kalın pasta kalıntıları, Sarı: orta pasta kalıntıları, Yeşil: cila ve finish aşaması, Mavi: koruma ürünleri ve son kontrol." },
    { question: "Neden 4 farklı renk?", answer: "Renk kodlaması, farklı polisaj aşamalarında çapraz kontaminasyonu önler. Her aşamada temiz ve doğru bezi kullanmanızı sağlar." },
    { question: "Bez boyutları nedir?", answer: "Her bez 40x40cm boyutunda, 320 GSM ağırlığında, kısa tüylü ve hav bırakmayan yapıdadır." },
  ],
};

// ---------------------------------------------------------------------------
// 1B — Tüm Polishing Pad "suitable_backing_plate" eşleştirmesi
// ---------------------------------------------------------------------------

function getSuitableBackingPlate(diameter_mm?: number, base_diameter_mm?: number): string | null {
  if (!diameter_mm) return null;
  if (diameter_mm === 95) return "Max 90mm";
  if (diameter_mm === 150 && base_diameter_mm === 130) return "Max 125mm";
  if (diameter_mm === 150) return "Max 140mm";
  if (diameter_mm === 90) return "Max 75mm";
  if (diameter_mm === 140) return "Max 125mm";
  if (diameter_mm === 165) return "Max 150mm";
  if (diameter_mm === 230) return "Max 210mm";
  return null;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function enrichProducts() {
  console.log("=== Ürün İçerik Zenginleştirme Başlıyor ===\n");

  // 1A — 3 Sünger Ped Zenginleştirme
  console.log("--- 1A: 3 Sünger Ped Zenginleştirme ---");
  for (const [sku, data] of Object.entries(padEnrichments)) {
    const [existing] = await db.select().from(products).where(eq(products.sku, sku));
    if (!existing) {
      console.log(`⚠ SKU ${sku} bulunamadı, atlanıyor.`);
      continue;
    }

    const currentContent = (existing.content as Record<string, unknown>) || {};
    const currentScrape = (currentContent.menzerna_scrape as Record<string, unknown>) || {};
    const currentFields = (existing.template_fields as Record<string, unknown>) || {};

    const updatedContent = {
      ...currentContent,
      short_description: data.short_description,
      how_to_use: data.how_to_use,
      when_to_use: data.when_to_use,
      why_this_product: data.why_this_product,
      target_surface: data.target_surface,
      downloads: data.downloads,
      menzerna_scrape: {
        ...currentScrape,
        subtitle: data.subtitle,
        optimised_for: data.optimised_for,
      },
    };

    const updatedFields = {
      ...currentFields,
      cut_level: data.cut_level,
      suitable_backing_plate: data.suitable_backing_plate,
    } as Record<string, unknown>;

    await db
      .update(products)
      .set({
        content: updatedContent as any,
        template_fields: updatedFields as any,
        relations: data.relations as any,
        faq: data.faq,
      })
      .where(eq(products.sku, sku));

    console.log(`✓ ${sku} zenginleştirildi (${data.cut_level})`);
  }

  // 1C — Mikrofiber Bez Seti Zenginleştirme
  console.log("\n--- 1C: Mikrofiber Bez Seti ---");
  const mikrofiberSku = "26.942.099.001";
  const [mikrofiber] = await db.select().from(products).where(eq(products.sku, mikrofiberSku));
  if (mikrofiber) {
    const currentContent = (mikrofiber.content as Record<string, unknown>) || {};
    const updatedContent = {
      ...currentContent,
      short_description: mikrofiberEnrichment.short_description,
      how_to_use: mikrofiberEnrichment.how_to_use,
    };

    await db
      .update(products)
      .set({
        content: updatedContent as any,
        faq: mikrofiberEnrichment.faq,
      })
      .where(eq(products.sku, mikrofiberSku));

    console.log(`✓ ${mikrofiberSku} zenginleştirildi`);
  } else {
    console.log(`⚠ ${mikrofiberSku} bulunamadı.`);
  }

  // 1B — Tüm Polishing Pad "suitable_backing_plate" Ekleme
  console.log("\n--- 1B: Tüm Polishing Pad Tabanlık Bilgisi ---");
  const allPads = await db
    .select()
    .from(products)
    .where(eq(products.template_group, "polishing_pad"));

  for (const pad of allPads) {
    const tf = (pad.template_fields as Record<string, unknown>) || {};
    const diameter = tf.diameter_mm as number | undefined;
    const baseDiameter = tf.base_diameter_mm as number | undefined;

    // 1A'da zaten güncellenen ürünleri atla
    if (padEnrichments[pad.sku]) continue;

    const backing = getSuitableBackingPlate(diameter, baseDiameter);
    if (backing && tf.suitable_backing_plate !== backing) {
      const updatedFields = {
        ...tf,
        suitable_backing_plate: backing,
      };

      await db
        .update(products)
        .set({ template_fields: updatedFields as any })
        .where(eq(products.sku, pad.sku));

      console.log(`✓ ${pad.sku} → ${backing} (${diameter}mm)`);
    } else if (!backing) {
      console.log(`⚠ ${pad.sku} — tabanlık eşleştirilemedi (diameter: ${diameter}mm)`);
    } else {
      console.log(`- ${pad.sku} zaten güncel`);
    }
  }

  console.log("\n=== Tamamlandı! ===");
}

enrichProducts().catch(console.error);
