import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Menzerna Türkiye | Profesyonel Polisaj Ürünleri",
    template: "%s | Menzerna Türkiye",
  },
  description:
    "Menzerna'nın Türkiye yetkili distribütörü MG Polisaj. 1888'den bu yana profesyonel araç bakım, endüstriyel polisaj ve marin bakım ürünleri.",
  keywords: [
    "menzerna",
    "polisaj",
    "pasta",
    "cila",
    "araç bakım",
    "endüstriyel polisaj",
    "marin bakım",
    "mg polisaj",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={sourceSans.variable}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
