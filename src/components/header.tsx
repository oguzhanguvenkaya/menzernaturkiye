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
      {/* Top bar — red left section + dark right section */}
      <div className="flex w-full h-9">
        {/* Red accent section (left ~20%) */}
        <div className="bg-[#af1d1f] w-[20%] hidden md:block" />
        {/* Dark section with contact links on far right */}
        <div className="bg-[#1d1d1d] flex-1 flex items-center justify-end text-white">
          <div className="container mx-auto px-4 flex items-center justify-end gap-4 text-xs md:justify-end">
            <Link
              href="/iletisim"
              className="flex items-center gap-1.5 hover:text-[#af1d1f] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>İletişim</span>
            </Link>
            <a
              href="https://mgpolishing.com/yetkili-saticilar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#af1d1f] transition-colors"
            >
              <MapPin className="w-3 h-3" />
              <span>Yetkili Satıcı Bul</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          {/* Mobile hamburger (left on mobile) */}
          <button
            className="lg:hidden text-[#1d1d1d] p-2 hover:text-[#af1d1f] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav (left side on desktop) */}
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
                      ${openDropdown === item.label ? "text-[#af1d1f]" : "text-[#1d1d1d] hover:text-[#af1d1f]"}`}
                    aria-expanded={openDropdown === item.label}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {openDropdown === item.label && (
                    <div className="absolute top-full left-0 bg-white border border-gray-200 shadow-lg min-w-[200px] z-50">
                      <div className="w-full h-0.5 bg-[#af1d1f]" />
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
                  className={`px-4 py-5 text-sm font-bold uppercase tracking-wider transition-colors
                    ${isActive(item.href!)
                      ? "text-[#af1d1f] border-b-2 border-[#af1d1f]"
                      : "text-[#1d1d1d] hover:text-[#af1d1f]"
                    }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Center: Logo + Türkiye */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
            <img
              src="/logo.svg"
              alt="Menzerna"
              className="h-9 w-auto"
            />
            {/* Thin vertical divider */}
            <div className="w-px h-6 bg-gray-300" />
            <span className="text-sm font-semibold text-[#1d1d1d] tracking-wide uppercase">
              Türkiye
            </span>
          </Link>

          {/* Spacer for desktop to balance layout (right side) */}
          <div className="hidden lg:block w-px" />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#1d1d1d] border-t border-gray-700 max-h-[80vh] overflow-y-auto">
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
      )}
    </header>
  );
}
