import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, Variants } from 'framer-motion';
import { Users, Award, Star } from 'lucide-react';
import { Language, Program, FAQ, Lead, SpecialtyCategory, TimelineStep } from './types';
import { TRANSLATIONS, PROGRAMS, TESTIMONIALS } from './constants';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LeadForm } from './components/LeadForm';
import { AdminProgramManager } from './components/AdminProgramManager';
import { SaclayProgramsList } from './components/SaclayProgramsList';
import { getLeads, deleteLead } from './services/leadService';
import { getPrograms } from './services/programService';

// --- Helper for formatting CSV ---
const downloadCSV = (data: Lead[]) => {
  if (!data || data.length === 0) {
    alert("No data to export.");
    return;
  }
  const headers = Object.keys(data[0]).join(",");
  const rows = data.map(row => Object.values(row).map(val => `"${val}"`).join(",")).join("\n");
  const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows;
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "astrovisa_leads.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Animations ---
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

// --- Page Transition Wrapper ---
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

// --- Interfaces for Props ---
interface SmartLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

interface CounterProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FAQItemProps {
  faq: FAQ;
  lang: Language;
}

interface HomeProps {
  lang: Language;
  programs: Program[];
}

interface ProgramDetailsProps {
  lang: Language;
  programs: Program[];
}

interface LayoutProps {
  lang: Language;
  setLang: (l: Language) => void;
  children: React.ReactNode;
  programs: Program[];
}

interface AdminPanelProps {
  lang: Language;
  programs: Program[];
  onUpdatePrograms: () => void;
}

interface AnimatedIconProps {
    type: 'mentoring' | 'strategy' | 'files' | 'visa';
}

interface SpecialtyAccordionProps {
    cat: SpecialtyCategory;
    lang: Language;
}

// --- Components ---

const SmartLink: React.FC<SmartLinkProps> = ({ to, children, className }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Parse target
    let targetPath = to;
    let targetHash = '';
    
    if (to.includes('#')) {
        [targetPath, targetHash] = to.split('#');
    }

    // Handle empty path as root if it was just '#hash' or '/#hash'
    if (targetPath === '' || targetPath === '/') targetPath = '/';

    // Check if we are on the same page
    // We treat '/' and '' as the same
    const currentPath = location.pathname === '/' ? '/' : location.pathname;
    const isOnSamePage = currentPath === targetPath;

    if (isOnSamePage && targetHash) {
        const element = document.getElementById(targetHash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        navigate(targetPath);
        if (targetHash) {
            // Wait for exit animation (0.4s) + slight buffer
            setTimeout(() => {
                const element = document.getElementById(targetHash);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 450);
        }
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const ParallaxSection: React.FC<ParallaxSectionProps> = ({ children, className, id }) => {
    return (
        <section id={id} className={`relative ${className}`}>
            {children}
        </section>
    );
};

const Counter: React.FC<CounterProps> = ({ value, label, icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
    return (
        <div ref={ref} className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:border-cyan-bright/30 transition-all duration-300 group flex flex-col items-center text-center">
            {icon && (
                <div className="mb-4 p-4 bg-cyan-bright/10 rounded-full text-cyan-bright group-hover:bg-cyan-bright group-hover:text-space-black transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                    {icon}
                </div>
            )}
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-5xl font-bold text-white mb-3 group-hover:text-cyan-bright transition-colors drop-shadow-md"
            >
                {value}
            </motion.div>
            <div className="text-slate-400 font-medium text-lg rtl:font-arabic leading-relaxed group-hover:text-slate-200">{label}</div>
        </div>
    );
};

// Improved Star Rating Component with explicit colors
const StarRating = () => (
    <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
            <svg 
                key={star} 
                className="w-5 h-5 text-[#FACC15] drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
            </svg>
        ))}
    </div>
);

const SpecialtyAccordion: React.FC<SpecialtyAccordionProps> = ({ cat, lang }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-white/5 border border-white/10 rounded-xl mb-4 hover:border-cyan-bright/30 transition-all overflow-hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 flex items-center justify-between text-left rtl:text-right focus:outline-none bg-white/5 hover:bg-white/10 transition-colors"
            >
                <h3 className="font-bold text-lg flex items-center gap-3 text-white">
                    <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">{cat.icon}</span> 
                    {cat.name[lang]}
                </h3>
                <motion.span 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-cyan-bright"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 border-t border-white/10 mt-2">
                             <div className="flex flex-wrap gap-2 mt-4">
                                {cat.items[lang].map((item, i) => (
                                    <span key={i} className="bg-white/10 text-slate-300 px-3 py-1 rounded-md text-sm border border-white/5 hover:bg-cyan-bright/20 hover:text-white transition-colors cursor-default">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-white/10 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-6 flex justify-between items-center text-left rtl:text-right focus:outline-none group"
            >
                <span className="text-lg font-semibold text-slate-200 group-hover:text-cyan-bright transition-colors rtl:leading-relaxed rtl:tracking-normal rtl:font-arabic">{faq.question[lang]}</span>
                <span className={`transform transition-transform duration-300 text-cyan-bright ${isOpen ? 'rotate-180' : ''} bg-white/5 group-hover:bg-cyan-bright/20 rounded-full w-10 h-10 flex items-center justify-center`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-8 text-slate-400 leading-loose rtl:tracking-normal rtl:font-arabic text-base">
                            {faq.answer[lang]}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- Interactive Background Component ---
const InteractiveSpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles: { x: number; y: number; size: number; vx: number; vy: number; alpha: number; baseAlpha: number }[] = [];

    const init = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      particles = [];
      // Adjust density based on screen size
      const particleCount = Math.floor((width * height) / 10000); 
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() < 0.9 ? Math.random() * 1.5 : Math.random() * 2.5 + 1; // Mostly small stars, few bigger ones
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: size,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          baseAlpha: Math.random() * 0.5 + 0.1,
          alpha: Math.random() * 0.5 + 0.1
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        
        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        // React to mouse
        if (dist < 200) {
            // Brighten near mouse
            p.alpha = Math.min(1, p.baseAlpha + (1 - dist/200) * 0.8);
            // Slight attraction
            p.x += dx * 0.005;
            p.y += dy * 0.005;
        } else {
            // Return to base alpha slowly
            if (p.alpha > p.baseAlpha) {
                p.alpha -= 0.01;
            }
        }

        // Twinkle effect randomly
        if (Math.random() > 0.995) {
            p.alpha = Math.min(1, p.alpha + 0.3);
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Cyan glow for larger particles
        if (p.size > 2) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = "rgba(34, 211, 238, 0.5)";
             ctx.fill();
             ctx.shadowBlur = 0;
        }
      });
      
      requestAnimationFrame(draw);
    };

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    init();
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none mix-blend-screen" />;
};

// --- Logo Component ---
const Logo: React.FC<{ isFooter?: boolean }> = ({ isFooter = false }) => {
    return (
        <div className={`relative group ${isFooter ? 'opacity-90' : ''}`}>
            {/* Glow halo behind with pulsing animation on hover */}
            {/* Enhanced glow: larger negative inset, stronger brightness */}
            <div className={`absolute -inset-4 bg-cyan-bright/30 rounded-full blur-2xl transition-opacity duration-500 animate-pulse-glow ${isFooter ? 'opacity-0' : 'group-hover:opacity-100 opacity-60'}`}></div>
            
            {/* Pill Container */}
            <div className={`relative z-10 flex items-center justify-center gap-3 ${isFooter ? '' : 'bg-space-navy/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:border-cyan-bright/30 transition-colors'}`}>
                {/* Logo Image with pulsating drop-shadow */}
                <motion.img 
                    src="https://i.imgur.com/YRhfY8w.png" 
                    alt="AstroVisa Logo" 
                    animate={{
                        filter: [
                            "brightness(0) invert(1) drop-shadow(0 0 5px rgba(34,211,238,0.5))",
                            "brightness(0) invert(1) drop-shadow(0 0 15px rgba(34,211,238,0.8))",
                            "brightness(0) invert(1) drop-shadow(0 0 5px rgba(34,211,238,0.5))"
                        ]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    // Increased size
                    className={`${isFooter ? 'h-24' : 'h-16'} w-auto object-contain`} 
                />
                <span className={`font-bold tracking-wider text-white ${isFooter ? 'text-3xl' : 'text-xl'}`}>
                    AstroVisa
                </span>
            </div>
        </div>
    );
};

// --- Animated Icons Component ---
const AnimatedIcon: React.FC<AnimatedIconProps> = ({ type }) => {
    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" }
        }
    };

    const pathVariantsFade = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { 
            pathLength: 1, 
            opacity: 1,
            transition: { duration: 1, ease: "easeInOut" }
        }
    };

    const svgProps = {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
        className: "w-16 h-16 text-cyan-bright drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
    };

    switch(type) {
        case 'mentoring': // Target
            return (
                <motion.svg {...svgProps} whileHover={{ scale: 1.1 }}>
                    <motion.circle cx="12" cy="12" r="10" variants={pathVariants} initial="hidden" animate="visible" />
                    <motion.circle cx="12" cy="12" r="6" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.2}} />
                    <motion.circle cx="12" cy="12" r="2" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.4}} />
                    <motion.path d="M12 2v20M2 12h20" opacity="0.3" strokeWidth="0.5" />
                </motion.svg>
            );
        case 'strategy': // Strategy Path
            return (
                <motion.svg {...svgProps} whileHover={{ scale: 1.1 }}>
                    <motion.path d="M18 20V10" variants={pathVariants} initial="hidden" animate="visible" />
                    <motion.path d="M12 20V4" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.2}} />
                    <motion.path d="M6 20v-6" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.4}} />
                    <motion.circle cx="12" cy="4" r="2" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.6}} />
                </motion.svg>
            );
        case 'files': // Documents
            return (
                <motion.svg {...svgProps} whileHover={{ scale: 1.1 }}>
                     <motion.path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" variants={pathVariants} initial="hidden" animate="visible" />
                     <motion.path d="M14 2v6h6" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.3}} />
                     <motion.path d="M16 13H8" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.5}} />
                     <motion.path d="M16 17H8" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.6}} />
                     <motion.path d="M10 9H8" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.7}} />
                </motion.svg>
            );
        case 'visa': // Passport Stamp
            return (
                 <motion.svg {...svgProps} whileHover={{ scale: 1.1, rotate: 5 }}>
                    <motion.rect x="3" y="4" width="18" height="16" rx="2" variants={pathVariants} initial="hidden" animate="visible" />
                    <motion.circle cx="12" cy="12" r="4" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.3}} />
                    <motion.path d="M10 12l2 2 4-4" variants={pathVariants} initial="hidden" animate="visible" transition={{delay: 0.5}} />
                    <motion.path d="M7 21h10" variants={pathVariants} initial="hidden" animate="visible" />
                 </motion.svg>
            );
        default:
            return null;
    }
}

// --- Main Components ---

const Layout: React.FC<LayoutProps> = ({ lang, setLang, children, programs }) => {
  const t = TRANSLATIONS[lang];
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className={`min-h-screen flex flex-col font-sans ${lang === 'ar' ? 'font-arabic leading-loose' : ''} bg-space-black selection:bg-cyan-bright/30`}>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-space-black/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 group">
                <Logo />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
                <SmartLink to="/#programs" className="text-sm uppercase tracking-widest font-medium hover:text-cyan-bright transition-colors text-slate-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">{t.nav_programs}</SmartLink>
                <SmartLink to="/#about" className="text-sm uppercase tracking-widest font-medium hover:text-cyan-bright transition-colors text-slate-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">{t.nav_about}</SmartLink>
                <SmartLink to="/#contact" className="text-sm uppercase tracking-widest font-medium hover:text-cyan-bright transition-colors text-slate-300 hover:shadow-[0_0_10px_rgba(34,211,238,0.5)]">{t.nav_contact}</SmartLink>
            </div>

            <div className="flex items-center gap-4">
                 <LanguageSwitcher currentLang={lang} onLanguageChange={setLang} />
                 <SmartLink to="/#contact" className="hidden sm:block px-6 py-2 rounded-full font-bold text-sm transition-all bg-cyan-bright/10 text-cyan-bright border border-cyan-bright/50 hover:bg-cyan-bright hover:text-space-black shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]">
                    {t.nav_contact}
                 </SmartLink>
            </div>
        </div>
      </nav>

      <main className="flex-grow relative z-10">{children}</main>

      <footer className="bg-space-navy text-white py-16 border-t border-white/5 relative overflow-hidden mt-auto">
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-bright to-transparent opacity-50"></div>

        <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-6">
                        <Logo isFooter={true} />
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{t.hero_subtitle}</p>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white">{t.nav_programs}</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        {programs.map(p => (
                            <li key={p.id}><Link to={`/program/${p.slug}`} className="hover:text-cyan-bright transition-colors">{p.title[lang]}</Link></li>
                        ))}
                    </ul>
                </div>
                <div>
                     <h4 className="font-bold mb-6 text-lg text-white">{t.nav_contact}</h4>
                     <ul className="space-y-3 text-sm text-slate-400">
                        <li className="flex items-center gap-2"><span className="text-cyan-bright">✉</span> contact@astrovisa.com</li>
                        <li className="flex items-center gap-2"><span className="text-cyan-bright">📞</span> +213 658 93 56 44</li>
                        <li className="flex items-center gap-2"><span className="text-cyan-bright">📍</span> Algiers, Algeria</li>
                     </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6 text-lg text-white">Legal</h4>
                    <ul className="space-y-3 text-sm text-slate-400">
                        <li><Link to="/admin" className="hover:text-cyan-bright transition-colors">Admin Access</Link></li>
                        <li>Privacy Policy</li>
                        <li>Terms of Service</li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-white/10 text-center text-slate-500 text-sm">
                &copy; {new Date().getFullYear()} AstroVisa. {t.footer_rights}
            </div>
        </div>
      </footer>
    </div>
  );
};

const ProgramDetails: React.FC<ProgramDetailsProps> = ({ lang, programs }) => {
    const { slug } = useParams();
    const t = TRANSLATIONS[lang];
    const program = programs.find(p => p.slug === slug);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    
    if (!program) return <div className="min-h-screen flex items-center justify-center text-white">Program not found</div>;

    return (
        <div className="pt-32 pb-12 min-h-screen bg-space-black relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-bright/5 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Hero for Program with Parallax Image */}
            <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden mb-12">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-space-black z-10"></div>
                {/* Motion image for parallax */}
                <motion.img 
                    style={{ y }}
                    src={program.image} 
                    alt={program.title[lang]} 
                    className="w-full h-[120%] -mt-[5%] object-cover opacity-60" 
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="container mx-auto px-4 text-center text-white">
                        <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{program.title[lang]}</motion.h1>
                        <p className="text-xl text-cyan-bright/80 max-w-2xl mx-auto">{program.shortDescription[lang]}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <section className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="text-cyan-bright">📝</span> {t.view_details}
                            </h2>
                            <p className="text-slate-300 leading-relaxed text-lg mb-8">{program.longDescription[lang]}</p>
                            
                            {program.slug === 'paris-saclay' && (
                                <div className="mb-12">
                                    <SaclayProgramsList />
                                </div>
                            )}
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-cyan-bright/30 transition-colors">
                                    <h3 className="font-bold text-cyan-bright mb-2">{t.program_cost}</h3>
                                    <p className="text-white">{program.cost?.[lang] || "N/A"}</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-cyan-bright/30 transition-colors">
                                    <h3 className="font-bold text-cyan-bright mb-2">{t.program_deadline}</h3>
                                    <p className="text-white font-bold">{program.deadline}</p>
                                </div>
                            </div>
                            
                            {program.importantNote && (
                                <div className={`p-6 rounded-xl border ${program.importantNote.variant === 'warning' ? 'bg-amber-900/20 border-amber-500/30 text-amber-200' : 'bg-cyan-900/20 border-cyan-500/30 text-cyan-200'} mb-8`}>
                                    <div className="flex gap-3">
                                        <span className="text-2xl">{program.importantNote.icon}</span>
                                        <p className="font-medium">{program.importantNote.text[lang]}</p>
                                    </div>
                                </div>
                            )}
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">{t.program_benefits}</h2>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {program.benefits[lang].map((benefit, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300 bg-white/5 p-4 rounded-lg shadow-sm border border-white/10 hover:bg-white/10 transition-colors">
                                        <span className="text-cyan-bright text-xl">✓</span>
                                        {benefit}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                             <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="text-cyan-bright">📅</span> {t.timeline}
                             </h2>
                             <div className="relative">
                                {/* Vertical Line */}
                                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gradient-to-b from-cyan-bright/50 via-cyan-bright/20 to-transparent rtl:right-4 rtl:left-auto"></div>
                                
                                <div className="space-y-12">
                                    {program.timeline.map((step, idx) => (
                                        <div key={idx} className="relative pl-16 rtl:pr-16 rtl:pl-0 group">
                                            {/* Step Number/Icon Bubble */}
                                            <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-space-black border-2 border-cyan-bright flex items-center justify-center z-10 shadow-[0_0_15px_rgba(34,211,238,0.4)] group-hover:scale-110 transition-transform duration-300 rtl:right-0 rtl:left-auto">
                                                <span className="text-cyan-bright font-bold text-sm">{idx + 1}</span>
                                            </div>
                                            
                                            {/* Content Card */}
                                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-bright/30 transition-all duration-300 shadow-lg group-hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] relative overflow-hidden">
                                                {/* Subtle glow effect */}
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-bright/5 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
                                                
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                                                    <h3 className="font-bold text-xl text-white group-hover:text-cyan-bright transition-colors">{step.title[lang]}</h3>
                                                    {step.date && (
                                                        <span className="inline-block px-3 py-1 rounded-full bg-cyan-bright/10 text-cyan-bright text-xs font-bold uppercase tracking-wider border border-cyan-bright/20 whitespace-nowrap">
                                                            {step.date}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                {step.description && (
                                                    <p className="text-slate-400 leading-relaxed text-base border-t border-white/5 pt-3 mt-1">
                                                        {step.description[lang]}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                             </div>
                        </section>
                        
                        {program.specialties && (
                            <section>
                                <h2 className="text-2xl font-bold text-white mb-6">{t.program_specialties}</h2>
                                <div className="space-y-2">
                                    {program.specialties.map((cat, idx) => (
                                        <SpecialtyAccordion key={idx} cat={cat} lang={lang} />
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-6">{t.faq_title}</h2>
                            <div className="space-y-4">
                                {program.faqs.map((faq, idx) => (
                                    <FAQItem key={idx} faq={faq} lang={lang} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Form */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32">
                            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/10">
                                <h3 className="text-xl font-bold text-white mb-2">{t.form_title}</h3>
                                <p className="text-slate-400 text-sm mb-6">{t.hero_subtitle}</p>
                                <LeadForm lang={lang} programs={programs} initialProgramSlug={program.slug} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ lang, programs, onUpdatePrograms }) => {
    const t = TRANSLATIONS[lang];
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [leads, setLeads] = useState<Lead[]>([]);
    const [activeTab, setActiveTab] = useState<'leads' | 'programs'>('leads');

    useEffect(() => {
        if (isAuthenticated) {
            setLeads(getLeads());
        }
    }, [isAuthenticated]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "admin123") { // Simple hardcoded password
            setIsAuthenticated(true);
        } else {
            alert("Wrong password");
        }
    };

    const handleDelete = (id: string) => {
        if (window.confirm("Delete this lead?")) {
            deleteLead(id);
            setLeads(getLeads());
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-space-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                <form onSubmit={handleLogin} className="bg-white/5 backdrop-blur-xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/10 relative z-10">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">{t.admin_login}</h2>
                    <input 
                        type="password" 
                        placeholder={t.admin_password}
                        className="w-full bg-space-black/50 border border-white/20 rounded-lg p-4 mb-6 focus:ring-2 focus:ring-cyan-bright focus:outline-none text-white placeholder-slate-500"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-cyan-bright text-space-black py-4 rounded-lg font-bold hover:bg-white hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all">
                        Enter
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-12 bg-space-black text-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-white">{t.admin_dashboard}</h1>
                    <div className="flex gap-4">
                        <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
                            <button 
                                onClick={() => setActiveTab('leads')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'leads' ? 'bg-cyan-bright text-space-black' : 'text-slate-400 hover:text-white'}`}
                            >
                                Leads
                            </button>
                            <button 
                                onClick={() => setActiveTab('programs')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'programs' ? 'bg-cyan-bright text-space-black' : 'text-slate-400 hover:text-white'}`}
                            >
                                Programs
                            </button>
                        </div>
                        {activeTab === 'leads' && (
                            <button onClick={() => downloadCSV(leads)} className="bg-emerald-600/20 text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-lg font-medium hover:bg-emerald-600 hover:text-white transition-colors">
                                {t.admin_export}
                            </button>
                        )}
                        <button onClick={() => setIsAuthenticated(false)} className="bg-slate-700/50 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg font-medium hover:bg-slate-600 transition-colors">
                            Logout
                        </button>
                    </div>
                </div>

                {activeTab === 'programs' ? (
                    <AdminProgramManager programs={programs} onUpdate={onUpdatePrograms} />
                ) : (
                    leads.length === 0 ? (
                        <div className="text-center py-20 text-slate-500 bg-white/5 rounded-2xl border border-white/10">
                            {t.admin_no_leads}
                        </div>
                    ) : (
                        <div className="bg-white/5 rounded-2xl shadow-xl overflow-hidden border border-white/10 backdrop-blur-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left rtl:text-right text-slate-300">
                                    <thead className="bg-white/5 border-b border-white/10 text-cyan-bright uppercase text-sm tracking-wider">
                                        <tr>
                                            <th className="p-4 font-semibold">Date</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Contact</th>
                                            <th className="p-4 font-semibold">Program</th>
                                            <th className="p-4 font-semibold">Message</th>
                                            <th className="p-4 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {leads.map((lead) => (
                                            <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-4 text-sm text-slate-400 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
                                                <td className="p-4 font-medium text-white">{lead.name}</td>
                                                <td className="p-4 text-sm">
                                                    <div className="text-white">{lead.email}</div>
                                                    <div className="text-slate-500">{lead.phone}</div>
                                                    <div className="text-xs text-slate-600 uppercase">{lead.country}</div>
                                                </td>
                                                <td className="p-4 text-sm"><span className="bg-cyan-bright/10 text-cyan-bright px-2 py-1 rounded text-xs font-bold uppercase border border-cyan-bright/20">{lead.programInterest}</span></td>
                                                <td className="p-4 text-sm text-slate-400 max-w-xs truncate" title={lead.message}>{lead.message}</td>
                                                <td className="p-4">
                                                    <button onClick={() => handleDelete(lead.id)} className="text-red-400 hover:text-red-300 font-medium text-sm">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

const Home: React.FC<HomeProps> = ({ lang, programs }) => {
  const t = TRANSLATIONS[lang];

  // Mouse tracking for parallax blobs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax calculations for blobs (move opposite to mouse for depth)
  const blob1X = useTransform(mouseX, [0, window.innerWidth], [20, -20]);
  const blob1Y = useTransform(mouseY, [0, window.innerHeight], [20, -20]);
  const blob2X = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const blob2Y = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);
  
  return (
    <>
      <ParallaxSection className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
        {/* Deep Space Background */}
        <div className="absolute inset-0 z-0 bg-space-black overflow-hidden">
           {/* Interactive Canvas Stars */}
           <InteractiveSpaceBackground />
           
           {/* Animated Nebulae (Reacting to mouse) */}
           <motion.div 
             style={{ x: blob1X, y: blob1Y }}
             className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-cyan-bright/10 rounded-full blur-[120px]"
           />
           <motion.div 
             style={{ x: blob2X, y: blob2Y }}
             className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-indigo-900/20 rounded-full blur-[100px]"
           />
        </div>

        <div className="relative container mx-auto px-4 z-10 text-center">
             
             {/* Centered Text */}
             <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="show"
                className="max-w-5xl mx-auto flex flex-col items-center"
             >
                {/* REMOVED ASTROVISA PREMIUM AGENCY BADGE */}
                
                {/* Reduced text size to prevent layout breaking */}
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-slate-400 tracking-tight font-sans rtl:font-arabic drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  {t.hero_title}
                </motion.h1>
                
                <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl rtl:font-arabic leading-relaxed font-light rtl:tracking-normal drop-shadow-md">
                  {t.hero_subtitle}
                </motion.p>
                
                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                   <SmartLink to="#programs" className="group relative px-10 py-5 bg-cyan-bright text-space-black rounded-full font-bold text-lg shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] hover:scale-105 transition-all flex items-center justify-center gap-3 rtl:font-arabic min-w-[220px] overflow-hidden">
                     <span className="relative z-10">{t.cta_explore}</span>
                     <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                   </SmartLink>
                   
                   <a href="https://wa.me/+213658935644" target="_blank" rel="noreferrer" className="px-10 py-5 bg-emerald-600/20 backdrop-blur-md text-emerald-400 border border-emerald-500/30 rounded-full font-bold text-lg hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-3 rtl:font-arabic group min-w-[220px]">
                     <span>WhatsApp</span>
                     <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                   </a>
                </motion.div>
             </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
            <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center p-1">
                <div className="w-1 h-2 bg-cyan-bright rounded-full"></div>
            </div>
        </motion.div>
      </ParallaxSection>
      
      {/* Stats Section */}
      <section className="py-24 bg-space-black relative z-10">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Counter value="500+" label={t.stats_students} icon={<Users className="w-8 h-8" />} />
                <Counter value="98%" label={t.stats_visas} icon={<Award className="w-8 h-8" />} />
                <Counter value="4.9/5" label={t.stats_satisfaction} icon={<Star className="w-8 h-8" />} />
            </div>
        </div>
      </section>

      {/* Why Us Section - Updated with Animated Icons */}
      <section id="about" className="py-24 bg-space-navy relative scroll-mt-20 overflow-hidden">
        {/* Background Mesh */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22D3EE_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="container mx-auto px-4 relative z-10">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer} className="text-center mb-16">
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-white mb-4">{t.why_title}</motion.h2>
                <motion.div variants={fadeInUp} className="w-24 h-1 bg-cyan-bright mx-auto rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"></motion.div>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { title: t.why_mentoring, type: "mentoring", desc: "Expert guidance" },
                    { title: t.why_strategy, type: "strategy", desc: "Personalized roadmap" },
                    { title: t.why_files, type: "files", desc: "Perfect documentation" },
                    { title: t.why_visa, type: "visa", desc: "Consular support" }
                ].map((item, idx) => (
                    <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }} // Added subtle zoom
                        transition={{ delay: idx * 0.1 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-bright transition-all group backdrop-blur-sm flex flex-col items-center text-center"
                    >
                        <div className="mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 group-hover:border-cyan-bright/50 shadow-inner group-hover:bg-white/10 transition-all">
                             <AnimatedIcon type={item.type as any} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-bright transition-colors">{item.title}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-24 bg-space-black relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-space-navy to-transparent opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">{t.programs_title}</h2>
                <p className="text-slate-400 max-w-2xl mx-auto">{t.hero_subtitle}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program) => (
                    <Link to={`/program/${program.slug}`} key={program.id} className="group bg-space-navy/50 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-bright/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300 transform hover:-translate-y-2">
                        <div className="h-48 overflow-hidden relative">
                            <img src={program.image} alt={program.title[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100" />
                            <div className="absolute inset-0 bg-gradient-to-t from-space-navy to-transparent"></div>
                            <div className="absolute top-4 right-4 bg-space-black/80 backdrop-blur text-cyan-bright text-xs font-bold px-3 py-1 rounded-full border border-cyan-bright/30">
                                {program.deadline}
                            </div>
                        </div>
                        <div className="p-8">
                            <div className="flex items-center gap-2 mb-4">
                                <img src={program.flag} alt="flag" className="w-6 h-4 rounded shadow-sm opacity-90" />
                                <span className="text-sm text-slate-400 font-medium uppercase tracking-wider">{program.country[lang]}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-bright transition-colors">{program.title[lang]}</h3>
                            <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{program.shortDescription[lang]}</p>
                            <span className="inline-flex items-center text-cyan-bright font-bold group-hover:gap-2 transition-all duration-300 text-sm tracking-wide uppercase">
                                {t.view_details} <svg className="w-4 h-4 ms-1 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-space-navy relative overflow-hidden">
        {/* Glow orb */}
        <div className="absolute -left-20 bottom-0 w-64 h-64 bg-cyan-bright/10 rounded-full blur-[80px]"></div>

        <div className="container mx-auto px-4 relative z-10">
             <h2 className="text-4xl font-bold text-center text-white mb-16">{t.testimonials_title}</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {TESTIMONIALS.map((testim, idx) => (
                    <div key={testim.id} className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 relative shadow-lg hover:bg-white/10 transition-colors">
                        <div className="absolute -top-6 left-8">
                             <img src={testim.image} alt={testim.name} className="w-12 h-12 rounded-full border-2 border-cyan-bright shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                        </div>
                        <div className="mt-4">
                            <StarRating />
                            <p className="text-slate-300 italic mb-6 font-light">"{testim.content[lang]}"</p>
                            <div>
                                <h4 className="font-bold text-white">{testim.name}</h4>
                                <span className="text-xs text-cyan-bright font-bold uppercase tracking-wider">{testim.role[lang]}</span>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-space-black relative scroll-mt-20">
         <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-space-navy/50 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-2/5 bg-space-black/50 p-12 flex flex-col justify-between relative overflow-hidden border-r border-white/5">
                    <div className="absolute inset-0 bg-cyan-bright/5"></div>
                    <div className="relative z-10">
                        <h3 className="text-3xl font-bold mb-4 text-white">{t.nav_contact}</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">{t.hero_subtitle}</p>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <span className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl border border-white/10 group-hover:border-cyan-bright/50 group-hover:text-cyan-bright transition-all">📍</span>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Address</div>
                                    <div className="font-medium text-slate-200">Algiers, Algeria</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <span className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl border border-white/10 group-hover:border-cyan-bright/50 group-hover:text-cyan-bright transition-all">📞</span>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Phone</div>
                                    <div className="font-medium text-slate-200">+213 658 93 56 44</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <span className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl border border-white/10 group-hover:border-cyan-bright/50 group-hover:text-cyan-bright transition-all">✉️</span>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Email</div>
                                    <div className="font-medium text-slate-200">contact@astrovisa.com</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12 relative z-10 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-sm text-slate-500 mb-1">Working Hours</div>
                        <div className="font-bold text-slate-200">Sun - Thu: 09:00 - 17:00</div>
                    </div>
                </div>
                <div className="md:w-3/5 p-12">
                    <h3 className="text-2xl font-bold text-white mb-2">{t.form_title}</h3>
                    <p className="text-slate-400 mb-8">{t.hero_subtitle}</p>
                    <LeadForm lang={lang} programs={programs} />
                </div>
            </div>
         </div>
      </section>
    </>
  );
};

// --- Animated Routes Wrapper ---
const AnimatedRoutes: React.FC<{ lang: Language, programs: Program[], onUpdatePrograms: () => void }> = ({ lang, programs, onUpdatePrograms }) => {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home lang={lang} programs={programs} /></PageWrapper>} />
                <Route path="/program/:slug" element={<PageWrapper><ProgramDetails lang={lang} programs={programs} /></PageWrapper>} />
                <Route path="/admin" element={<PageWrapper><AdminPanel lang={lang} programs={programs} onUpdatePrograms={onUpdatePrograms} /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};

// --- Main App ---
const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('fr');
  const [programs, setPrograms] = useState<Program[]>([]);

  const refreshPrograms = () => {
    setPrograms(getPrograms());
  };

  useEffect(() => {
    refreshPrograms();
    
    const handleUpdate = () => refreshPrograms();
    window.addEventListener('programsUpdated', handleUpdate);
    return () => window.removeEventListener('programsUpdated', handleUpdate);
  }, []);

  return (
    <Router>
      <Layout lang={lang} setLang={setLang} programs={programs}>
        <AnimatedRoutes lang={lang} programs={programs} onUpdatePrograms={refreshPrograms} />
      </Layout>
    </Router>
  );
};

export default App;