# Menzerna Türkiye — Next.js + Vercel Geçiş Tasarımı

Tarih: 2026-03-03

## Mimari

- **Framework**: Next.js 15 (App Router, Server Components, Server Actions)
- **Deploy**: Vercel (Edge CDN + Serverless Functions)
- **DB**: Vercel Postgres (Neon altyapı)
- **ORM**: Drizzle ORM (korunuyor)
- **Görsel**: Vercel Blob Storage (admin upload) + next/image optimizasyon
- **UI**: shadcn/ui + Tailwind CSS + Radix + lucide-react (korunuyor)
- **Carousel**: embla-carousel (client component)
- **Animasyon**: framer-motion (client component)

## Renk Paleti

| Token | Hex | Kullanım |
|-------|-----|----------|
| menzerna-red | #e3000f | Ana kırmızı, CTA, vurgular |
| menzerna-navy | #002b3d | Başlıklar, header, koyu alanlar |
| menzerna-dark | #001f2c | Footer |
| menzerna-light | #f8f9fa | Açık arka planlar |
| menzerna-green | #009b77 | Gloss bar |
| menzerna-amber | #f5a623 | Aksan |

## DB Şeması

Mevcut tablolar korunur + 2 yeni tablo:

- `products` — 58 ürün (mevcut JSON'dan seed)
- `contact_messages` — form mesajları
- `page_contents` — YENİ: sayfa içerikleri (slug, section, title, body, image_url)
- `site_settings` — YENİ: genel ayarlar (key-value: telefon, adres, sosyal medya)

## Sayfa Yapısı

```
app/
├── layout.tsx                  ← 2-satır header + footer
├── page.tsx                    ← Ana Sayfa (SSG)
├── globals.css
├── kurumsal/
│   ├── hakkimizda/page.tsx     ← SSG
│   ├── egitim/page.tsx         ← SSG
│   └── sss/page.tsx            ← ISR
├── urunler/
│   ├── page.tsx                ← ISR
│   └── [sku]/page.tsx          ← ISR
├── arac-bakim/page.tsx         ← SSG
├── endustriyel/page.tsx        ← SSG
├── marin/page.tsx              ← SSG
├── iletisim/page.tsx           ← SSG + Server Action
├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── urunler/
│   ├── sayfalar/page.tsx
│   └── medya/page.tsx
└── api/
    ├── contact/route.ts
    └── revalidate/route.ts
```

## Kaldırılan Bağımlılıklar

- wouter → Next.js routing
- TanStack Query → Server Components
- Express → API Routes + Server Actions
- express-session, connect-pg-simple, memorystore → JWT
- @replit/* plugins → kaldır
- ws → gereksiz

## Geçiş Stratejisi

Faz 0: Hazırlık (Vercel + DB setup + Next.js scaffold)
Faz 1: Altyapı (Layout, renk, DB bağlantı, seed)
Faz 2: Sayfa migrasyonu (tüm sayfalar yeni tasarımla)
Faz 3: Admin paneli
Faz 4: Deploy, domain, SEO, performans
