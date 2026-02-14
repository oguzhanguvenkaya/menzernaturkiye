import { Link, useLocation } from "wouter";
import { Search, Menu, X, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function Header() {
  const [location] = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navigation = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Ürünler", href: "/products" },
    { name: "Hakkımızda", href: "/about" },
    { name: "İletişim", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      {/* Top Bar */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-2"><Phone size={12} /> +90 (535) 251 74 11</span>
            <span className="flex items-center gap-2"><Mail size={12} /> info@menzernaturkiye.com</span>
          </div>
          <div className="flex gap-4">
            <a href="https://www.mgpolishing.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-1">
               Distribütör Web Sitesi <ArrowRight size={12} />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <img src="/images/logo.png" alt="Menzerna Logo" className="h-10 w-auto" />
            <div className="hidden lg:block border-l pl-3 ml-3 border-neutral-300">
              <span className="block text-sm font-bold text-neutral-800">TÜRKİYE</span>
              <span className="block text-xs text-neutral-500 tracking-wider">RESMİ DİSTRİBÜTÖRÜ</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <span className={`text-sm font-semibold uppercase tracking-wide hover:text-primary transition-colors ${location === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-neutral-600"}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <div className="relative hidden md:block w-64">
             <Input placeholder="Ürün ara..." className="h-9 pr-8 bg-neutral-50 border-neutral-200 focus:border-primary focus:ring-primary/20" />
             <Search className="absolute right-2 top-2.5 h-4 w-4 text-neutral-400" />
          </div>
          
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>


          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="border-b pb-4">
                  <img src="/images/logo.png" alt="Menzerna" className="h-8 mb-4" />
                </div>
                <nav className="flex flex-col gap-4">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <span className="text-lg font-medium hover:text-primary transition-colors block py-2 border-b border-neutral-100">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src="/images/logo.png" alt="Menzerna Footer Logo" className="h-8 brightness-0 invert opacity-80" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              Menzerna, endüstriyel polisaj ve otomotiv bakım ürünlerinde dünya lideri. MG Polisaj güvencesiyle Türkiye'de.
            </p>
            <div className="flex gap-4 pt-4">
              {/* Social Placeholders */}
              <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">FB</div>
              <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">IG</div>
              <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">LN</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">Hızlı Erişim</h4>
            <ul className="space-y-3 text-neutral-400 text-sm">
              <li><Link href="/products" className="hover:text-white transition-colors">Tüm Ürünler</Link></li>
              <li><Link href="/products?category=DIŞ YÜZEY" className="hover:text-white transition-colors">Oto Bakım</Link></li>
              <li><Link href="/products?category=MARİN" className="hover:text-white transition-colors">Marin Grubu</Link></li>
              <li><Link href="/products?category=ENDÜSTRİYEL" className="hover:text-white transition-colors">Endüstriyel</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">İletişim</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>MG POLİSAJ OTOMOTİV İTH. İHR. A.Ş.<br/>Ümit Mh. 1411/7 Sk. No: 4/I<br/>35060 Bornova / İZMİR</span>
              </li>
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+90 (535) 251 74 11</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>info@menzernaturkiye.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-primary">Bülten</h4>
            <p className="text-neutral-400 text-sm mb-4">Yeni ürünler ve kampanyalardan haberdar olun.</p>
            <div className="flex gap-2">
              <Input placeholder="E-posta adresiniz" className="bg-neutral-800 border-neutral-700 text-white focus:border-primary" />
              <Button className="bg-primary hover:bg-red-700 text-white">Kayıt</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500">
          <p>&copy; 2026 MG Polisaj. Tüm hakları saklıdır. Menzerna Türkiye Resmi Distribütörü.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer">Gizlilik Politikası</span>
            <span className="hover:text-white cursor-pointer">Kullanım Şartları</span>
            <span className="hover:text-white cursor-pointer">KVKK</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-neutral-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
