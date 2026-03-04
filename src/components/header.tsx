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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isDropdownActive = (item: (typeof navigation)[number]) =>
    "children" in item && item.children
      ? item.children.some((child) => isActive(child.href))
      : false;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar — red left section + dark right section */}
      <div className="flex w-full h-2 md:h-[46px]">
        {/* Red accent section (left ~20%) */}
        <div className="bg-[#af1d1f] w-[20%] hidden md:block" />
        {/* Dark section — ince şerit mobilde, full bar masaüstünde */}
        <div className="bg-[#1d1d1d] flex-1 flex items-center justify-end text-white">
          <div className="container mx-auto px-4 hidden md:flex items-center justify-end gap-6 text-[15px] leading-[21px]">
            <Link
              href="/iletisim"
              className="flex items-center gap-1.5 hover:text-[#af1d1f] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>İletişim</span>
            </Link>
            <a
              href="https://mgpolishing.com/yetkili-saticilar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#af1d1f] transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Yetkili Satıcı Bul</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-20">
          {/* Left: Logo + Türkiye */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <img
              src="/logo.svg"
              alt="Menzerna"
              className="h-10 w-auto"
            />
            <div className="w-px h-7 bg-gray-300" />
            <span className="text-[15px] font-semibold text-[#1d1d1d] tracking-wide uppercase">
              Türkiye Distribütörü
            </span>
          </Link>

          {/* Right: Desktop Nav */}
          <nav className="hidden lg:flex items-stretch gap-0 h-20">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.label)}
                  onMouseLeave={() => { setOpenDropdown(null); setHoveredNav(null); }}
                >
                  <button
                    className={`relative px-4 h-full flex items-center gap-1 text-[19px] font-black uppercase tracking-wider transition-colors
                      ${openDropdown === item.label || isDropdownActive(item) ? "text-[#af1d1f]" : "text-[#1d1d1d] hover:text-[#af1d1f]"}`}
                    onMouseEnter={() => setHoveredNav(item.label)}
                    onMouseLeave={() => setHoveredNav(null)}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                    <span
                      className={`absolute -bottom-px left-4 right-[34px] h-[5px] bg-[#af1d1f] transition-transform duration-300 origin-left ${
                        hoveredNav === item.label || (isDropdownActive(item) && openDropdown !== item.label)
                          ? "scale-x-100"
                          : "scale-x-0"
                      }`}
                    />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-5 py-3 text-sm font-bold transition-colors border-l-2
                            ${isActive(child.href)
                              ? "text-[#af1d1f] border-[#af1d1f] bg-red-50/50"
                              : "text-[#1d1d1d] border-transparent hover:border-[#af1d1f] hover:bg-gray-50"
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
                  className={`group/nav relative px-4 flex items-center text-[19px] font-black uppercase tracking-wider transition-colors
                    ${isActive(item.href!)
                      ? "text-[#af1d1f]"
                      : "text-[#1d1d1d] hover:text-[#af1d1f]"
                    }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-px left-4 right-4 h-[5px] bg-[#af1d1f] transition-transform duration-300 origin-left ${
                      isActive(item.href!) ? "scale-x-100" : "scale-x-0 group-hover/nav:scale-x-100"
                    }`}
                  />
                </Link>
              )
            )}
          </nav>

          {/* Mobile hamburger (right on mobile) */}
          <button
            className="lg:hidden text-[#1d1d1d] p-2 hover:text-[#af1d1f] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — overlay, does not push page content */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-40"
            onClick={() => setMobileOpen(false)}
          />
          {/* Panel */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#1d1d1d] max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Header row with logo + close */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-700">
              <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <img src="/logo.svg" alt="Menzerna" className="h-8 w-auto brightness-0 invert" />
                <div className="w-px h-5 bg-gray-600" />
                <span className="text-sm font-semibold text-white tracking-wide uppercase">
                  Türkiye Distribütörü
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-white p-1 hover:text-[#af1d1f] transition-colors"
                aria-label="Menüyü kapat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    className="w-full px-5 py-4 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-between hover:bg-[#111111]"
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
                    <div className="bg-[#111111]">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-8 py-3 text-sm transition-colors
                            ${isActive(child.href)
                              ? "text-[#af1d1f]"
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
                      ? "text-[#af1d1f]"
                      : "text-white hover:text-[#af1d1f]"
                    }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            {/* Mobile contact + dealer */}
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
                className="flex items-center gap-2 text-[#af1d1f] hover:text-red-400 text-sm font-bold"
              >
                <MapPin className="w-4 h-4" />
                Yetkili Satıcı Bul
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
