import { Link, useLocation } from "wouter";
import { ChevronDown, Menu, X, MapPin, Phone, Mail, Clock, ChevronRight } from "lucide-react";
import { useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navigation = [
    {
      id: "car-care",
      title: "Araç Bakım",
      subcategories: [
        { name: "Pasta, Cila ve Boya Korumalar", href: "/category/car-polish" },
        { name: "Sünger, Keçe ve Tabanlıklar", href: "/category/accessories" },
        { name: "Yetkili Satıcılar", href: "/dealers", isDealer: true }
      ]
    },
    {
      id: "industrial",
      title: "Endüstriyel",
      subcategories: [
        { name: "Katı Pasta ve Cilalar", href: "/category/solid-compounds" },
        { name: "Yetkili Satıcılar", href: "/dealers", isDealer: true }
      ]
    },
    {
      id: "marine",
      title: "Marin",
      subcategories: [
        { name: "Pasta ve Cilalar", href: "/category/boat-polish" },
        { name: "Yetkili Satıcılar", href: "/dealers", isDealer: true }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <div className="bg-[#e3000f] h-1.5 w-full"></div>
      <header className="text-white sticky top-0 z-50 shadow-xl bg-[#202020]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-3xl font-black tracking-tighter uppercase text-white">
                  Menzerna<span className="text-[#e3000f]">.</span>
                </span>
                <span className="text-xs font-bold tracking-[0.2em] text-gray-400 mt-2 uppercase border-l-2 border-gray-600 pl-2">
                  Türkiye
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex h-full items-center">
              <Link href="/about" className="px-6 h-full flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors text-gray-200 border-b-4 border-transparent hover:text-white hover:border-[#e3000f]">
                  HAKKIMIZDA
              </Link>
              <Link href="/products" className="px-6 h-full flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors text-gray-200 border-b-4 border-transparent hover:text-white hover:border-[#e3000f]">
                  ÜRÜNLER
              </Link>

              {navigation.map((navItem) => (
                <div 
                  key={navItem.id} 
                  className="group h-full flex items-center relative"
                  onMouseEnter={() => setActiveMenu(navItem.id)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className={`px-6 h-full flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors border-b-4 ${
                    activeMenu === navItem.id || location.includes(navItem.id) 
                    ? "text-[#e3000f] border-[#e3000f]" 
                    : "text-gray-200 border-transparent hover:text-white"
                  }`}>
                    {navItem.title}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-300 ${activeMenu === navItem.id ? "rotate-180" : ""}`} />
                  </button>

                  <div className={`absolute top-full left-0 w-80 bg-white shadow-2xl border-t border-gray-200 transition-all duration-200 transform origin-top ${
                    activeMenu === navItem.id ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
                  }`}>
                    <div className="w-full h-1 bg-[#002b3d]"></div>
                    <div className="py-2 flex flex-col">
                      {navItem.subcategories.map((sub) => (
                        <Link key={sub.name} href={sub.href} className={`px-6 py-4 font-bold text-sm transition-colors flex items-center justify-between border-l-2 border-transparent hover:border-[#e3000f] ${
                            sub.isDealer ? "text-[#e3000f] hover:bg-red-50" : "text-[#002b3d] hover:bg-gray-50"
                          }`}>
                            <span className="flex items-center gap-2">
                              {sub.isDealer && <MapPin className="w-4 h-4" />}
                              {sub.name}
                            </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Link href="/contact" className={`px-6 h-full flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-colors border-b-4 ${
                location === "/contact" ? "text-[#e3000f] border-[#e3000f]" : "text-gray-200 border-transparent hover:text-white hover:border-[#e3000f]"
              }`}>
                  İLETİŞİM
              </Link>
            </nav>

            <button 
              className="lg:hidden text-white p-2 hover:text-[#e3000f] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#001f2c] border-t border-gray-700 max-h-[80vh] overflow-y-auto">
            <div className="border-b border-gray-800">
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-4 text-sm font-semibold hover:bg-white/5 transition-colors text-gray-200 hover:text-white">
                  HAKKIMIZDA
              </Link>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-4 text-sm font-semibold hover:bg-white/5 transition-colors text-gray-200 hover:text-white">
                  ÜRÜNLER
              </Link>
            </div>
            {navigation.map((navItem) => (
              <div key={navItem.title} className="border-b border-gray-800">
                <div className="px-6 py-4 font-black text-gray-400 uppercase tracking-widest text-xs bg-black/20">
                  {navItem.title}
                </div>
                <div className="flex flex-col">
                  {navItem.subcategories.map((sub) => (
                    <Link key={sub.name} href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`px-8 py-4 text-sm font-semibold flex items-center justify-between hover:bg-white/5 transition-colors ${
                          sub.isDealer ? "text-[#e3000f]" : "text-gray-200 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {sub.isDealer && <MapPin className="w-4 h-4" />}
                          {sub.name}
                        </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="border-b border-gray-800">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-8 py-4 text-sm font-semibold hover:bg-white/5 transition-colors text-gray-200 hover:text-white">
                  İLETİŞİM
              </Link>
            </div>
          </div>
        )}
      </header>
      <main className="flex-grow flex flex-col">{children}</main>
      <footer className="bg-[#00151f] text-gray-400 mt-auto">
        <div className="border-t-4 border-[#e3000f]"></div>
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="mb-6">
                <span className="text-2xl font-black tracking-tighter uppercase text-white">
                  Menzerna<span className="text-[#e3000f]">.</span>
                </span>
                <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase ml-2">Türkiye</span>
              </div>
              <p className="text-sm leading-relaxed mb-6">
                Menzerna, 1888'den beri profesyonel polisaj pastalarının geliştirilmesi ve üretiminde dünya standartlarını belirlemektedir.
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Perfection in Polishing</p>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Ürünler</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/category/car-polish" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Pasta, Cila ve Boya Korumalar
                  </Link>
                </li>
                <li>
                  <Link href="/category/accessories" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Sünger, Keçe ve Tabanlıklar
                  </Link>
                </li>
                <li>
                  <Link href="/category/solid-compounds" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Katı Pasta ve Cilalar
                  </Link>
                </li>
                <li>
                  <Link href="/category/boat-polish" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Marin Pasta ve Cilalar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Hızlı Erişim</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Ana Sayfa
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Tüm Ürünler
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> İletişim
                  </Link>
                </li>
                <li>
                  <Link href="/dealers" className="text-sm hover:text-[#e3000f] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-3 h-3" /> Yetkili Satıcılar
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">İletişim</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#e3000f] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    MG POLİSAJ OTOMOTİV İTH. İHR. A.Ş.<br/>
                    Ümit Mh. 1411/7 Sk. No: 4/I<br/>
                    35060 Bornova / İZMİR
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#e3000f] shrink-0" />
                  <a href="tel:+905352517411" className="text-sm hover:text-white transition-colors">+90 (535) 251 74 11</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#e3000f] shrink-0" />
                  <a href="mailto:info@menzernaturkiye.com" className="text-sm hover:text-white transition-colors">info@menzernaturkiye.com</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#e3000f] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">
                    Pzt - Cuma: 08:30 - 18:00<br/>
                    Cumartesi: 09:00 - 14:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} MG Polisaj Otomotiv - Menzerna Türkiye Yetkili Distribütörü. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.menzerna.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#e3000f] transition-colors">
                menzerna.com
              </a>
              <a href="https://mgpolishing.com" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-[#e3000f] transition-colors">
                mgpolishing.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
