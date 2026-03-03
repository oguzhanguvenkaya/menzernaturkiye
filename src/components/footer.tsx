import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#001f2c] text-gray-400 mt-auto">
      {/* Kırmızı üst çizgi */}
      <div className="h-1 bg-[#e3000f]" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Marka */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-white tracking-tight uppercase">
                Menzerna<span className="text-[#e3000f]">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              1888&apos;den bu yana polisaj mükemmelliği. Menzerna&apos;nın
              Türkiye yetkili distribütörü MG Polisaj.
            </p>
            {/* Sosyal medya */}
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com/mgpolisaj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#e3000f] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/mgpolisaj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#e3000f] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#e3000f] hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#e3000f] hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Ürünler */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Ürünler
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/arac-bakim"
                  className="text-sm hover:text-white transition-colors"
                >
                  Araç Bakım
                </Link>
              </li>
              <li>
                <Link
                  href="/endustriyel"
                  className="text-sm hover:text-white transition-colors"
                >
                  Endüstriyel Polisaj
                </Link>
              </li>
              <li>
                <Link
                  href="/marin"
                  className="text-sm hover:text-white transition-colors"
                >
                  Marin
                </Link>
              </li>
              <li>
                <Link
                  href="/urunler"
                  className="text-sm hover:text-white transition-colors"
                >
                  Tüm Ürünler
                </Link>
              </li>
            </ul>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              Kurumsal
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/kurumsal/hakkimizda"
                  className="text-sm hover:text-white transition-colors"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/kurumsal/egitim"
                  className="text-sm hover:text-white transition-colors"
                >
                  Eğitim Programı
                </Link>
              </li>
              <li>
                <Link
                  href="/kurumsal/sss"
                  className="text-sm hover:text-white transition-colors"
                >
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <a
                  href="https://mgpolishing.com/yetkili-saticilar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Yetkili Satıcılar
                </a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">
              İletişim
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-[#e3000f] shrink-0" />
                <span>+90 (312) 000 00 00</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-[#e3000f] shrink-0" />
                <span>info@mgpolisaj.com</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#e3000f] shrink-0" />
                <span>Ankara, Türkiye</span>
              </li>
              <li className="flex items-start gap-2.5 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-[#e3000f] shrink-0" />
                <span>Pzt - Cuma: 09:00 - 18:00</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alt bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>&copy; {new Date().getFullYear()} MG Polisaj. Tüm hakları saklıdır.</span>
          <span>
            Menzerna Polishing Compounds GmbH &amp; Co. KG Türkiye Distribütörü
          </span>
        </div>
      </div>
    </footer>
  );
}
