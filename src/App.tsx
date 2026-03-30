import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Leaf, 
  ChevronDown,
  Mail,
  Send,
  ArrowRight,
  Menu,
  X,
  Download,
  Share2,
  BookOpen,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Loader2,
  Search
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Page, BlogPost, Language } from './types';

// --- Translations ---

const translations = {
  vi: {
    nav: {
      home: "Trang chủ",
      blog: "Blog",
      contact: "Liên hệ",
      download: "Tải App"
    },
    hero: {
      badge: "MemoirME - Người bạn AI thấu cảm",
      title: "Nuôi dưỡng",
      titleItalic: "bình yên",
      titleEnd: "trong tâm hồn bạn",
      desc: "MemoirME là không gian an toàn để bạn ghi lại cảm xúc, thấu hiểu bản thân và nhận được sự hỗ trợ từ trí tuệ nhân tạo mỗi ngày.",
      ctaPrimary: "Bắt đầu ngay",
      ctaSecondary: "Khám phá thêm"
    },
    mission: {
      badge: "Sứ mệnh của chúng tôi",
      title: "Thấu hiểu",
      titleItalic: "từng nhịp đập",
      titleEnd: "của trái tim",
      desc: "Chúng tôi tin rằng mỗi cảm xúc đều xứng đáng được lắng nghe. MemoirME kết hợp công nghệ AI tiên tiến với sự thấu cảm nhân văn để đồng hành cùng bạn trên hành trình tự chữa lành.",
      stat1: "100% Bảo mật dữ liệu",
      stat2: "Hỗ trợ AI 24/7",
      stat3: "Cộng đồng thấu cảm"
    },
    categories: {
      title: "Khám phá",
      titleItalic: "Hành trình",
      titleEnd: "của bạn",
      cat1: { title: "Sức khỏe tinh thần", desc: "Tìm hiểu về cách chăm sóc tâm trí và duy trì sự cân bằng." },
      cat2: { title: "Hành trình chữa lành", desc: "Đi tìm bình yên cho tinh thần, cần bắt đầu từ đâu?" },
      cat3: { title: "Bạn đồng hành AI", desc: "Người bạn AI luôn bên bạn để chăm sóc cho sức khoẻ tinh thần." }
    },
    promise: {
      badge: "Cam kết từ MemoirME",
      title: "Lời hứa của",
      titleItalic: "chúng tôi",
      desc: "Chúng tôi cam kết mang đến một không gian an toàn, trực quan và dễ tiếp cận, nơi bạn có thể tự do thể hiện bản thân.",
      item1: { title: "Bảo mật tuyệt đối", content: "Dữ liệu của bạn được mã hóa đầu cuối, đảm bảo sự riêng tư hoàn toàn." },
      item2: { title: "Thấu cảm nhân văn", content: "AI của chúng tôi được huấn luyện để phản hồi một cách nhẹ nhàng và không phán xét." },
      item3: { title: "Phát triển bền vững", content: "Chúng tôi liên tục cập nhật các phương pháp khoa học mới nhất về tâm lý học." }
    },
    newsletter: {
      title: "Bắt đầu hành trình",
      titleItalic: "của bạn",
      desc: "Đăng ký nhận bản tin để nhận được những lời khuyên hữu ích về sức khỏe tinh thần mỗi tuần.",
      placeholder: "Nhập email của bạn...",
      button: "Đăng ký ngay"
    },
    quiz: {
      title: "Lắng nghe",
      titleItalic: "Cảm xúc",
      desc: "Dành một phút để thấu hiểu sâu hơn về những gì trái tim bạn đang muốn nói.",
      start: "Bắt đầu",
      next: "Tiếp theo",
      finish: "Thấu hiểu",
      restart: "Thử lại",
      resultTitle: "Lời nhắn gửi",
      analyzing: "Đang lắng nghe...",
      teaser: "Bạn có muốn lắng nghe trái tim mình một chút không?"
    },
    blog: {
      title: "Blog &",
      titleItalic: "Kiến thức",
      desc: "Nâng cao nhận thức về sức khỏe tinh thần, khám phá hành trình chữa lành và sức mạnh của người bạn đồng hành AI.",
      categories: {
        all: "Tất cả",
        mentalHealth: "Sức khỏe tinh thần",
        healing: "Hành trình chữa lành",
        ai: "Bạn đồng hành AI",
        feature: "Tính năng mới"
      },
      featured: "Bài viết nổi bật",
      readMore: "Đọc chi tiết",
      empty: "Chưa có bài viết nào trong chuyên mục này.",
      share: "Đã sao chép liên kết!"
    },
    contact: {
      title: "Liên hệ với chúng tôi",
      desc: "Chúng tôi luôn sẵn lòng lắng nghe phản hồi và ý kiến đóng góp từ bạn. Mọi tin nhắn của bạn đều giúp MemoirME hoàn thiện hơn mỗi ngày.",
      form: {
        name: "Họ và tên",
        namePlaceholder: "Nguyễn Văn A",
        email: "Email",
        emailPlaceholder: "email@example.com",
        subject: "Chủ đề",
        subjectOptions: ["Phản hồi ứng dụng", "Hợp tác", "Báo lỗi", "Khác"],
        message: "Tin nhắn",
        messagePlaceholder: "Bạn muốn nói gì với chúng mình?",
        submit: "Gửi phản hồi"
      }
    },
    appShowcase: {
      title: "Trải nghiệm",
      titleItalic: "MemoirME",
      titleEnd: "trên mọi thiết bị",
      desc: "Giao diện thân thiện, tính năng thông minh và sự bảo mật tuyệt đối. MemoirME đồng hành cùng bạn mọi lúc, mọi nơi, giúp bạn ghi lại những khoảnh khắc quý giá nhất.",
      appStore: "App Store",
      googlePlay: "Google Play"
    },
    footer: {
      desc: "MemoirME không chỉ là một nhật ký số, mà là người bạn AI đồng hành thấu cảm, giúp bạn nuôi dưỡng bình yên và thấu hiểu bản thân mỗi ngày.",
      navTitle: "Điều hướng",
      supportTitle: "Hỗ trợ & Pháp lý",
      helpCenter: "Trung tâm trợ giúp",
      privacyPolicy: "Chính sách bảo mật",
      termsOfUse: "Điều khoản sử dụng",
      faq: "Câu hỏi thường gặp",
      rights: "Tất cả quyền được bảo lưu."
    },
    banner: {
      message: "MemoirME hiện đã có mặt trên App Store và Google Play! 🚀",
      cta: "Tải ngay",
      close: "Đóng"
    },
    quizBanner: {
      message: "Bạn đang cảm thấy thế nào? Dành 1 phút để thấu hiểu bản thân nhé! ✨",
      cta: "Khám phá ngay",
      close: "Đóng"
    }
  },
  en: {
    nav: {
      home: "Home",
      blog: "Blog",
      contact: "Contact",
      download: "Download"
    },
    hero: {
      badge: "MemoirME - Your Empathetic AI Friend",
      title: "Nurture",
      titleItalic: "peace",
      titleEnd: "within your soul",
      desc: "MemoirME is a safe space to record your emotions, understand yourself, and receive AI-driven support every day.",
      ctaPrimary: "Get Started",
      ctaSecondary: "Learn More"
    },
    mission: {
      badge: "Our Mission",
      title: "Understand",
      titleItalic: "every beat",
      titleEnd: "of your heart",
      desc: "We believe every emotion deserves to be heard. MemoirME combines advanced AI technology with human empathy to accompany you on your self-healing journey.",
      stat1: "100% Data Security",
      stat2: "24/7 AI Support",
      stat3: "Empathetic Community"
    },
    categories: {
      title: "Explore",
      titleItalic: "Your",
      titleEnd: "Journey",
      cat1: { title: "Mental Health", desc: "Learn how to care for your mind and maintain balance." },
      cat2: { title: "Healing Process", desc: "Where should we start the journey toward inner peace?" },
      cat3: { title: "AI Companion", desc: "An AI friend always there to care for your mental health." }
    },
    promise: {
      badge: "MemoirME's Commitment",
      title: "Our",
      titleItalic: "Promise",
      desc: "We are committed to providing a safe, intuitive, and accessible space where you can freely express yourself.",
      item1: { title: "Absolute Security", content: "Your data is end-to-end encrypted, ensuring complete privacy." },
      item2: { title: "Human Empathy", content: "Our AI is trained to respond gently and without judgment." },
      item3: { title: "Sustainable Growth", content: "We continuously update with the latest scientific methods in psychology." }
    },
    newsletter: {
      title: "Start your",
      titleItalic: "journey",
      desc: "Subscribe to our newsletter to receive helpful mental health tips every week.",
      placeholder: "Enter your email...",
      button: "Subscribe Now"
    },
    quiz: {
      title: "Listen to",
      titleItalic: "Your Heart",
      desc: "Take a moment to understand more deeply what your heart is trying to say.",
      start: "Start",
      next: "Next",
      finish: "Understand",
      restart: "Restart",
      resultTitle: "A Message for You",
      analyzing: "Listening...",
      teaser: "Would you like to listen to your heart for a moment?"
    },
    blog: {
      title: "Blog &",
      titleItalic: "Insights",
      desc: "Enhance mental health awareness, explore the healing journey, and the power of an AI companion.",
      categories: {
        all: "All",
        mentalHealth: "Mental Health",
        healing: "Healing Process",
        ai: "AI Companion",
        feature: "New Feature"
      },
      featured: "Featured Article",
      readMore: "Read more",
      empty: "No posts in this category yet.",
      share: "Link copied!"
    },
    contact: {
      title: "Contact Us",
      desc: "We are always happy to hear your feedback and suggestions. Every message helps MemoirME improve every day.",
      form: {
        name: "Full Name",
        namePlaceholder: "John Doe",
        email: "Email",
        emailPlaceholder: "email@example.com",
        subject: "Subject",
        subjectOptions: ["App Feedback", "Partnership", "Bug Report", "Other"],
        message: "Message",
        messagePlaceholder: "What would you like to say to us?",
        submit: "Send Feedback"
      }
    },
    appShowcase: {
      title: "Experience",
      titleItalic: "MemoirME",
      titleEnd: "on any device",
      desc: "Friendly interface, smart features, and absolute security. MemoirME accompanies you anytime, anywhere, helping you capture your most precious moments.",
      appStore: "App Store",
      googlePlay: "Google Play"
    },
    footer: {
      desc: "MemoirME is not just a digital diary, but an empathetic AI companion helping you nurture peace and understand yourself every day.",
      navTitle: "Navigation",
      supportTitle: "Support & Legal",
      helpCenter: "Help Center",
      privacyPolicy: "Privacy Policy",
      termsOfUse: "Terms of Use",
      faq: "FAQ",
      rights: "All rights reserved."
    },
    banner: {
      message: "MemoirME is now available on App Store and Google Play! 🚀",
      cta: "Download now",
      close: "Close"
    },
    quizBanner: {
      message: "How are you feeling today? Take 1 minute to understand yourself! ✨",
      cta: "Try now",
      close: "Close"
    }
  }
};

// --- Components ---

const Navbar = ({ currentPage, setCurrentPage, language, setLanguage, topOffset = 0 }: { 
  currentPage: Page, 
  setCurrentPage: (p: Page) => void,
  language: Language,
  setLanguage: (l: Language) => void,
  topOffset?: number
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = translations[language].nav;

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}
      style={{ top: `${topOffset}px` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-[2.5rem] px-6 sm:px-10 py-4 transition-all duration-500 ${scrolled ? 'shadow-2xl shadow-purple-500/10 border-white/40' : 'border-white/20'}`}>
          <div className="flex justify-between items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer group" 
              onClick={() => setCurrentPage('home')}
            >
              <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 overflow-hidden border border-slate-100">
                <img 
                  src="https://memoirme.app/icon.png" 
                  alt="MemoirME Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-800">MemoirME</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {['home', 'blog', 'contact'].map((page) => (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page as Page)}
                  className={`text-xs font-bold tracking-widest uppercase transition-all relative group ${currentPage === page ? 'text-brand-primary' : 'text-slate-400 hover:text-brand-primary'}`}
                >
                  {t[page as keyof typeof t]}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-primary transition-all duration-300 group-hover:w-full ${currentPage === page ? 'w-full' : ''}`}></span>
                </button>
              ))}
              
              <div className="flex items-center gap-2 border-l border-slate-200 pl-8">
                <button 
                  onClick={() => setLanguage('vi')}
                  className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${language === 'vi' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  VN
                </button>
                <button 
                  onClick={() => setLanguage('en')}
                  className={`text-[10px] font-bold px-2 py-1 rounded-md transition-all ${language === 'en' ? 'bg-brand-primary text-white' : 'text-slate-400 hover:bg-slate-100'}`}
                >
                  EN
                </button>
              </div>

              <button className="bg-brand-primary text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-xl shadow-purple-200 flex items-center gap-2 hover:-translate-y-0.5 active:translate-y-0">
                <Download className="w-4 h-4" />
                {t.download}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-4">
              <div className="flex items-center gap-1">
                <button onClick={() => setLanguage('vi')} className={`text-[10px] font-bold px-2 py-1 rounded-md ${language === 'vi' ? 'bg-brand-primary text-white' : 'text-slate-400'}`}>VN</button>
                <button onClick={() => setLanguage('en')} className={`text-[10px] font-bold px-2 py-1 rounded-md ${language === 'en' ? 'bg-brand-primary text-white' : 'text-slate-400'}`}>EN</button>
              </div>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-10 h-10 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-xl text-slate-600 border border-white/50">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden mt-4 glass rounded-[2.5rem] overflow-hidden border-white/40 shadow-2xl"
            >
              <div className="px-8 py-10 space-y-8">
                {['home', 'blog', 'contact'].map((page) => (
                  <button 
                    key={page}
                    onClick={() => { setCurrentPage(page as Page); setIsMenuOpen(false); }}
                    className={`block w-full text-left text-lg font-bold uppercase tracking-widest transition-colors ${currentPage === page ? 'text-brand-primary' : 'text-slate-600'}`}
                  >
                    {t[page as keyof typeof t]}
                  </button>
                ))}
                <button className="w-full bg-brand-primary text-white px-5 py-5 rounded-3xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-purple-200">
                  <Download className="w-5 h-5" />
                  {t.download} MemoirME
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

const Hero = ({ language }: { language: Language }) => {
  const t = translations[language].hero;
  return (
    <section className="relative pt-40 pb-32 overflow-hidden bg-mesh min-h-screen flex flex-col justify-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/20 rounded-full blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-300/20 rounded-full blur-[150px] animate-pulse delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="inline-block px-6 py-2 mb-8 text-xs font-bold tracking-[0.2em] text-brand-primary uppercase bg-white/80 backdrop-blur-md border border-purple-100 rounded-full shadow-sm">
                {t.badge}
              </span>
              <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-[1.1] tracking-tight text-slate-900">
                {t.title} <span className="text-gradient italic">{t.titleItalic}</span> {t.titleEnd}
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed font-light">
                {t.desc}
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <button 
                  onClick={() => {
                    const missionSection = document.getElementById('mission');
                    missionSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-10 py-5 bg-brand-primary text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-[0_20px_50px_rgba(99,102,241,0.2)] hover:-translate-y-1 flex items-center justify-center gap-3 group"
                >
                  {t.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => {
                    const categoriesSection = document.getElementById('categories');
                    categoriesSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-10 py-5 glass text-slate-700 rounded-2xl font-bold text-lg hover:bg-white transition-all hover:-translate-y-1 border border-white/50"
                >
                  {t.ctaSecondary}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Floating App Mockup */}
          <div className="relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-[280px] md:max-w-[320px] lg:max-w-[340px]"
            >
              <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.15)] border-[10px] border-slate-900 aspect-[9/19.5] bg-slate-900">
                <img 
                  src="https://memoirme.app/carousel1.png" 
                  alt="MemoirME App Interface" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-16 glass p-6 rounded-3xl shadow-2xl z-20 hidden md:block border border-white/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Buddy</p>
                    <p className="font-serif italic text-sm">"Bạn đang cảm thấy thế nào?"</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 -left-20 glass p-5 rounded-3xl shadow-2xl z-20 hidden md:block border border-white/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Heart className="w-5 h-5 text-emerald-500 fill-emerald-500" />
                  </div>
                  <p className="font-bold text-slate-700 text-sm">Cảm xúc tích cực +20%</p>
                </div>
              </motion.div>

              {/* Decorative rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-brand-primary/10 rounded-full -z-10"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] border border-brand-primary/5 rounded-full -z-10"></div>
              
              {/* Floating particles */}
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-32 h-32 bg-indigo-400/20 rounded-full blur-3xl -z-10"
              />
              <motion.div 
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl -z-10"
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Scroll</span>
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-brand-primary to-transparent"
        />
      </motion.div>
    </section>
  );
};

const Mission = ({ language }: { language: Language }) => {
  const t = translations[language].mission;
  return (
    <section id="mission" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-indigo-50/30 to-transparent -skew-x-12 translate-x-1/4 -z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-50/50 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 bg-brand-primary/10 rounded-full text-brand-primary text-xs font-bold tracking-widest uppercase mb-8">
              {t.badge}
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-12 leading-[1.1] tracking-tight text-slate-900">
              {t.title} <br/>
              <span className="text-slate-300 italic font-light">{t.titleItalic}</span> {t.titleEnd}
            </h2>
            <div className="space-y-10 text-xl text-slate-600 leading-relaxed font-light">
              <p className="relative pl-10">
                <span className="absolute left-0 top-0 w-1.5 h-full bg-brand-primary rounded-full"></span>
                {t.desc}
              </p>
            </div>
            
            <div className="mt-16 grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-serif text-brand-primary mb-2">100%</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t.stat1}</div>
              </div>
              <div>
                <div className="text-4xl font-serif text-brand-primary mb-2">24/7</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">{t.stat2}</div>
              </div>
            </div>
          </motion.div>

          <div className="relative mt-16 lg:mt-0">
            <div className="grid grid-cols-2 gap-6 md:gap-10">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 md:space-y-10"
              >
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer">
                  <img 
                    src="https://memoirme.app/carousel2.png" 
                    alt="Inner Peace" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
                <div className="glass p-8 md:p-10 rounded-[2.5rem] text-center shadow-xl border-white/40">
                  <p className="font-serif text-xl md:text-2xl italic text-brand-primary leading-relaxed">"Bình yên bắt đầu từ bên trong"</p>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-6 md:space-y-10 pt-12 md:pt-20"
              >
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 aspect-square rounded-[3rem] flex items-center justify-center shadow-2xl shadow-pink-200/50">
                  <Heart className="w-16 md:w-24 h-16 md:h-24 text-white fill-white/20 animate-pulse" />
                </div>
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl group cursor-pointer">
                  <img 
                    src="https://memoirme.app/carousel3.png" 
                    alt="Healing Journey" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Decorative rings */}
            <div className="absolute -top-10 -right-10 w-40 h-40 border-2 border-brand-primary/10 rounded-full -z-10 animate-spin-slow"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 border border-pink-500/10 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Categories = ({ onCategoryClick, language }: { onCategoryClick: (cat: string) => void, language: Language }) => {
  const t = translations[language].categories;
  const categories = [
    {
      title: t.cat1.title,
      desc: t.cat1.desc,
      icon: <Heart className="w-10 h-10 text-brand-primary" />,
      color: "from-brand-primary/20 to-indigo-500/20",
      link: "Mental Health"
    },
    {
      title: t.cat2.title,
      desc: t.cat2.desc,
      icon: <Leaf className="w-10 h-10 text-brand-accent" />,
      color: "from-brand-accent/20 to-emerald-500/20",
      link: "Healing Process"
    },
    {
      title: t.cat3.title,
      desc: t.cat3.desc,
      icon: <Sparkles className="w-10 h-10 text-brand-secondary" />,
      color: "from-brand-secondary/20 to-violet-500/20",
      link: "AI Companion"
    }
  ];

  return (
    <section id="categories" className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-serif leading-tight">
            {t.title} <span className="text-gradient italic">{t.titleItalic}</span> {t.titleEnd}
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-12">
          {categories.map((cat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -15 }}
              className="group relative bg-white p-12 rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${cat.color} blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700`}></div>
              
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-brand-primary/10 transition-all duration-500 shadow-inner">
                {cat.icon}
              </div>
              
              <h3 className="text-3xl font-serif mb-3 group-hover:text-brand-primary transition-colors">{cat.title}</h3>
              
              <div className="flex-grow">
                <p className="text-slate-600 text-lg mb-3 leading-relaxed">{cat.desc}</p>
              </div>
              
              <button 
                onClick={() => onCategoryClick(cat.link)}
                className="mt-12 w-full py-4 rounded-2xl border border-slate-100 font-bold text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all duration-500 flex items-center justify-center gap-3"
              >
                {translations[language].blog.readMore} <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppShowcase = ({ language }: { language: Language }) => {
  const t = translations[language].appShowcase;
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-primary/5 rounded-[4rem] p-12 md:p-24 relative overflow-hidden border border-brand-primary/10">
          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                {t.title} <span className="text-gradient italic">{t.titleItalic}</span> {t.titleEnd}
              </h2>
              <p className="text-xl text-slate-600 mb-12 font-light leading-relaxed">
                {t.desc}
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all shadow-xl hover:-translate-y-1">
                  <Download className="w-6 h-6" />
                  {t.appStore}
                </button>
                <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all shadow-xl hover:-translate-y-1">
                  <Download className="w-6 h-6" />
                  {t.googlePlay}
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative flex justify-center order-1 lg:order-2"
            >
              <div className="relative w-full max-w-[260px] md:max-w-[300px]">
                <div className="rounded-[3.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.2)] border-[10px] border-slate-900 aspect-[9/19.5] bg-slate-900">
                  <img 
                    src="https://memoirme.app/carousel4.png" 
                    alt="App Showcase" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-brand-primary/20 blur-[100px] -z-10 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Promise = ({ language }: { language: Language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[language].promise;

  const promises = [
    {
      title: t.item1.title,
      content: t.item1.content,
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      title: t.item2.title,
      content: t.item2.content,
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      title: t.item3.title,
      content: t.item3.content,
      icon: <Leaf className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.12)] relative group">
              <img 
                src="https://picsum.photos/seed/safe-space-v3/1000/1200" 
                alt="Safe Space" 
                className="w-full h-auto group-hover:scale-110 transition-transform duration-[2000ms] ease-out" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/40 via-transparent to-transparent"></div>
            </div>
            
            <motion.div 
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-10 -left-6 md:-left-10 glass p-8 md:p-10 rounded-[3rem] shadow-2xl max-w-[280px] md:max-w-sm z-20 border-white/40"
            >
              <div className="flex items-center gap-5 mb-6">
                <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center shadow-xl shadow-purple-200">
                  <ShieldCheck className="w-9 h-9 text-white" />
                </div>
                <span className="text-2xl font-serif italic text-slate-800">{language === 'vi' ? 'Bảo mật tuyệt đối' : 'Absolute Security'}</span>
              </div>
              <p className="text-slate-500 leading-relaxed text-lg">{t.item1.content}</p>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="inline-block px-4 py-1.5 bg-brand-primary/10 rounded-full text-brand-primary text-xs font-bold tracking-widest uppercase mb-8">
              {t.badge}
            </div>
            <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[1.1] tracking-tight">
              {t.title} <br/> 
              <span className="text-slate-300 italic font-light">{t.titleItalic}</span>
            </h2>
            <p className="text-xl text-slate-600 mb-16 leading-relaxed font-light max-w-xl">
              {t.desc}
            </p>
            
            <div className="space-y-6">
              {promises.map((p, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-[2.5rem] transition-all duration-500 overflow-hidden ${openIndex === idx ? 'bg-slate-50 shadow-inner border-transparent' : 'bg-white border border-slate-100 shadow-sm hover:border-brand-primary/30'}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-8 text-left transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${openIndex === idx ? 'bg-brand-primary text-white shadow-lg shadow-purple-200' : 'bg-slate-100 text-slate-400'}`}>
                        {p.icon}
                      </div>
                      <div>
                        <h4 className={`text-xl font-bold transition-colors ${openIndex === idx ? 'text-brand-primary' : 'text-slate-800'}`}>{p.title}</h4>
                      </div>
                    </div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === idx ? 'bg-brand-primary text-white rotate-180 shadow-md' : 'bg-slate-100 text-slate-400'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-24 pb-10 text-slate-600 text-lg leading-relaxed font-light">
                          {p.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <motion.div 
              whileHover={{ x: 10 }}
              className="mt-16 p-10 rounded-[2.5rem] bg-gradient-to-r from-brand-primary/5 to-purple-500/5 border border-brand-primary/10 flex items-center justify-between group cursor-pointer"
            >
              <div className="max-w-md">
                <p className="text-brand-primary font-bold text-lg mb-1">{language === 'vi' ? 'Bạn muốn biết MemoirME hoạt động thế nào?' : 'Want to know how MemoirME works?'}</p>
                <p className="text-slate-500 text-sm">{language === 'vi' ? 'Khám phá ngay bộ công cụ chăm sóc tinh thần toàn diện của chúng tôi.' : 'Explore our comprehensive mental care toolkit now.'}</p>
              </div>
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all shadow-xl shadow-purple-500/10">
                <ArrowRight className="w-7 h-7" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = ({ language }: { language: Language }) => {
  const testimonials = language === 'vi' ? [
    { name: "Minh Anh", role: "Người dùng", text: "MemoirME giúp mình nhận ra những cảm xúc mà trước đây mình thường bỏ qua. Một người bạn đồng hành tuyệt vời." },
    { name: "Hoàng Nam", role: "Sinh viên", text: "Giao diện đẹp và tính năng AI phân tích rất sâu sắc. Mình cảm thấy được thấu hiểu hơn mỗi ngày." },
    { name: "Thu Thủy", role: "Nhân viên văn phòng", text: "Những bài blog gợi ý rất đúng lúc. Đây là ứng dụng không thể thiếu cho sức khỏe tinh thần của mình." }
  ] : [
    { name: "Sarah J.", role: "User", text: "MemoirME helped me realize emotions I used to ignore. A truly wonderful companion." },
    { name: "David L.", role: "Student", text: "Beautiful interface and the AI analysis is very deep. I feel more understood every day." },
    { name: "Emma W.", role: "Professional", text: "The suggested blog posts are so timely. This is an essential app for my mental health." }
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif mb-6">{language === 'vi' ? 'Người dùng nói gì về' : 'What users say about'} <span className="text-gradient italic">MemoirME</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-4 h-4 text-brand-primary" />)}
              </div>
              <p className="text-slate-600 text-lg mb-8 font-light italic leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-slate-900">{t.name}</p>
                <p className="text-sm text-slate-400 uppercase tracking-widest">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Newsletter = ({ language }: { language: Language }) => {
  const t = translations[language].newsletter;
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 lg:p-32 text-center text-white relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.2)]">
          {/* Dynamic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-purple-900/40 to-slate-900 opacity-60"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/80 text-xs font-bold tracking-[0.3em] uppercase mb-10 border border-white/10">
                Newsletter
              </div>
              <h2 className="text-5xl md:text-7xl font-serif mb-10 leading-[1.1] tracking-tight">
                {t.title} <br/> 
                <span className="text-white/40 italic font-light">{t.titleItalic}</span>
              </h2>
              <p className="text-slate-300 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                {t.desc}
              </p>
              
              <form className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-4 p-2 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                  <div className="flex-grow relative">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 w-6 h-6" />
                    <input 
                      type="email" 
                      placeholder={t.placeholder} 
                      className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-transparent text-white placeholder:text-white/30 focus:outline-none transition-all text-lg"
                    />
                  </div>
                  <button className="px-12 py-5 bg-white text-slate-900 rounded-[2rem] font-bold text-lg hover:bg-brand-primary hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group">
                    {t.button}
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
                <p className="mt-6 text-white/30 text-sm font-light">{language === 'vi' ? 'Chúng tôi cam kết bảo mật thông tin của bạn. Hủy đăng ký bất cứ lúc nào.' : 'We commit to protecting your information. Unsubscribe at any time.'}</p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ language, setCurrentPage }: { language: Language, setCurrentPage: (p: Page) => void }) => {
  const t = translations[language].nav;
  const ft = translations[language].footer;
  return (
    <footer className="bg-slate-50 pt-32 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg overflow-hidden border border-slate-100">
                <img 
                  src="https://lh3.googleusercontent.com/sitesv/APaQ0SQbFChhEeb4_Jn5n6zSFB0De_d3D27Y9UH9BLjcOlZ3boDIcrheRJAnLC7MjkBPWtXDK_LjtJ3uCNov1c0a_sEmf-xs3BfcN0o1w4pmzyu9JlY4Ubv7QTZNh85MquUJI8GK3gUtdDjc9f3XwlRd-9uy_RnGmojVNw2KqpHPGXoEQv5fFQV8DI5POvQ=w16383" 
                  alt="MemoirME Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-3xl font-bold tracking-tighter text-slate-800">MemoirME</span>
            </div>
            <p className="text-slate-500 text-lg max-w-sm leading-relaxed font-light mb-10">
              {ft.desc}
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
                <button key={social} className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all shadow-sm">
                  <span className="sr-only">{social}</span>
                  {social === 'Facebook' && <Facebook className="w-5 h-5" />}
                  {social === 'Instagram' && <Instagram className="w-5 h-5" />}
                  {social === 'Twitter' && <Twitter className="w-5 h-5" />}
                  {social === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-8 uppercase tracking-widest">{ft.navTitle}</h4>
            <ul className="space-y-5 text-slate-500 text-lg font-light">
              <li><button className="hover:text-brand-primary transition-colors" onClick={() => setCurrentPage('home')}>{t.home}</button></li>
              <li><button className="hover:text-brand-primary transition-colors" onClick={() => setCurrentPage('blog')}>{t.blog}</button></li>
              <li><button className="hover:text-brand-primary transition-colors" onClick={() => setCurrentPage('contact')}>{t.contact}</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-slate-800 mb-8 uppercase tracking-widest">{ft.supportTitle}</h4>
            <ul className="space-y-5 text-slate-500 text-lg font-light">
              <li><button className="hover:text-brand-primary transition-colors">{ft.helpCenter}</button></li>
              <li><button className="hover:text-brand-primary transition-colors">{ft.privacyPolicy}</button></li>
              <li><button className="hover:text-brand-primary transition-colors">{ft.termsOfUse}</button></li>
              <li><button className="hover:text-brand-primary transition-colors">{ft.faq}</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400 text-sm font-light">
          <p>© 2026 MemoirME. {ft.rights}</p>
          <div className="flex gap-8">
            <button className="hover:text-brand-primary transition-colors">{ft.privacyPolicy}</button>
            <button className="hover:text-brand-primary transition-colors">{ft.termsOfUse}</button>
            <button className="hover:text-brand-primary transition-colors">Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Views ---

const HomePage = ({ onCategoryClick, language }: { onCategoryClick: (cat: string) => void, language: Language, key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero language={language} />
    <Mission language={language} />
    <Categories onCategoryClick={onCategoryClick} language={language} />
    <Testimonials language={language} />
    <AppShowcase language={language} />
    <Promise language={language} />
    <Newsletter language={language} />
  </motion.div>
);

const BlogQuizPopup = ({ language, onSelectPost, onClose }: { language: Language, onSelectPost: (postId: string) => void, onClose: () => void }) => {
  const [step, setStep] = useState<'q' | 'result'>('q');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const t = language === 'vi' ? {
    badge: "Góc nhỏ tâm hồn",
    q: "Hôm nay bạn muốn cảm thấy thế nào?",
    options: [
      { id: '1', text: "Bình yên", icon: <Leaf className="w-5 h-5" />, color: "bg-emerald-500" },
      { id: '2', text: "Chữa lành", icon: <Heart className="w-5 h-5" />, color: "bg-rose-500" },
      { id: '3', text: "Khám phá", icon: <Sparkles className="w-5 h-5" />, color: "bg-indigo-500" }
    ],
    result: "Một món quà nhỏ dành cho bạn...",
    action: "Mở ra ngay"
  } : {
    badge: "Soul Corner",
    q: "How do you want to feel today?",
    options: [
      { id: '1', text: "Peaceful", icon: <Leaf className="w-5 h-5" />, color: "bg-emerald-500" },
      { id: '2', text: "Healing", icon: <Heart className="w-5 h-5" />, color: "bg-rose-500" },
      { id: '3', text: "Explore", icon: <Sparkles className="w-5 h-5" />, color: "bg-indigo-500" }
    ],
    result: "A small gift for you...",
    action: "Open now"
  };

  const handleSelect = (id: string) => {
    setSelectedPostId(id);
    setStep('result');
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0, scale: 0.9 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 400, opacity: 0, scale: 0.9 }}
      className="fixed top-24 right-8 z-[100] w-full max-w-md px-4"
    >
      <div className="relative group">
        {/* Floating Decorative Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-6 -left-6 w-12 h-12 bg-indigo-100 rounded-full blur-xl opacity-60"
        />
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-6 -right-6 w-16 h-16 bg-emerald-100 rounded-full blur-xl opacity-60"
        />

        <div className="bg-white/90 backdrop-blur-2xl p-8 rounded-[3rem] border border-white/50 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] relative overflow-hidden">
          {/* Organic background shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-slate-400 hover:text-brand-primary transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {step === 'q' ? (
              <motion.div 
                key="q"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 relative z-10"
              >
                <div className="space-y-2">
                  <span className="inline-block px-4 py-1 bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {t.badge}
                  </span>
                  <h4 className="text-3xl font-serif text-slate-800 leading-tight">
                    {t.q}
                  </h4>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {t.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(opt.id)}
                      className="group/btn relative flex flex-col items-center gap-3 p-4 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl hover:scale-105 transition-all duration-500 border border-slate-100"
                    >
                      <div className={`w-12 h-12 ${opt.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover/btn:rotate-12 transition-transform`}>
                        {opt.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-600 group-hover/btn:text-brand-primary transition-colors">
                        {opt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="py-4 text-center space-y-6 relative z-10"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-12">
                  <Sparkles className="w-10 h-10 text-white animate-pulse" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-2xl font-serif italic text-slate-800">{t.result}</p>
                  <p className="text-sm text-slate-500 font-light">
                    {language === 'vi' ? 'Dựa trên cảm xúc của bạn, chúng mình đã chọn ra một bài viết đặc biệt.' : 'Based on your feelings, we have selected a special article.'}
                  </p>
                </div>

                <button 
                  onClick={() => selectedPostId && onSelectPost(selectedPostId)}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 group"
                >
                  {t.action}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const QuizTeaser = ({ language, onClick, onClose }: { language: Language, onClick: () => void, onClose: () => void }) => {
  const t = translations[language].quiz;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[90] max-w-[300px]"
    >
      <div className="glass p-6 rounded-[2rem] border-white/40 shadow-2xl relative group cursor-pointer hover:scale-105 transition-all duration-300" onClick={onClick}>
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-slate-400 shadow-lg hover:bg-brand-primary hover:text-white transition-all opacity-0 group-hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center shadow-lg shrink-0">
            <Heart className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-serif italic text-slate-700 leading-snug">
              {t.teaser}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ScrollNotification = ({ language, onClick, onClose }: { language: Language, onClick: () => void, onClose: () => void }) => {
  const t = language === 'vi' ? {
    title: "Gợi ý cho bạn",
    desc: "Khám phá tâm hồn và nhận lời khuyên từ chuyên gia.",
    action: "Xem ngay"
  } : {
    title: "Suggested for you",
    desc: "Explore your soul and get expert advice.",
    action: "View now"
  };

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.6, ease: "linear" }}
      className="fixed bottom-24 right-8 z-[95] max-w-[320px]"
    >
      <div className="glass p-6 rounded-[2rem] border-white/40 shadow-2xl relative group overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-primary"></div>
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 text-slate-400 hover:text-brand-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">{t.title}</span>
          </div>
          <p className="text-sm text-slate-700 font-medium leading-snug">
            {t.desc}
          </p>
          <button 
            onClick={onClick}
            className="text-xs font-bold text-brand-primary flex items-center gap-2 group/btn"
          >
            {t.action}
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const QuizPopup = ({ language, onClose, onComplete }: { language: Language, onClose: () => void, onComplete?: () => void }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'analyzing' | 'result'>('intro');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const t = translations[language].quiz;

  const questions = language === 'vi' ? [
    {
      q: "Bạn thường cảm thấy thế nào khi bắt đầu một ngày mới?",
      options: ["Hào hứng và tràn đầy năng lượng", "Bình thường, không có gì đặc biệt", "Hơi lo lắng về những việc phải làm", "Mệt mỏi và muốn ngủ thêm"]
    },
    {
      q: "Khi gặp khó khăn, phản ứng đầu tiên của bạn là gì?",
      options: ["Tìm cách giải quyết ngay lập tức", "Chia sẻ với người thân hoặc bạn bè", "Giữ trong lòng và tự suy nghĩ", "Cảm thấy bế tắc và muốn trốn tránh"]
    },
    {
      q: "Bạn dành bao nhiêu thời gian cho bản thân mỗi ngày?",
      options: ["Hơn 2 tiếng", "Khoảng 1 tiếng", "Rất ít, chỉ vài phút", "Hầu như không có"]
    }
  ] : [
    {
      q: "How do you usually feel when starting a new day?",
      options: ["Excited and full of energy", "Normal, nothing special", "A bit anxious about things to do", "Tired and want to sleep more"]
    },
    {
      q: "When facing a difficulty, what is your first reaction?",
      options: ["Find a solution immediately", "Share with family or friends", "Keep it inside and think alone", "Feel stuck and want to avoid it"]
    },
    {
      q: "How much time do you spend on yourself each day?",
      options: ["More than 2 hours", "About 1 hour", "Very little, just a few minutes", "Almost none"]
    }
  ];

  const handleStart = () => setStep('questions');

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      generateResult(newAnswers);
    }
  };

  const generateResult = async (finalAnswers: number[]) => {
    setStep('analyzing');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const prompt = language === 'vi' 
        ? `Dựa trên những chia sẻ: ${questions.map((q, i) => `Q: ${q.q}, A: ${q.options[finalAnswers[i]]}`).join('; ')}. Hãy đưa ra một bản phân tích ngắn gọn, thấu cảm về tình trạng tinh thần hiện tại và lời khuyên hữu ích bằng tiếng Việt.`
        : `Based on these reflections: ${questions.map((q, i) => `Q: ${q.q}, A: ${q.options[finalAnswers[i]]}`).join('; ')}. Provide a concise, empathetic analysis of the current mental state and helpful advice in English.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are a supportive mental health expert from MemoirME.",
        }
      });
      setResult(response.text);
      setStep('result');
    } catch (error) {
      console.error("Quiz analysis failed:", error);
      setResult(language === 'vi' ? "Có lỗi xảy ra khi phân tích kết quả." : "Error analyzing results.");
      setStep('result');
    }
  };

  const handleRestart = () => {
    setStep('intro');
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ x: 600, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 600, opacity: 0 }}
        className="relative w-full max-w-lg glass h-full rounded-[2.5rem] border-white/40 shadow-2xl overflow-y-auto custom-scrollbar p-8 md:p-10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-brand-primary hover:text-white transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <h3 className="text-3xl font-serif mb-2">{t.title} <span className="text-gradient italic">{t.titleItalic}</span></h3>
        </div>

        <AnimatePresence mode="wait">
          {step === 'intro' ? (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center space-y-8"
            >
              <p className="text-xl text-slate-500 font-light leading-relaxed max-w-md mx-auto">{t.desc}</p>
              <button 
                onClick={handleStart}
                className="px-12 py-5 bg-brand-primary text-white rounded-2xl font-bold hover:bg-brand-primary/90 transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-3 mx-auto"
              >
                {t.start}
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ) : step === 'questions' ? (
            <motion.div 
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="text-brand-primary font-bold uppercase tracking-widest text-[10px]">Step {currentStep + 1}/{questions.length}</span>
                <div className="flex gap-1">
                  {questions.map((_, i) => (
                    <div key={i} className={`w-6 h-1 rounded-full transition-all ${i <= currentStep ? 'bg-brand-primary' : 'bg-slate-200'}`} />
                  ))}
                </div>
              </div>
              
              <h4 className="text-2xl font-serif text-slate-800 leading-tight">{questions[currentStep].q}</h4>
              
              <div className="grid gap-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full p-5 text-left bg-white/50 border border-slate-100 rounded-2xl hover:border-brand-primary hover:bg-brand-primary/5 transition-all group flex items-center justify-between"
                  >
                    <span className="text-slate-700 group-hover:text-brand-primary transition-colors">{opt}</span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : step === 'analyzing' ? (
            <motion.div 
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12 text-center space-y-6"
            >
              <Loader2 className="w-12 h-12 text-brand-primary animate-spin mx-auto" />
              <p className="text-xl font-serif italic text-slate-600">{t.analyzing}</p>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-2xl font-serif text-slate-800">{t.resultTitle}</h4>
              </div>
              
              <div className="p-6 bg-brand-primary/5 rounded-[2rem] border border-brand-primary/10 text-slate-700 leading-relaxed font-light whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar">
                {result}
              </div>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => {
                    onClose();
                    if (onComplete) onComplete();
                  }}
                  className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  <BookOpen className="w-5 h-5" />
                  {language === 'vi' ? 'Khám phá bài viết gợi ý' : 'Explore suggested article'}
                </button>
                <button 
                  onClick={handleRestart}
                  className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 rotate-180" />
                  {t.restart}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const BlogPage = ({ filter, language }: { filter?: string; language: Language, key?: string }) => {
  const [activeCategory, setActiveCategory] = useState<string>(filter || 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const t = translations[language].blog;

  const handleShare = (post: BlogPost) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const categories = [
    { id: 'All', label: t.categories.all },
    { id: 'Mental Health', label: t.categories.mentalHealth },
    { id: 'Healing Process', label: t.categories.healing },
    { id: 'AI Companion', label: t.categories.ai },
    { id: 'New Feature', label: t.categories.feature },
  ];

  const posts: BlogPost[] = [
    {
      id: '1',
      title: language === 'vi' ? 'Làm thế nào để duy trì bình yên trong thế giới ồn ào?' : 'How to maintain peace in a noisy world?',
      excerpt: language === 'vi' ? 'Khám phá những phương pháp đơn giản nhưng hiệu quả để giữ tâm trí tĩnh lặng giữa nhịp sống hối hả. Chúng ta thường bị cuốn vào những lo toan mà quên mất việc lắng nghe chính mình...' : 'Discover simple yet effective ways to keep your mind still amidst the hustle and bustle of life. We often get caught up in worries and forget to listen to ourselves...',
      category: 'Mental Health',
      date: '20 Mar 2026',
      image: 'https://picsum.photos/seed/mental1/800/500'
    },
    {
      id: '2',
      title: language === 'vi' ? 'Hành trình chữa lành: Bắt đầu từ việc chấp nhận bản thân' : 'Healing Journey: Starting with Self-Acceptance',
      excerpt: language === 'vi' ? 'Chữa lành không phải là xóa bỏ quá khứ, mà là học cách ôm ấp những vết sẹo với sự thấu cảm. Mỗi vết thương đều mang một câu chuyện và một bài học về sự kiên cường...' : 'Healing is not about erasing the past, but learning to embrace the scars with empathy. Every wound carries a story and a lesson in resilience...',
      category: 'Healing Process',
      date: '18 Mar 2026',
      image: 'https://picsum.photos/seed/healing1/800/500'
    },
    {
      id: '3',
      title: language === 'vi' ? 'AI Buddy: Người bạn không bao giờ phán xét' : 'AI Buddy: The friend who never judges',
      excerpt: language === 'vi' ? 'Tại sao việc trò chuyện với AI có thể giúp bạn giải tỏa căng thẳng và thấu hiểu cảm xúc của mình hơn? AI không mang theo định kiến, nó chỉ ở đó để lắng nghe và phản hồi...' : 'Why can talking to AI help you relieve stress and understand your emotions better? AI carries no prejudice, it is just there to listen and respond...',
      category: 'AI Companion',
      date: '15 Mar 2026',
      image: 'https://picsum.photos/seed/ai1/800/500'
    },
    {
      id: '4',
      title: language === 'vi' ? 'Cập nhật tính năng: Nhật ký bằng giọng nói (Voice Journal)' : 'Feature Update: Voice Journal',
      excerpt: language === 'vi' ? 'Giờ đây bạn có thể lưu giữ những suy nghĩ của mình chỉ bằng cách nói chuyện với MemoirME. Tính năng mới giúp bạn bộc phát cảm xúc một cách tự nhiên nhất mà không cần gõ phím...' : 'Now you can keep your thoughts just by talking to MemoirME. The new feature helps you express emotions naturally without typing...',
      category: 'New Feature',
      date: '10 Mar 2026',
      image: 'https://picsum.photos/seed/feature1/800/500'
    },
    {
      id: '5',
      title: language === 'vi' ? '5 phút thiền định mỗi ngày cùng AI Companion' : '5 minutes of meditation every day with AI Companion',
      excerpt: language === 'vi' ? 'Làm thế nào để tích hợp thiền định vào lịch trình bận rộn? Người bạn AI sẽ hướng dẫn bạn từng bước để tìm lại sự tập trung và giảm bớt lo âu chỉ trong vài phút ngắn ngủi...' : 'How to integrate meditation into a busy schedule? Your AI friend will guide you step-by-step to find focus and reduce anxiety in just a few short minutes...',
      category: 'Healing Process',
      date: '08 Mar 2026',
      image: 'https://picsum.photos/seed/meditation1/800/500'
    },
    {
      id: '6',
      title: language === 'vi' ? 'Hiểu về Stress và cách MemoirME hỗ trợ bạn' : 'Understanding Stress and how MemoirME supports you',
      excerpt: language === 'vi' ? 'Stress là một phần của cuộc sống hiện đại, nhưng nó không nhất thiết phải kiểm soát bạn. Tìm hiểu cách nhận diện các dấu hiệu stress sớm và sử dụng công cụ AI để cân bằng lại...' : "Stress is a part of modern life, but it doesn't have to control you. Learn how to identify early stress signs and use AI tools to rebalance...",
      category: 'Mental Health',
      date: '05 Mar 2026',
      image: 'https://picsum.photos/seed/stress1/800/500'
    },
    {
      id: '7',
      title: language === 'vi' ? 'Sức mạnh của việc viết nhật ký (Journaling)' : 'The power of journaling',
      excerpt: language === 'vi' ? 'Tại sao việc viết ra những suy nghĩ lại có tác dụng chữa lành mạnh mẽ đến vậy? Khám phá khoa học đằng sau journaling và cách MemoirME nâng tầm trải nghiệm này...' : 'Why does writing down thoughts have such a powerful healing effect? Explore the science behind journaling and how MemoirME elevates this experience...',
      category: 'Healing Process',
      date: '03 Mar 2026',
      image: 'https://picsum.photos/seed/journal1/800/500'
    },
    {
      id: '8',
      title: language === 'vi' ? 'AI có thể thay thế chuyên gia tâm lý không?' : 'Can AI replace a psychologist?',
      excerpt: language === 'vi' ? 'Một cái nhìn khách quan về vai trò của AI trong hỗ trợ sức khỏe tinh thần. AI là công cụ đồng hành tuyệt vời, nhưng nó đóng vai trò gì trong hệ sinh thái chăm sóc tâm lý?' : 'An objective look at the role of AI in mental health support. AI is a great companion tool, but what role does it play in the psychological care ecosystem?',
      category: 'AI Companion',
      date: '01 Mar 2026',
      image: 'https://picsum.photos/seed/psych1/800/500'
    },
    {
      id: '9',
      title: language === 'vi' ? 'Tính năng mới: Phân tích biểu đồ cảm xúc tuần' : 'New Feature: Weekly Emotion Chart Analysis',
      excerpt: language === 'vi' ? 'Thấu hiểu bản thân qua những con số và biểu đồ. MemoirME giờ đây có thể tổng hợp dữ liệu cảm xúc của bạn trong tuần để đưa ra những lời khuyên cá nhân hóa...' : 'Understand yourself through numbers and charts. MemoirME can now summarize your emotional data for the week to provide personalized advice...',
      category: 'New Feature',
      date: '25 Feb 2026',
      image: 'https://picsum.photos/seed/chart1/800/500'
    }
  ];

  const filteredPosts = posts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const featuredPost = posts[0];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-32 bg-mesh min-h-screen"
    >
      {copied && (
        <div className="fixed bottom-10 right-10 bg-indigo-600 text-white px-6 py-3 rounded-full shadow-2xl z-50">
          {t.share}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl md:text-7xl font-serif mb-6"
          >
            {t.title} <span className="text-gradient italic">{t.titleItalic}</span>
          </motion.h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
            {t.desc}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text"
              placeholder={language === 'vi' ? 'Tìm kiếm bài viết...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                  activeCategory === cat.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 -translate-y-1' 
                  : 'bg-white text-slate-400 hover:text-indigo-600 border border-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (Only show on 'All' or 'Mental Health' AND when no search query) */}
        {activeCategory === 'All' && searchQuery === '' && (
          <motion.div 
            id={`blog-post-${featuredPost.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 group cursor-pointer"
          >
            <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100">
              <div className="h-[400px] lg:h-auto overflow-hidden">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-12 md:p-16 flex flex-col justify-center">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-6 inline-block">{t.featured}</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 group-hover:text-indigo-600 transition-colors leading-tight">{featuredPost.title}</h2>
                <p className="text-slate-600 text-lg mb-10 font-light leading-relaxed">{featuredPost.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                    <div>
                      <p className="font-bold text-slate-800">MemoirME Team</p>
                      <p className="text-sm text-slate-400">{featuredPost.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => handleShare(featuredPost)} className="w-14 h-14 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center shadow-lg hover:bg-slate-200 transition-all">
                      <Share2 className="w-6 h-6" />
                    </button>
                    <button className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-45 transition-transform">
                      <ArrowRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Posts Grid */}
        {filteredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, idx) => (
                <motion.article 
                  key={post.id}
                  id={`blog-post-${post.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="group bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col h-full hover:-translate-y-2 transition-all duration-500"
                >
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 glass text-[10px] font-bold text-indigo-600 uppercase tracking-widest rounded-full">
                      {categories.find(c => c.id === post.category)?.label || post.category}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex-grow flex flex-col">
                  <div className="text-xs text-slate-400 mb-4 font-medium">{post.date}</div>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">{post.title}</h3>
                  <p className="text-slate-500 text-sm mb-8 line-clamp-3 font-light leading-relaxed">{post.excerpt}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <button className="flex items-center gap-3 text-indigo-600 font-bold text-sm group-hover:gap-5 transition-all">
                      {t.readMore} <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleShare(post)} className="text-slate-400 hover:text-indigo-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-32 bg-white/50 rounded-[3rem] border border-dashed border-slate-200"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-3xl font-serif text-slate-800 mb-4">
              {language === 'vi' ? 'Không tìm thấy kết quả' : 'No results found'}
            </h3>
            <p className="text-slate-500 text-lg max-w-md mx-auto font-light">
              {language === 'vi' 
                ? `Chúng mình không tìm thấy bài viết nào khớp với từ khóa "${searchQuery}". Hãy thử từ khóa khác nhé!` 
                : `We couldn't find any articles matching "${searchQuery}". Please try another keyword!`}
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-10 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:shadow-xl transition-all"
            >
              {language === 'vi' ? 'Xóa tìm kiếm' : 'Clear search'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FAQ = ({ language }: { language: Language }) => {
  const faqs = language === 'vi' ? [
    { q: "MemoirME có bảo mật không?", a: "Chúng tôi sử dụng mã hóa đầu cuối để đảm bảo mọi chia sẻ của bạn đều được bảo mật tuyệt đối." },
    { q: "Tính năng AI hoạt động như thế nào?", a: "AI của chúng tôi được huấn luyện để thấu cảm và đưa ra những lời khuyên dựa trên tâm lý học tích cực." },
    { q: "Tôi có thể sử dụng MemoirME miễn phí không?", a: "Hiện tại MemoirME đang trong giai đoạn thử nghiệm và hoàn toàn miễn phí cho mọi người dùng." }
  ] : [
    { q: "Is MemoirME secure?", a: "We use end-to-end encryption to ensure all your reflections are absolutely private." },
    { q: "How does the AI work?", a: "Our AI is trained to be empathetic and provide advice based on positive psychology." },
    { q: "Can I use MemoirME for free?", a: "Currently, MemoirME is in beta and completely free for all users." }
  ];

  return (
    <div className="mt-32">
      <h2 className="text-4xl font-serif mb-12 text-center">{language === 'vi' ? 'Câu hỏi thường gặp' : 'Frequently Asked Questions'}</h2>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {faqs.map((faq, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white border border-slate-100 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-3">{faq.q}</h4>
            <p className="text-slate-500 font-light leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactPage = ({ language }: { language: Language, key?: string }) => {
  const t = translations[language].contact;
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-5xl font-serif mb-6">{t.title}</h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              {t.desc}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Email</h4>
                  <p className="text-slate-500">support@memoirme.app</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-brand-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Social Media</h4>
                  <p className="text-slate-500">@memoirme_official</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-serif text-slate-800">
                    {language === 'vi' ? 'Cảm ơn bạn!' : 'Thank you!'}
                  </h3>
                  <p className="text-slate-500 font-light">
                    {language === 'vi' 
                      ? 'Chúng mình đã nhận được tin nhắn và sẽ phản hồi sớm nhất có thể.' 
                      : 'We have received your message and will respond as soon as possible.'}
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.name}</label>
                      <input type="text" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary" placeholder={t.form.namePlaceholder} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">{t.form.email}</label>
                      <input type="email" required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary" placeholder={t.form.emailPlaceholder} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.subject}</label>
                    <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary">
                      {t.form.subjectOptions.map((option: string) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">{t.form.message}</label>
                    <textarea rows={4} required className="w-full px-4 py-3 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary" placeholder={t.form.messagePlaceholder}></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-brand-primary text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
                    {t.form.submit}
                    <Send className="w-4 h-4" />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
        
        <FAQ language={language} />
      </div>
    </motion.div>
  );
};

// --- Main App ---

const BackgroundElements = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[120px] animate-pulse"></div>
    <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-pink-200/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-100/10 rounded-full blur-[150px]"></div>
  </div>
);

const TopQuizBanner = ({ language, onOpenQuiz, onClose }: { language: Language, onOpenQuiz: () => void, onClose: () => void }) => {
  const t = translations[language].quizBanner;
  return (
    <motion.div 
      initial={{ x: -400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -400, opacity: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed top-24 left-4 z-[100] w-[calc(100%-2rem)] max-w-[320px]"
    >
      <div className="glass-dark text-white p-4 rounded-[1.25rem] shadow-2xl flex flex-col gap-3 border border-white/10">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-2.5">
            <div className="flex w-9 h-9 bg-brand-primary rounded-xl items-center justify-center flex-shrink-0 shadow-lg shadow-brand-primary/20">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-[13px] font-semibold leading-snug text-white">
                {t.message}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors text-white/40 hover:text-white flex-shrink-0"
            aria-label={t.close}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="flex-grow px-4 py-2 bg-white text-brand-primary rounded-lg text-[11px] font-bold hover:bg-indigo-50 transition-all shadow-lg hover:scale-[1.02] active:scale-98"
            onClick={onOpenQuiz}
          >
            {t.cta}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [language, setLanguage] = useState<Language>('vi');
  const [blogFilter, setBlogFilter] = useState<string | undefined>(undefined);
  const [showQuizTeaser, setShowQuizTeaser] = useState(false);
  const [showScrollNotification, setShowScrollNotification] = useState(false);
  const [showBlogQuizPopup, setShowBlogQuizPopup] = useState(false);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [isFromNotification, setIsFromNotification] = useState(false);
  const [showQuizBanner, setShowQuizBanner] = useState(false);

  React.useEffect(() => {
    // Show quiz banner after 3 seconds
    const bannerTimer = setTimeout(() => {
      const hasClosedBanner = sessionStorage.getItem('hasClosedQuizBanner');
      if (!hasClosedBanner) {
        setShowQuizBanner(true);
      }
    }, 3000);

    const handleScroll = () => {
      // Show left notification at 800px
      if (window.scrollY > 800 && !sessionStorage.getItem('hasSeenNotification')) {
        setShowScrollNotification(true);
      }
      
      // Show blog quiz popup at 1800px
      if (window.scrollY > 1800 && !sessionStorage.getItem('hasSeenBlogQuiz')) {
        setShowBlogQuizPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    const timer = setTimeout(() => {
      const hasSeenQuiz = sessionStorage.getItem('hasSeenQuiz');
      if (!hasSeenQuiz && !showScrollNotification) {
        setShowQuizTeaser(true);
      }
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      clearTimeout(bannerTimer);
    };
  }, [showScrollNotification]);

  const handleCloseBanner = () => {
    setShowQuizBanner(false);
    sessionStorage.setItem('hasClosedQuizBanner', 'true');
  };

  const handleOpenQuiz = (fromNotification = false) => {
    setShowQuizTeaser(false);
    setShowScrollNotification(false);
    setShowBlogQuizPopup(false);
    setShowQuizBanner(false);
    setShowQuizPopup(true);
    setIsFromNotification(fromNotification);
    if (fromNotification) {
      sessionStorage.setItem('hasSeenNotification', 'true');
    }
  };

  const handleCloseTeaser = () => {
    setShowQuizTeaser(false);
    sessionStorage.setItem('hasSeenQuiz', 'true');
  };

  const handleCloseNotification = () => {
    setShowScrollNotification(false);
    sessionStorage.setItem('hasSeenNotification', 'true');
  };

  const handleCloseBlogQuiz = () => {
    setShowBlogQuizPopup(false);
    sessionStorage.setItem('hasSeenBlogQuiz', 'true');
  };

  const handleSelectBlogPost = (postId: string) => {
    setCurrentPage('blog');
    setShowBlogQuizPopup(false);
    sessionStorage.setItem('hasSeenBlogQuiz', 'true');
    
    // Use a small timeout to ensure the page has rendered before scrolling
    setTimeout(() => {
      const element = document.getElementById(`blog-post-${postId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add a temporary highlight effect
        element.classList.add('ring-4', 'ring-brand-primary/30');
        setTimeout(() => element.classList.remove('ring-4', 'ring-brand-primary/30'), 3000);
      }
    }, 100);
  };

  const handleQuizComplete = () => {
    // Redirect to blog page with a suggested filter based on quiz
    setCurrentPage('blog');
    setBlogFilter('Mental Health'); // Default to Mental Health as it's the most relevant
    window.scrollTo({ top: 0, behavior: 'smooth' });
    sessionStorage.setItem('hasSeenQuiz', 'true');
  };

  const handleCloseQuiz = () => {
    setShowQuizPopup(false);
    sessionStorage.setItem('hasSeenQuiz', 'true');
  };

  const handleCategoryClick = (category: string) => {
    setBlogFilter(category);
    setCurrentPage('blog');
    window.scrollTo(0, 0);
  };

  const handlePageChange = (page: Page) => {
    setCurrentPage(page);
    setBlogFilter(undefined);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative selection:bg-brand-primary/20 selection:text-brand-primary">
      <BackgroundElements />
      
      <AnimatePresence>
        {showQuizBanner && (
          <TopQuizBanner 
            language={language} 
            onOpenQuiz={() => handleOpenQuiz(false)} 
            onClose={handleCloseBanner} 
          />
        )}
      </AnimatePresence>

      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={handlePageChange} 
        language={language}
        setLanguage={setLanguage}
        topOffset={0}
      />
      
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && <HomePage key="home" onCategoryClick={handleCategoryClick} language={language} />}
          {currentPage === 'blog' && <BlogPage filter={blogFilter} language={language} />}
          {currentPage === 'contact' && <ContactPage language={language} />}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showQuizTeaser && <QuizTeaser language={language} onClick={() => handleOpenQuiz(false)} onClose={handleCloseTeaser} />}
        {showScrollNotification && <ScrollNotification language={language} onClick={() => handleOpenQuiz(true)} onClose={handleCloseNotification} />}
        {showBlogQuizPopup && <BlogQuizPopup language={language} onSelectPost={handleSelectBlogPost} onClose={handleCloseBlogQuiz} />}
        {showQuizPopup && <QuizPopup language={language} onClose={handleCloseQuiz} onComplete={handleQuizComplete} />}
      </AnimatePresence>

      <Footer language={language} setCurrentPage={handlePageChange} />
    </div>
  );
}
