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
  Image
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
    title: { ar: "مجموعة WhatsApp العمل", en: "Work WhatsApp Group" },
    description: { ar: "غرفة التواصل المباشر والتنسيق السريع", en: "Direct communication and layout coordination" },
    url: "https://chat.whatsapp.com/IIEPLzg69XA0hBmoAxHDoN",
    icon: <MessageCircle className="w-7 h-7" />,
    accent: "bg-blue-500"
  },
  {
    title: { ar: "مكتب عبد العزيز عمران للمحاسبة", en: "Abdelaziz Omran Accounting Office" },
    description: { ar: "خبرة تتجاوز 30 عاماً في المحاسبة والضرائب", en: "Over 30 years of experience in accounting and taxes" },
    url: "https://aamo.vercel.app/",
    icon: <Scale className="w-7 h-7" />,
    accent: "bg-amber-500"
  },
  {
    title: { ar: "مركز رفع الصور", en: "Image Hosting Center" },
    description: { ar: "يجب تسجيل الدخول أولاً وإنشاء مستودع - انسخ رابط الصورة المباشر وضعه في مكانه في الأرشيف القانوني", en: "Login first and create a repository - Copy the direct image link and place it in its location in the Legal Archive" },
    url: "https://postimages.org/",
    icon: <Image className="w-7 h-7" />,
    accent: "bg-orange-500"
  }
];

// --- Components ---

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

      <main className="relative z-10 min-h-screen flex flex-col items-center pt-24 pb-12 px-4 md:px-8 lg:justify-center">
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
            </motion.div>
          ) : (
            <div className="w-full max-w-3xl flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12 relative"
              >
                <div className="absolute inset-0 bg-indigo-500/10 blur-[40px] rounded-full scale-125" />
                <img 
                  src={LOGO_URL} 
                  alt="AAO Logo" 
                  className="w-32 md:w-44 h-auto drop-shadow-xl relative z-10"
                />
              </motion.div>

              <div className="w-full flex flex-col gap-3 px-4">
                {LINKS.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.01, x: lang === 'ar' ? 4 : -4 }}
                    className={`group relative flex items-center p-4 md:p-5 rounded-xl glass-card transition-all duration-300 premium-border ${
                      isDarkMode 
                        ? 'bg-slate-900/40 hover:bg-slate-800/60' 
                        : 'bg-white/60 hover:bg-white/80'
                    }`}
                  >
                    <div className={`p-3 rounded-lg transition-all group-hover:scale-110 shadow-md ${lang === 'ar' ? 'ml-4' : 'mr-4'} ${
                      isDarkMode ? 'bg-slate-800 text-white border border-white/5' : 'bg-white text-slate-800 border border-slate-100'
                    }`}>
                      {link.icon}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-base md:text-lg font-display font-bold transition-colors group-hover:text-indigo-400">
                        {lang === 'ar' ? link.title.ar : link.title.en}
                      </h3>
                      <p className={`text-[10px] md:text-xs font-medium opacity-40`}>
                        {lang === 'ar' ? link.description.ar : link.description.en}
                      </p>
                    </div>

                    <div className={`${lang === 'ar' ? 'mr-4' : 'ml-4'} opacity-0 group-hover:opacity-100 transition-all`}>
                      <ExternalLink className="w-5 h-5 text-indigo-500" />
                    </div>

                    <div className={`absolute top-0 bottom-0 w-1 transition-all ${
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

                  <div className="flex justify-center">
                    <motion.a 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="tel:01010369035"
                      className={`flex items-center gap-3 px-8 py-4 rounded-2xl glass-card transition-all luxury-button ${
                        isDarkMode 
                        ? 'bg-slate-900 border-white/10 text-indigo-400' 
                        : 'bg-white border-slate-200 text-indigo-600 shadow-xl'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      <span className="text-xl font-mono font-black" dir="ltr">01010369035</span>
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
