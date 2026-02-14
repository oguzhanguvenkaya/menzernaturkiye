import pg from "pg";
import { menzernaUrlMap, getUrlKeyForProduct } from "./menzerna-url-map.js";
import { writeFileSync } from "fs";

const nameTranslations: Record<string, string> = {
  "Premium Lambswool Pad": "Premium Kuzu Yünü Polisaj Keçesi",
  "Crater Shaped Lambswool Pad": "Krater Kuzu Yünü Polisaj Keçesi",
  "Double Sided Lambswool Pad": "Çift Taraflı Kuzu Yünü Polisaj Keçesi",
  "Orbital Wool Pad": "Orbital Kuzu Yünü Polisaj Keçesi",
  "Heavy Cut Foam Pad": "Ağır Kesim Pasta Süngeri",
  "Medium Cut Foam Pad": "Orta Kesim Pasta Süngeri",
  "Soft Cut Foam Pad": "İnce Kesim Cila Süngeri",
  "Wax Foam Pad": "Wax/Cila Süngeri",
  "Standard Medium Pad": "Standart Orta Sertlik Süngeri",
  "Premium Backing Plate": "Premium Destek Tabanı",
  "Premium Microfiber Cloth": "Premium Mikrofiber Bez",
  "Metal Polish": "Metal Parlatıcı",
};

const stepTranslations: Record<string, string> = {
  "Heavy Cut": "Ağır Kesim",
  "Medium Cut": "Orta Kesim",
  "Finish": "Cila/Parlatma",
  "Protection": "Koruma",
};

const subtitleTranslations: Record<string, string> = {
  "An innovative automotive polish that removes scratches and creates gloss in a single step":
    "Tek adımda çizikleri giderir ve parlaklık oluşturan yenilikçi bir otomotiv cilası",
  "The abrasive polish for removal of deep scratches, sanding marks and heavy weathering":
    "Derin çizikleri, zımpara izlerini ve ağır hava koşullarından kaynaklanan hasarları gidermek için aşındırıcı pasta",
  "In one step to a perfect finish – without any holograms!":
    "Tek adımda mükemmel bir yüzeye – hologram olmadan!",
  "The fine polish for the perfect finish":
    "Mükemmel sonuç için ince cila",
  "The ultra-fine polish for the highest-quality gloss finish":
    "En yüksek kalitede parlaklık için ultra ince cila",
  "For a brilliant finish and long-lasting paint protection":
    "Parlak sonuç ve uzun süreli boya koruması için",
  "Effective long-lasting paint protection and water beading effect":
    "Etkili uzun süreli boya koruması ve su kaydırma etkisi",
  "The polish for cutting, finishing and protecting in one step":
    "Tek adımda kesme, cila ve koruma sağlayan pasta",
  "The heavy-cutting polish for the toughest sanding marks on automotive clear coats":
    "Otomotiv şeffaf katlarındaki en zorlu zımpara izleri için ağır kesim pastası",
  "High Performance Compound":
    "Yüksek Performanslı Pasta",
  "The world's first sustainable automotive polish":
    "Dünyanın ilk sürdürülebilir otomotiv cilası",
  "Long-lasting sealant with ceramic technology":
    "Seramik teknolojili uzun süreli koruma",
  "For the maintenance of all polished surfaces":
    "Tüm cilalı yüzeylerin bakımı için",
  "Quick care for in between":
    "Ara bakım için hızlı bakım",
  "The gentle one-step polish for gelcoat surfaces":
    "Jelkot yüzeyler için nazik tek adımlı cila",
};

const descriptionTranslations: Record<string, string> = {
  "The professional polish for automotive clear coats – with a new and improved formula – always leaves a glistening impression. As the detailers' favorite polish, it eliminates sanding marks in record time, quickly removes scratches on the car, and generates gloss all the way to the finish. Thanks to cutting-edge polishing technology with diminishing abrasives.":
    "Otomotiv şeffaf katları için profesyonel pasta – yeni ve geliştirilmiş formülü ile – her zaman pırıl pırıl bir izlenim bırakır. Detaycıların favori pastası olarak, rekor sürede zımpara izlerini giderir, araçtaki çizikleri hızla temizler ve cilaya kadar parlaklık oluşturur. Azalan aşındırıcılarla son teknoloji polisaj teknolojisi sayesinde.",
};

const benefitTranslations: Record<string, string> = {
  "Improved formula": "Geliştirilmiş formül",
  "Polishes and generates gloss in a single step": "Tek adımda parlatır ve parlaklık oluşturur",
  "Saves time thanks to single-stage working (cut to finish)": "Tek aşamalı çalışma sayesinde zaman kazandırır (kesimden cilaya)",
  "Speedy removal of deep car paint scratches": "Derin araba boyası çiziklerinin hızlı giderimi",
  "Easy to wipe away": "Kolayca silinebilir",
  "Highly effective": "Son derece etkili",
  "Outstanding gloss": "Olağanüstü parlaklık",
  "Silicone-free": "Silikonsuz",
  "No buildup of dust": "Toz birikmesi yok",
  "Filler-free": "Dolgu maddesiz",
  "VOC-free": "VOC içermez",
  "Very easy to wipe off": "Çok kolay silinir",
  "High gloss finish": "Yüksek parlaklık cilası",
  "Hologram-free finish": "Hologramsız yüzey",
  "Perfect for dark paints": "Koyu renkli boyalar için mükemmel",
  "Maximum gloss": "Maksimum parlaklık",
  "Deep shine": "Derin parlaklık",
  "UV protection": "UV koruması",
  "Water beading effect": "Su kaydırma etkisi",
  "Long-lasting protection": "Uzun süreli koruma",
  "Easy application": "Kolay uygulama",
  "Ceramic technology": "Seramik teknolojisi",
  "Removes scratches quickly": "Çizikleri hızla giderir",
  "High cutting power": "Yüksek kesme gücü",
  "No holograms": "Hologram yok",
  "Dust-free working": "Tozsuz çalışma",
  "Quick and easy application": "Hızlı ve kolay uygulama",
  "Suitable for all paint types": "Tüm boya tipleri için uygun",
  "Can be used with rotary and orbital polishing machines": "Rotary ve orbital polisaj makineleri ile kullanılabilir",
  "Extreme cutting power": "Aşırı kesme gücü",
  "Very fast removal of sanding marks": "Zımpara izlerinin çok hızlı giderimi",
  "Very high gloss": "Çok yüksek parlaklık",
  "Sustainable formula": "Sürdürülebilir formül",
  "GREEN LINE": "YEŞİL SERİ",
  "Made from renewable raw materials": "Yenilenebilir ham maddelerden üretilmiştir",
  "CO₂-reduced production": "CO₂ azaltılmış üretim",
  "Biodegradable": "Biyolojik olarak parçalanabilir",
};

const usageTranslations: Record<string, string> = {
  "Clean the surface thoroughly.": "Yüzeyi iyice temizleyin.",
  "Shake the bottle and apply the polish to the polishing pad.": "Şişeyi çalkalayın ve pastayı polisaj süngeri/keçesine uygulayın.",
  "Use either a rotary or an orbital polishing machine and use the cross-coating method. Start by polishing at a low rotational speed while exerting strong pressure.":
    "Rotary veya orbital polisaj makinesi kullanın ve çapraz kaplama yöntemini uygulayın. Güçlü baskı yaparak düşük devir hızında polisaja başlayın.",
  "Take away the pressure in the final cycles and increase the speed of the polishing machine.":
    "Son turlarda baskıyı azaltın ve polisaj makinesinin hızını artırın.",
  "At first, the polish will seem a little milky and should be worked in until only a slightly transparent/oily film is visible.":
    "Başlangıçta pasta biraz sütümsü görünecek ve yalnızca hafif şeffaf/yağlı bir film görünene kadar çalışılmalıdır.",
  "Once you have finished polishing, remove any residue with the Premium microfiber cloth.":
    "Polisajı bitirdikten sonra kalan kalıntıları Premium mikrofiber bez ile temizleyin.",
  "Depending on the demands of the surface, a second stage may be performed. Here, you have the option of reapplying Menzerna HCC 400 or using a Menzerna Finish polish.":
    "Yüzeyin durumuna bağlı olarak ikinci bir aşama uygulanabilir. Burada Menzerna HCC 400'ü yeniden uygulama veya Menzerna Finish cilası kullanma seçeneğiniz vardır.",
};

function normalizeChars(s: string): string {
  return s
    .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
    .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u00A0/g, " ")
    .trim();
}

function translateText(text: string, dict: Record<string, string>): string {
  const trimmed = text.trim();
  if (dict[trimmed]) return dict[trimmed];
  const normalized = normalizeChars(trimmed);
  for (const [en, tr] of Object.entries(dict)) {
    if (normalized.toLowerCase() === normalizeChars(en).toLowerCase()) return tr;
  }
  return trimmed;
}

function translateBenefit(text: string): string {
  return translateText(text, benefitTranslations);
}

function translateUsage(text: string): string {
  return translateText(text, usageTranslations);
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#039;/g, "'").replace(/&quot;/g, '"').trim();
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractSubtitle(html: string): { en: string; tr: string } {
  const match = html.match(/<h2>([^<]+)<\/h2>/);
  if (!match) return { en: "", tr: "" };
  const en = stripHtml(match[1]).trim();
  const tr = translateText(en, subtitleTranslations);
  return { en, tr };
}

function extractDescription(html: string): { en: string; tr: string } {
  const introMatch = html.match(/product-detail-intro[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (!introMatch) return { en: "", tr: "" };
  const introHtml = introMatch[0];
  const pMatch = introHtml.match(/<p>([\s\S]*?)<\/p>/);
  if (!pMatch) return { en: "", tr: "" };
  const en = stripHtml(pMatch[1]).trim();
  const tr = translateText(en, descriptionTranslations);
  return { en, tr };
}

function extractProcessing(html: string): any {
  const procMatch = html.match(/<h3>Processing<\/h3>\s*([\s\S]*?)(?=<\/div>)/);
  if (!procMatch) return null;
  const procHtml = procMatch[1];

  const result: any = {};

  const rotaryMatch = procHtml.match(/<strong>Rotary:?\s*<\/strong>[\s\S]*?(?=<li>|<\/ul>)/i);
  if (rotaryMatch) {
    const rotaryText = stripHtml(rotaryMatch[0]);
    const startMatch = rotaryText.match(/(?:At the start|start)[:\s]*([0-9,.\-–\s]+rpm)/i);
    const endMatch = rotaryText.match(/(?:Towards the end|end)[:\s]*([0-9,.\-–\s]+rpm)/i);
    result.rotary = {
      start: startMatch ? startMatch[1].trim() : "",
      end: endMatch ? endMatch[1].trim() : "",
    };
  }

  const orbitalMatch = procHtml.match(/<strong>Orbital:?\s*<\/strong>[\s\S]*?(?=<\/li>|<\/ul>)/i);
  if (orbitalMatch) {
    const orbitalText = stripHtml(orbitalMatch[0]).replace(/Orbital:?\s*/i, "").trim();
    result.orbital = orbitalText;
  }

  return Object.keys(result).length > 0 ? result : null;
}

function extractSteps(html: string): any[] {
  const stepsSection = html.match(/product-detail-steps[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/);
  if (!stepsSection) return [];

  const steps: any[] = [];
  const stepRegex = /product-detail-step\s+(active|half-active|)"\s*>[\s\S]*?<strong>(Step \d+)<\/strong>[\s\S]*?<span>([^<]+)<\/span>/g;
  let m;
  while ((m = stepRegex.exec(stepsSection[0])) !== null) {
    const status = m[1].trim();
    const stepNum = parseInt(m[2].replace("Step ", ""));
    const label = m[3].trim();
    steps.push({
      number: stepNum,
      label,
      label_tr: stepTranslations[label] || label,
      isActive: status === "active",
      isHalfActive: status === "half-active",
    });
  }
  return steps;
}

function extractOptimisedFor(html: string): any[] {
  const section = html.match(/Optimised for[\s\S]*?realtive-product-blocks([\s\S]*?)<\/div>\s*<\/div>/);
  if (!section) return [];

  const items: any[] = [];
  const blockRegex = /product-teaser"\s+href="([^"]+)"[\s\S]*?product-teaser__content[\s\S]*?<p>([^<]+)<\/p>/g;
  let m;
  while ((m = blockRegex.exec(section[0])) !== null) {
    const url = m[1].startsWith("http") ? m[1] : `https://www.menzerna.com${m[1]}`;
    const name = m[2].trim();
    items.push({
      name,
      name_tr: nameTranslations[name] || name,
      url,
    });
  }
  return items;
}

function extractBenefits(html: string): { en: string[]; tr: string[] } {
  const benefitsMatch = html.match(/data-tab-content="tab-\d+">\s*<div class="tab-item-responsive"[^>]*>Benefits<\/div>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/);
  if (!benefitsMatch) return { en: [], tr: [] };

  const en: string[] = [];
  const liRegex = /<li>([^<]+)<\/li>/g;
  let m;
  while ((m = liRegex.exec(benefitsMatch[0])) !== null) {
    en.push(stripHtml(m[1]).trim());
  }
  return {
    en,
    tr: en.map((b) => translateBenefit(b)),
  };
}

function extractRecommendedUsage(html: string): { en: string[]; tr: string[] } {
  const usageMatch = html.match(/data-tab-content="tab-\d+">\s*<div class="tab-item-responsive"[^>]*>Recommended usage<\/div>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/);
  if (!usageMatch) return { en: [], tr: [] };

  const en: string[] = [];
  const liRegex = /<li>([\s\S]*?)<\/li>/g;
  let m;
  while ((m = liRegex.exec(usageMatch[0])) !== null) {
    const text = stripHtml(m[1]).trim();
    if (text && !text.startsWith("You can find")) {
      en.push(text);
    }
  }
  return {
    en,
    tr: en.map((u) => translateUsage(u)),
  };
}

function parseProductPage(html: string): any {
  const subtitle = extractSubtitle(html);
  const description = extractDescription(html);
  const processing = extractProcessing(html);
  const steps = extractSteps(html);
  const optimisedFor = extractOptimisedFor(html);
  const benefits = extractBenefits(html);
  const recommendedUsage = extractRecommendedUsage(html);

  return {
    description_subtitle: subtitle.tr,
    description_subtitle_en: subtitle.en,
    description_text: description.tr,
    description_text_en: description.en,
    processing,
    steps,
    optimised_for: optimisedFor,
    benefits: benefits.tr,
    benefits_en: benefits.en,
    recommended_usage: recommendedUsage.tr,
    recommended_usage_en: recommendedUsage.en,
  };
}

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

  try {
    console.log("Fetching products from database...");
    const { rows: products } = await pool.query("SELECT id, sku, product_name FROM products");
    console.log(`Found ${products.length} products in database`);

    const urlKeyProducts: Map<string, { urlKey: string; url: string; products: any[] }> = new Map();

    for (const product of products) {
      const urlKey = getUrlKeyForProduct(product.product_name, product.sku);
      if (!urlKey) {
        console.log(`  ⚠ No URL mapping for: ${product.product_name} (${product.sku})`);
        continue;
      }
      const mapping = menzernaUrlMap[urlKey];
      if (!mapping) {
        console.log(`  ⚠ URL key "${urlKey}" not found in map for: ${product.product_name}`);
        continue;
      }

      if (!urlKeyProducts.has(urlKey)) {
        urlKeyProducts.set(urlKey, { urlKey, url: mapping.url, products: [] });
      }
      urlKeyProducts.get(urlKey)!.products.push(product);
    }

    const uniqueUrls = new Map<string, string[]>();
    for (const [urlKey, data] of urlKeyProducts) {
      const url = data.url;
      if (!uniqueUrls.has(url)) {
        uniqueUrls.set(url, []);
      }
      uniqueUrls.get(url)!.push(urlKey);
    }

    console.log(`\nFound ${urlKeyProducts.size} URL keys mapping to ${uniqueUrls.size} unique URLs\n`);

    const result: Record<string, any> = {};
    let fetchCount = 0;

    for (const [url, urlKeys] of uniqueUrls) {
      fetchCount++;
      console.log(`[${fetchCount}/${uniqueUrls.size}] Fetching: ${url}`);

      try {
        const response = await fetch(url, {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; MenzernaBot/1.0)",
            "Accept": "text/html",
            "Accept-Language": "en-US,en;q=0.9",
          },
        });

        if (!response.ok) {
          console.warn(`  ⚠ HTTP ${response.status} for ${url}, skipping`);
          continue;
        }

        const html = await response.text();
        const parsed = parseProductPage(html);

        for (const urlKey of urlKeys) {
          result[urlKey] = {
            url,
            ...parsed,
          };
        }

        console.log(`  ✓ Parsed successfully (${urlKeys.join(", ")})`);
      } catch (err: any) {
        console.warn(`  ⚠ Error fetching ${url}: ${err.message}`);
      }

      if (fetchCount < uniqueUrls.size) {
        await delay(1000);
      }
    }

    const outputPath = "scripts/scraped-menzerna-data.json";
    writeFileSync(outputPath, JSON.stringify(result, null, 2), "utf-8");
    console.log(`\n✓ Saved scraped data to ${outputPath}`);
    console.log(`  Total entries: ${Object.keys(result).length}`);

    await pool.end();
  } catch (err) {
    console.error("Fatal error:", err);
    await pool.end();
    process.exit(1);
  }
}

main();
