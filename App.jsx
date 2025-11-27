import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Globe, Menu, X, BookOpen, GraduationCap, ArrowRight, Star, Hash, ShoppingCart, ExternalLink, Zap, Moon, Sun } from 'lucide-react';

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
  // Dark Mode State - ამოწმებს კომპიუტერის პარამეტრებს, ან default არის false (Light)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const t = translations[lang];

  // Dark Mode ეფექტი
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // ფილტრაციის ლოგიკა
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
    // მთავარი კონტეინერი: bg-gray-100 (ღია ნაცრისფერი დღეს) და dark:bg-slate-900 (მუქი ღამით)
    <div className={`min-h-screen font-sans flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark bg-slate-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      
      {/* --- HEADER --- */}
      <header className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white/90 backdrop-blur-md border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          
          {/* ლოგო */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => {setSearchQuery(''); setActiveCategory('All')}}>
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/30">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <span className={`text-xl font-bold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              GMES<span className="text-indigo-500">HUB</span>
            </span>
          </div>

          {/* მენიუ (Desktop) */}
          <nav className="hidden md:flex space-x-8 items-center">
            <a href="#" className={`font-bold border-b-2 pb-1 transition-colors ${isDarkMode ? 'text-indigo-400 border-indigo-400' : 'text-indigo-600 border-indigo-600'}`}>
              {t.navShop}
            </a>
            <a href="#" className={`transition flex items-center gap-1 font-medium ${isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500 hover:text-indigo-600'}`}>
              <GraduationCap size={18}/> {t.navCourses}
            </a>
            <a href="#" className={`transition flex items-center gap-1 font-medium ${isDarkMode ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500 hover:text-indigo-600'}`}>
              <BookOpen size={18}/> {t.navBlog}
            </a>
          </nav>

          {/* მარჯვენა მხარე: ენა, Dark Mode, მენიუ */}
          <div className="flex items-center space-x-3">
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Language Switcher */}
            <div className={`hidden md:flex items-center space-x-1 px-2 py-1.5 rounded-full text-xs font-bold ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
              <Globe size={14} className={`ml-1 mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}/>
              {['EN', 'IT', 'GE', 'RU'].map((l) => (
                <button 
                  key={l} 
                  onClick={() => setLang(l)}
                  className={`px-2 py-1 rounded-md transition ${lang === l 
                    ? (isDarkMode ? 'bg-slate-600 text-white shadow' : 'bg-white text-indigo-600 shadow-sm') 
                    : (isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900')}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className={`md:hidden p-2 rounded-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* მობილური მენიუ (Dropdown) */}
        {isMenuOpen && (
          <div className={`md:hidden border-t p-4 space-y-4 shadow-xl absolute w-full z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'}`}>
            <div className="flex justify-center space-x-2 pb-4 border-b border-gray-200/20">
               {['EN', 'IT', 'GE', 'RU'].map((l) => (
                <button key={l} onClick={() => {setLang(l); setIsMenuOpen(false)}} 
                  className={`px-3 py-2 rounded-lg font-bold ${lang === l 
                    ? 'bg-indigo-600 text-white' 
                    : (isDarkMode ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-600')}`}>
                  {l}
                </button>
              ))}
            </div>
            <a href="#" className="block text-lg font-medium text-indigo-500">{t.navShop}</a>
            <a href="#" className={`block text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t.navCourses}</a>
            <a href="#" className={`block text-lg font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t.navBlog}</a>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <div className="relative py-20 px-4 text-center overflow-hidden">
        {/* დინამიური ფონი */}
        <div className={`absolute inset-0 transition-colors duration-500 ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900' : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900'}`}></div>
        
        {/* ორნამენტები */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full blur-[100px] opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-white drop-shadow-sm">
            {t.heroTitle}
          </h1>
          <p className="text-indigo-100 text-lg md:text-xl mb-10 font-medium opacity-90">
            {t.heroSub}
          </p>

          {/* ძებნის ველი */}
          <div className={`p-2 rounded-2xl shadow-2xl max-w-xl mx-auto flex items-center transform transition-all hover:scale-[1.01] ${isDarkMode ? 'bg-slate-800/80 backdrop-blur border border-slate-700' : 'bg-white'}`}>
            <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-slate-700 text-gray-400' : 'bg-gray-100 text-gray-500'}`}>
              <Search size={24} />
            </div>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder} 
              className={`flex-1 bg-transparent border-none outline-none text-lg px-4 h-12 ${isDarkMode ? 'text-white placeholder-gray-500' : 'text-gray-800 placeholder-gray-400'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-2 text-gray-400 hover:text-red-500 transition">
                <X size={20}/>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* --- მთავარი კონტენტი --- */}
      <div className="max-w-7xl mx-auto px-4 py-12 w-full flex-grow">
        
        {/* ფილტრები */}
        <div className="flex justify-center space-x-3 overflow-x-auto pb-8 mb-4 no-scrollbar">
          {['All', 'Tech', 'Home'].map((cat) => (
             <button
             key={cat}
             onClick={() => setActiveCategory(cat)}
             className={`px-8 py-2.5 rounded-full font-bold whitespace-nowrap transition-all duration-200 transform hover:-translate-y-0.5 ${
               activeCategory === cat 
                 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40' 
                 : (isDarkMode 
                      ? 'bg-slate-800 text-gray-300 border border-slate-700 hover:bg-slate-700' 
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-white hover:shadow-md')
             }`}
           >
             {cat === 'All' ? t.filterAll : cat === 'Tech' ? t.filterTech : t.filterHome}
           </button>
          ))}
        </div>

        {/* პროდუქტების ბადე (GRID) */}
        {filteredProducts.length === 0 ? (
            <div className={`text-center py-24 rounded-3xl border border-dashed ${isDarkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-300'}`}>
              <ShoppingBag size={64} className={`mx-auto mb-4 ${isDarkMode ? 'text-slate-600' : 'text-gray-300'}`}/>
              <p className={`text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.noResult}</p>
            </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className={`rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border group flex flex-col h-full relative overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-100 hover:border-indigo-100'}`}>
                
                {/* მარკერი */}
                <div className={`absolute top-0 right-0 z-10 px-4 py-1.5 rounded-bl-2xl text-xs font-bold text-white shadow-md flex items-center gap-1.5
                  ${product.type === 'dropshipping' ? 'bg-emerald-500' : 'bg-gray-800'}`}>
                  {product.type === 'dropshipping' ? <Zap size={12}/> : <ExternalLink size={12}/>}
                  {product.type === 'dropshipping' ? t.badgeDirect : t.badgeAffiliate}
                </div>

                {/* სურათი & კოდი */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div> {/* Placeholder */}
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="relative w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* კოდის ნიშანი */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-white text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-white/10">
                    <Hash size={14} className="text-yellow-400"/> 
                    <span className="tracking-wider">{product.code}</span>
                  </div>
                </div>

                {/* ინფორმაცია */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-1 rounded-md ${isDarkMode ? 'bg-slate-700 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>
                        {product.category}
                      </span>
                      <div className="flex items-center text-yellow-500 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded-full">
                        <Star size={12} fill="currentColor" className="mr-1"/> {product.rating}
                      </div>
                  </div>

                  <h3 className={`text-lg font-bold leading-tight mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                    {lang === 'IT' && product.titleIT ? product.titleIT : product.title}
                  </h3>
                  
                  <div className={`mt-auto pt-5 flex items-center justify-between border-t ${isDarkMode ? 'border-slate-700' : 'border-gray-100'}`}>
                      <span className={`text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{product.price}</span>
                      
                      {/* ღილაკი */}
                      <a 
                        href={product.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all transform active:scale-95 flex items-center gap-2 shadow-lg
                          ${product.type === 'dropshipping' 
                            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/30' 
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30'}`}
                      >
                        {product.type === 'dropshipping' 
                          ? <><ShoppingCart size={18}/> {t.btnDirect}</> 
                          : <>{t.btnAmazon} <ArrowRight size={18}/></>}
                      </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* --- FOOTER --- */}
      <footer className={`border-t py-12 mt-auto text-center text-sm transition-colors ${isDarkMode ? 'bg-slate-900 border-slate-800 text-gray-500' : 'bg-white border-gray-100 text-gray-500'}`}>
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
             <ShoppingBag className="text-white" size={18} />
          </div>
          <span className={`font-bold text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            GMES<span className="text-indigo-500">HUB</span>
          </span>
        </div>
        <p className="mb-8 max-w-md mx-auto opacity-80">{t.footerText}</p>
        <div className="flex justify-center gap-6 mb-8 text-xs font-bold uppercase tracking-widest opacity-60">
          <a href="#" className="hover:text-indigo-500 transition">Privacy</a>
          <a href="#" className="hover:text-indigo-500 transition">Terms</a>
          <a href="#" className="hover:text-indigo-500 transition">Contact</a>
        </div>
        <p className="opacity-40">© 2024 GMESHUB. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
