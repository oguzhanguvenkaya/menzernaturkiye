"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

const navigation = [
  {
    label: "Kurumsal",
    children: [
      { label: "Hakkımızda", href: "/kurumsal/hakkimizda" },
      { label: "Eğitim Programı", href: "/kurumsal/egitim" },
      { label: "SSS", href: "/kurumsal/sss" },
    ],
  },
  { label: "Ürünler", href: "/urunler" },
  { label: "Araç Bakım", href: "/arac-bakim" },
  { label: "Endüstriyel", href: "/endustriyel" },
  { label: "Marin", href: "/marin" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Üst bar — ince kırmızı çizgi + iletişim */}
      <div className="bg-[#e3000f] h-1 w-full" />
      <div className="bg-[#002b3d] text-white">
        <div className="container mx-auto px-4 flex items-center justify-between h-9 text-xs">
          <div className="flex items-center gap-4">
            <Link
              href="/iletisim"
              className="flex items-center gap-1.5 hover:text-[#e3000f] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>İletişim</span>
            </Link>
          </div>
          <a
            href="https://mgpolishing.com/yetkili-saticilar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-[#e3000f] transition-colors"
          >
            <MapPin className="w-3 h-3" />
            <span>Yetkili Satıcı Bul</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Ana navigasyon */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-black text-[#002b3d] tracking-tight uppercase">
              Menzerna<span className="text-[#e3000f]">.</span>
            </span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight hidden sm:block">
              Türkiye
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`px-4 py-5 text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1
                      ${openDropdown === item.label ? "text-[#e3000f]" : "text-[#002b3d] hover:text-[#e3000f]"}`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                      <div className="w-full h-0.5 bg-[#e3000f]" />
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-3 text-sm font-bold transition-colors border-l-2
                            ${isActive(child.href)
                              ? "text-[#e3000f] border-[#e3000f] bg-red-50/50"
                              : "text-[#002b3d] border-transparent hover:border-[#e3000f] hover:bg-gray-50"
                            }`}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`px-4 py-5 text-sm font-bold uppercase tracking-wider transition-colors
                    ${isActive(item.href!)
                      ? "text-[#e3000f] border-b-2 border-[#e3000f]"
                      : "text-[#002b3d] hover:text-[#e3000f]"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-[#002b3d] p-2 hover:text-[#e3000f] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#002b3d] border-t border-gray-700 max-h-[80vh] overflow-y-auto">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  className="w-full px-5 py-4 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-between hover:bg-[#001f2c]"
                  onClick={() =>
                    setOpenDropdown(openDropdown === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${openDropdown === item.label ? "rotate-90" : ""}`}
                  />
                </button>
                {openDropdown === item.label && (
                  <div className="bg-[#001f2c]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`block px-8 py-3 text-sm transition-colors
                          ${isActive(child.href)
                            ? "text-[#e3000f]"
                            : "text-gray-300 hover:text-white"
                          }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`block px-5 py-4 text-sm font-bold uppercase tracking-wider transition-colors
                  ${isActive(item.href!)
                    ? "text-[#e3000f]"
                    : "text-white hover:text-[#e3000f]"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          {/* Mobile iletişim + satıcı */}
          <div className="border-t border-gray-700 px-5 py-4 flex flex-col gap-3">
            <Link
              href="/iletisim"
              className="flex items-center gap-2 text-gray-300 hover:text-white text-sm"
              onClick={() => setMobileOpen(false)}
            >
              <Phone className="w-4 h-4" />
              İletişim
            </Link>
            <a
              href="https://mgpolishing.com/yetkili-saticilar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#e3000f] hover:text-red-400 text-sm font-bold"
            >
              <MapPin className="w-4 h-4" />
              Yetkili Satıcı Bul
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
