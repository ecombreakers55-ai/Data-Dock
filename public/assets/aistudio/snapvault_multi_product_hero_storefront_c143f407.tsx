import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Check, 
  Star, 
  Menu, 
  X, 
  ArrowRight, 
  MessageSquare, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ExternalLink,
  Heart,
  CheckCircle2,
  Gift,
  Flame,
  Download,
  Users
} from 'lucide-react';

// ==========================================
// CENTRAL CONFIGURATION & LINKS OBJECT
// Edit links, prices, products & branding here
// ==========================================
export const LINKS = {
  editingPack: "https://gumroad.com/l/example-editing-pack",
  aiReels: "https://gumroad.com/l/example-ai-reels",
  adobe: "https://gumroad.com/l/example-adobe-collection",
  socials: {
    instagram: "https://instagram.com/yourbrand",
    tiktok: "https://tiktok.com/@yourbrand",
    youtube: "https://youtube.com/@yourbrand",
    telegram: "https://t.me/yourbrand",
    whatsapp: "https://wa.me/1234567890"
  },
  supportEmail: "support@datadock.com"
};

const CONFIG = {
  brandName: "DATA DOCK",
  tagline: "Edit faster. Create bigger.",
  colors: {
    primary: "#6C2BD9",   // Electric Purple
    accent: "#FFD400",    // Bright Yellow
    pink: "#FF4D8D",      // Hot Pink
    bg: "#FFF8EC",        // Off-white cream
    ink: "#1A1A1A"        // Dark Ink
  },
  products: {
    editingPack: {
      id: "ultimate-editing-pack",
      name: "The Ultimate Editing Pack",
      tagline: "Presets, transitions, LUTs, overlays & sound effects that make your videos go viral.",
      price: "199৳",
      oldPrice: "999৳",
      badge: "👾 BEST SELLER",
      badgeBg: "bg-[#FFD400]",
      badgeText: "text-[#1A1A1A]",
      badgeShadow: "shadow-[3px_3px_0px_#1A1A1A]",
      linkKey: "editingPack",
      rating: "4.9/5 (1,240+ reviews)",
      image: "/assets/aistudio/ChatGPT_Image_Oct_5__2026__02_00_20_AM_e2208339.png",
      features: [
        "500+ Cinematic LUTs & Color Presets",
        "200+ Dynamic Transitions (SFX included)",
        "100+ 4K Overlay Textures & Light Leaks",
        "1,000+ Royalty-Free Sound Effects",
        "Compatible with Premiere, Final Cut, DaVinci & CapCut"
      ],
      description: "Stop spending endless hours tweaking keyframes and searching for sound effects. The Ultimate Editing Pack gives you instant access to production-grade assets used by top content creators worldwide."
    },
    aiReels: {
      id: "100k-ai-reels-mega-bundle",
      name: "100,000+ AI Reels Mega Bundle",
      tagline: "Massive library of ready-to-post AI reels to skyrocket your Instagram & TikTok growth.",
      price: "199৳",
      oldPrice: "1,499৳",
      badge: "🔥 HOT",
      badgeBg: "bg-[#FF4D8D]",
      badgeText: "text-white",
      badgeShadow: "shadow-[3px_3px_0px_#1A1A1A]",
      linkKey: "aiReels",
      rating: "4.8/5 (890+ reviews)",
      image: "/assets/aistudio/AI_Reels_Bundle_Promotional_Poster__1__c7b5a480.png",
      features: [
        "100,000+ HD Short-Form Videos (No Watermark)",
        "Pre-monetized Niches (Crypto, Luxury, Motivation, AI)",
        "Captions & Trending Audio Recommendations Included",
        "Organized Google Drive Folders - Instant One-Click Sync",
        "Commercial Resale Rights Included"
      ],
      description: "Scale faceless theme pages and client channels effortlessly with our 100K+ HD AI video database. High engagement guaranteed without spending a second editing."
    },
    adobe: {
      id: "adobe-master-collection",
      name: "Adobe Master Collection",
      tagline: "Complete suite of essential Adobe creation software for lifetime productivity.",
      price: "199৳",
      oldPrice: "1,999৳",
      badge: "🚀 MEGA DEAL",
      badgeBg: "bg-[#00E5FF]",
      badgeText: "text-[#1A1A1A]",
      badgeShadow: "shadow-[3px_3px_0px_#1A1A1A]",
      linkKey: "adobe",
      rating: "5.0/5 (2,100+ reviews)",
      image: "/assets/aistudio/Adobe_Master_Collection_Neon_Showcase_9277f38e.png",
      features: [
        "Full Access to Premiere Pro, After Effects, Photoshop & Illustrator",
        "Compatible with Windows & Mac OS (Intel & Apple Silicon)",
        "One-Time Payment - Lifetime Usage (No Monthly Subscriptions)",
        "Step-by-Step Easy Installation Video Guide",
        "Dedicated 24/7 Technical Support"
      ],
      description: "Unlock full creative freedom with the complete suite. Lifetime access with no recurring subscription fees."
    }
  }
};

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  emoji: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  price: string;
  oldPrice: string;
  badge: string;
  badgeBg: string;
  badgeText: string;
  badgeShadow: string;
  linkKey: string;
  rating: string;
  image: string;
  features: string[];
  description: string;
}

export function PriceTag({ price, className = "" }: { price: string; className?: string }) {
  if (!price) return null;
  if (price.includes('৳')) {
    const parts = price.split('৳');
    return (
      <span className={className}>
        <span>{parts[0]}</span>
        <span className="taka-symbol font-black">৳</span>
        <span>{parts[1]}</span>
      </span>
    );
  }
  return <span className={className}>{price}</span>;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [confetti, setConfetti] = useState<Particle[]>([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProductId]);

  // Trigger playful confetti burst
  const triggerConfetti = (e?: React.MouseEvent) => {
    const x = e?.clientX || window.innerWidth / 2;
    const y = e?.clientY || window.innerHeight / 2;
    const newParticles: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      color: ['#FFD400', '#FF4D8D', '#6C2BD9', '#00E5FF', '#FF9100'][Math.floor(Math.random() * 5)],
      emoji: ['⚡', '👾', '🎉', '🚀', '✨', '💎', '🎨'][Math.floor(Math.random() * 7)]
    }));
    setConfetti(prev => [...prev, ...newParticles]);
    setTimeout(() => {
      setConfetti(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 1200);
  };

  const navigateTo = (page: string, productId: string | null = null) => {
    setCurrentPage(page);
    if (productId) setSelectedProductId(productId);
    setIsMobileMenuOpen(false);
  };

  const handleBuyNow = (linkKey: string, e?: React.MouseEvent) => {
    triggerConfetti(e);
    const url = (LINKS as Record<string, any>)[linkKey] || "#";
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
    }, 200);
  };

  const productList: ProductItem[] = Object.values(CONFIG.products);
  const selectedProduct = productList.find(p => p.id === selectedProductId) || productList[0];

  return (
    <div className="min-h-screen bg-[#FFF8EC] text-[#1A1A1A] font-sans selection:bg-[#FFD400] selection:text-[#1A1A1A] overflow-x-hidden relative">
      
      {/* Dynamic Animated Particle Floating Layer */}
      {confetti.map((p) => (
        <div 
          key={p.id}
          className="fixed pointer-events-none z-50 text-2xl font-bold animate-ping"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            transform: `translate(${p.vx * 12}px, ${p.vy * 12}px)`,
            transition: 'all 1s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {p.emoji}
        </div>
      ))}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bowlby+One&family=Noto+Sans+Bengali:wght@700;800;900&family=Nunito:wght@400;600;700;800;900&display=swap');
        
        .font-display {
          font-family: 'Bowlby One', 'Noto Sans Bengali', cursive, sans-serif;
          font-weight: 900;
        }
        .font-body {
          font-family: 'Nunito', 'Noto Sans Bengali', sans-serif;
        }

        .taka-symbol {
          font-family: 'Noto Sans Bengali', sans-serif;
          font-weight: 900;
          display: inline-block;
          margin-left: 1.5px;
          -webkit-text-stroke: 0.04em currentColor;
          transform: translateY(-0.02em);
        }

        /* Playful Neo-brutalist Halftone Background */
        .bg-dot-pattern {
          background-image: radial-gradient(#1A1A1A 1.5px, transparent 1.5px);
          background-size: 18px 18px;
        }

        /* Playful Sticker Cards & Buttons */
        .sticker-card {
          background: #FFFFFF;
          border: 3.5px solid #1A1A1A;
          border-radius: 24px;
          box-shadow: 6px 6px 0px #1A1A1A;
          transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .sticker-card:hover {
          transform: translateY(-6px) rotate(-1deg);
          box-shadow: 10px 10px 0px #6C2BD9;
        }

        .sticker-btn {
          border: 3.5px solid #1A1A1A;
          border-radius: 18px;
          box-shadow: 5px 5px 0px #1A1A1A;
          font-weight: 900;
          transition: all 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .sticker-btn:hover {
          transform: translate(-3px, -3px) rotate(-1deg);
          box-shadow: 8px 8px 0px #FF4D8D;
        }
        .sticker-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 2px 2px 0px #1A1A1A;
        }

        /* Floating Keyframe Animations for Hero Product Cards */
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px) rotate(-4deg); }
          50% { transform: translateY(-16px) rotate(-1deg); }
        }
        @keyframes floatMedium {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-20px) rotate(6deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }

        .animate-float-slow {
          animation: floatSlow 4.5s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: floatMedium 5.2s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: floatFast 3.8s ease-in-out infinite;
        }

        /* Pause floating animation on hover for interactivity */
        .hero-floating-card:hover {
          animation-play-state: paused;
          z-index: 30 !important;
          transform: scale(1.04) rotate(0deg) !important;
          box-shadow: 12px 12px 0px #6C2BD9 !important;
        }

        /* Animations */
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: 200%;
          animation: marquee 14s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .animate-float-slow, .animate-float-medium, .animate-float-fast {
            animation: none !important;
          }
        }
      `}</style>

      {/* HEADER / STICKY NAV BAR */}
      <header className="sticky top-0 z-50 bg-[#FFF8EC]/95 backdrop-blur-md border-b-4 border-[#1A1A1A] px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={(e) => { triggerConfetti(e); navigateTo("home"); }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-12 h-12 bg-[#FFD400] border-3 border-[#1A1A1A] rounded-2xl flex items-center justify-center font-display text-2xl shadow-[4px_4px_0px_#1A1A1A] group-hover:rotate-12 transition-transform">
              ⚡
            </div>
            <div>
              <span className="font-display text-2xl md:text-3xl tracking-wide text-[#6C2BD9] block leading-none drop-shadow-[2px_2px_0px_#FFD400]">
                {CONFIG.brandName}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] block mt-1 bg-[#FFD400] px-2 py-0.5 rounded-full border border-[#1A1A1A]">
                {CONFIG.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-black text-sm tracking-wide">
            <button 
              onClick={() => navigateTo("home")} 
              className={`hover:text-[#6C2BD9] transition-colors ${currentPage === 'home' ? 'text-[#6C2BD9] underline underline-offset-8 decoration-4 decoration-[#FF4D8D]' : 'text-[#1A1A1A]'}`}
            >
              🕹️ Home
            </button>
            <button 
              onClick={() => navigateTo("products")} 
              className={`hover:text-[#6C2BD9] transition-colors ${currentPage === 'products' ? 'text-[#6C2BD9] underline underline-offset-8 decoration-4 decoration-[#FF4D8D]' : 'text-[#1A1A1A]'}`}
            >
              📦 Products
            </button>
            <button 
              onClick={() => navigateTo("about")} 
              className={`hover:text-[#6C2BD9] transition-colors ${currentPage === 'about' ? 'text-[#6C2BD9] underline underline-offset-8 decoration-4 decoration-[#FF4D8D]' : 'text-[#1A1A1A]'}`}
            >
              ✨ Mission
            </button>
            <button 
              onClick={() => navigateTo("contact")} 
              className={`hover:text-[#6C2BD9] transition-colors ${currentPage === 'contact' ? 'text-[#6C2BD9] underline underline-offset-8 decoration-4 decoration-[#FF4D8D]' : 'text-[#1A1A1A]'}`}
            >
              💬 Contact
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={(e) => { triggerConfetti(e); navigateTo("products"); }}
              className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-5 py-2.5 rounded-2xl flex items-center gap-2 text-sm uppercase tracking-wider font-display hover:bg-[#FFE033]"
            >
              <ShoppingBag size={18} />
              SHOP NOW
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 bg-[#FF4D8D] border-3 border-[#1A1A1A] rounded-2xl shadow-[3px_3px_0px_#1A1A1A] text-white focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 px-2 flex flex-col gap-3 border-t-4 border-[#1A1A1A] mt-3 bg-[#FFF8EC]">
            <button 
              onClick={() => navigateTo("home")} 
              className="sticker-btn text-left p-4 rounded-2xl bg-white text-[#1A1A1A] font-black flex justify-between items-center"
            >
              <span>🕹️ Home</span>
              <ArrowRight size={18} className="text-[#6C2BD9]" />
            </button>
            <button 
              onClick={() => navigateTo("products")} 
              className="sticker-btn text-left p-4 rounded-2xl bg-white text-[#1A1A1A] font-black flex justify-between items-center"
            >
              <span>📦 All Products</span>
              <ArrowRight size={18} className="text-[#6C2BD9]" />
            </button>
            <button 
              onClick={() => navigateTo("about")} 
              className="sticker-btn text-left p-4 rounded-2xl bg-white text-[#1A1A1A] font-black flex justify-between items-center"
            >
              <span>✨ Creator Mission</span>
              <ArrowRight size={18} className="text-[#6C2BD9]" />
            </button>
            <button 
              onClick={() => navigateTo("contact")} 
              className="sticker-btn text-left p-4 rounded-2xl bg-white text-[#1A1A1A] font-black flex justify-between items-center"
            >
              <span>💬 Contact Support</span>
              <ArrowRight size={18} className="text-[#6C2BD9]" />
            </button>
            <button 
              onClick={(e) => { triggerConfetti(e); navigateTo("products"); }}
              className="sticker-btn bg-[#FFD400] text-[#1A1A1A] p-4 rounded-2xl text-center font-display text-base uppercase mt-2 flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} />
              EXPLORE ALL BUNDLES
            </button>
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10">
        {currentPage === "home" && (
          <HomePage 
            navigateTo={navigateTo} 
            handleBuyNow={handleBuyNow} 
            productList={productList} 
            activeFaq={activeFaq} 
            setActiveFaq={setActiveFaq} 
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentPage === "products" && (
          <ProductsPage 
            navigateTo={navigateTo} 
            handleBuyNow={handleBuyNow} 
            productList={productList} 
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentPage === "product-detail" && (
          <ProductDetailPage 
            product={selectedProduct} 
            navigateTo={navigateTo} 
            handleBuyNow={handleBuyNow} 
            productList={productList} 
            triggerConfetti={triggerConfetti}
          />
        )}

        {currentPage === "about" && <AboutPage navigateTo={navigateTo} />}
        {currentPage === "contact" && <ContactPage />}
        {currentPage === "terms" && <TermsPage />}
        {currentPage === "privacy" && <PrivacyPage />}
        {currentPage === "refund" && <RefundPage />}
      </main>

      {/* FOOTER ("STAY WITH US") */}
      <footer className="bg-[#6C2BD9] text-white border-t-4 border-[#1A1A1A] pt-16 pb-12 px-4 md:px-8 relative overflow-hidden">
        
        {/* Floating Playful Stickers */}
        <div className="absolute top-6 left-6 bg-[#FFD400] text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-black rotate-[-12deg] border-3 border-[#1A1A1A] hidden md:block shadow-[3px_3px_0px_#1A1A1A]">
          👾 CREATOR VAULT
        </div>
        <div className="absolute top-10 right-10 bg-[#00E5FF] text-[#1A1A1A] px-4 py-1.5 rounded-full text-xs font-black rotate-[8deg] border-3 border-[#1A1A1A] hidden md:block shadow-[3px_3px_0px_#1A1A1A]">
          🚀 100% INSTANT DOWNLOADS
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-[#FF4D8D] text-white px-5 py-1.5 rounded-full border-3 border-[#1A1A1A] font-display text-xs uppercase tracking-widest shadow-[3px_3px_0px_#1A1A1A] mb-4 rotate-1">
            ✨ DON'T BE A STRANGER
          </div>

          <h2 
            onClick={(e) => triggerConfetti(e)}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wider text-[#FFD400] cursor-pointer transform -rotate-1 drop-shadow-[5px_5px_0px_#1A1A1A] hover:rotate-2 transition-transform mb-4"
          >
            STAY WITH US
          </h2>

          <p className="text-lg md:text-xl font-extrabold max-w-lg mx-auto text-white/90 mb-8">
            Don't be a stranger! Follow us for secret creator drops, free presets, and daily editing shortcuts.
          </p>

          {/* Social Stickers */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <a 
              href={LINKS.socials.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticker-btn bg-[#FF4D8D] text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-base font-display"
            >
              <span>📸 INSTAGRAM</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href={LINKS.socials.tiktok} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticker-btn bg-[#00E5FF] text-[#1A1A1A] px-5 py-3 rounded-2xl flex items-center gap-2 text-base font-display"
            >
              <span>🎵 TIKTOK</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href={LINKS.socials.youtube} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticker-btn bg-[#FF0000] text-white px-5 py-3 rounded-2xl flex items-center gap-2 text-base font-display"
            >
              <span>📺 YOUTUBE</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href={LINKS.socials.telegram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-5 py-3 rounded-2xl flex items-center gap-2 text-base font-display"
            >
              <span>✈️ TELEGRAM</span>
              <ExternalLink size={16} />
            </a>
            <a 
              href={LINKS.socials.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="sticker-btn bg-[#25D366] text-[#1A1A1A] px-5 py-3 rounded-2xl flex items-center gap-2 text-base font-display"
            >
              <span>💬 WHATSAPP</span>
              <ExternalLink size={16} />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 text-sm font-black">
            <button onClick={() => navigateTo("home")} className="hover:text-[#FFD400] transition-colors">🕹️ Home</button>
            <button onClick={() => navigateTo("products")} className="hover:text-[#FFD400] transition-colors">📦 Products</button>
            <button onClick={() => navigateTo("about")} className="hover:text-[#FFD400] transition-colors">✨ Our Story</button>
            <button onClick={() => navigateTo("contact")} className="hover:text-[#FFD400] transition-colors">💬 Support</button>
            <button onClick={() => navigateTo("terms")} className="hover:text-[#FFD400] transition-colors">Terms of Use</button>
            <button onClick={() => navigateTo("privacy")} className="hover:text-[#FFD400] transition-colors">Privacy Policy</button>
            <button onClick={() => navigateTo("refund")} className="hover:text-[#FFD400] transition-colors">Refund Guarantee</button>
            <a href={`mailto:${LINKS.supportEmail}`} className="hover:text-[#FFD400] transition-colors">Email Help</a>
          </div>

          <div className="border-t-3 border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-black text-white/80">
            <div>
              © {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.
            </div>
            <div className="flex items-center gap-2 bg-[#1A1A1A] text-white px-4 py-2 rounded-full border-2 border-[#1A1A1A]">
              <span>Made with caffeine & way too many reels</span>
              <Heart size={14} className="fill-[#FF4D8D] text-[#FF4D8D] inline" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface HomePageProps {
  navigateTo: (page: string, productId?: string | null) => void;
  handleBuyNow: (linkKey: string, e?: React.MouseEvent) => void;
  productList: ProductItem[];
  activeFaq: number | null;
  setActiveFaq: React.Dispatch<React.SetStateAction<number | null>>;
  triggerConfetti: (e?: React.MouseEvent) => void;
}

function HomePage({ navigateTo, handleBuyNow, productList, activeFaq, setActiveFaq, triggerConfetti }: HomePageProps) {
  return (
    <div>
      {/* ENRICHED HIGH-ENERGY HERO SECTION */}
      <section className="relative pt-10 pb-20 md:pt-16 md:pb-28 px-4 md:px-8 border-b-4 border-[#1A1A1A] overflow-hidden bg-[#FFF8EC]">
        
        {/* Colorful Radial Glow & Halftone Overlay */}
        <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFD400]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF4D8D]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* LEFT COLUMN: ENRICHED TYPOGRAPHY & TRUST STICKERS */}
          <div className="lg:col-span-6 text-center lg:text-left">
            
            {/* Top Ticker Sticker with Avatar Ring */}
            <div 
              onClick={(e) => triggerConfetti(e)}
              className="cursor-pointer inline-flex items-center gap-3 bg-white text-[#1A1A1A] border-3 border-[#1A1A1A] px-3.5 py-2 rounded-2xl font-black text-xs md:text-sm shadow-[4px_4px_0px_#1A1A1A] mb-6 transform -rotate-1 hover:rotate-1 transition-transform"
            >
              {/* Avatar Stack */}
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="Avatar 1" className="w-7 h-7 rounded-full border-2 border-[#1A1A1A] object-cover" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80" alt="Avatar 2" className="w-7 h-7 rounded-full border-2 border-[#1A1A1A] object-cover" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80" alt="Avatar 3" className="w-7 h-7 rounded-full border-2 border-[#1A1A1A] object-cover" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] animate-pulse border border-[#1A1A1A]"></span>
                <span className="font-extrabold text-[#1A1A1A]">25,000+ CREATORS BOOSTED</span>
                <div className="flex text-[#FFD400]">
                  <Star size={14} className="fill-[#FFD400] text-[#1A1A1A]" />
                  <Star size={14} className="fill-[#FFD400] text-[#1A1A1A]" />
                  <Star size={14} className="fill-[#FFD400] text-[#1A1A1A]" />
                </div>
              </div>
            </div>

            {/* Chunky Sticker Headline */}
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl leading-[1.08] text-[#1A1A1A] mb-6 tracking-wide drop-shadow-[2px_2px_0px_#FFD400]">
              EDIT <span className="bg-[#FF4D8D] text-white px-4 py-1 rounded-3xl inline-block transform rotate-2 border-3 border-[#1A1A1A] shadow-[5px_5px_0px_#1A1A1A]">FASTER.</span> <br />
              CREATE <span className="bg-[#6C2BD9] text-white px-4 py-1 rounded-3xl inline-block transform -rotate-2 border-3 border-[#1A1A1A] shadow-[5px_5px_0px_#FFD400]">BIGGER.</span>
            </h1>

            <p className="text-lg md:text-2xl font-extrabold text-[#1A1A1A]/85 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Supercharge your workflow with high-octane editing presets, cinematic LUTs, 100K+ AI reels & complete lifetime software suites.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <button 
                onClick={(e) => { triggerConfetti(e); navigateTo("products"); }}
                className="sticker-btn w-full sm:w-auto bg-[#FFD400] text-[#1A1A1A] px-8 py-4.5 rounded-2xl font-display text-lg uppercase flex items-center justify-center gap-3 hover:bg-[#FFE033]"
              >
                <ShoppingBag size={22} />
                EXPLORE ALL BUNDLES
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById('featured-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="sticker-btn w-full sm:w-auto bg-white text-[#1A1A1A] px-8 py-4.5 rounded-2xl font-display text-lg uppercase flex items-center justify-center gap-2 hover:bg-[#FFF8EC]"
              >
                <span>SEE HOT DEALS</span>
                <ChevronDown size={22} className="text-[#6C2BD9]" />
              </button>
            </div>

            {/* Quick Trust Bullets Strip */}
            <div className="pt-6 border-t-3 border-[#1A1A1A]/20 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-black text-[#1A1A1A]">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
                ⚡ Instant Download
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
                🔒 100% Safe Checkout
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border-2 border-[#1A1A1A] shadow-[2px_2px_0px_#1A1A1A]">
                ♾️ Lifetime License
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: RICH RICH ENRICHED FLOATING 3-CARD SHOWCASE */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[460px] md:min-h-[520px]">
            
            {/* Background Lightburst & Graphic Accents */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 bg-[#FFD400] rounded-full border-4 border-[#1A1A1A] shadow-[8px_8px_0px_#1A1A1A] opacity-20 transform rotate-12"></div>
            </div>

            {/* FLOATING DECORATIVE STICKER BADGES AROUND THE CARDS */}
            <div className="absolute -top-4 left-2 z-40 bg-[#FFD400] text-[#1A1A1A] border-3 border-[#1A1A1A] px-3.5 py-1.5 rounded-2xl font-display text-xs tracking-wider shadow-[4px_4px_0px_#1A1A1A] transform -rotate-12 hover:scale-110 transition-transform cursor-pointer">
              ⚡ 100% INSTANT ACCESS
            </div>

            <div className="absolute top-8 -right-2 z-40 bg-[#FF4D8D] text-white border-3 border-[#1A1A1A] px-3.5 py-1.5 rounded-2xl font-display text-xs tracking-wider shadow-[4px_4px_0px_#1A1A1A] transform rotate-12 hover:scale-110 transition-transform cursor-pointer">
              🔥 UP TO 70% OFF
            </div>

            <div className="absolute -bottom-4 left-6 z-40 bg-[#00E5FF] text-[#1A1A1A] border-3 border-[#1A1A1A] px-3.5 py-1.5 rounded-2xl font-display text-xs tracking-wider shadow-[4px_4px_0px_#1A1A1A] transform -rotate-6 hover:scale-110 transition-transform cursor-pointer">
              💎 LIFETIME UPDATES
            </div>

            <div className="absolute -bottom-2 right-4 z-40 bg-[#6C2BD9] text-white border-3 border-[#1A1A1A] px-3.5 py-1.5 rounded-2xl font-display text-xs tracking-wider shadow-[4px_4px_0px_#1A1A1A] transform rotate-6 hover:scale-110 transition-transform cursor-pointer">
              🎬 NO SUBSCRIPTION
            </div>

            {/* FLOATING PRODUCT CARDS CONTAINER */}
            <div className="relative w-full max-w-lg h-full flex items-center justify-center">
              
              {/* PRODUCT 1: ULTIMATE EDITING PACK (Floating Left/Top) */}
              <div 
                className="hero-floating-card animate-float-slow absolute top-0 left-0 w-64 md:w-72 bg-white border-3.5 border-[#1A1A1A] rounded-2xl p-3 shadow-[6px_6px_0px_#1A1A1A] z-20 cursor-pointer"
                onClick={() => navigateTo("product-detail", productList[0].id)}
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-[#1A1A1A] mb-2.5 h-32">
                  <img src={productList[0].image} alt={productList[0].name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#FFD400] text-[#1A1A1A] font-display text-[10px] px-2 py-0.5 rounded-lg border border-[#1A1A1A]">
                    {productList[0].badge}
                  </span>
                </div>
                <h3 className="font-display text-sm text-[#1A1A1A] line-clamp-1">{productList[0].name}</h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A1A1A]/20">
                  <PriceTag price={productList[0].price} className="font-display text-lg text-[#6C2BD9]" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleBuyNow(productList[0].linkKey, e); }}
                    className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-2.5 py-1 text-[10px] font-display uppercase"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>

              {/* PRODUCT 2: 100,000+ AI REELS MEGA BUNDLE (Floating Right/Center) */}
              <div 
                className="hero-floating-card animate-float-medium absolute top-16 right-0 w-64 md:w-72 bg-white border-3.5 border-[#1A1A1A] rounded-2xl p-3 shadow-[6px_6px_0px_#1A1A1A] z-10 cursor-pointer"
                onClick={() => navigateTo("product-detail", productList[1].id)}
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-[#1A1A1A] mb-2.5 h-32">
                  <img src={productList[1].image} alt={productList[1].name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#FF4D8D] text-white font-display text-[10px] px-2 py-0.5 rounded-lg border border-[#1A1A1A]">
                    {productList[1].badge}
                  </span>
                </div>
                <h3 className="font-display text-sm text-[#1A1A1A] line-clamp-1">{productList[1].name}</h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A1A1A]/20">
                  <PriceTag price={productList[1].price} className="font-display text-lg text-[#FF4D8D]" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleBuyNow(productList[1].linkKey, e); }}
                    className="sticker-btn bg-[#FF4D8D] text-white px-2.5 py-1 text-[10px] font-display uppercase"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>

              {/* PRODUCT 3: ADOBE MASTER COLLECTION (Floating Bottom/Center) */}
              <div 
                className="hero-floating-card animate-float-fast absolute bottom-2 left-10 md:left-14 w-64 md:w-72 bg-white border-3.5 border-[#1A1A1A] rounded-2xl p-3 shadow-[6px_6px_0px_#1A1A1A] z-25 cursor-pointer"
                onClick={() => navigateTo("product-detail", productList[2].id)}
              >
                <div className="relative rounded-xl overflow-hidden border-2 border-[#1A1A1A] mb-2.5 h-32">
                  <img src={productList[2].image} alt={productList[2].name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#00E5FF] text-[#1A1A1A] font-display text-[10px] px-2 py-0.5 rounded-lg border border-[#1A1A1A]">
                    {productList[2].badge}
                  </span>
                </div>
                <h3 className="font-display text-sm text-[#1A1A1A] line-clamp-1">{productList[2].name}</h3>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#1A1A1A]/20">
                  <PriceTag price={productList[2].price} className="font-display text-lg text-[#00E5FF]" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleBuyNow(productList[2].linkKey, e); }}
                    className="sticker-btn bg-[#00E5FF] text-[#1A1A1A] px-2.5 py-1 text-[10px] font-display uppercase"
                  >
                    BUY NOW
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* PLAYFUL COLORFUL MARQUEE */}
      <section className="bg-[#6C2BD9] text-white border-b-4 border-[#1A1A1A] py-3.5 overflow-hidden font-display text-base tracking-wider uppercase">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center font-black">
          <span className="text-[#FFD400]">⚡ INSTANT DOWNLOAD</span>
          <span>•</span>
          <span>👾 LIFETIME ACCESS</span>
          <span>•</span>
          <span className="text-[#00E5FF]">🔥 NEW UPDATES</span>
          <span>•</span>
          <span>💬 24/7 SUPPORT</span>
          <span>•</span>
          <span className="text-[#FFD400]">⚡ INSTANT DOWNLOAD</span>
          <span>•</span>
          <span>👾 LIFETIME ACCESS</span>
          <span>•</span>
          <span className="text-[#00E5FF]">🔥 NEW UPDATES</span>
          <span>•</span>
          <span>💬 24/7 SUPPORT</span>
          <span>•</span>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section id="featured-products" className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-block bg-[#FF4D8D] text-white font-display text-xs px-4 py-1.5 rounded-full border-3 border-[#1A1A1A] uppercase tracking-widest shadow-[3px_3px_0px_#1A1A1A] mb-3 transform rotate-1">
            ✨ POPULAR DROPS
          </div>
          <h2 className="font-display text-4xl sm:text-6xl text-[#1A1A1A] tracking-wide">
            FEATURED BUNDLES
          </h2>
          <p className="text-base md:text-xl font-extrabold text-[#1A1A1A]/70 mt-3">
            Hand-crafted digital toolkits engineered for creators, editors & growth pages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productList.map((product: ProductItem, idx: number) => (
            <div 
              key={product.id}
              className={`sticker-card p-6 flex flex-col justify-between relative ${idx === 0 ? 'transform -rotate-1' : idx === 1 ? 'transform rotate-1' : 'transform -rotate-0.5'}`}
            >
              <div className="absolute -top-4 right-6">
                <span className={`inline-block font-display text-xs px-4 py-1.5 rounded-xl border-3 border-[#1A1A1A] uppercase tracking-wider ${product.badgeBg} ${product.badgeText} ${product.badgeShadow}`}>
                  {product.badge}
                </span>
              </div>

              <div>
                <div 
                  onClick={() => navigateTo("product-detail", product.id)}
                  className="rounded-2xl border-3 border-[#1A1A1A] overflow-hidden mb-6 cursor-pointer group relative"
                >
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-4 py-2 rounded-xl text-xs font-display">
                      QUICK VIEW 👁️
                    </span>
                  </div>
                </div>

                <h3 
                  onClick={() => navigateTo("product-detail", product.id)}
                  className="font-display text-2xl text-[#1A1A1A] hover:text-[#6C2BD9] cursor-pointer leading-tight mb-2"
                >
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-[#1A1A1A]/70 mb-6 leading-relaxed">
                  {product.tagline}
                </p>

                <div className="space-y-2.5 mb-6 bg-[#FFF8EC] p-4 rounded-2xl border-2 border-[#1A1A1A]">
                  {product.features.slice(0, 4).map((feat: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs font-black text-[#1A1A1A]">
                      <div className="bg-[#6C2BD9] p-0.5 rounded-full text-white mt-0.5 border border-[#1A1A1A]">
                        <Check size={12} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t-2 border-[#1A1A1A]/20">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <PriceTag price={product.price} className="font-display text-3xl text-[#6C2BD9]" />
                    <PriceTag price={product.oldPrice} className="text-sm font-black text-gray-400 line-through ml-2" />
                  </div>
                  <span className="text-[11px] font-black text-[#1A1A1A] bg-[#FFD400] px-3 py-1 rounded-full border border-[#1A1A1A]">
                    LIFETIME
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => navigateTo("product-detail", product.id)}
                    className="sticker-btn bg-white text-[#1A1A1A] py-3 rounded-xl text-xs font-display uppercase tracking-wider text-center hover:bg-[#FFF8EC]"
                  >
                    DETAILS
                  </button>
                  <button 
                    onClick={(e) => handleBuyNow(product.linkKey, e)}
                    className="sticker-btn bg-[#FFD400] text-[#1A1A1A] py-3 rounded-xl text-xs font-display uppercase tracking-wider flex items-center justify-center gap-1"
                  >
                    <span>BUY NOW</span>
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* "WHY CHOOSE US" STICKER GRID */}
      <section className="py-20 md:py-28 bg-[#6C2BD9] text-white border-y-4 border-[#1A1A1A] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-6xl text-[#FFD400]">
              WHY CREATORS CHOOSE US
            </h2>
            <p className="text-base md:text-xl font-extrabold text-white/80 mt-3">
              No subscriptions. Pure creator power tools delivered instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="sticker-card p-6 text-[#1A1A1A] transform -rotate-1">
              <div className="w-14 h-14 bg-[#FFD400] rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#1A1A1A]">
                <Zap size={28} className="text-[#1A1A1A]" />
              </div>
              <h3 className="font-display text-xl mb-2">INSTANT ACCESS</h3>
              <p className="text-sm font-bold text-[#1A1A1A]/70">
                Get direct high-speed download links in your email immediately after checkout.
              </p>
            </div>

            <div className="sticker-card p-6 text-[#1A1A1A] transform rotate-1">
              <div className="w-14 h-14 bg-[#FF4D8D] text-white rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#1A1A1A]">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-display text-xl mb-2">PLUG & PLAY</h3>
              <p className="text-sm font-bold text-[#1A1A1A]/70">
                Drag-and-drop presets with easy video installation guides included.
              </p>
            </div>

            <div className="sticker-card p-6 text-[#1A1A1A] transform -rotate-1">
              <div className="w-14 h-14 bg-[#00E5FF] text-[#1A1A1A] rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#1A1A1A]">
                <Clock size={28} />
              </div>
              <h3 className="font-display text-xl mb-2">LIFETIME LICENSE</h3>
              <p className="text-sm font-bold text-[#1A1A1A]/70">
                Pay once, keep forever. Receive free future updates with no recurring fees.
              </p>
            </div>

            <div className="sticker-card p-6 text-[#1A1A1A] transform rotate-1">
              <div className="w-14 h-14 bg-[#FFD400] text-[#1A1A1A] rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#1A1A1A]">
                <MessageSquare size={28} />
              </div>
              <h3 className="font-display text-xl mb-2">24/7 SUPPORT</h3>
              <p className="text-sm font-bold text-[#1A1A1A]/70">
                Dedicated WhatsApp and Email support from actual video editors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-display text-xs text-[#1A1A1A] bg-[#FFD400] px-4 py-1.5 rounded-full border-3 border-[#1A1A1A] inline-block mb-3 shadow-[3px_3px_0px_#1A1A1A]">
            3 EASY STEPS
          </span>
          <h2 className="font-display text-4xl sm:text-6xl text-[#1A1A1A]">
            HOW IT WORKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="sticker-card p-8 text-center">
            <div className="w-14 h-14 bg-[#FF4D8D] text-white font-display text-2xl rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_#1A1A1A]">
              1
            </div>
            <h3 className="font-display text-2xl mb-3 text-[#1A1A1A]">CHOOSE BUNDLE</h3>
            <p className="text-sm font-bold text-[#1A1A1A]/70">
              Select the digital product tailored for your editing software or social media goals.
            </p>
          </div>

          <div className="sticker-card p-8 text-center">
            <div className="w-14 h-14 bg-[#FFD400] text-[#1A1A1A] font-display text-2xl rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_#1A1A1A]">
              2
            </div>
            <h3 className="font-display text-2xl mb-3 text-[#1A1A1A]">CHECKOUT</h3>
            <p className="text-sm font-bold text-[#1A1A1A]/70">
              Complete your order safely with 1-click encrypted payment options.
            </p>
          </div>

          <div className="sticker-card p-8 text-center">
            <div className="w-14 h-14 bg-[#00E5FF] text-[#1A1A1A] font-display text-2xl rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_#1A1A1A]">
              3
            </div>
            <h3 className="font-display text-2xl mb-3 text-[#1A1A1A]">DOWNLOAD & EDIT</h3>
            <p className="text-sm font-bold text-[#1A1A1A]/70">
              Receive your personal Google Drive and cloud links in seconds and start creating.
            </p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SLIDER / CARDS */}
      <section className="py-20 md:py-28 bg-[#FFF8EC] border-t-4 border-[#1A1A1A] px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-display text-4xl sm:text-6xl text-[#1A1A1A]">
              WHAT CREATORS SAY
            </h2>
            <p className="text-base font-bold text-[#1A1A1A]/70 mt-2">
              Join thousands of video creators who edit faster with {CONFIG.brandName}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="sticker-card p-6 transform -rotate-1">
              <div className="flex text-[#FFD400] mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#FFD400] text-[#1A1A1A]" />)}
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]/80 mb-6">
                "The Ultimate Editing Pack reduced my premiere editing time by at least 50%. The sound transitions are incredible!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#FF4D8D] text-white font-display rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-sm">
                  MK
                </div>
                <div>
                  <h4 className="font-display text-sm text-[#1A1A1A]">Mark K.</h4>
                  <p className="text-xs font-black text-[#1A1A1A]/60">YouTube Creator (250K subs)</p>
                </div>
              </div>
            </div>

            <div className="sticker-card p-6 transform rotate-1">
              <div className="flex text-[#FFD400] mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#FFD400] text-[#1A1A1A]" />)}
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]/80 mb-6">
                "The 100K AI Reels Bundle helped me explode my theme page from scratch. High quality video content with zero watermark."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#00E5FF] text-[#1A1A1A] font-display rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-sm">
                  SL
                </div>
                <div>
                  <h4 className="font-display text-sm text-[#1A1A1A]">Sarah L.</h4>
                  <p className="text-xs font-black text-[#1A1A1A]/60">Social Growth Manager</p>
                </div>
              </div>
            </div>

            <div className="sticker-card p-6 transform -rotate-1">
              <div className="flex text-[#FFD400] mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} className="fill-[#FFD400] text-[#1A1A1A]" />)}
              </div>
              <p className="text-sm font-extrabold text-[#1A1A1A]/80 mb-6">
                "Instant download link worked within 5 seconds. All presets imported smoothly into CapCut and Premiere."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-[#FFD400] text-[#1A1A1A] font-display rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-sm">
                  DR
                </div>
                <div>
                  <h4 className="font-display text-sm text-[#1A1A1A]">David R.</h4>
                  <p className="text-xs font-black text-[#1A1A1A]/60">Commercial Video Editor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION SECTION */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl sm:text-6xl text-[#1A1A1A]">
            FREQUENTLY ASKED
          </h2>
          <p className="text-base font-bold text-[#1A1A1A]/70 mt-2">
            Got questions? We've got straight answers.
          </p>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How do I receive my digital files after purchase?",
              a: "Immediately after checkout, you will receive an automated email containing your personal direct download links and cloud storage access keys."
            },
            {
              q: "Are these assets compatible with my video editing software?",
              a: "Yes! Our presets, LUTs, and overlays are universally formatted (.cube, .mp4, .wav, .prproj) and work with Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve, After Effects, and CapCut."
            },
            {
              q: "Is this a monthly subscription or a one-time fee?",
              a: "All items on DATA DOCK are 100% one-time payments. No hidden recurring fees or monthly subscriptions ever."
            },
            {
              q: "Can I use these assets for commercial client projects?",
              a: "Yes! All bundles come with a commercial use license allowing you to use them in client videos, monetized YouTube channels, and ads."
            }
          ].map((faq, index) => (
            <div key={index} className="sticker-card overflow-hidden">
              <button 
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full p-5 text-left font-display text-lg text-[#1A1A1A] flex items-center justify-between gap-4 focus:outline-none"
              >
                <span>{faq.q}</span>
                {activeFaq === index ? <ChevronUp size={20} className="text-[#6C2BD9]" /> : <ChevronDown size={20} className="text-[#6C2BD9]" />}
              </button>
              {activeFaq === index && (
                <div className="px-5 pb-5 text-sm font-bold text-[#1A1A1A]/80 border-t-2 border-[#1A1A1A]/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="sticker-card bg-[#FFD400] text-[#1A1A1A] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="font-display text-4xl sm:text-6xl text-[#1A1A1A] mb-4">
              READY TO UPGRADE YOUR EDITS?
            </h2>
            <p className="text-lg font-black mb-8 text-[#1A1A1A]/80">
              Download the ultimate creator bundle today and level up your visual output instantly.
            </p>
            <button 
              onClick={(e) => { triggerConfetti(e); navigateTo("products"); }}
              className="sticker-btn bg-[#6C2BD9] text-white px-10 py-5 rounded-2xl font-display text-xl uppercase inline-flex items-center gap-3"
            >
              <ShoppingBag size={24} />
              GET INSTANT ACCESS NOW
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// ALL PRODUCTS PAGE COMPONENT
// ==========================================
interface ProductsPageProps {
  navigateTo: (page: string, productId?: string | null) => void;
  handleBuyNow: (linkKey: string, e?: React.MouseEvent) => void;
  productList: ProductItem[];
  triggerConfetti: (e?: React.MouseEvent) => void;
}

function ProductsPage({ navigateTo, handleBuyNow, productList, triggerConfetti }: ProductsPageProps) {
  return (
    <div className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-display text-xs bg-[#FFD400] text-[#1A1A1A] px-4 py-1.5 rounded-full border-3 border-[#1A1A1A] uppercase tracking-wider inline-block mb-3 shadow-[3px_3px_0px_#1A1A1A]">
          COMPLETE CATALOG
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-[#1A1A1A]">
          ALL DIGITAL BUNDLES
        </h1>
        <p className="text-base md:text-lg font-bold text-[#1A1A1A]/70 mt-3">
          Explore our complete lineup of creator packs. Instant download links delivered immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productList.map((product: ProductItem) => (
          <div key={product.id} className="sticker-card p-6 flex flex-col justify-between">
            <div>
              <div 
                onClick={() => navigateTo("product-detail", product.id)}
                className="rounded-2xl border-3 border-[#1A1A1A] overflow-hidden mb-6 cursor-pointer group"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>

              <span className={`inline-block font-display text-xs px-3 py-1 rounded-xl border-3 border-[#1A1A1A] mb-3 ${product.badgeBg} ${product.badgeText} ${product.badgeShadow}`}>
                {product.badge}
              </span>

              <h2 
                onClick={() => navigateTo("product-detail", product.id)}
                className="font-display text-2xl text-[#1A1A1A] hover:text-[#6C2BD9] cursor-pointer mb-2"
              >
                {product.name}
              </h2>

              <p className="text-sm font-bold text-[#1A1A1A]/70 mb-6">
                {product.tagline}
              </p>

              <div className="space-y-2 mb-6 bg-[#FFF8EC] p-4 rounded-2xl border-2 border-[#1A1A1A]">
                {product.features.map((feat: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-black text-[#1A1A1A]">
                    <Check size={14} className="text-[#6C2BD9]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t-2 border-[#1A1A1A]/20">
              <div className="flex items-baseline justify-between mb-4">
                <PriceTag price={product.price} className="font-display text-3xl text-[#6C2BD9]" />
                <PriceTag price={product.oldPrice} className="text-sm font-bold text-gray-400 line-through" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => navigateTo("product-detail", product.id)}
                  className="sticker-btn bg-white text-[#1A1A1A] py-3 rounded-xl text-xs font-display uppercase text-center"
                >
                  VIEW PACK
                </button>
                <button 
                  onClick={(e) => handleBuyNow(product.linkKey, e)}
                  className="sticker-btn bg-[#FFD400] text-[#1A1A1A] py-3 rounded-xl text-xs font-display uppercase flex items-center justify-center gap-1"
                >
                  <span>BUY NOW</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// PRODUCT DETAIL PAGE COMPONENT
// ==========================================
interface ProductDetailPageProps {
  product: ProductItem;
  navigateTo: (page: string, productId?: string | null) => void;
  handleBuyNow: (linkKey: string, e?: React.MouseEvent) => void;
  productList: ProductItem[];
  triggerConfetti: (e?: React.MouseEvent) => void;
}

function ProductDetailPage({ product, navigateTo, handleBuyNow, productList, triggerConfetti }: ProductDetailPageProps) {
  if (!product) return null;

  return (
    <div className="pb-24">
      <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <button 
          onClick={() => navigateTo("products")}
          className="sticker-btn bg-white text-[#1A1A1A] px-4 py-2 rounded-xl text-xs uppercase font-display mb-8 inline-flex items-center gap-2"
        >
          ← BACK TO ALL PRODUCTS
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7">
            <div className="sticker-card p-4 rounded-3xl">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-96 md:h-[450px] object-cover rounded-2xl border-3 border-[#1A1A1A] mb-4"
              />
              <div className="grid grid-cols-3 gap-3">
                <img src={product.image} alt="Thumbnail 1" className="rounded-xl border-2 border-[#1A1A1A] h-20 w-full object-cover cursor-pointer" />
                <div className="rounded-xl border-2 border-[#1A1A1A] bg-[#6C2BD9] text-white flex items-center justify-center font-display text-xs text-center p-2">
                  INSTANT ZIP ACCESS
                </div>
                <div className="rounded-xl border-2 border-[#1A1A1A] bg-[#FFD400] text-[#1A1A1A] flex items-center justify-center font-display text-xs text-center p-2 font-black">
                  LIFETIME LICENSE
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <span className={`inline-block font-display text-xs px-3 py-1 rounded-xl border-3 border-[#1A1A1A] mb-4 ${product.badgeBg} ${product.badgeText} ${product.badgeShadow}`}>
              {product.badge}
            </span>

            <h1 className="font-display text-3xl sm:text-5xl text-[#1A1A1A] mb-3 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm font-black text-[#6C2BD9] mb-4">
              {product.rating}
            </p>

            <div className="flex items-baseline gap-4 mb-6 bg-white p-4 rounded-2xl border-3 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
              <PriceTag price={product.price} className="font-display text-4xl text-[#6C2BD9]" />
              <PriceTag price={product.oldPrice} className="text-lg font-bold text-gray-400 line-through" />
              <span className="text-xs font-black text-white bg-[#FF4D8D] px-3 py-1 rounded-full border border-[#1A1A1A] ml-auto">
                SPECIAL DISCOUNT
              </span>
            </div>

            <p className="text-base font-bold text-[#1A1A1A]/80 mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <button 
                onClick={(e) => handleBuyNow(product.linkKey, e)}
                className="sticker-btn w-full bg-[#FFD400] text-[#1A1A1A] py-5 rounded-2xl font-display text-xl uppercase flex items-center justify-center gap-3"
              >
                <ShoppingBag size={24} />
                <span>BUY NOW (INSTANT ACCESS)</span>
                <ExternalLink size={20} />
              </button>
            </div>

            <div className="bg-white p-6 rounded-3xl border-3 border-[#1A1A1A]">
              <h3 className="font-display text-lg mb-4 text-[#1A1A1A]">WHAT'S INCLUDED:</h3>
              <ul className="space-y-3">
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm font-black text-[#1A1A1A]">
                    <div className="bg-[#6C2BD9] p-1 rounded-full text-white mt-0.5 border border-[#1A1A1A]">
                      <Check size={14} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t-4 border-[#1A1A1A]/20 mt-12">
        <h2 className="font-display text-3xl text-[#1A1A1A] mb-8 text-center">
          YOU MIGHT ALSO LIKE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {productList.filter((p: ProductItem) => p.id !== product.id).map((relProduct: ProductItem) => (
            <div key={relProduct.id} className="sticker-card p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-xl mb-2 text-[#1A1A1A]">{relProduct.name}</h3>
                <p className="text-xs font-bold text-[#1A1A1A]/70 mb-4">{relProduct.tagline}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t-2 border-[#1A1A1A]/20">
                <PriceTag price={relProduct.price} className="font-display text-2xl text-[#6C2BD9]" />
                <button 
                  onClick={() => navigateTo("product-detail", relProduct.id)}
                  className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-4 py-2 rounded-xl text-xs font-display uppercase"
                >
                  VIEW PACK
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STICKY BOTTOM BUY BAR FOR MOBILE */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] text-white p-3 border-t-4 border-[#FFD400] z-40 md:hidden flex items-center justify-between px-4">
        <div>
          <span className="text-xs font-black text-[#FFD400] block">{product.name}</span>
          <PriceTag price={product.price} className="font-display text-xl text-white" />
        </div>
        <button 
          onClick={(e) => handleBuyNow(product.linkKey, e)}
          className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-6 py-2.5 rounded-xl font-display text-sm uppercase flex items-center gap-1"
        >
          <span>BUY NOW</span>
          <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// ABOUT PAGE COMPONENT
// ==========================================
interface AboutPageProps {
  navigateTo: (page: string, productId?: string | null) => void;
}

function AboutPage({ navigateTo }: AboutPageProps) {
  return (
    <div className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-display text-xs bg-[#FFD400] text-[#1A1A1A] px-4 py-1.5 rounded-full border-3 border-[#1A1A1A] uppercase tracking-wider inline-block mb-3">
          OUR MISSION
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-[#1A1A1A]">
          BUILT FOR CREATORS BY CREATORS
        </h1>
      </div>

      <div className="sticker-card p-8 md:p-12 space-y-6 text-base md:text-lg font-black text-[#1A1A1A]/80 leading-relaxed mb-12">
        <p>
          At <strong className="text-[#6C2BD9]">{CONFIG.brandName}</strong>, we believe creators spend far too much time endlessly searching for presets, organizing folders, and tweaking simple keyframes when they should be telling stories.
        </p>
        <p>
          Our mission is simple: provide production-grade video assets, AI reels, and software collections that slash your editing time in half while elevating your visual output.
        </p>
        <p>
          Every asset bundle in our store is battle-tested on viral social media channels and commercial client projects before release. No fluff, just high-converting assets.
        </p>
      </div>

      <div className="text-center">
        <button 
          onClick={() => navigateTo("products")}
          className="sticker-btn bg-[#FFD400] text-[#1A1A1A] px-8 py-4 rounded-2xl font-display text-lg uppercase inline-flex items-center gap-2"
        >
          <ShoppingBag size={20} />
          <span>EXPLORE ALL PRODUCTS</span>
        </button>
      </div>
    </div>
  );
}

// ==========================================
// CONTACT PAGE COMPONENT
// ==========================================
function ContactPage() {
  return (
    <div className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="font-display text-xs bg-[#FF4D8D] text-white px-4 py-1.5 rounded-full border-3 border-[#1A1A1A] uppercase tracking-wider inline-block mb-3">
          GET IN TOUCH
        </span>
        <h1 className="font-display text-4xl sm:text-6xl text-[#1A1A1A]">
          WE'RE HERE TO HELP
        </h1>
        <p className="text-base font-bold text-[#1A1A1A]/70 mt-2">
          Have a question about a bundle or your download link? Reach out directly!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <a 
          href={`mailto:${LINKS.supportEmail}`}
          className="sticker-card p-8 flex flex-col items-center text-center group hover:border-[#6C2BD9]"
        >
          <div className="w-16 h-16 bg-[#FFD400] text-[#1A1A1A] rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#1A1A1A]">
            <Mail size={32} />
          </div>
          <h3 className="font-display text-2xl mb-2 text-[#1A1A1A]">EMAIL SUPPORT</h3>
          <p className="text-sm font-bold text-[#1A1A1A]/70 mb-4">Fast response within 2 hours</p>
          <span className="font-display text-sm text-[#6C2BD9] underline">{LINKS.supportEmail}</span>
        </a>

        <a 
          href={LINKS.socials.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="sticker-card p-8 flex flex-col items-center text-center group hover:border-[#6C2BD9]"
        >
          <div className="w-16 h-16 bg-[#25D366] text-[#1A1A1A] rounded-2xl border-3 border-[#1A1A1A] flex items-center justify-center mb-4 shadow-[4px_4px_0px_#1A1A1A]">
            <MessageSquare size={32} />
          </div>
          <h3 className="font-display text-2xl mb-2 text-[#1A1A1A]">WHATSAPP CHAT</h3>
          <p className="text-sm font-bold text-[#1A1A1A]/70 mb-4">Instant support for download issues</p>
          <span className="font-display text-sm text-[#6C2BD9] underline">Click to message on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

// ==========================================
// LEGAL PLACEHOLDER PAGES
// ==========================================
function TermsPage() {
  return (
    <div className="py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-6 text-[#1A1A1A]">TERMS OF SERVICE</h1>
      <div className="sticker-card p-8 space-y-4 text-sm font-black text-[#1A1A1A]/80">
        <p>By purchasing digital products from {CONFIG.brandName}, you are granted a non-exclusive license to use the files in personal and commercial media projects.</p>
        <p>Reselling, redistributing, or re-hosting raw source files directly without permission is strictly prohibited.</p>
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-6 text-[#1A1A1A]">PRIVACY POLICY</h1>
      <div className="sticker-card p-8 space-y-4 text-sm font-black text-[#1A1A1A]/80">
        <p>We respect your privacy. Customer email addresses are used exclusively for sending instant file download links and transaction updates.</p>
        <p>We never sell or rent your personal data to third-party ad platforms.</p>
      </div>
    </div>
  );
}

function RefundPage() {
  return (
    <div className="py-16 px-4 md:px-8 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl mb-6 text-[#1A1A1A]">REFUND POLICY</h1>
      <div className="sticker-card p-8 space-y-4 text-sm font-black text-[#1A1A1A]/80">
        <p>Due to the instant delivery nature of downloadable digital assets, all digital purchases are final once downloaded.</p>
        <p>If you encounter any file issues or download problems, reach out to support and we will resolve it immediately!</p>
      </div>
    </div>
  );
}