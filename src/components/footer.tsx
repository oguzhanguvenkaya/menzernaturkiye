import Link from "next/link";
import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=38.44825331666087,27.266172766685486&markers=38.44825331666087,27.266172766685486";

export function Footer() {
  return (
    <footer className="mt-auto">
      {/* Red top border */}
      <div className="border-t-4 border-[#af1d1f]" />

      {/* Main footer */}
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {/* Column 1 — Logo + Adres + Sosyal Medya */}
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-6">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
                <img
                  src="/logo.svg"
                  alt="Menzerna"
                  className="h-10 w-auto shrink-0"
                />
                <div className="w-px h-7 bg-gray-300 shrink-0" />
                <span className="text-[13px] font-semibold text-[#1d1d1d] tracking-wide uppercase leading-tight">
                  Türkiye<br />Distribütörü
                </span>
              </Link>
              <p className="text-base text-gray-600 font-medium mb-1">
                MG Polisaj Otomotiv İth. İhr. A.Ş.
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-gray-500 leading-relaxed hover:text-[#af1d1f] transition-colors block mb-5"
              >
                Ümit Mh. 1411/7 Sk. No: 4/I
                <br />
                35060 Bornova / İZMİR
              </a>

              {/* Sosyal medya — tek sıra */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/menzernatr/?locale=tr_TR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-[#af1d1f] hover:border-[#af1d1f] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.instagram.com/menzernaturkiye/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-[#af1d1f] hover:border-[#af1d1f] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/mg-polishing/?originalSubdomain=tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-[#af1d1f] hover:border-[#af1d1f] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-[18px] h-[18px]" />
                </a>
                <a
                  href="https://www.youtube.com/@mgpolishing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 text-gray-400 hover:text-[#af1d1f] hover:border-[#af1d1f] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-[18px] h-[18px]" />
                </a>
              </div>
            </div>

            {/* Column 2 — Ürünler */}
            <div>
              <h5 className="font-black text-[#1d1d1d] text-lg mb-4">
                Ürünler
              </h5>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/arac-bakim"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Araç Bakım
                  </Link>
                </li>
                <li>
                  <Link
                    href="/endustriyel"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Endüstriyel
                  </Link>
                </li>
                <li>
                  <Link
                    href="/marin"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Marin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 — Hızlı Erişim */}
            <div>
              <h5 className="font-black text-[#1d1d1d] text-lg mb-4">
                Hızlı Erişim
              </h5>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/urunler"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Tüm Ürünler
                  </Link>
                </li>
                <li>
                  <a
                    href="https://mgpolishing.com/yetkili-saticilar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Yetkili Satıcılar
                  </a>
                </li>
                <li>
                  <Link
                    href="/iletisim"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 — Kurumsal */}
            <div>
              <h5 className="font-black text-[#1d1d1d] text-lg mb-4">
                Kurumsal
              </h5>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    href="/kurumsal/hakkimizda"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kurumsal/egitim"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    Eğitim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/kurumsal/sss"
                    className="text-base text-gray-500 hover:text-[#af1d1f] transition-colors"
                  >
                    SSS
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[#494949] py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-base text-white">
          <div className="flex items-center gap-2">
            <Link
              href="/iletisim"
              className="hover:text-gray-300 transition-colors"
            >
              İletişim
            </Link>
            <span>|</span>
            <Link
              href="/gizlilik-politikasi"
              className="hover:text-gray-300 transition-colors"
            >
              Gizlilik Politikası
            </Link>
            <span>|</span>
            <Link
              href="/kullanim-kosullari"
              className="hover:text-gray-300 transition-colors"
            >
              Kullanım Koşulları
            </Link>
          </div>
          <span className="text-white/80">
            &copy; 2026 MG Polisaj. Tüm hakları saklıdır.
          </span>
        </div>
      </div>
    </footer>
  );
}
