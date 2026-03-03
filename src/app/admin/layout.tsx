"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package,
  Settings,
  FileText,
  MessageSquare,
  Image,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/sayfalar", label: "Sayfalar", icon: FileText },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: MessageSquare },
  { href: "/admin/medya", label: "Medya", icon: Image },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Login page gets its own layout
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex">
      {/* Sidebar */}
      <aside className="w-56 bg-[#1d1d1d] text-white flex flex-col shrink-0">
        <div className="p-4 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors mb-2">
            <ChevronLeft className="w-3 h-3" />
            Siteye Dön
          </Link>
          <h2 className="text-lg font-black uppercase tracking-wider">
            Menzerna<span className="text-[#af1d1f]">.</span>
          </h2>
          <p className="text-[10px] text-gray-400 uppercase tracking-widest">
            Yönetim Paneli
          </p>
        </div>

        <nav className="flex-1 py-2">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-white/10 text-white border-l-2 border-[#af1d1f]"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
