# Menzerna Türkiye — Implementasyon Planı

Tarih: 2026-03-03
Referans: 2026-03-03-nextjs-migration-design.md

---

## FAZ 0: Hazırlık & Altyapı Kurulumu

### 0.1 — Vercel CLI Kurulumu & Proje Bağlama
- `npm i -g vercel` ile CLI kur
- `vercel login` ile hesaba bağlan
- `vercel link` ile mevcut GitHub reposunu Vercel projesine bağla
- Vercel dashboard'dan Vercel Postgres oluştur
- Environment variable'ları ayarla (POSTGRES_URL, ADMIN_PASSWORD, RESEND_API_KEY)

### 0.2 — Next.js Projesi Oluşturma
- Yeni bir Next.js 15 projesi scaffold et (App Router, TypeScript, Tailwind CSS v4)
- Mevcut projenin kök dizininde `next.config.ts` oluştur
- `package.json` güncelle: Next.js bağımlılıkları ekle, gereksizleri kaldır
- `tsconfig.json` Next.js uyumlu hale getir
- `.gitignore` güncelle (.next, .vercel)
- Mevcut shadcn/ui bileşenlerini `components/ui/` altına taşı

### 0.3 — DB Şema & Seed
- Drizzle şemasını güncelle: `page_contents` ve `site_settings` tablolarını ekle
- Vercel Postgres bağlantısını kur (`@vercel/postgres` + drizzle)
- `drizzle-kit push` ile şemayı Vercel Postgres'e uygula
- Seed script yaz: `products.json` ve `contact_messages.json` verilerini DB'ye yükle
- Seed script'i çalıştır ve verileri doğrula

---

## FAZ 1: Temel Altyapı (Layout + Renk + Font)

### 1.1 — Global CSS & Renk Sistemi
- `app/globals.css` oluştur: Menzerna renk paletini CSS custom properties olarak tanımla
- `#e3000f` (red), `#002b3d` (navy), `#001f2c` (dark), `#f8f9fa` (light)
- Tailwind theme'e Menzerna renkleri ekle
- Font: Source Sans Pro (Google Fonts veya next/font ile)
- `--radius: 0` sharp corners koru

### 1.2 — Root Layout (Header + Footer)
- `app/layout.tsx`: HTML yapısı, metadata, font yükleme
- **Header bileşeni** (2 satır):
  - Üst bar: İletişim linki, Yetkili Satıcı Bul (harici link)
  - Alt bar: Logo (sol) + Mega menü (Kurumsal▾, Ürünler, Araç Bakım, Endüstriyel, Marin)
  - Kurumsal dropdown: Hakkımızda, Eğitim Programı, SSS
  - Mobil: Hamburger menü, akordeon yapısı
  - Sticky, scroll'da kompakt
- **Footer bileşeni**:
  - 4 kolon: Marka + Ürünler + Hızlı Linkler + İletişim
  - Sosyal medya ikonları (Facebook, Instagram, LinkedIn, YouTube)
  - Alt bar: Telif hakkı

### 1.3 — Ortak Bileşenler
- `components/product-card.tsx` — menzerna.com tarzı sade kart (görsel + isim)
- `components/product-360-viewer.tsx` — mevcut bileşeni client component olarak taşı
- `components/category-banner.tsx` — kategori sayfaları için banner
- `components/contact-form.tsx` — client component (form state)

---

## FAZ 2: Sayfa Migrasyonu & Yeni Tasarım

### 2.1 — Ana Sayfa (`app/page.tsx`)
- Hero slider (embla-carousel, client component) — daha dar, iyi görseller
- Features grid — büyük logolar ve text
- Hakkımızda teaser
- Kategori kartları (Araç Bakım, Endüstriyel, Marin)
- İstatistikler (1888, 150+, 50+, 70+)
- Haberler bölümü
- Sosyal medya linkleri
- Alt başlıklar

### 2.2 — Kurumsal: Hakkımızda (`app/kurumsal/hakkimizda/page.tsx`)
- Banner görseli
- 1888'den bugüne Menzerna tarihçesi (menzerna.com/company referans)
- MG Polisaj Türkiye distribütör bilgisi
- Değerler: İnovasyon, Yetkinlik, Adillik, Mükemmellik, Sorumluluk
- Alt bölüm: Özel tasarım (kullanıcının istediği format)

### 2.3 — Kurumsal: Eğitim Programı (`app/kurumsal/egitim/page.tsx`)
- Eğitim içerikleri ve fotoğraflar
- Ankara semineri YouTube video embed
- Fiyat/bilgi için CTA (iletişim formuna yönlendirme)

### 2.4 — Kurumsal: SSS (`app/kurumsal/sss/page.tsx`)
- FAQ sayfası, akordeon yapısında
- İçerik: DB'den (page_contents tablosu, admin'den düzenlenebilir)
- ISR ile güncel tutma

### 2.5 — Ürünler Listesi (`app/urunler/page.tsx`)
- Sol sidebar: Yeni hiyerarşi
  - Polisaj Ürünleri > Pasta Cila > (Heavy Cut, Medium Cut, Finish, Protection, Metal)
  - Aksesuarlar > (Sünger Pad, Yün Pad, Taban)
  - Endüstriyel
  - Marin
- Sağ: Ürün grid (sade kartlar)
- Arama
- ISR

### 2.6 — Ürün Detay (`app/urunler/[sku]/page.tsx`)
- Görsel galerisi (MTS Kimya görselleri)
- Ürün adı, kısa açıklama
- Cut/Gloss barları
- Özellik badge'leri (Silikon+Dolgu birleşik, VOC kaldır)
- Uygun Makine (isim değişikliği)
- Sekmeler: Açıklama, Uygulama Adımları (yukarı taşı), Dokümanlar (TDS), SSS
- Sünger taban çapı bilgisi
- İlgili ürünler
- ISR ile generateStaticParams

### 2.7 — Araç Bakım (`app/arac-bakim/page.tsx`)
- Alt menüsüz, tek sayfa
- menzerna.com/car-care/car-polish/products tarzı layout
- Kategorilere göre bölümlü ürün grid (Heavy Cut, Medium Cut, Finish, Protection)
- Küçük ürün kartları
- Aksesuarlar bölümü altta
- Arka plan ürün görseli
- İletişim formuna yönlendirme CTA

### 2.8 — Endüstriyel (`app/endustriyel/page.tsx`)
- Alt menüsüz, tek sayfa
- menzerna.com/industrial tarzı
- Endüstriyel alanlar vitrini (sektör kartları)
- Broşür indirme linkleri
- Video embed
- Küçük ürün kartları
- İletişim formu CTA

### 2.9 — Marin (`app/marin/page.tsx`)
- Alt menüsüz, tek sayfa
- menzerna.com/boat-care tarzı
- Üstte video
- Sadece P200 ve One Step Polish ürünleri
- İletişim formu CTA

### 2.10 — İletişim (`app/iletisim/page.tsx`)
- Firma bilgileri alanı
- Google Maps embed (tıklanabilir)
- Sabit telefon (cep yerine)
- Satış e-postası kaldır
- Çalışma saatleri güncelle
- Form: Server Action ile DB'ye kaydet + e-posta gönder

---

## FAZ 3: Admin Paneli

### 3.1 — Admin Auth
- Basit JWT tabanlı auth (tek kullanıcı)
- Şifre: ADMIN_PASSWORD env variable
- Login sayfası, middleware ile koruma
- HttpOnly cookie ile oturum

### 3.2 — Ürün Yönetimi
- Ürün listesi (tablo + arama)
- Ürün ekleme/düzenleme formu (tüm alanlar)
- Ürün silme (onay dialogu)
- Görsel yükleme (Vercel Blob)
- Kaydet → DB güncelle → revalidate çağır

### 3.3 — Sayfa İçerik Yönetimi
- Sayfa listesi (Hakkımızda, Eğitim, SSS, vs.)
- Basit zengin metin editörü
- Görsel ekleme
- Kaydet → revalidate

### 3.4 — Site Ayarları
- Telefon, adres, e-posta
- Sosyal medya linkleri
- Çalışma saatleri
- Key-value düzenleme

### 3.5 — Görsel Yönetimi
- Vercel Blob'a yükleme
- Galeri görünümü
- Silme, URL kopyalama

---

## FAZ 4: Deploy & Optimizasyon

### 4.1 — Vercel Deploy
- `vercel deploy` ile production deploy
- Environment variables kontrol
- Build başarılı olduğunu doğrula

### 4.2 — Domain Bağlama
- Vercel dashboard'dan custom domain ekle
- metunic'ten DNS ayarlarını güncelle (CNAME veya Nameserver)
- SSL otomatik (Vercel)

### 4.3 — SEO & Metadata
- Her sayfa için title, description, og:image
- sitemap.xml (next-sitemap veya App Router metadata)
- robots.txt
- Structured data (Organization, Product)

### 4.4 — Performans
- next/image ile görsel optimizasyon
- Lighthouse audit
- Core Web Vitals kontrol
- Font optimizasyon (next/font)

### 4.5 — E-posta Entegrasyonu
- Resend (veya benzeri) ile iletişim formu e-posta bildirimi
- E-posta template'i

---

## Alt Görev Dağılımı (Subagent-Driven)

### Paralel Çalışabilecek Gruplar:

**Grup A (Altyapı):**
- 0.2 Next.js scaffold
- 0.3 DB şema + seed
- 1.1 CSS + renk sistemi

**Grup B (Layout — A'ya bağımlı):**
- 1.2 Header + Footer
- 1.3 Ortak bileşenler

**Grup C (Sayfalar — B'ye bağımlı, kendi içinde paralel):**
- C1: 2.1 Ana Sayfa + 2.7 Araç Bakım + 2.8 Endüstriyel + 2.9 Marin
- C2: 2.2 Hakkımızda + 2.3 Eğitim + 2.4 SSS
- C3: 2.5 Ürünler + 2.6 Ürün Detay
- C4: 2.10 İletişim

**Grup D (Admin — C'ye bağımlı):**
- 3.1 Auth + 3.2 Ürün CRUD + 3.3 Sayfa CRUD + 3.4 Ayarlar + 3.5 Medya

**Grup E (Final — D'ye bağımlı):**
- 4.1 Deploy + 4.2 Domain + 4.3 SEO + 4.4 Performans + 4.5 E-posta
