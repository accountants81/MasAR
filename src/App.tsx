import { useState, useEffect, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, 
  MessageCircle, 
  ExternalLink, 
  Phone, 
  LogOut, 
  Sun, 
  Moon, 
  Lock, 
  User, 
  ShieldCheck, 
  Scale, 
  Languages,
  Image,
  Clock,
  Calendar,
  LayoutGrid
} from 'lucide-react';

// --- Constants ---
const LOGIN_CREDENTIALS = {
  email: 'aamo@gmail.com',
  password: 'AO01050'
};

const LOGO_URL = "https://i.postimg.cc/4yBwFmqb/file-00000000dd647246977d8d99c34ab73a.png";

const TRANSLATIONS = {
  ar: {
    loginTitle: "وصول المشرفين",
    loginSubtitle: "يرجى إدخال بيانات الاعتماد للوصول إلى بوابة الروابط الخاصة بمجموعة مسار",
    emailLabel: "البريد الإلكتروني",
    passwordLabel: "كلمة المرور",
    loginBtn: "دخول البوابة",
    error: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    underSupervision: "تحت إشراف الخبير المحاسبي",
    supervisorName: "أ/ عبدالعزيز عمران - محاسب قانوني",
    intellectualRights: "المحتوى مُسجّل وجميع الحقوق مملوكة للناشر",
    copyright: "جميع الحقوق مملوكة لـ",
    logoutBtn: "تسجيل الخروج الرسمي",
    visit: "زيارة الرابط"
  },
  en: {
    loginTitle: "Admin Access",
    loginSubtitle: "Please enter credentials to access the Masar Group links portal",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    loginBtn: "Enter Portal",
    error: "Invalid email or password",
    underSupervision: "Under Supervision of Accounting Expert",
    supervisorName: "Mr. Abdelaziz Omran - CPA",
    intellectualRights: "Content is registered and all rights are reserved to the publisher",
    copyright: "All rights reserved to",
    logoutBtn: "Official Logout",
    visit: "Visit Link"
  }
};

const LINKS = [
  {
    title: { ar: "ملف Excel المحاسبي", en: "Accounting Excel File" },
    description: { ar: "الإدارة المركزية لبيانات العملاء والحسابات", en: "Centralized management of client data and accounts" },
    url: "https://docs.google.com/spreadsheets/d/1SuqYMpzvuvqSpeAixcilOhmkC3oglKk65tTAefwYJjo/edit?usp=drivesdk",
    icon: <FileSpreadsheet className="w-7 h-7" />,
    accent: "bg-emerald-500"
  },
  {
    title: { ar: "MasAR - الدليل الشامل لنظام إدارة المصنع الذكي", en: "MasAR - Smart Factory Management Guide" },
    description: { ar: "الدليل التعليمي والتقني المتكامل لنظام مسار الذكي", en: "Integrated educational and technical guide for MasAR system" },
    url: "https://drive.google.com/drive/folders/1yelTTmwQ76MAiY0DSvbm1DgbhYD90e-f",
    icon: <LayoutGrid className="w-7 h-7" />,
    accent: "bg-indigo-500"
  },
  {
    title: { ar: "مكتب عبد العزيز عمران للمحاسبة", en: "Abdelaziz Omran Accounting Office" },
    description: { ar: "خبرة تتجاوز 30 عاماً في المحاسبة والضرائب", en: "Over 30 years of experience in accounting and taxes" },
    url: "https://aamo.vercel.app/",
    icon: <Scale className="w-7 h-7" />,
    accent: "bg-amber-500"
  },
  {
    title: { ar: "مجموعة WhatsApp العمل", en: "Work WhatsApp Group" },
    description: { ar: "غرفة التواصل المباشر والتنسيق السريع", en: "Direct communication and layout coordination" },
    url: "https://chat.whatsapp.com/IIEPLzg69XA0hBmoAxHDoN",
    icon: <MessageCircle className="w-7 h-7" />,
    accent: "bg-blue-500"
  },
  {
    title: { ar: "مركز رفع الصور", en: "Image Hosting Center" },
    description: { ar: "يجب تسجيل الدخول أولاً وإنشاء مستودع - انسخ رابط الصورة المباشر وضعه في مكانه في الأرشيف القانوني", en: "Login first and create a repository - Copy the direct image link and place it in its location in the Legal Archive" },
    url: "https://postimages.org/",
    icon: <Image className="w-7 h-7" />,
    accent: "bg-orange-500"
  },
  {
    title: { ar: "تطبيق جداول البيانات", en: "Google Sheets App" },
    description: { ar: "تحميل تطبيق Google Sheets لإدارة الجداول على الأندرويد", en: "Download Google Sheets app for managing spreadsheets on Android" },
    url: "https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.sheets",
    icon: <FileSpreadsheet className="w-7 h-7" />,
    accent: "bg-blue-600"
  }
];

// --- Components ---

const ClockWidget = ({ isDarkMode, lang }: { isDarkMode: boolean, lang: 'ar' | 'en' }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? (lang === 'ar' ? 'مساءً' : 'PM') : (lang === 'ar' ? 'صباحاً' : 'AM');
  const displayHours = (hours % 12 || 12).toString().padStart(2, '0');

  const dateString = time.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', {
    day: 'numeric',
    month: 'short'
  });
  
  const weekday = time.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long' });
  const year = time.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`w-full max-w-[360px] mb-12 p-[1px] rounded-[2.5rem] overflow-hidden relative group transition-all duration-700 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-white/10 via-transparent to-white/5 shadow-2xl' 
          : 'bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-500/5 shadow-xl'
      }`}
    >
      <div className={`absolute inset-0 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-10 ${
        isDarkMode ? 'bg-indigo-400' : 'bg-indigo-600'
      }`} />
      
      <div className={`relative z-10 px-8 py-6 rounded-[2.4rem] flex items-center justify-between gap-6 backdrop-blur-3xl border border-white/5 ${
        isDarkMode ? 'bg-slate-950/40' : 'bg-white/80 shadow-inner'
      }`}>
        {/* Clock Side */}
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl md:text-5xl font-mono font-black tracking-tighter tabular-nums ${
              isDarkMode ? 'text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.4)]' : 'text-indigo-600'
            }`}>
              {displayHours}:{minutes}
            </span>
            <span className="text-[9px] font-black opacity-30 uppercase tracking-[0.2em]">
              {ampm}
            </span>
          </div>
        </div>

        <div className={`h-12 w-px ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'}`} />

        {/* Date Side */}
        <div className="flex flex-col items-end text-end">
           <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] mb-1.5 ${
             isDarkMode ? 'text-indigo-400/80 shadow-indigo-500/20' : 'text-indigo-600/80 shadow-indigo-600/10'
           }`}>
             {weekday}
           </span>
           <div className="flex flex-col items-end leading-none">
             <span className="text-sm md:text-base font-bold opacity-90 truncate max-w-[120px] md:max-w-none">
               {dateString}
             </span>
             <span className="text-[10px] font-black opacity-30 mt-1">
               {year}
             </span>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundBubbles = ({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      <div className={`absolute inset-0 transition-colors duration-1000 ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.03),transparent_40%)]" />
      
      {/* Optimized static glows to prevent repaint lag */}
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/[0.04] blur-[80px] rounded-full" />
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/[0.03] blur-[80px] rounded-full" />
    </div>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial setup
  useEffect(() => {
    const savedSession = localStorage.getItem('user_session_aamo');
    if (savedSession === 'active') setIsLoggedIn(true);
    
    // Default to dark mode for luxury look
    const savedTheme = localStorage.getItem('theme_aamo');
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    else setIsDarkMode(true);

    const savedLang = localStorage.getItem('lang_aamo');
    if (savedLang) setLang(savedLang as 'ar' | 'en');
  }, []);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === LOGIN_CREDENTIALS.email && password === LOGIN_CREDENTIALS.password) {
        setIsLoggedIn(true);
        localStorage.setItem('user_session_aamo', 'active');
      } else {
        setError(TRANSLATIONS[lang].error);
      }
      setIsLoading(false);
    }, 700);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user_session_aamo');
    setEmail('');
    setPassword('');
  };

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem('theme_aamo', next ? 'dark' : 'light');
  };

  const toggleLang = () => {
    const next = lang === 'ar' ? 'en' : 'ar';
    setLang(next);
    localStorage.setItem('lang_aamo', next);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div 
      className={`min-h-screen transition-colors duration-1000 font-sans selection:bg-indigo-500/30 overflow-x-hidden ${
        isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      <BackgroundBubbles isDarkMode={isDarkMode} />

      {/* Refined Header Controls */}
      <div className={`fixed top-6 ${lang === 'ar' ? 'left-6' : 'right-6'} z-50 flex gap-3`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLang}
          className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all shadow-lg font-display glass-card ${
            isDarkMode 
              ? 'bg-slate-900/60 text-indigo-400 hover:border-indigo-500/40' 
              : 'bg-white/80 text-indigo-600 hover:border-indigo-500/20 shadow-indigo-500/5'
          }`}
        >
          <Languages className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-tight">{lang === 'ar' ? 'English' : 'العربية'}</span>
        </motion.button>

        <motion.button
          key={isDarkMode ? 'dark' : 'light'}
          initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all shadow-lg glass-card ${
            isDarkMode 
              ? 'bg-slate-900/60 text-amber-400 hover:border-amber-500/40' 
              : 'bg-white/80 text-slate-700 hover:border-slate-300'
          }`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>
      </div>

      <main className="relative z-10 min-h-screen flex flex-col items-center pt-20 md:pt-28 pb-12 px-6 md:px-12 lg:justify-center">
        <AnimatePresence mode="wait">
          {!isLoggedIn ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              className={`w-full max-w-[380px] p-6 md:p-8 rounded-[2rem] glass-card premium-border mx-auto ${
                isDarkMode ? 'bg-slate-900/80' : 'bg-white/90'
              }`}
            >
              <div className="flex flex-col items-center mb-8 text-center">
                <motion.div 
                  animate={{ 
                    y: [0, -6, 0],
                    rotateY: [0, 10, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`p-4 rounded-2xl mb-5 shadow-inner border group relative ${
                    isDarkMode ? 'bg-indigo-500/5 border-white/5' : 'bg-indigo-100/50 border-indigo-200'
                  }`}
                >
                  <div className="absolute inset-0 bg-indigo-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <ShieldCheck className="w-10 h-10 text-indigo-500 relative z-10" />
                </motion.div>
                <h1 className="text-2xl font-display font-black tracking-tight mb-2">{t.loginTitle}</h1>
                <p className={`text-xs leading-relaxed opacity-60 font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {t.loginSubtitle}
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="group relative">
                  <label className={`block text-xs font-black uppercase tracking-widest mb-2 opacity-40 ${lang === 'ar' ? 'pr-2' : 'pl-2'}`}>
                    {t.emailLabel}
                  </label>
                  <div className="relative">
                    <User className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 transition-all group-focus-within:opacity-100 group-focus-within:text-indigo-500`} />
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full py-4 rounded-2xl border outline-none transition-all focus:ring-4 focus:ring-indigo-500/10 font-medium ${
                        lang === 'ar' ? 'pr-12 pl-6' : 'pl-12 pr-6'
                      } ${
                        isDarkMode 
                          ? 'bg-slate-800/40 border-white/5 text-white placeholder:text-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                      }`}
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <label className={`block text-xs font-black uppercase tracking-widest mb-2 opacity-40 ${lang === 'ar' ? 'pr-2' : 'pl-2'}`}>
                    {t.passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 transition-all group-focus-within:opacity-100 group-focus-within:text-indigo-500`} />
                    <input
                      required
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full py-4 rounded-2xl border outline-none transition-all focus:ring-4 focus:ring-indigo-500/10 font-medium ${
                        lang === 'ar' ? 'pr-12 pl-6' : 'pl-12 pr-6'
                      } ${
                        isDarkMode 
                          ? 'bg-slate-800/40 border-white/5 text-white placeholder:text-slate-700' 
                          : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-center gap-2 p-3 rounded-xl text-xs font-bold border ${
                      isDarkMode 
                        ? 'bg-red-500/5 border-red-500/20 text-red-400' 
                        : 'bg-red-50 border-red-100 text-red-600'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    {error}
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl font-display font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 luxury-button ${
                    isDarkMode ? 'shadow-indigo-900/20' : 'shadow-indigo-500/10'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{t.loginBtn}</span>
                      <ShieldCheck className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-3 text-center">
                <p className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  {t.intellectualRights}
                </p>
                <motion.a
                  href="https://aamo.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                    isDarkMode 
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/20' 
                      : 'bg-indigo-50 border-indigo-100 text-indigo-600 hover:bg-indigo-100 shadow-sm'
                  }`}
                >
                  <Scale className="w-3 h-3" />
                  <span>{t.supervisorName}</span>
                  <ExternalLink className="w-3 h-3 opacity-50" />
                </motion.a>
              </div>
            </motion.div>
          ) : (
            <div className="w-full max-w-3xl flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 relative"
              >
                <div className="absolute inset-0 bg-indigo-500/10 blur-[40px] rounded-full scale-125" />
                <img 
                  src={LOGO_URL} 
                  alt="AAO Logo" 
                  className="w-28 md:w-36 h-auto drop-shadow-xl relative z-10"
                />
              </motion.div>

              <ClockWidget isDarkMode={isDarkMode} lang={lang} />

              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 px-4 max-w-4xl">
                {LINKS.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative flex items-center p-5 md:p-6 rounded-2xl glass-card transition-all duration-300 premium-border ${
                      isDarkMode 
                        ? 'bg-slate-900/40 hover:bg-slate-800/80 shadow-2xl shadow-indigo-500/0 hover:shadow-indigo-500/5' 
                        : 'bg-white/60 hover:bg-white/90 shadow-lg shadow-slate-200/50 hover:shadow-indigo-200/50'
                    }`}
                  >
                    <div className={`p-4 rounded-xl transition-all group-hover:scale-110 shadow-lg ${lang === 'ar' ? 'ml-5' : 'mr-5'} ${
                      isDarkMode ? 'bg-slate-800 text-white border border-white/5' : 'bg-white text-indigo-600 border border-slate-100'
                    }`}>
                      {link.icon}
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <h3 className="text-sm md:text-lg font-display font-black tracking-tight transition-colors group-hover:text-indigo-400 truncate">
                        {lang === 'ar' ? link.title.ar : link.title.en}
                      </h3>
                      <p className={`text-[11px] md:text-xs font-medium opacity-50 line-clamp-2 mt-0.5 leading-relaxed`}>
                        {lang === 'ar' ? link.description.ar : link.description.en}
                      </p>
                    </div>

                    <div className={`absolute top-0 bottom-0 w-1.5 transition-all ${
                      lang === 'ar' ? 'left-0' : 'right-0'
                    } ${link.accent}`} />
                  </motion.a>
                ))}
              </div>

              <footer className="w-full flex flex-col items-center gap-10 mt-20 pb-12">
                <div className="text-center space-y-6 w-full max-w-xl px-4">
                  <div className="space-y-2">
                    <p className={`text-base font-medium opacity-50 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      {t.underSupervision}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-indigo-500">
                      {t.supervisorName}
                    </h2>
                  </div>

                  <div className="flex justify-center flex-row-reverse gap-8">
                    <motion.a 
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      href="tel:01226949834"
                      className={`group p-6 rounded-3xl transition-all duration-300 border ${
                        isDarkMode 
                        ? 'bg-slate-900/60 border-indigo-500/30 text-indigo-400 hover:border-indigo-500/60 hover:bg-indigo-500/5' 
                        : 'bg-white border-indigo-100 text-indigo-600 hover:border-indigo-300 shadow-xl shadow-indigo-500/5'
                      }`}
                      title={lang === 'ar' ? 'اتصال هاتف' : 'Call'}
                    >
                      <Phone className="w-8 h-8 stroke-[2px]" />
                    </motion.a>

                    <motion.a 
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://wa.me/201226949834"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group p-6 rounded-3xl transition-all duration-300 border ${
                        isDarkMode 
                        ? 'bg-slate-900/60 border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-500/5' 
                        : 'bg-white border-emerald-100 text-emerald-600 hover:border-emerald-300 shadow-xl shadow-emerald-500/5'
                      }`}
                      title={lang === 'ar' ? 'واتساب' : 'WhatsApp'}
                    >
                      <div className="relative">
                        <MessageCircle className="w-8 h-8 stroke-[2.5px]" />
                        <div className={`absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ${isDarkMode ? 'ring-2 ring-slate-900' : 'ring-2 ring-white'}`} />
                      </div>
                    </motion.a>
                  </div>

                  <div className="pt-8 border-t border-white/5 space-y-2">
                    <p className={`text-xs font-bold opacity-60 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t.copyright} <span className="text-indigo-500 font-extrabold">AAO</span> &copy; {new Date().getFullYear()}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isDarkMode 
                      ? 'text-red-400 border-red-500/20 bg-red-500/5 hover:bg-red-500/10' 
                      : 'text-red-600 border-red-100 bg-red-50 hover:bg-red-100'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t.logoutBtn}</span>
                </motion.button>
              </footer>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
