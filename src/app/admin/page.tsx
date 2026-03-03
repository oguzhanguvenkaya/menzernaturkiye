import Link from "next/link";
import {
  Package,
  MessageSquare,
  FileText,
  Plus,
  Settings,
  Image,
  ArrowRight,
} from "lucide-react";
import { getAdminStats } from "@/db/queries";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  const statCards = [
    {
      label: "Urunler",
      count: stats.products,
      icon: Package,
      href: "/admin/urunler",
      color: "#e3000f",
    },
    {
      label: "Mesajlar",
      count: stats.messages,
      icon: MessageSquare,
      href: "/admin/mesajlar",
      color: "#002b3d",
    },
    {
      label: "Sayfalar",
      count: stats.pages,
      icon: FileText,
      href: "/admin/sayfalar",
      color: "#0d6efd",
    },
  ];

  const quickLinks = [
    {
      label: "Yeni Urun Ekle",
      href: "/admin/urunler/yeni",
      icon: Plus,
    },
    {
      label: "Urunleri Yonet",
      href: "/admin/urunler",
      icon: Package,
    },
    {
      label: "Mesajlari Gor",
      href: "/admin/mesajlar",
      icon: MessageSquare,
    },
    {
      label: "Medya Yukle",
      href: "/admin/medya",
      icon: Image,
    },
    {
      label: "Site Ayarlari",
      href: "/admin/ayarlar",
      icon: Settings,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wider text-[#002b3d]">
          Yonetim Paneli
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Menzerna Turkiye site yonetimi
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-white border border-gray-200 p-6 hover:border-gray-300 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  {card.label}
                </p>
                <p className="text-3xl font-black text-[#002b3d] mt-2">
                  {card.count}
                </p>
              </div>
              <div
                className="w-10 h-10 flex items-center justify-center"
                style={{ backgroundColor: card.color }}
              >
                <card.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-medium text-gray-400 group-hover:text-[#e3000f] transition-colors">
              Goruntule
              <ArrowRight className="w-3 h-3" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-black uppercase tracking-wider text-[#002b3d] mb-4">
          Hizli Erisim
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-3 hover:border-[#e3000f] hover:text-[#e3000f] transition-colors text-sm font-medium text-[#002b3d]"
            >
              <link.icon className="w-4 h-4 shrink-0" />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
