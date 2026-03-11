import type { Metadata } from "next";
import Link from "next/link";
import {
  Lightbulb,
  Award,
  Scale,
  Star,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  MapPin,
  Factory,
  Anchor,
  Car,
} from "lucide-react";
import { getPageContents } from "@/db/queries";
import { parseImageSettings } from "@/lib/image-settings";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "1888'den bu yana polisajda mükemmellik. Menzerna'nın Türkiye yetkili distribütörü MG Polisaj hakkında bilgi alın.",
};

const values = [
  {
    icon: Lightbulb,
    title: "İnovasyon",
    description:
      "100 yılı aşkın Alman mühendislik mirası ile sürekli ar-ge ve ürün geliştirme odağı.",
  },
  {
    icon: Award,
    title: "Uzmanlık",
    description:
      "Araç bakım, endüstriyel ve marin sektörlerinde kanıtlanmış teknik uzmanlık.",
  },
  {
    icon: Scale,
    title: "Şeffaflık",
    description:
      "Müşteri, iş ortağı ve çevreye karşı dürüst, şeffaf ve adil ilişki anlayışı.",
  },
  {
    icon: Star,
    title: "Mükemmellik",
    description:
      "Her ürün formülünde, her yüzey uygulamasında en yüksek sonuç standardını hedefleme.",
  },
  {
    icon: ShieldCheck,
    title: "Sorumluluk",
    description:
      "Sürdürülebilir üretim süreçleri ve çevreye duyarlı ürün içerikleriyle gelecek nesle sorumluluk.",
  },
  {
    icon: TrendingDown,
    title: "Maliyet Tasarrufu",
    description:
      "Yüksek konsantrasyonlu formüller sayesinde daha az ürünle daha fazla yüzey işleme kapasitesi.",
  },
];

const sectors = [
  {
    icon: Car,
    label: "Araç Bakım",
    desc: "Profesyonel oto detay ve araç koruma",
  },
  {
    icon: Factory,
    label: "Endüstriyel",
    desc: "Metal, plastik ve kompozit yüzey işleme",
  },
  {
    icon: Anchor,
    label: "Marin",
    desc: "Jelkot ve deniz araçları için bakım çözümleri",
  },
];

export default async function HakkimizdaPage() {
  const heroContents = await getPageContents("hakkimizda");
  const heroEntry = heroContents.find((c) => c.section === "hero");
  const heroImage = heroEntry?.image_url;
  const heroSettings = parseImageSettings(heroEntry?.body);

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-[#1d1d1d] text-white overflow-hidden">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: heroSettings.position,
                filter: `brightness(${heroSettings.brightness}%)`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: `rgba(0,0,0,${heroSettings.overlay / 100})` }}
            />
          </>
        ) : (
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#af1d1f]" />

        <div className="relative container mx-auto px-4 py-20 md:py-28 min-h-[498px] md:min-h-[471px] flex items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-[#af1d1f]" />
              <span className="text-[#af1d1f] text-xs font-bold uppercase tracking-widest">
                Kurumsal
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
              Hakkımızda
            </h1>
          </div>
        </div>
      </section>

      {/* Menzerna Tarihi */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
                Menzerna GmbH
              </p>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d] mb-6 leading-tight">
                1888&apos;den Bu Yana
                <br />
                <span className="text-[#af1d1f]">Polisajda Mükemmellik</span>
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  Menzerna, 1888&apos;den bu yana otomotiv profesyonelleri için
                  pasta, cila ve polisaj çözümleri geliştirerek yüzey
                  iyileştirme standartlarını belirler. Bir asrı aşan
                  tecrübemizle ürettiğimiz yüksek kaliteli katı parlatma
                  bileşikleri, parlatma emülsiyonları ile otomobil ve marin
                  polisaj ürünleri, premium markaların aradığı yüksek parlaklık
                  ve kalıcı sonuçları hedefler.
                </p>
                <p>
                  Kalın pasta, ince pasta, hare/hologram giderici ve boya koruma
                  ürünleri dahil farklı uygulama ihtiyaçlarına yönelik ürün
                  seçeneklerimizle; her boya tipi ve her işlem adımı için doğru
                  çözümü sunarız. Geliştirdiğimiz ileri formüller, polisaj
                  sırasında hızlı kesim, kontrollü çalışma, düşük tozlanma ve
                  kolay silme karakteriyle süreci verimli hale getirir.
                </p>
                <p>
                  Menzerna, yalnızca ürün sağlayıcısı değil; aynı zamanda
                  endüstriyel işletmeler için bir parlatma işlemi çözüm
                  ortağıdır. 200&apos;ü aşkın yenilikçi formülasyon ile
                  endüstriyel parlatmanın geniş uygulama alanlarını kapsar;
                  Almanya&apos;nın Ötigheim merkezli üretim gücünü dünya
                  genelindeki şube ve bayi ağıyla sanayi ve profesyonel
                  uygulamacılara ulaştırır.
                </p>
              </div>
            </div>

            {/* Sektörler yan panel */}
            <div className="space-y-4">
              <div className="bg-[#f8f9fa] border-l-4 border-[#af1d1f] p-6">
                <p className="text-xs font-black uppercase tracking-widest text-[#1d1d1d] mb-1">
                  Kuruluş Yılı
                </p>
                <p className="text-5xl font-black text-[#af1d1f]">1888</p>
                <p className="text-sm text-gray-500 mt-1">Ötigheim, Almanya</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {sectors.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white border border-gray-200 p-4 flex items-center gap-4 hover:border-[#af1d1f] transition-colors"
                  >
                    <div className="w-10 h-10 bg-[#1d1d1d] flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-black uppercase tracking-wider text-[#1d1d1d]">
                        {s.label}
                      </p>
                      <p className="text-xs text-gray-500">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Değerler Grid */}
      <section className="py-16 md:py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
              İlkelerimiz
            </p>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d]">
              Bizi Biz Yapan İlkeler
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white border border-gray-200 hover:border-[#af1d1f] p-7 transition-colors group"
              >
                <div className="w-11 h-11 bg-[#1d1d1d] group-hover:bg-[#af1d1f] flex items-center justify-center mb-4 transition-colors">
                  <value.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-black uppercase tracking-widest text-[#1d1d1d] mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MG Polisaj Bölümü */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
                  Yetkili Distribütör
                </p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#1d1d1d] mb-6 leading-tight">
                  Türkiye Distribütörü:
                  <br />
                  <span className="text-[#af1d1f]">MG Polisaj</span>
                </h2>
                <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                  <p>
                    MG Polisaj, 2015 yılında kurulmuş olup Türkiye&apos;de
                    profesyonel araç polisaj ve parlatma çözümleri alanında,
                    global markaların yetkili distribütörlüğünü ve toptan kanal
                    yönetimini üstlenen bir şirkettir. Operasyonumuz; marka
                    yönetimi, bayi ağı geliştirme ve satış kanallarının
                    sürdürülebilir büyümesi odağında ilerler.
                  </p>
                  <p>
                    MG Polisaj, Türkiye pazarında güçlü bir organizasyon yapısı
                    kurmuş; satış ve pazarlama yönetimi, bölge satış ekipleri,
                    satış destek, dijital kanallar ve muhasebe operasyonları ile
                    depo/lojistik süreçlerini entegre şekilde yönetmektedir.
                  </p>
                  <p>
                    Menzerna ürünleri Türkiye&apos;de MG Polisaj
                    distribütörlüğünde; detailing stüdyoları, oto yıkama
                    merkezleri, otomotiv boya/kaporta atölyeleri, yetkili araç
                    satış merkezleri, otomobil yedek parça üreticileri,
                    fabrikalar ve amatör araç sahiplerinin uygulama ihtiyaçlarına
                    uygun şekilde sunulmaktadır.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-4">
                <div className="bg-[#f8f9fa] border border-gray-200 p-7">
                  <p className="text-xs font-black uppercase tracking-widest text-[#af1d1f] mb-2">
                    Merkez
                  </p>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-[#af1d1f] shrink-0" />
                    <p className="font-black text-lg uppercase tracking-wider text-[#1d1d1d]">
                      İzmir, Türkiye
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Kuruluş: 2015</p>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    Türkiye genelinde yetkili satıcı ağı ile hizmet
                    vermekteyiz.
                  </p>
                  <div className="w-12 h-0.5 bg-[#af1d1f] mt-3" />
                </div>
                <div className="bg-[#f8f9fa] border border-gray-200 p-7">
                  <p className="text-xs font-black uppercase tracking-widest text-[#af1d1f] mb-3">
                    Yetki Belgesi
                  </p>
                  <p className="text-sm font-black text-[#1d1d1d] uppercase tracking-wider">
                    Menzerna Polishing Compounds GmbH &amp; Co. KG
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Resmi Türkiye Distribütörü
                  </p>
                  <div className="w-12 h-0.5 bg-[#af1d1f] mt-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rakamlar Bandı */}
      <section className="bg-[#f8f9fa] py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">Rakamlarla MG Polisaj</p>
            <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#1d1d1d]">Türkiye Genelinde Güçlü Dağıtım Ağı</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 border border-gray-200 text-center">
              <p className="text-4xl font-black text-[#af1d1f]">81</p>
              <p className="text-sm text-gray-600 mt-2">İlde Yaygın Erişim</p>
            </div>
            <div className="bg-white p-8 border border-gray-200 text-center">
              <p className="text-4xl font-black text-[#af1d1f]">110+</p>
              <p className="text-sm text-gray-600 mt-2">Ana Bayi</p>
            </div>
            <div className="bg-white p-8 border border-gray-200 text-center">
              <p className="text-4xl font-black text-[#af1d1f]">150+</p>
              <p className="text-sm text-gray-600 mt-2">Satış Noktası</p>
            </div>
            <div className="bg-white p-8 border border-gray-200 text-center">
              <p className="text-4xl font-black text-[#af1d1f]">30.000+</p>
              <p className="text-sm text-gray-600 mt-2">Aylık Profesyonel & Amatör Kullanıcı</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Daha Fazlasını Keşfet
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Ürün kataloğumuzu inceleyin veya bizimle iletişime geçerek
            ihtiyacınıza uygun çözümü birlikte belirleyelim.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-[10px] sm:mx-0">
            <Link
              href="/iletisim"
              className="bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              İletişim
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/urunler"
              className="border-2 border-white hover:bg-white hover:text-[#1d1d1d] text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors text-center w-full sm:w-auto"
            >
              Ürünleri Keşfet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
