import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { getPageContents } from "@/db/queries";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular",
  description:
    "Menzerna araç cilası, polisaj teknikleri, pad seçimi, çizik giderme ve daha fazlası hakkında sıkça sorulan soruların yanıtları.",
};

const faqCategories = [
  {
    title: "Polisaj",
    items: [
      {
        q: "Bir arabayı polisaj yapmanın en iyi yolu nedir?",
        a: "Aracı elde yıkayın, kil uygulaması yapın, gerekli yerleri bantlayın, boya durumuna göre uygun cilayı seçin, pad üzerine uygulayın, şeffaf olana kadar eşit şekilde dağıtın, ardından fazlasını mikrofiber bezle silin.",
      },
      {
        q: "En iyi araç cilası hangisidir?",
        a: "Menzerna'nın profesyonel cilaları, dolgu ve silikon içermeyen yüksek kaliteli polisaj minerallerinden üretilmiş premium cilalardır. Seçim, boya türüne ve durumuna bağlıdır.",
      },
      {
        q: "Arabamı ne sıklıkla polisaj yapabilirim?",
        a: "Sıklık araca göre değişir ve boya kalınlığına bağlıdır; yalnızca şeffaf kaplama katmanı polisaj yapılabilir.",
      },
      {
        q: "Arabamı neden polisaj yapmalıyım?",
        a: "Düzenli polisaj, aracın değerini korur, çizikleri giderir ve parlaklığı yeniden kazandırır.",
      },
      {
        q: "Arabamı ne zaman polisaj yapmalıyım?",
        a: "Çizikler göründüğünde veya boya parlaklığını ve canlılığını kaybettiğinde polisaj yapmalısınız.",
      },
      {
        q: "Bir araba için ne kadar cila gerekir?",
        a: "Orta büyüklükte bir arabayı polisaj yapmak için ürüne bağlı olarak yaklaşık 50 ile 100 ml cila gereklidir.",
      },
      {
        q: "Doğru cilayı seçerken nelere dikkat etmeliyim?",
        a: "Boya durumunu analiz edin, çizik derinliğini değerlendirin, makine tipine karar verin, zaman yatırımını belirleyin, ardından program genel bakışını kullanarak cilayı seçin.",
      },
      {
        q: "Araç cilası nasıl çalışır?",
        a: "Dolgu ve silikon içermeyen profesyonel bir araç cilası, yüzeyi mekanik olarak pürüzsüzleştirir. Polisaj mineralleri ince bir boya tabakasını kaldırır.",
      },
      {
        q: "Evde arabamı nasıl polisaj yapabilirim?",
        a: "Polisajı garaj veya sundurma altında optimum aydınlatma ile yapın; asla doğrudan güneş ışığında veya korumasız ortamlarda yapmayın.",
      },
      {
        q: "Cilaları nasıl kullanırım?",
        a: "İlgili pad ile polisaj makinesi kullanın; elle uygulama aplikatörleri manuel uygulamayı kolaylaştırır.",
      },
    ],
  },
  {
    title: "Menzerna Cilalarını Kullanma",
    items: [
      {
        q: "Menzerna cilalarını nasıl kullanırım?",
        a: "Menzerna polisaj pad'leri ile birlikte ürün sayfası önerilerini ve teknik veri sayfalarını takip ederek kullanın.",
      },
      {
        q: "Hangi uygulama için hangi cilayı kullanmalıyım?",
        a: "Belirgin çizikler için Heavy Cut (P1200-P1500); orta çizikler için Medium Cut (P3000); hafif çizikler ve parlaklık için Finish cilalar; bakım için koruyucular kullanın.",
      },
      {
        q: "Menzerna cilaları için hangi devir hızını kullanmalıyım?",
        a: "Hız; ürüne, boya türüne, makineye ve pad boyutuna bağlıdır; ürün sayfalarını ve teknik veri sayfalarını kontrol edin.",
      },
      {
        q: "Yeni başlayan biri olarak arabamı nasıl polisaj yaparım?",
        a: "Orbital makine ve One-Step Polish 3in1 ile başlayın; Medium Cut Foam Pad ile birleştirin; hafif-orta basınç uygulayın.",
      },
      {
        q: "Showroom kalitesinde bir parlaklık nasıl elde edilir?",
        a: "Çok aşamalı süreç kullanın: sırasıyla HCC 400, MCP 2500, SFP 3800; son olarak Power Lock koruyucu ile bitirin.",
      },
      {
        q: "Siyah bir arabayı nasıl polisaj yapabilirim?",
        a: "Siyah boya diğer renkler gibi polisaj yapılır ancak çizikler daha görünür olduğu için Finish cila ile bitirin; SF 3500 ve SFP 3800 önerilir.",
      },
      {
        q: "Yapışkan boyalar için hangi ürünler uygundur?",
        a: "One-Step Polish 3in1, MCP 2400 ve SF 3500 yapışkan boya uygulamaları için idealdir.",
      },
      {
        q: "Metal nasıl polisaj yapılır?",
        a: "Menzerna metal cilası ürünleri ile elle veya makine ile polisaj yapabilirsiniz. Elle uygulama için mikrofiber bez ile dairesel hareketler kullanın.",
      },
    ],
  },
  {
    title: "Çizik ve Hologram Giderme",
    items: [
      {
        q: "Derin çizikleri araç boyasından nasıl çıkarabilirim?",
        a: "Rotary makine ile Heavy Cut cila ve aşındırıcı pad (köpük veya kuzu yünü) kullanın; öncesinde zımparalama gerekebilir.",
      },
      {
        q: "Çizilmeye dayanıklı araç boyalarına polisaj yapılabilir mi?",
        a: "Evet, aşındırıcı cila ile çizilmeye dayanıklı boyalar işlenebilir.",
      },
      {
        q: "Araç boyasındaki her çizik polisajla giderilebilir mi?",
        a: "Hayır; şeffaf kaplamadan daha derin çizikler tam olarak giderilemez. Tırnak testi derinliği belirlemeye yardımcı olur.",
      },
      {
        q: "Hologramlar nedir?",
        a: "Hologramlar, Heavy Cut veya Medium Cut cila ile polisaj yaparken oluşabilen ince polisaj izleridir ve Finish cila ile giderilebilir.",
      },
      {
        q: "Swirl izleri nedir?",
        a: "Swirl'ler, otomatik oto yıkama fırçalarının neden olduğu, araç boyasındaki dairesel şekilde ince-orta derinlikte çiziklerdir.",
      },
      {
        q: "Boya kusurları nedir?",
        a: "Boyama sürecinden kaynaklanan hatalar (portakal kabuğu, vernik akması, kir bulaşması) zımparalama ve polisaj ile giderilebilir.",
      },
    ],
  },
  {
    title: "Elle ve Makine ile Polisaj",
    items: [
      {
        q: "Elektrikli polisaj makinelerini nasıl kullanırım?",
        a: "İstenen cilaya göre parametreleri (basınç, hız, pad) belirleyin; Menzerna cilaları makineler için geliştirilmiştir ve belgelenmiş önerileri vardır.",
      },
      {
        q: "Menzerna cilaları polisaj makineleri için uygun mu?",
        a: "Evet, tüm Menzerna cilaları profesyonel makine kullanımı için geliştirilmiştir.",
      },
      {
        q: "Hangi polisaj makinesi türleri vardır?",
        a: "Rotary ve orbital makineler; orbital makineler sabit ve rastgele orbital olmak üzere ikiye ayrılır.",
      },
      {
        q: "Orbital ve rotary polisaj makinesi arasındaki fark nedir?",
        a: "Rotary: taban plakası sabit bir nokta etrafında döner, derin çizikler için ideal. Orbital: taban plakası orbital hareketler üretir, tek aşamalı işlemler için uygundur.",
      },
      {
        q: "Menzerna cilasını elle uygulayabilir miyim?",
        a: "Evet; Medium Cut 2400, One-Step Polish 3in1 ve tüm Finish cilalar ve koruyucular elle uygulamaya uygundur.",
      },
      {
        q: "Menzerna ürünlerini elle nasıl uygularım?",
        a: "Elle polisaj aplikatörü veya mikrofiber bez ile hafif basınç uygulayarak dairesel hareketlerle uygulayın.",
      },
      {
        q: "Hangi Menzerna cilası elle uygulanabilir?",
        a: "Medium Cut 2400, One-Step Polish 3in1, tüm Finish cilalar ve koruyucular elle uygulama için önerilir.",
      },
      {
        q: "Polisaj için en iyi aydınlatma nedir?",
        a: "Çizikleri ve kusurları doğru tanımlamak için gölgesiz, parlak aydınlatma kullanın.",
      },
      {
        q: "Polisaj öncesi bantlama nasıl yapılır?",
        a: "Plastikleri, camları ve metalleri ısıya dayanıklı yapışkan bant ile kapatın; polisaj/koruma sonrasında hemen çıkarın.",
      },
    ],
  },
  {
    title: "Profesyonel Detailing",
    items: [
      {
        q: "Detailing nedir?",
        a: "Detailing, bir nesneyi eski haline kavuşturma/geliştirme eylemidir; yıkama, polisaj ve yüzey korumayı kapsar.",
      },
      {
        q: "Araç detailing nedir?",
        a: "Araç detailing, araçları eski görkemine kavuşturma eylemidir; yıkama, polisaj, koruma ve onarımı içerir.",
      },
      {
        q: "Profesyonel araç detailing ne kadar tutar?",
        a: "Profesyonel araç detailing, kapsama ve hizmetlere bağlı olarak değişkenlik gösterir. Detaylı bilgi için yetkili detailing merkezlerimize danışabilirsiniz.",
      },
      {
        q: "Menzerna polisaj kursu/eğitimi sunuyor mu?",
        a: "Evet; yeni başlayanlar ve profesyoneller için yetkili eğitmenler tarafından eğitim kursları sunulmaktadır.",
      },
    ],
  },
  {
    title: "Polisaj Pad'leri ve Aksesuarlar",
    items: [
      {
        q: "Hangi polisaj pad'leri mevcuttur?",
        a: "Köpük pad'ler (çeşitli sertlikte), mikrofiber pad'ler ve kuzu yünü pad'ler; birden fazla boyutta mevcuttur.",
      },
      {
        q: "Zımpara pad'i ile polisaj pad'i arasındaki fark nedir?",
        a: "Zımpara pad'leri malzeme kaldırma için aşındırıcı kumlamaya sahiptir; polisaj pad'leri köpük (yumuşaktan serte) veya kuzu yünü/mikrofiberdir.",
      },
      {
        q: "Doğru polisaj pad'ini nasıl seçerim?",
        a: "Seçim; yüzey bileşimi, boya türü, makine tipi ve seçilen cilaya bağlıdır.",
      },
      {
        q: "Doğru taban plakasını nasıl seçerim?",
        a: "Polisaj pad'i çapına göre üç boyuttan birini seçin; pad her zaman taban plakasından büyük olmalıdır.",
      },
      {
        q: "Menzerna pad'leri ile kaç araba polisaj yapılabilir?",
        a: "Kullanımlar arasında iyice temizlenmeleri koşuluyla, Menzerna premium pad'leri ile yaklaşık 20 araba polisaj yapılabilir.",
      },
      {
        q: "Menzerna cilaları için hangi pad'leri kullanmalıyım?",
        a: "Premium pad'ler cila etiketleri ile renk kodlu olarak eşleştirilmiştir; ürün detay sayfalarındaki önerilere bakın.",
      },
      {
        q: "Polisaj pad'ine ne kadar cila uygulanmalıdır?",
        a: "95mm pad için 3-4 bezelye büyüklüğünde damla; 150mm için 5 damla; 180mm için 6-7 damla — her 40x40cm yüzey alanı için.",
      },
      {
        q: "Polisaj pad'i nasıl temizlenir?",
        a: "Köpük pad'ler su ile elle veya kovada yıkanır; kuzu yünü pad'ler yalnızca fırça veya hava tabancası ile temizlenir (asla su ile değil).",
      },
    ],
  },
  {
    title: "Koruyucu ve Cila Wax",
    items: [
      {
        q: "Power Lock'un ömrü ne kadardır ve nasıl çıkarılır?",
        a: "Power Lock'un yaklaşık altı aylık bir kullanım ömrü vardır ve Heavy Cut cila ile Heavy Cut Foam Pad kullanılarak çıkarılır.",
      },
      {
        q: "Menzerna Power Lock nasıl kullanılır?",
        a: "Wax Foam Pad ile düşük hızda/basınçta şeffaf olana kadar eşit şekilde dağıtın; silmeden önce 20-30 dakika bekleyin.",
      },
      {
        q: "Wax ve koruyucu (sealant) arasındaki fark nedir?",
        a: "Wax doğal olarak korur, en fazla 3 ay dayanır; koruyucu sentetik polimerler kullanır, en fazla 6 ay dayanır.",
      },
      {
        q: "Uygulanan seramik kaplama nasıl çıkarılır?",
        a: "Heavy Cut cila (HCC400) ile Heavy Cut Foam Pad kullanarak çıkarılır.",
      },
      {
        q: "Seramik kaplama nasıl bakılır?",
        a: "Parlaklığı yenilemek ve su damlacık etkisini korumak için Endless Shine gibi detailer'lar ile bakım yapın.",
      },
      {
        q: "Beading ve sheeting ne anlama gelir?",
        a: "Beading, yüzeyin su damlacıkları oluşturma yeteneğidir; sheeting, suyu gevşek kiri taşıyarak akıtır.",
      },
    ],
  },
  {
    title: "Araç Yıkama ve Temizlik",
    items: [
      {
        q: "Arabamı neden elle yıkamalıyım?",
        a: "Elle yıkama yalnızca boyaya çok nazik olmakla kalmaz, aynı zamanda oto yıkama çiziklerini de önler.",
      },
      {
        q: "Arabamı neden otomatik yıkamaya götürmemeliyim?",
        a: "Otomatik yıkamalar, sertleşmiş fırçalar ve kirli şeritler aracılığıyla swirl izlerine neden olur.",
      },
      {
        q: "Arabamı yıkarken ve kurutarken nelere dikkat etmeliyim?",
        a: "Korumalı bir alanda yıkayın; mikrofiber bez veya hava tabancası ile kurulayın; inatçı kirler için kil kullanın.",
      },
      {
        q: "Mikrofiber bezlerime nasıl bakmalıyım?",
        a: "Etikette belirtilen sıcaklıkta çamaşır makinesinde yıkayın; ürün bakım önerilerini takip edin.",
      },
      {
        q: "Polisaj öncesi boyayı nasıl temizlerim?",
        a: "Aracı elde yıkayın; gerekirse kirletici maddelerin giderilmesi için kil kullanın.",
      },
      {
        q: "Araba nasıl kil uygulanır?",
        a: "Kil diskini şekillendirin; 60x60cm alana Endless Shine püskürtün; düz hareketlerle silin; kirletici maddeleri içe katlayın; tekrarlayın.",
      },
      {
        q: "Kil ile kirletici maddeleri neden çıkarmalıyım?",
        a: "Kil, polisaj öncesinde reçine, böcek kalıntıları ve yüzeysel pası çıkararak işlem sırasında bağlanmayı önler.",
      },
      {
        q: "Arabamı ne sıklıkla kil uygulamalıyım?",
        a: "Her yıkamadan sonra kil uygulanabilir.",
      },
    ],
  },
  {
    title: "Raf Ömrü, Saklama ve İçerik",
    items: [
      {
        q: "Bir araç cilası ne kadar tutar?",
        a: "250 ml şişe ürün ve ülkeye bağlı olarak değişen fiyatlara sahiptir. Güncel fiyatlar için yetkili satıcılara danışın.",
      },
      {
        q: "Menzerna cilalarını nereden satın alabilirim?",
        a: "Yerel bayiler ve online mağazalarda mevcuttur; konum için yetkili satıcı arama aracını kullanın.",
      },
      {
        q: "Menzerna araç cilalarının raf ömrü nedir?",
        a: "Üretim tarihinden itibaren iki yıl; raf ömrü bilgisi etiketlerde belirtilmiştir.",
      },
      {
        q: "Cilaları nasıl saklamalıyım?",
        a: "5-30°C'de dik konumda saklayın; dondan ve doğrudan güneş ışığından kaçının.",
      },
      {
        q: "Menzerna cilaları dolgu ve silikon içeriyor mu?",
        a: "Yüksek kaliteli polisaj minerallerinden üretilmiştir, dolgu ve silikon içermez; istisna olarak koruma için silikon gerektiren sealant'lar vardır.",
      },
      {
        q: "250 ml'lik bir cila şişesi neden diğerinden daha hafif olabilir?",
        a: "Ağırlık yoğunluğa bağlıdır; Heavy Cut cilalar, Finish cilalara göre daha yüksek yoğunluğa sahiptir.",
      },
      {
        q: "Menzerna cilaları neden şişenin üst kısmına kadar dolu değildir?",
        a: "Dolum seviyesi ürün yoğunluğuna göre değişir; tüm ürünlerde aynı şişeler kullanıldığından farklılıklar oluşabilir.",
      },
    ],
  },
];

// Toplam soru sayısı
const totalQuestions = faqCategories.reduce((sum, cat) => sum + cat.items.length, 0);

export default async function SSSPage() {
  const heroContents = await getPageContents("sss");
  const heroImage = heroContents.find((c) => c.section === "hero")?.image_url;

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-[#1d1d1d] py-20 md:py-28 overflow-hidden">
        {heroImage ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.15) 39px, rgba(255,255,255,0.15) 40px)",
            }}
          />
        )}
        <div className="relative container mx-auto px-4 text-center">
          <p className="text-[#af1d1f] text-xs font-black uppercase tracking-widest mb-3">
            Araç Bakımı
          </p>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
            Sıkça Sorulan
            <br />
            Sorular
          </h1>
          <div className="w-16 h-1 bg-[#af1d1f] mx-auto" />
        </div>
      </section>

      {/* FAQ Bölümü */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-10">
              {faqCategories.length} kategori &middot; {totalQuestions} soru
            </p>

            <FaqAccordion categories={faqCategories} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1d1d1d] py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
            Sorunuzu Bulamadınız mı?
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">
            Aklınızdaki soruyu bize doğrudan iletebilirsiniz. En kısa sürede
            teknik ekibimiz size geri dönecektir.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 bg-[#af1d1f] hover:bg-red-700 text-white px-8 py-4 font-bold uppercase tracking-widest text-sm transition-colors"
          >
            Bize Sorun
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
