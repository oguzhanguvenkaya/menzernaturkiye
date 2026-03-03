import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div>
      {/* Hero placeholder */}
      <section className="bg-[#002b3d] text-white py-24 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6">
            Polisajda <span className="text-[#e3000f]">Mükemmellik</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            1888&apos;den bu yana profesyonel polisaj ürünleri. Araç bakım,
            endüstriyel polisaj ve marin bakım çözümleri.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/urunler"
              className="bg-[#e3000f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center gap-2"
            >
              Ürünleri Keşfet
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/kurumsal/hakkimizda"
              className="border-2 border-white hover:bg-white hover:text-[#002b3d] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
            >
              Hakkımızda
            </Link>
          </div>
        </div>
      </section>

      {/* Kategori kartları */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Araç Bakım",
                desc: "Profesyonel araç polisaj ve koruma ürünleri",
                href: "/arac-bakim",
                color: "#e3000f",
              },
              {
                title: "Endüstriyel",
                desc: "Endüstriyel yüzey işleme çözümleri",
                href: "/endustriyel",
                color: "#002b3d",
              },
              {
                title: "Marin",
                desc: "Jelkot yüzey bakım ve polisaj ürünleri",
                href: "/marin",
                color: "#009b77",
              },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group relative bg-white border border-gray-200 hover:border-[#e3000f] p-8 transition-all hover:shadow-lg"
              >
                <div
                  className="w-12 h-1.5 mb-4"
                  style={{ backgroundColor: cat.color }}
                />
                <h2 className="text-xl font-black text-[#002b3d] uppercase tracking-wider mb-2 group-hover:text-[#e3000f] transition-colors">
                  {cat.title}
                </h2>
                <p className="text-sm text-gray-500">{cat.desc}</p>
                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#e3000f] absolute bottom-8 right-8 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
