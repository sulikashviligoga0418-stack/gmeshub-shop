import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Globe, Menu, X, BookOpen, GraduationCap, ArrowRight, Star, Hash, ShoppingCart, ExternalLink, Zap } from 'lucide-react';

// --- ენების მონაცემები (EN, IT, GE, RU) ---
const translations = {
  EN: {
    heroTitle: "TikTok Finds & Exclusive Deals",
    heroSub: "Enter the code from the video (e.g., 101) to find the product instantly.",
    searchPlaceholder: "Enter Code (e.g. 105) or Name...",
    navShop: "Shop",
    navCourses: "Courses (Coming Soon)",
    navBlog: "Blog",
    filterAll: "All",
    filterTech: "Tech",
    filterHome: "Home",
    btnAmazon: "View on Amazon",
    btnDirect: "Buy Now",
    codeLabel: "Code:",
    noResult: "Product not found.",
    badgeDirect: "Direct Sale",
    badgeAffiliate: "Amazon Choice",
    footerText: "Your ultimate hub for viral gadgets."
  },
  IT: {
    heroTitle: "Scoperte TikTok & Offerte Esclusive",
    heroSub: "Inserisci il codice dal video (es. 101) per trovare il prodotto all'istante.",
    searchPlaceholder: "Inserisci Codice (es. 105) o Nome...",
    navShop: "Negozio",
    navCourses: "Corsi (Presto)",
    navBlog: "Blog",
    filterAll: "Tutti",
    filterTech: "Tecnologia",
    filterHome: "Casa",
    btnAmazon: "Vedi su Amazon",
    btnDirect: "Acquista Ora",
    codeLabel: "Codice:",
    noResult: "Prodotto non trovato.",
    badgeDirect: "Vendita Diretta",
    badgeAffiliate: "Scelta Amazon",
    footerText: "Il tuo hub definitivo per gadget virali."
  },
  GE: {
    heroTitle: "TikTok-ის აღმოჩენები და ჰიტები",
    heroSub: "ჩაწერე ვიდეოში ნანახი კოდი (მაგ: 101) და იპოვე ნივთი წამებში.",
    searchPlaceholder: "ჩაწერე კოდი (მაგ: 105) ან სახელი...",
    navShop: "მაღაზია",
    navCourses: "კურსები (მალე)",
    navBlog: "ბლოგი",
    filterAll: "ყველა",
    filterTech: "ტექნიკა",
    filterHome: "სახლი",
    btnAmazon: "ნახვა Amazon-ზე",
    btnDirect: "ყიდვა",
    codeLabel: "კოდი:",
    noResult: "პროდუქტი ვერ მოიძებნა.",
    badgeDirect: "მარაგშია",
    badgeAffiliate: "Amazon",
    footerText: "საუკეთესო ადგილი ვირუსული ნივთებისთვის."
  },
  RU: {
    heroTitle: "Находки TikTok и Эксклюзив",
    heroSub: "Введите код из видео (напр. 101), чтобы найти товар мгновенно.",
    searchPlaceholder: "Введите код (напр. 105) или имя...",
    navShop: "Магазин",
    navCourses: "Курсы (Скоро)",
    navBlog: "Блог",
    filterAll: "Все",
    filterTech: "Техника",
    filterHome: "Дом",
    btnAmazon: "На Amazon",
    btnDirect: "Купить Сейчас",
    codeLabel: "Код:",
    noResult: "Товар не найден.",
    badgeDirect: "Прямая продажа",
    badgeAffiliate: "Amazon",
    footerText: "Лучшее место для вирусных гаджетов."
  }
};

// --- პროდუქტების ბაზა ---
const productsData = [
  {
    id: 1,
    code: "101",
    type: "affiliate", 
    title: "Smart LED Lights RGB",
    titleIT: "Luci LED Smart RGB",
    price: "€25.99",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    link: "https://amazon.com/example", 
    rating: 4.8
  },
  {
    id: 2,
    code: "102",
    type: "dropshipping",
    title: "Premium Wireless Pods",
    titleIT: "Auricolari Premium Wireless",
    price: "€49.90",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    link: "https://stripe.com/checkout_link_example", 
    rating: 5.0
  },
  {
    id: 3,
    code: "103",
    type: "affiliate",
    title: "Portable Mini Blender",
    titleIT: "Mini Frullatore Portatile",
    price: "€32.00",
    category: "Home",
    image: "https://images.unsplash.com/photo-1570222094114-28a9d8896a74?auto=format&fit=crop&w=800&q=80",
    link: "#",
    rating: 4.6
  },
  {
    id: 4,
    code: "104",
    type: "dropshipping",
    title: "Galaxy Star Projector",
    titleIT: "Proiettore Stelle Galassia",
    price: "€39.99",
    category: "Home",
    image: "https://images.unsplash.com/photo-1534234828563-025972a7e7a4?auto=format&fit=crop&w=800&q=80",
    link: "#",
    rating: 4.9
  },
  {
    id: 5,
    code: "105",
    type: "affiliate",
    title: "Face Roller Set",
    titleIT: "Set Rullo per il Viso",
    price: "€15.50",
    category: "Home",
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9b9043?auto=format&fit=crop&w=800&q=80",
    link: "#",
    rating: 4.5
  }
];

export default function App() {
  const [lang, setLang] = useState('EN'); 
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const t = translations[lang];

  useEffect(() => {
    const filtered = productsData.filter(product => {
      const catMatch = activeCategory === 'All' || 
                       (activeCategory === 'Tech' && product.category === 'Tech') ||
                       (activeCategory === 'Home' && product.category === 'Home');
      
      const searchLower = searchQuery.toLowerCase();
      const titleToSearch = lang === 'IT' && product.titleIT ? product.titleIT : product.title;
      
      const nameMatch = titleToSearch.toLowerCase().includes(searchLower);
      const codeMatch = product.code.includes(searchLower);

      return catMatch && (nameMatch || codeMatch);
    });
    setFilteredProducts(filtered);
  }, [activeCategory, searchQuery, lang]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => {setSearchQuery(''); setActiveCategory('All')}}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">GMES<span className="text-indigo-600">HUB</span></span>
          </div>
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className="text-indigo-600 font-bold border-b-2 border-indigo-600 pb-1">{t.navShop}</a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition flex items-center gap-1">
              <GraduationCap size={16}/> {t.navCourses}
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600 transition flex items-center gap-1">
              <BookOpen size={16}/> {t.navBlog}
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-sm font-medium">
              <Globe size={14} className="text-gray-500 ml-1 mr-1"/>
              {['EN', 'IT', 'GE', 'RU'].map((l) => (
                <button 
                  key={l} 
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-md transition text-xs ${lang === l ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg absolute w-full z-50">
            <div className="flex justify-center space-x-2 pb-4 border-b">
               {['EN', 'IT', 'GE', 'RU'].map((l) => (
                <button key={l} onClick={() => {setLang(l); setIsMenuOpen(false)}} className={`px-3 py-2 rounded-lg font-bold ${lang === l ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-50 text-gray-600'}`}>
                  {l}
                </button>
              ))}
            </div>
            <a href="#" className="block text-lg font-medium text-indigo-600">{t.navShop}</a>
            <a href="#" className="block text-lg font-medium text-gray-500">{t.navCourses}</a>
            <a href="#" className="block text-lg font-medium text-gray-500">{t.navBlog}</a>
          </div>
        )}
      </header>
      <div className="bg-indigo-900 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">{t.heroTitle}</h1>
          <p className="text-indigo-200 text-lg mb-8">{t.heroSub}</p>
          <div className="bg-white p-2 rounded-2xl shadow-xl max-w-xl mx-auto flex items-center transform transition-all hover:scale-[1.01]">
            <div className="bg-gray-100 p-3 rounded-xl text-gray-500"><Search size={24} /></div>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className="flex-1 bg-transparent border-none outline-none text-gray-800 text-lg px-4 placeholder-gray-400 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && <button onClick={() => setSearchQuery('')} className="p-2 text-gray-400 hover:text-red-500"><X size={20}/></button>}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-grow">
        <div className="flex justify-center space-x-2 overflow-x-auto pb-6 mb-2 no-scrollbar">
          {['All', 'Tech', 'Home'].map((cat) => (
             <button
             key={cat}
             onClick={() => setActiveCategory(cat)}
             className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
               activeCategory === cat ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
             }`}
           >
             {cat === 'All' ? t.filterAll : cat === 'Tech' ? t.filterTech : t.filterHome}
           </button>
          ))}
        </div>
        {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4"/>
              <p className="text-gray-500 text-lg">{t.noResult}</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col h-full relative overflow-hidden">
                <div className={`absolute top-0 right-0 z-10 px-3 py-1 rounded-bl-xl text-xs font-bold text-white shadow-sm flex items-center gap-1
                  ${product.type === 'dropshipping' ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gray-800'}`}>
                  {product.type === 'dropshipping' ? <Zap size={12}/> : <ExternalLink size={12}/>}
                  {product.type === 'dropshipping' ? t.badgeDirect : t.badgeAffiliate}
                </div>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white text-sm font-bold px-3 py-1 rounded-md flex items-center gap-1 shadow-lg border border-white/20">
                    <Hash size={14} className="text-yellow-400"/> {product.code}
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{product.category}</span>
                      <div className="flex items-center text-yellow-500 text-xs font-bold">
                        <Star size={12} fill="currentColor" className="mr-1"/> {product.rating}
                      </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 line-clamp-2">
                    {lang === 'IT' && product.titleIT ? product.titleIT : product.title}
                  </h3>
                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                      <span className="text-xl font-bold text-gray-900">{product.price}</span>
                      <a 
                        href={product.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-sm
                          ${product.type === 'dropshipping' 
                            ? 'bg-green-500 hover:bg-green-600 text-white' 
                            : 'bg-yellow-400 hover:bg-yellow-500 text-black'}`}
                      >
                        {product.type === 'dropshipping' 
                          ? <><ShoppingCart size={16}/> {t.btnDirect}</> 
                          : <>{t.btnAmazon} <ArrowRight size={16}/></>}
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer className="bg-white border-t mt-auto py-8 text-center text-gray-500 text-sm">
        <div className="flex justify-center items-center gap-2 mb-4">
          <ShoppingBag className="text-indigo-600" size={20} />
          <span className="font-bold text-gray-800">GMES<span className="text-indigo-600">HUB</span></span>
        </div>
        <p className="mb-6 max-w-md mx-auto">{t.footerText}</p>
        <div className="flex justify-center gap-4 mb-4 text-xs uppercase tracking-wide">
          <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600">Terms</a>
          <a href="#" className="hover:text-indigo-600">Contact</a>
        </div>
        <p>© 2024 GMESHUB. All Rights Reserved.</p>
      </footer>
    </div>
  );
}