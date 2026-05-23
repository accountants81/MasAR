import {
  useState,
  useEffect,
  useCallback,
  FormEvent,
  useRef,
  ChangeEvent,
  memo,
} from "react";
import { motion, AnimatePresence } from "motion/react";
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
  LayoutGrid,
  Search,
  Copy,
  Check,
  Zap,
  Sparkles,
  Menu,
  X,
  Key,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Info,
  Settings,
  Share2,
  Trash2,
  Plus,
  Download,
  Upload,
  Pencil,
  Facebook,
  Megaphone,
  Globe,
  Activity,
} from "lucide-react";

// --- Constants ---
const LOGIN_CREDENTIALS = {
  email: "aaamo0105@gmail.com",
  password: "AO01050",
};

const LOGO_URL = "https://i.postimg.cc/TYZGFHn9/FB-IMG-1778842733437.jpg";

const TRANSLATIONS = {
  ar: {
    loginTitle: "وصول المشرفين",
    loginSubtitle:
      "يرجى إدخال بيانات الاعتماد للوصول لقسم تعديل أكواد التوجيه السرية",
    emailLabel: "البريد الإلكتروني للمشرف",
    passwordLabel: "كلمة المرور الأمنية",
    loginBtn: "تأكيد الدخول الآمن",
    error: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    underSupervision: "تحت إشراف الخبير المحاسبي",
    supervisorName: "أ/ عبدالعزيز عمران - محاسب قانوني",
    intellectualRights: "المحتوى مُسجّل وجميع الحقوق مملوكة للناشر",
    copyright: "جميع الحقوق مملوكة لـ",
    logoutBtn: "تسجيل الخروج الرسمي",
    visit: "زيارة الرابط",
    searchPlaceholder: "ابحث في الروابط والملفات...",
    copySuccess: "تم النسخ بنجاح",
    noResults: "لا توجد نتائج مطابقة لبحثك",
    welcomeBack: "مرحباً بك مجدداً",
    quickStats: "نظرة عامة على الموارد",
    totalLinks: "إجمالي الروابط",
    activeNow: "الجلسات النشطة",
    aboutUsTitle: "من نحن؟",
    aboutUsDesc:
      "مكتب الأستاذ عبد العزيز عمران للاستشارات الضريبية والمحاسبة والمراجعة (محاسب قانوني معتمد) مع خبرة مهنية وعملية ممتدة لأكثر من 30 عاماً في خدمة وتطوير قطاع الشركات والأعمال التجارية والأفراد. نقدم باقة متكاملة من الخدمات المالية والمحاسبية والضريبية بدقة واحترافية متناهية مع الالتزام التام بكافة القوانين واللوائح التنظيمية وضمان الجودة والدقة المطلقة. تفضلوا بزيارة موقعنا الرسمي لمزيد من التفاصيل والحلول الذكية.",
    adminPortal: "بوابة إدارة المشرف",
    pageCodeLabel: "كود الصفحة الشخصية والملفات",
    pageUrlLabel: "رابط الصفحة الشخصية المستهدف",
    waCodeLabel: "كود جروب الوتساب",
    waUrlLabel: "رابط جروب الوتساب المستهدف",
    enterPageCode: "أدخل كود الملف أو الصفحة الشخصية...",
    enterWaCode: "أدخل كود جروب الواتساب الخاص بك...",
    btnGo: "تحقق ودخول",
    codeExample: "مثال: AAMO26",
    waExample: "مثال: WA26",
    invalidCode: "عذراً الكود الذي أدخلته غير متوفر أو منتهي الصلاحية!",
    sidebarTitle: "القائمة الجانبية",
    adminLoginBtn: "تسجيل دخول المشرف",
    settingsTitle: "إعدادات الأكواد (للمشرف)",
    saveSuccess: "تم حفظ التعديلات بنجاح!",
    socialTitle: "قنوات التواصل المباشر",
    adminGreeting: "أهلاً بك يا مشرف البوابة",
    addBtn: "إضافة الكود للقائمة",
    searchBtn: "بحث بداخل الأكواد المسجلة...",
    deleteBtn: "حذف الكود",
    codeLabel: "الكود المعين",
    urlLabel: "الرابط المستهدف",
    pageCodesTab: "أكواد الملفات والصفحات الشخصية",
    waCodesTab: "أكواد جروبات الوتساب",
    adminTitle: "لوحة التحكم وإدارة الأكواد (المشرف)",
    exportBtn: "تصدير نسخة احتياطية (JSON)",
    importBtn: "استيراد ملف احتياطي",
    activeCodesCount: "إجمالي الأكواد المسجلة",
    placeholderCode: "مثال: CODE90",
    placeholderUrl: "ضع رابط التوجيه الكامل هنا...",
    duplicateError: "عذراً! هذا الكود مسجّل بالفعل مسبقاً في هذه الخانة!",
    fillAllError: "يرجى كتابة الكود وإضافة الرابط بشكل كامل للتمكن من الحفظ!",
    waShortcutLabel: "بوابة كود جروب الوتساب",
    excelShortcutLabel: "بوابة كود الملفات والصفحات",
    modalOk: "فهمت وموافق",
    importSuccess: "تم استيراد قائمة الأكواد وتحديثها بنجاح!",
    importError: "فشل استيراد الملف، يرجى التأكد من اختيار ملف JSON صحيح.",
    normalUserViewTitle: "مرحباً بك",
    normalUserViewSubtitle:
      "من خلال الموقع ده، هتقدر تحصل على نظام محاسبي وإداري متكامل ومخصص لشركتك ومصنعك علشان تعيد تنظيم ومتابعة أعمالك بكفاءة عالية بإذن الله. اكتب الكود المخصص ليك تحت وهيتم توجيهك مباشرة وبأمان لمساحتك ومستنداتك الخاصة.",
    editBtnText: "تعديل",
    cancelBtnText: "إلغاء",
    saveBtnText: "حفظ",
    noteLabel: "ملاحظة خاصة بالرابط (اختياري - تظهر للمشرف فقط)",
    placeholderNote: "مثال: لمصنع السلام، أو محاسب شركة الفرسان...",
    maxUsesLabel: "أقصى عدد استخدام مسموح (اختياري - اتركه فارغاً أو 0 ليكون غير محدود)",
    placeholderMaxUses: "مثال: 10",
    currentUsesLabel: "عدد مرات الاستخدام الحالية",
    usesCountText: "مرات الاستخدام",
    unlimitedUses: "غير محدود",
    usageLimitReached: "عذراً، هذا الكود انتهت صلاحية استخدامه لتجاوز الحد الأقصى المسموح به!",
  },
  en: {
    loginTitle: "Admin Access",
    loginSubtitle:
      "Sign in to access secure redirect codes management dashboard",
    emailLabel: "Admin Email Address",
    passwordLabel: "Security Password",
    loginBtn: "Authorize Access",
    error: "Invalid email or password",
    underSupervision: "Under Supervision of Accounting Expert",
    supervisorName: "Mr. Abdelaziz Omran - CPA",
    intellectualRights:
      "Content is registered and all rights are reserved to the publisher",
    copyright: "All rights reserved to",
    logoutBtn: "Official Logout",
    visit: "Visit Link",
    searchPlaceholder: "Search links and files...",
    copySuccess: "Copied successfully",
    noResults: "No matching results found",
    welcomeBack: "Welcome Back",
    quickStats: "Resources Overview",
    totalLinks: "Total Links",
    activeNow: "Active Sessions",
    aboutUsTitle: "Who We Are?",
    aboutUsDesc:
      "The advanced digital portal for the professional practices of CPA Mr. Abdelaziz Omran. We aim to supply our clients with high-precision financial products, offering a rapid and secure gateway to download specialized accounting Excel models, and dynamic paths to essential fiscal sheets, interactive training databases, and direct communications.",
    adminPortal: "Admin Management Portal",
    pageCodeLabel: "Files & Page Code",
    pageUrlLabel: "Personal Page Destination URL",
    waCodeLabel: "WhatsApp Group Code",
    waUrlLabel: "WhatsApp Group Destination URL",
    enterPageCode: "Enter file or personal page code...",
    enterWaCode: "Enter your WhatsApp group code...",
    btnGo: "Validate & Redirect",
    codeExample: "e.g. AAMO26",
    waExample: "e.g. WA26",
    invalidCode: "Sorry, this code is not registered or has expired!",
    sidebarTitle: "Navigation Drawer",
    adminLoginBtn: "Admin Dashboard Login",
    settingsTitle: "Codes Settings (Admin)",
    saveSuccess: "Changes saved successfully!",
    socialTitle: "Direct Contact Channels",
    adminGreeting: "Welcome, System Admin",
    addBtn: "Register Code",
    searchBtn: "Search registered codes...",
    deleteBtn: "Delete",
    codeLabel: "Designated Code",
    urlLabel: "Target Destination URL",
    pageCodesTab: "Database & Files Codes",
    waCodesTab: "WhatsApp Group Codes",
    adminTitle: "Admin Codes Registry Manager",
    exportBtn: "Export JSON Backup",
    importBtn: "Import Backup File",
    activeCodesCount: "Total Registered Codes",
    placeholderCode: "e.g., CODE90",
    placeholderUrl: "Insert the complete destination link here...",
    duplicateError: "Error! This code is already registered in this category!",
    fillAllError:
      "Please fill in both the code and the destination URL to proceed!",
    waShortcutLabel: "WhatsApp Redirect Gateway",
    excelShortcutLabel: "Files & Spreadsheet Registry",
    modalOk: "OK, I Understand",
    importSuccess: "Codes list imported successfully!",
    importError: "Failed to import. Please select a valid JSON backup file.",
    normalUserViewTitle: "Welcome",
    normalUserViewSubtitle:
      "Through this website, you can get a custom, integrated accounting and management system developed for your company and factory to reorganize and track your business with high efficiency, God willing. Just type your private code below to easily and securely access your specialized digital workspace.",
    editBtnText: "Edit",
    cancelBtnText: "Cancel",
    saveBtnText: "Save",
    noteLabel: "Link Private Note (Optional - Visible to admins only)",
    placeholderNote: "e.g., Al-Salam Factory, custom client, etc...",
    maxUsesLabel: "Max Uses Limit (Optional - leave blank or 0 for unlimited)",
    placeholderMaxUses: "e.g., 10",
    currentUsesLabel: "Current Uses Count",
    usesCountText: "Uses Done",
    unlimitedUses: "Unlimited",
    usageLimitReached: "Sorry, this code has expired because it reached its maximum usage limit!",
  },
};

const LINKS = [
  {
    title: {
      ar: "MasAR - الدليل الشامل لنظام إدارة المصنع الذكي",
      en: "MasAR - Smart Factory Management Guide",
    },
    description: {
      ar: "الدليل التعليمي والتقني المتكامل لنظام مسار الذكي",
      en: "Integrated educational and technical guide for MasAR system",
    },
    url: "https://drive.google.com/drive/folders/1yelTTmwQ76MAiY0DSvbm1DgbhYD90e-f",
    icon: <LayoutGrid className="w-6.5 h-6.5 md:w-7 md:h-7 stroke-[1.75]" />,
    accent: "bg-indigo-600",
    borderColor: "border-l-indigo-600 hover:border-l-indigo-500",
  },
  {
    title: {
      ar: "مكتب عبد العزيز عمران للمحاسبة",
      en: "Abdelaziz Omran Accounting Office",
    },
    description: {
      ar: "خبرة تتجاوز 30 عاماً في المحاسبة والضرائب",
      en: "Over 30 years of experience in accounting and taxes",
    },
    url: "https://aamo.vercel.app/",
    icon: <Scale className="w-6.5 h-6.5 md:w-7 md:h-7 stroke-[1.75]" />,
    accent: "bg-emerald-600",
    borderColor: "border-l-emerald-600 hover:border-l-emerald-500",
  },
  {
    title: { ar: "مركز رفع الصور", en: "Image Hosting Center" },
    description: {
      ar: "يجب تسجيل الدخول أولاً وإنشاء مستودع - انسخ رابط الصورة المباشر وضعه في مكانه في الأرشيف القانوني",
      en: "Login first and create a repository - Copy direct link",
    },
    url: "https://postimages.org/",
    icon: <Image className="w-6.5 h-6.5 md:w-7 md:h-7 stroke-[1.75]" />,
    accent: "bg-orange-500",
    borderColor: "border-l-orange-500 hover:border-l-orange-400",
  },
  {
    title: { ar: "تطبيق جداول البيانات", en: "Google Sheets App" },
    description: {
      ar: "تحميل تطبيق Google Sheets لإدارة الجداول على الأندرويد",
      en: "Download Google Sheets app for managing spreadsheets on Android",
    },
    url: "https://play.google.com/store/apps/details?id=com.google.android.apps.docs.editors.sheets",
    icon: (
      <FileSpreadsheet className="w-6.5 h-6.5 md:w-7 md:h-7 stroke-[1.75]" />
    ),
    accent: "bg-blue-600",
    borderColor: "border-l-blue-600 hover:border-l-blue-500",
  },
];

// --- Components ---

const QuickAction = ({
  icon: Icon,
  label,
  onClick,
  isDarkMode,
  lang,
}: {
  icon: any;
  label: string;
  onClick: () => void;
  isDarkMode: boolean;
  lang: "ar" | "en";
}) => (
  <motion.button
    whileHover={{ scale: 1.03, y: -1 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-2 p-3 md:p-3.5 rounded-2xl transition-all border ${
      isDarkMode
        ? "bg-slate-900/40 border-white/10 hover:border-indigo-500/40 hover:bg-slate-900/80 text-slate-300 hover:text-indigo-300"
        : "bg-white border-slate-200 hover:border-indigo-400 text-slate-650 hover:text-indigo-750 shadow-sm shadow-indigo-500/5 font-semibold"
    }`}
  >
    <Icon className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
    <span
      className={`text-[10px] md:text-[11px] font-bold ${lang === "ar" ? "tracking-normal" : "uppercase tracking-widest"}`}
    >
      {label}
    </span>
  </motion.button>
);

const ClockWidget = ({
  isDarkMode,
  lang,
}: {
  isDarkMode: boolean;
  lang: "ar" | "en";
}) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");
  const ampm =
    hours >= 12
      ? lang === "ar"
        ? "مساءً"
        : "PM"
      : lang === "ar"
        ? "صباحاً"
        : "AM";
  const displayHours = (hours % 12 || 12).toString().padStart(2, "0");

  const dateString = time.toLocaleDateString(
    lang === "ar" ? "ar-EG" : "en-US",
    {
      day: "numeric",
      month: "short",
    },
  );

  const weekday = time.toLocaleDateString(lang === "ar" ? "ar-EG" : "en-US", {
    weekday: "long",
  });
  const year = time.getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full max-w-[350px] md:max-w-[380px] mb-6 p-[1px] rounded-2xl overflow-hidden relative group transition-all duration-150 shadow-lg ${
        isDarkMode
          ? "bg-gradient-to-br from-indigo-500/10 via-slate-900 to-indigo-500/5 shadow-slate-950/20"
          : "bg-gradient-to-br from-indigo-50/50 to-slate-200/50 shadow-indigo-500/5"
      }`}
    >
      <div
        className={`relative z-10 px-5 py-3.5 rounded-2xl flex items-center justify-between gap-3 border border-indigo-500/10 ${
          isDarkMode ? "bg-slate-950" : "bg-white"
        }`}
      >
        {/* Clock Side */}
        <div className="flex flex-col justify-center">
          <div
            className="flex items-baseline gap-1"
            style={{ direction: "ltr" }}
          >
            <span
              className={`text-3xl md:text-4xl font-mono font-bold tracking-tight tabular-nums ${
                isDarkMode
                  ? "bg-gradient-to-r from-indigo-400 via-violet-300 to-blue-200 bg-clip-text text-transparent"
                  : "text-indigo-800 font-extrabold"
              }`}
            >
              {displayHours}
            </span>
            <span
              className={`text-2.5xl md:text-3.5xl font-mono font-bold animate-pulse ${isDarkMode ? "text-indigo-400/60" : "text-indigo-600/60"}`}
            >
              :
            </span>
            <span
              className={`text-3xl md:text-4xl font-mono font-bold tracking-tight tabular-nums ${
                isDarkMode
                  ? "bg-gradient-to-r from-indigo-100 via-indigo-300 to-sky-200 bg-clip-text text-transparent"
                  : "text-indigo-800 font-extrabold"
              }`}
            >
              {minutes}
            </span>

            {/* Soft pulsing second count indicator */}
            <span className="text-[10px] md:text-xs font-mono font-medium opacity-40 ml-1 self-end mb-1.5 tabular-nums">
              {seconds}
            </span>

            <span
              className={`text-[9px] md:text-[10px] font-bold opacity-60 ml-1.5 self-end mb-1.5 ${lang === "ar" ? "tracking-normal" : "uppercase tracking-wider"}`}
            >
              {ampm}
            </span>
          </div>
        </div>

        <div
          className={`h-8 w-px ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}
        />

        {/* Date Side with Cairo alignment */}
        <div className="flex flex-col items-end text-end">
          <span
            className={`text-[10px] md:text-xs font-bold mb-0.5 flex items-center gap-1 ${
              lang === "ar" ? "tracking-normal" : "uppercase tracking-wider"
            } ${isDarkMode ? "text-indigo-400" : "text-indigo-700"}`}
          >
            <Calendar className="w-3.5 h-3.5" />
            {weekday}
          </span>
          <div className="flex flex-col items-end leading-none">
            <span className="text-xs md:text-sm font-semibold opacity-90 truncate max-w-[130px] mt-0.5">
              {dateString}
            </span>
            <span className="text-[9px] font-medium opacity-30 mt-0.5">
              {year}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BackgroundBubbles = memo(({ isDarkMode }: { isDarkMode: boolean }) => {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
      {/* Base Background Layer - very snappy instant transition */}
      <div
        className={`absolute inset-0 transition-colors duration-100 ${
          isDarkMode ? "bg-[#090a10]" : "bg-[#f8fafd]"
        }`}
      />

      {/* Futuristic Cyber Grid overlay */}
      <div
        className={`absolute inset-0 opacity-[0.02] dark:opacity-[0.05] ${
          isDarkMode ? "invert-0 text-slate-500" : "invert text-slate-400"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Soft Luminous Glow Nebula Overlays with super-fast hardware-accelerated radial gradients */}
      <div
        className={`absolute inset-0 transition-all duration-150 ${
          isDarkMode ? "opacity-45" : "opacity-20"
        }`}
        style={{
          background: "radial-gradient(circle at 90% 10%, rgba(99, 102, 241, 0.45) 0%, transparent 60%), radial-gradient(circle at 10% 80%, rgba(139, 92, 246, 0.35) 0%, transparent 60%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
        }}
      />

      {/* Cybernetic Star Particles overlay - Softer and slower */}
      <div className="absolute inset-0 opacity-10 dark:opacity-25">
        <div className="absolute top-[15%] left-[22%] w-1.5 h-1.5 rounded-full bg-indigo-200/60 blur-xs animate-ping" style={{ animationDuration: '6s' }} />
        <div className="absolute top-[48%] left-[72%] w-1 h-1 rounded-full bg-violet-300/45 blur-xs animate-ping" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[82%] left-[28%] w-1.5 h-1.5 rounded-full bg-blue-200/50 blur-xs animate-ping" style={{ animationDuration: '9s' }} />
        <div className="absolute top-[58%] left-[12%] w-1 h-1 rounded-full bg-purple-200/40 blur-xs animate-ping" style={{ animationDuration: '7s' }} />
      </div>
    </div>
  );
});

const SERVICES = [
  {
    titleAr: "إعداد الضرائب",
    titleEn: "Tax Preparation",
    descAr: "تقديم خدمات ضريبية متكاملة وفقًا للقوانين المحلية والدولية، بما في ذلك إعداد الإقرارات الضريبية والاستشارات الضريبية.",
    descEn: "Providing integrated tax services in compliance with local & international laws, including tax returns and general tax planning.",
    icon: "Percent"
  },
  {
    titleAr: "المراجعة القانونية",
    titleEn: "Legal Audit",
    descAr: "تقديم خدمات مراجعة قانونية لضمان الامتثال للقوانين واللوائح المحلية والدولية.",
    descEn: "Professional legal audit services to verify total alignment with local and international regulatory frameworks.",
    icon: "Scale"
  },
  {
    titleAr: "إعداد التقارير المالية",
    titleEn: "Financial Reporting",
    descAr: "إعداد تقارير مالية دقيقة وشفافة للشركات والأفراد وفق أفضل المعايير المحاسبية.",
    descEn: "Drafting highly transparent, accurate, and structured financial statements tailored for corporations and individuals.",
    icon: "FileSpreadsheet"
  },
  {
    titleAr: "الاستشارات المالية",
    titleEn: "Financial Advisory",
    descAr: "تقديم استشارات مالية وإدارية لتحسين الأداء المالي واتخاذ القرارات الاستراتيجية الناجحة.",
    descEn: "Delivering expert strategic financial guidance to boost profitability, optimize assets, and frame critical decisions.",
    icon: "Sparkles"
  },
  {
    titleAr: "الفواتير الإلكترونية",
    titleEn: "E-Invoicing",
    descAr: "إعداد وإدارة الفواتير الإلكترونية وفقًا لأحدث الأنظمة والتقنيات المعتمدة قانونياً.",
    descEn: "Deploying and managing electronic invoicing operations compliant with modern digital tax platforms and technologies.",
    icon: "Zap"
  },
  {
    titleAr: "إعداد الميزانيات",
    titleEn: "Budgeting & Planning",
    descAr: "نساعد الشركات في إعداد ميزانياتها السنوية وتحليل الأداء والمسارات المالية المختلفة.",
    descEn: "Assisting organizations in compiling yearly operational budgets, mapping resources, and analyzing performance curves.",
    icon: "LayoutGrid"
  },
  {
    titleAr: "تأسيس الشركات",
    titleEn: "Company Incorporation",
    descAr: "تأسيس الشركات بجميع أنواعها واستخراج الأوراق وتجهيز الملفات الخاصة بالقروض.",
    descEn: "Incorporating legal business entities, processing regulatory paperwork, and preparing premium commercial loan dossiers.",
    icon: "ShieldCheck"
  },
  {
    titleAr: "تصفية الشركات",
    titleEn: "Company Liquidation",
    descAr: "تصفية الشركات واستخراج جميع أنواع التراخيص وتيسير إجراءات التأمينات والتنمية الصناعية.",
    descEn: "Handling complete business liquidations, de-registrations, and extracting municipal, industrial, and social insurance licenses.",
    icon: "LogOut"
  }
];

const renderServiceIcon = (iconName: string, isDarkMode: boolean) => {
  const iconClass = `w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400 shrink-0`;
  switch (iconName) {
    case "Percent":
      return <FileSpreadsheet className={iconClass} />;
    case "Scale":
      return <Scale className={iconClass} />;
    case "FileSpreadsheet":
      return <FileSpreadsheet className={iconClass} />;
    case "Sparkles":
      return <Sparkles className={iconClass} />;
    case "Zap":
      return <Zap className={iconClass} />;
    case "LayoutGrid":
      return <LayoutGrid className={iconClass} />;
    case "ShieldCheck":
      return <ShieldCheck className={iconClass} />;
    case "LogOut":
      return <LogOut className={iconClass} />;
    default:
      return <Info className={iconClass} />;
  }
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [lang, setLang] = useState<"ar" | "en">("ar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // States for search and editing codes
  const [searchQuery, setSearchQuery] = useState("");
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editCode, setEditCode] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editNote, setEditNote] = useState("");
  const [editMaxUses, setEditMaxUses] = useState("");

  // Dynamic lists supporting over 1,000 codes for each input field! Persistent in localStorage.
  const [pageCodesList, setPageCodesList] = useState<
    { code: string; url: string; note?: string; maxUses?: number; currentUses?: number; }[]
  >(() => {
    const saved = localStorage.getItem("page_codes_list_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              typeof item.code === "string" &&
              typeof item.url === "string",
          );
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    return [
      {
        code: "AAMO26",
        url: "https://docs.google.com/spreadsheets/d/1GnXGaXENhKlmUbgP_ZA50ZKhlCHH7kzh/edit?usp=drivesdk&ouid=101182642930711005555&rtpof=true&sd=true",
        note: "رابط نموذج الحسابات لشركة الفرسان",
        maxUses: 0,
        currentUses: 0,
      },
      {
        code: "AAMO",
        url: "https://aamo.vercel.app/",
        note: "الموقع الرسمي للمكتب",
        maxUses: 0,
        currentUses: 0,
      },
    ];
  });

  const [waCodesList, setWaCodesList] = useState<
    { code: string; url: string; note?: string; maxUses?: number; currentUses?: number; }[]
  >(() => {
    const saved = localStorage.getItem("wa_codes_list_v2");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.filter(
            (item) =>
              item &&
              typeof item === "object" &&
              typeof item.code === "string" &&
              typeof item.url === "string",
          );
        }
      } catch (e) {
        // Fallback to defaults
      }
    }
    return [
      {
        code: "WA26",
        url: "https://chat.whatsapp.com/IIEPLzg69XA0hBmoAxHDoN",
        note: "جروب عملاء المكتب الرئيسيين",
        maxUses: 0,
        currentUses: 0,
      },
    ];
  });

  // Admin Setup Forms
  const [newCodeKey, setNewCodeKey] = useState("");
  const [newCodeUrl, setNewCodeUrl] = useState("");
  const [newCodeNote, setNewCodeNote] = useState("");
  const [newCodeMaxUses, setNewCodeMaxUses] = useState("");
  const [adminActiveTab, setAdminActiveTab] = useState<"page" | "wa">("page");
  const [adminSearchQuery, setAdminSearchQuery] = useState("");
  const [adminFormError, setAdminFormError] = useState("");
  const [adminFormSuccess, setAdminFormSuccess] = useState("");

  // Individual Redirect Codes inputs for ordinary citizens
  const [enteredPageCode, setEnteredPageCode] = useState("");
  const [enteredWaCode, setEnteredWaCode] = useState("");

  // Validity/shaking feedback trigger states
  const [pageCodeError, setPageCodeError] = useState(false);
  const [waCodeError, setWaCodeError] = useState(false);
  const [pageCodeErrorMsg, setPageCodeErrorMsg] = useState("");
  const [waCodeErrorMsg, setWaCodeErrorMsg] = useState("");

  // UI Control toggles
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Reference for JSON bulk import file chooser
  const fileInputRef = useRef<HTMLInputElement>(null);

  // On mount session loading
  useEffect(() => {
    const savedSession = localStorage.getItem("user_session_aamo");
    if (savedSession === "active") setIsLoggedIn(true);

    const savedTheme = localStorage.getItem("theme_aamo");
    if (savedTheme) setIsDarkMode(savedTheme === "dark");
    else setIsDarkMode(true);

    const savedLang = localStorage.getItem("lang_aamo");
    if (savedLang) setLang(savedLang as "ar" | "en");
  }, []);

  // Synchronise dark mode class on document element so Tailwind's 'dark:' utility classes toggle immediately!
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Sync and auto-grow textarea heights dynamically to fit all typed words on screen, minimized to avoid keystroke lag
  useEffect(() => {
    const handleResizeAll = () => {
      const textareas = document.querySelectorAll(".auto-resize-textarea");
      textareas.forEach((ta) => {
        const el = ta as HTMLTextAreaElement;
        el.style.height = "auto";
        const targetHeight = el.scrollHeight;
        if (targetHeight > 0) {
          el.style.height = `${targetHeight}px`;
        }
      });
    };
    handleResizeAll();
    const timer = setTimeout(handleResizeAll, 50);
    return () => clearTimeout(timer);
  }, [editingKey, adminActiveTab]);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (
        email === LOGIN_CREDENTIALS.email &&
        password === LOGIN_CREDENTIALS.password
      ) {
        setIsLoggedIn(true);
        localStorage.setItem("user_session_aamo", "active");
        setShowLoginForm(false); // Hide login drawer menu on success
      } else {
        setError(TRANSLATIONS[lang].error);
      }
      setIsLoading(false);
    }, 600);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user_session_aamo");
    setEmail("");
    setPassword("");
  };

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    localStorage.setItem("theme_aamo", next ? "dark" : "light");
  };

  const toggleLang = () => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    localStorage.setItem("lang_aamo", next);
  };

  // State savers
  const savePageCodes = (
    list: { code: string; url: string; note?: string; maxUses?: number; currentUses?: number; }[],
  ) => {
    const cleanList = Array.isArray(list)
      ? list.filter(
          (item) =>
            item &&
            typeof item === "object" &&
            typeof item.code === "string" &&
            typeof item.url === "string",
        )
      : [];
    setPageCodesList(cleanList);
    localStorage.setItem("page_codes_list_v2", JSON.stringify(cleanList));
  };

  const saveWaCodes = (
    list: { code: string; url: string; note?: string; maxUses?: number; currentUses?: number; }[],
  ) => {
    const cleanList = Array.isArray(list)
      ? list.filter(
          (item) =>
            item &&
            typeof item === "object" &&
            typeof item.code === "string" &&
            typeof item.url === "string",
        )
      : [];
    setWaCodesList(cleanList);
    localStorage.setItem("wa_codes_list_v2", JSON.stringify(cleanList));
  };

  // Add a new mapped redirect code
  const handleAddCode = (e: FormEvent) => {
    e.preventDefault();
    setAdminFormError("");
    setAdminFormSuccess("");

    const rawKey = newCodeKey.trim();
    const rawUrl = newCodeUrl.trim();
    const rawNote = newCodeNote.trim();
    const maxUsesVal = newCodeMaxUses.trim() ? parseInt(newCodeMaxUses.trim(), 10) : 0;

    if (!rawKey || !rawUrl) {
      setAdminFormError(TRANSLATIONS[lang].fillAllError);
      return;
    }

    if (adminActiveTab === "page") {
      const exists = pageCodesList.some(
        (item) => item.code.trim().toLowerCase() === rawKey.toLowerCase(),
      );
      if (exists) {
        setAdminFormError(TRANSLATIONS[lang].duplicateError);
        return;
      }
      const updated = [
        ...pageCodesList,
        {
          code: rawKey,
          url: rawUrl,
          note: rawNote,
          maxUses: maxUsesVal > 0 ? maxUsesVal : undefined,
          currentUses: 0,
        },
      ];
      savePageCodes(updated);
    } else {
      const exists = waCodesList.some(
        (item) => item.code.trim().toLowerCase() === rawKey.toLowerCase(),
      );
      if (exists) {
        setAdminFormError(TRANSLATIONS[lang].duplicateError);
        return;
      }
      const updated = [
        ...waCodesList,
        {
          code: rawKey,
          url: rawUrl,
          note: rawNote,
          maxUses: maxUsesVal > 0 ? maxUsesVal : undefined,
          currentUses: 0,
        },
      ];
      saveWaCodes(updated);
    }

    setNewCodeKey("");
    setNewCodeUrl("");
    setNewCodeNote("");
    setNewCodeMaxUses("");
    setAdminFormSuccess(TRANSLATIONS[lang].saveSuccess);
    setTimeout(() => setAdminFormSuccess(""), 2500);
  };

  // Delete designated code mapping
  const handleDeleteCode = (
    indexInFilteredList: number,
    activeList: { code: string; url: string; note?: string; maxUses?: number; currentUses?: number; }[],
    isPageCategory: boolean,
  ) => {
    const query = adminSearchQuery.trim().toLowerCase();
    const filtered = activeList.filter((item) => {
      if (!query) return true;
      return (
        item.code.toLowerCase().includes(query) ||
        item.url.toLowerCase().includes(query) ||
        (item.note && item.note.toLowerCase().includes(query))
      );
    });
    const targetItem = filtered[indexInFilteredList];
    if (!targetItem) return;

    if (isPageCategory) {
      const updated = pageCodesList.filter(
        (item) => item.code !== targetItem.code,
      );
      savePageCodes(updated);
    } else {
      const updated = waCodesList.filter(
        (item) => item.code !== targetItem.code,
      );
      saveWaCodes(updated);
    }

    setAdminFormSuccess(TRANSLATIONS[lang].saveSuccess);
    setTimeout(() => setAdminFormSuccess(""), 1500);
  };

  // Edit helper functions
  const handleStartEdit = (
    category: "page" | "wa",
    code: string,
    url: string,
    note: string = "",
    maxUses: number = 0,
  ) => {
    setEditingKey(`${category}_${code}`);
    setEditCode(code);
    setEditUrl(url);
    setEditNote(note);
    setEditMaxUses(maxUses > 0 ? maxUses.toString() : "");
    setAdminFormError("");
    setAdminFormSuccess("");
  };

  const handleCancelEdit = () => {
    setEditingKey(null);
    setEditCode("");
    setEditUrl("");
    setEditNote("");
    setEditMaxUses("");
  };

  const handleSaveEdit = (category: "page" | "wa", originalCode: string) => {
    const codeTrimmed = editCode.trim();
    const urlTrimmed = editUrl.trim();
    const noteTrimmed = editNote.trim();
    const maxUsesVal = editMaxUses.trim() ? parseInt(editMaxUses.trim(), 10) : 0;

    if (!codeTrimmed || !urlTrimmed) {
      setAdminFormError(TRANSLATIONS[lang].fillAllError);
      return;
    }

    if (category === "page") {
      if (codeTrimmed.toLowerCase() !== originalCode.toLowerCase()) {
        const exists = pageCodesList.some(
          (item) =>
            item.code.trim().toLowerCase() === codeTrimmed.toLowerCase(),
        );
        if (exists) {
          setAdminFormError(TRANSLATIONS[lang].duplicateError);
          return;
        }
      }
      const updated = pageCodesList.map((item) => {
        if (item.code.toLowerCase() === originalCode.toLowerCase()) {
          return {
            ...item,
            code: codeTrimmed,
            url: urlTrimmed,
            note: noteTrimmed,
            maxUses: maxUsesVal > 0 ? maxUsesVal : undefined,
          };
        }
        return item;
      });
      savePageCodes(updated);
    } else {
      if (codeTrimmed.toLowerCase() !== originalCode.toLowerCase()) {
        const exists = waCodesList.some(
          (item) =>
            item.code.trim().toLowerCase() === codeTrimmed.toLowerCase(),
        );
        if (exists) {
          setAdminFormError(TRANSLATIONS[lang].duplicateError);
          return;
        }
      }
      const updated = waCodesList.map((item) => {
        if (item.code.toLowerCase() === originalCode.toLowerCase()) {
          return {
            ...item,
            code: codeTrimmed,
            url: urlTrimmed,
            note: noteTrimmed,
            maxUses: maxUsesVal > 0 ? maxUsesVal : undefined,
          };
        }
        return item;
      });
      saveWaCodes(updated);
    }

    setEditingKey(null);
    setEditCode("");
    setEditUrl("");
    setEditNote("");
    setEditMaxUses("");
    setAdminFormSuccess(TRANSLATIONS[lang].saveSuccess);
    setTimeout(() => setAdminFormSuccess(""), 1500);
  };

  // Download all definitions as backup file
  const handleExportBackup = () => {
    const backupObj = {
      project: "Interactive Codes Registry",
      developer: "AAO Web Portal",
      timestamp: new Date().toISOString(),
      pageCodesList,
      waCodesList,
    };
    const blob = new Blob([JSON.stringify(backupObj, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portal_backup_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Upload entries from backup file
  const handleImportBackup = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (
          parsed &&
          (Array.isArray(parsed.pageCodesList) ||
            Array.isArray(parsed.waCodesList))
        ) {
          if (parsed.pageCodesList) savePageCodes(parsed.pageCodesList);
          if (parsed.waCodesList) saveWaCodes(parsed.waCodesList);
          setAdminFormSuccess(TRANSLATIONS[lang].importSuccess);
          setTimeout(() => setAdminFormSuccess(""), 3000);
        } else {
          setAdminFormError(TRANSLATIONS[lang].importError);
          setTimeout(() => setAdminFormError(""), 3000);
        }
      } catch (err) {
        setAdminFormError(TRANSLATIONS[lang].importError);
        setTimeout(() => setAdminFormError(""), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Match lookup of custom page redirect values
  const handleGoPage = () => {
    const code = enteredPageCode.trim().toLowerCase();
    const found = pageCodesList.find(
      (item) => item.code.trim().toLowerCase() === code,
    );
    if (found) {
      const max = found.maxUses !== undefined ? Number(found.maxUses) : 0;
      const current = found.currentUses !== undefined ? Number(found.currentUses) : 0;
      if (max > 0 && current >= max) {
        setPageCodeErrorMsg(TRANSLATIONS[lang].usageLimitReached);
        setPageCodeError(true);
        setTimeout(() => {
          setPageCodeError(false);
          setPageCodeErrorMsg("");
        }, 3000);
        return;
      }

      // Increment usage count and save
      const updated = pageCodesList.map((item) => {
        if (item.code.trim().toLowerCase() === code) {
          return {
            ...item,
            currentUses: (item.currentUses || 0) + 1,
          };
        }
        return item;
      });
      savePageCodes(updated);

      window.open(found.url, "_blank");
      setPageCodeError(false);
      setPageCodeErrorMsg("");
    } else {
      setPageCodeErrorMsg(TRANSLATIONS[lang].invalidCode);
      setPageCodeError(true);
      setTimeout(() => {
        setPageCodeError(false);
        setPageCodeErrorMsg("");
      }, 1500);
    }
  };

  // Match lookup of custom whatsapp group values
  const handleGoWa = () => {
    const code = enteredWaCode.trim().toLowerCase();
    const found = waCodesList.find(
      (item) => item.code.trim().toLowerCase() === code,
    );
    if (found) {
      const max = found.maxUses !== undefined ? Number(found.maxUses) : 0;
      const current = found.currentUses !== undefined ? Number(found.currentUses) : 0;
      if (max > 0 && current >= max) {
        setWaCodeErrorMsg(TRANSLATIONS[lang].usageLimitReached);
        setWaCodeError(true);
        setTimeout(() => {
          setWaCodeError(false);
          setWaCodeErrorMsg("");
        }, 3000);
        return;
      }

      // Increment usage count and save
      const updated = waCodesList.map((item) => {
        if (item.code.trim().toLowerCase() === code) {
          return {
            ...item,
            currentUses: (item.currentUses || 0) + 1,
          };
        }
        return item;
      });
      saveWaCodes(updated);

      window.open(found.url, "_blank");
      setWaCodeError(false);
      setWaCodeErrorMsg("");
    } else {
      setWaCodeErrorMsg(TRANSLATIONS[lang].invalidCode);
      setWaCodeError(true);
      setTimeout(() => {
        setWaCodeError(false);
        setWaCodeErrorMsg("");
      }, 1500);
    }
  };

  const handleCopyLink = (url: string, keyName: string) => {
    navigator.clipboard.writeText(url);
    setCopyStatus(keyName);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  const t = TRANSLATIONS[lang];

  return (
    <div
      className={`min-h-screen font-sans selection:bg-indigo-500/20 overflow-x-hidden ${
        isDarkMode
          ? "dark bg-[#090a10] text-[#f7f5f0]"
          : "bg-[#f8fafd] text-[#0f172a]"
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <BackgroundBubbles isDarkMode={isDarkMode} />

      {/* --- Refined Header Controls --- */}
      {/* LEFT SIDE: Language & Dark Mode Toggles */}
      <div
        className={`fixed top-6 ${lang === "ar" ? "left-6" : "left-6"} z-50 flex items-center gap-2.5`}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLang}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl transition-all shadow-lg font-display glass-card ${
            isDarkMode
              ? "bg-[#11131c]/60 text-indigo-400 border border-white/5 hover:border-indigo-500/40"
              : "bg-white text-indigo-700 border border-slate-200 hover:border-indigo-500/20 shadow-indigo-500/5 font-semibold"
          }`}
        >
          <Languages className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-tight">
            {lang === "ar" ? "English" : "العربية"}
          </span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className={`p-2.5 rounded-xl transition-all duration-150 shadow-lg glass-card relative overflow-hidden flex items-center justify-center ${
            isDarkMode
              ? "bg-[#11131c]/60 text-indigo-400 border border-white/5 hover:border-indigo-500/40"
              : "bg-white text-indigo-700 border border-slate-200/85 hover:border-indigo-400/30 hover:bg-indigo-50/10 shadow-sm shadow-indigo-500/5"
          }`}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <motion.div
            initial={false}
            animate={{ rotate: isDarkMode ? 0 : 180, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="flex items-center justify-center"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-indigo-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-700" />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* RIGHT SIDE: "Who We Are" Button (Always on the right) */}
      <div
        className={`fixed top-6 ${lang === "ar" ? "right-6" : "right-6"} z-50 flex items-center gap-2.5`}
      >
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsAboutOpen(true)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all shadow-lg font-bold text-xs ${
            isDarkMode
              ? "bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20"
              : "bg-indigo-50 border border-indigo-100 text-indigo-700 hover:bg-indigo-100/70 shadow-sm shadow-indigo-500/5 font-semibold"
          }`}
        >
          <Info className="w-4 h-4" />
          <span>{t.aboutUsTitle}</span>
        </motion.button>
      </div>

      {/* Slide-out Sidebar Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-slate-950/45 z-[60] cursor-pointer"
            />

            {/* Sidebar Slide-in Panel (Sliding out depending on language layout) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
              className={`fixed top-0 bottom-0 right-0 border-l w-[240px] sm:w-[275px] bg-[#0c0e18] border-neutral-800 shadow-2xl z-[70] overflow-y-auto p-6 flex flex-col justify-between`}
              dir={lang === "ar" ? "rtl" : "ltr"}
            >
              <div className="space-y-6">
                {/* Header context */}
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={LOGO_URL}
                      alt="Logo"
                      className="w-10 h-10 rounded-full border border-indigo-500/30 object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-display font-bold tracking-tight text-white">
                        {t.welcomeBack}
                      </h3>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">
                        {lang === "ar"
                          ? "البوابة الذكية لنظام الأكواد"
                          : "Secure Redirect Codes Portal"}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Who We Are (من نحن) Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-indigo-400 font-display font-black text-xs uppercase tracking-widest">
                    <Info className="w-3.5 h-3.5" />
                    <span>
                      {t.aboutUsTitle}
                    </span>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3">
                    <p className="text-[11px] text-slate-300 leading-relaxed font-semibold">
                      {t.aboutUsDesc}
                    </p>
                    <div className="border-t border-white/5 pt-2 flex flex-col gap-1.5">
                      <span className="text-[9px] text-slate-500 font-black tracking-widest uppercase">
                        {lang === "ar" ? "تحت إدارة وإشراف المهني" : "UNDER SUPERVISION OF"}
                      </span>
                      <motion.a
                        href="https://aamo.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10.5px] font-black transition-all bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 mb-1"
                      >
                        <span className="truncate">{t.supervisorName}</span>
                        <ExternalLink className="w-3 h-3 opacity-50 shrink-0" />
                      </motion.a>
                      
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => {
                          setIsSidebarOpen(false);
                          setIsAboutOpen(true);
                        }}
                        className="w-full py-2 px-3 text-center text-[10px] font-black tracking-wide text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/15 rounded-xl transition-all flex items-center justify-center gap-1.5"
                      >
                        <span>{lang === "ar" ? "خدماتنا المهنية المتكاملة ✦" : "Our Integrated Services ✦"}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Admin login form or status in the sidebar */}
                <div className="space-y-3 pt-4 border-t border-white/5">
                  {!isLoggedIn ? (
                    <>
                      <div className="flex items-center gap-2 text-indigo-400 font-display font-black text-xs uppercase tracking-widest">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{t.adminPortal}</span>
                      </div>

                      {!showLoginForm ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowLoginForm(true)}
                          className="w-full py-3 px-4 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 hover:text-indigo-300 border border-indigo-500/20 text-xs font-black transition-all flex items-center justify-center gap-2 group"
                        >
                          <Key className="w-3.5 h-3.5 transition-transform group-hover:rotate-12" />
                          <span>{t.adminLoginBtn}</span>
                        </motion.button>
                      ) : (
                        <motion.form
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          onSubmit={handleLogin}
                          className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-4"
                        >
                          <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {t.emailLabel}
                            </label>
                            <input
                              required
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="example@gmail.com"
                              className="w-full py-2.5 px-3 rounded-xl border border-white/5 bg-slate-950/60 text-white text-xs outline-none focus:border-indigo-500/40 transition-all font-medium"
                            />
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {t.passwordLabel}
                              </label>
                              <button
                                type="button"
                                onClick={() => setShowLoginForm(false)}
                                className="text-[9px] font-bold text-slate-500 hover:text-slate-400 underline"
                              >
                                {lang === "ar" ? "إلغاء" : "Cancel"}
                              </button>
                            </div>
                            <input
                              required
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full py-2.5 px-3 rounded-xl border border-white/5 bg-slate-950/60 text-white text-xs outline-none focus:border-indigo-500/40 transition-all font-medium"
                            />
                          </div>

                          {error && (
                            <p className="text-[10px] text-red-400 font-bold bg-red-500/5 p-2 rounded-lg border border-red-500/20">
                              {error}
                            </p>
                          )}

                          <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 rounded-xl bg-indigo-500 text-white text-xs font-black hover:bg-indigo-600 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-500/20"
                          >
                            {isLoading ? (
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                              <>
                                <span>{t.loginBtn}</span>
                                <ShieldCheck className="w-3.5 h-3.5" />
                              </>
                            )}
                          </button>
                        </motion.form>
                      )}
                    </>
                  ) : (
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-3">
                      <div className="flex justify-center">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                      </div>
                      <p className="text-xs text-slate-200 font-bold">
                        {lang === "ar"
                          ? "مسجل كمسؤول للنظام"
                          : "Authorized Administrator"}
                      </p>
                      <button
                        onClick={handleLogout}
                        className="w-full py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-500 hover:text-red-400 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>{t.logoutBtn}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="border-t border-white/5 pt-4 text-center">
                <p className="text-[10px] font-bold text-slate-500">
                  {t.copyright} AAO &copy; {new Date().getFullYear()}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Interactive modal for "Who We Are? / من نحن" --- */}
      <AnimatePresence>
        {isAboutOpen && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setIsAboutOpen(false)}
              className="fixed inset-0 bg-slate-950/50 z-[100] cursor-pointer"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-2xl h-auto max-h-[85vh] p-5 md:p-6 rounded-[2.2rem] border shadow-2xl z-[101] transition-all flex flex-col overflow-hidden ${
                isDarkMode
                  ? "bg-[#0b0c16] border-slate-800 text-white shadow-indigo-500/10"
                  : "bg-white border-slate-200 text-slate-900 shadow-slate-300"
              }`}
            >
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 mb-3 shrink-0">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${isDarkMode ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-700"}`}
                  >
                    <Info className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-sm md:text-base font-display font-bold tracking-tight">
                    {t.aboutUsTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setIsAboutOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode
                      ? "hover:bg-white/10 text-slate-400 hover:text-white"
                      : "hover:bg-indigo-50 text-slate-500 hover:text-indigo-800"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="overflow-y-auto pr-1 pl-1 py-1 space-y-4 flex-1 scrollbar-thin select-text">
                <p
                  className={`text-xs md:text-[13px] leading-relaxed font-semibold transition-colors ${
                    isDarkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {t.aboutUsDesc}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-black/5 dark:bg-white/[0.02] p-3 rounded-xl border border-black/[0.03] dark:border-white/5">
                  <div className="text-xs font-semibold">
                    <span className="opacity-40 block mb-0.5 text-[10px]">
                      {lang === "ar"
                        ? "تحت إشراف الخبير والمستشار الضريبي"
                        : "Under Supervision & Management of"}
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-[12px] sm:text-xs">
                      {t.supervisorName}
                    </span>
                  </div>
                  <motion.a
                    href="https://aamo.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="self-stretch sm:self-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md flex items-center justify-center gap-1.5 text-xs font-bold transition-colors"
                  >
                    <span>{lang === "ar" ? "الموقع التعريفي للمكتب" : "Office Profile"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </motion.a>
                </div>

                {/* Services Title Header block */}
                <div className="pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span className="text-[10px] md:text-xs font-black tracking-widest text-indigo-500 dark:text-indigo-400 uppercase">
                      {lang === "ar" ? "مجالات تخصصنا المهنية وعملنا المتكامل" : "OUR INTEGRATED PROFESSIONAL SERVICES"}
                    </span>
                  </div>

                  {/* 2-Column Bento Grid of Custom Services */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" dir={lang === "ar" ? "rtl" : "ltr"}>
                    {SERVICES.map((srv, index) => (
                      <div
                        key={index}
                        className={`group p-3 rounded-2xl border transition-all duration-200 flex gap-3 text-start hover:scale-[1.01] ${
                          isDarkMode
                            ? "bg-slate-900/50 border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/[0.02]"
                            : "bg-slate-50/70 border-slate-200/80 hover:border-indigo-400/50 hover:bg-white"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-xl shrink-0 w-9.5 h-9.5 flex items-center justify-center transition-all ${
                            isDarkMode
                              ? "bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20"
                              : "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-100"
                          }`}
                        >
                          {renderServiceIcon(srv.icon, isDarkMode)}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className={`text-[11.5px] font-black tracking-tight transition-all ${
                            isDarkMode ? "text-slate-100" : "text-slate-900"
                          }`}>
                            {lang === "ar" ? srv.titleAr : srv.titleEn}
                          </h4>
                          <p className="text-[10px] leading-relaxed text-slate-500 dark:text-slate-400 font-semibold">
                            {lang === "ar" ? srv.descAr : srv.descEn}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/5 flex justify-end shrink-0">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setIsAboutOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-indigo-600/10"
                >
                  {t.modalOk}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Interactive modal for "Administrative Portals Login Control" --- */}
      <AnimatePresence>
        {showLoginForm && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              onClick={() => setShowLoginForm(false)}
              className="fixed inset-0 bg-slate-950/50 z-[100] cursor-pointer"
            />

            {/* Modal Dialog for Login / Session Management */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.12 }}
              className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-md p-5 md:p-6 rounded-[2.2rem] border shadow-2xl z-[101] transition-all flex flex-col overflow-hidden ${
                isDarkMode
                  ? "bg-[#0b0c16] border-slate-800 text-white shadow-indigo-500/10"
                  : "bg-white border-slate-200 text-slate-900 shadow-slate-300"
              }`}
            >
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-3 mb-4 shrink-0" dir={lang === "ar" ? "rtl" : "ltr"}>
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-xl ${isDarkMode ? "bg-indigo-500/10 text-indigo-400" : "bg-indigo-50 text-indigo-700"}`}
                  >
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <h3 className="text-sm md:text-base font-display font-bold tracking-tight">
                    {isLoggedIn ? (lang === "ar" ? "إدارة الجلسة الحالية" : "Current Session Management") : t.loginTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setShowLoginForm(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isDarkMode
                      ? "hover:bg-white/10 text-slate-400 hover:text-white"
                      : "hover:bg-indigo-50 text-slate-500 hover:text-indigo-800"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!isLoggedIn ? (
                <form onSubmit={handleLogin} className="space-y-4 text-start animate-fade-in" dir={lang === "ar" ? "rtl" : "ltr"}>
                  <p className={`text-xs md:text-[13px] leading-relaxed font-semibold ${isDarkMode ? "text-slate-300" : "text-slate-650"}`}>
                    {t.loginSubtitle}
                  </p>

                  <div className="space-y-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {t.emailLabel}
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-medium ${
                        isDarkMode
                          ? "border-white/10 bg-slate-950/60 text-white"
                          : "border-slate-300 bg-slate-50 text-slate-900"
                      }`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className={`text-[10px] font-black uppercase tracking-widest block ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {t.passwordLabel}
                    </label>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full py-2.5 px-3 rounded-xl border text-xs outline-none focus:ring-1 focus:ring-indigo-500/40 transition-all font-medium ${
                        isDarkMode
                          ? "border-white/10 bg-slate-950/60 text-white"
                          : "border-slate-300 bg-slate-50 text-slate-900"
                      }`}
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full text-center py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs md:text-sm transition-all shadow-md shadow-indigo-600/10 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4" />
                          <span>{t.loginBtn}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4 text-center" dir={lang === "ar" ? "rtl" : "ltr"}>
                  <div className={`p-4 rounded-xl text-center space-y-3 ${isDarkMode ? "bg-[#10192d]/50 border border-indigo-500/20" : "bg-indigo-50/50 border border-indigo-100"}`}>
                    <div className="flex justify-center">
                      <ShieldCheck className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isDarkMode ? "text-emerald-400" : "text-emerald-700"}`}>
                        {lang === "ar" ? "مسجل كمسؤول للنظام" : "Authorized Administrator"}
                      </p>
                      <p className={`text-[10px] ${isDarkMode ? "text-slate-400" : "text-slate-500"} font-semibold mt-1`}>
                        {t.supervisorName}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowLoginForm(false)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        isDarkMode
                          ? "border-white/15 text-slate-300 hover:bg-white/5"
                          : "border-slate-300 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {lang === "ar" ? "إغلاق" : "Close"}
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowLoginForm(false);
                      }}
                      className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md shadow-red-600/10 flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{t.logoutBtn}</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- Main Entry Frame Area --- */}
      <main className="relative z-10 min-h-screen flex flex-col items-center pt-16 md:pt-20 pb-6 px-4 md:px-6 lg:justify-center">
        <div className="w-full max-w-4xl flex flex-col items-center">
          {/* Header context containing LOGO & Title */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 relative flex flex-col items-center text-center select-none"
          >
            <div className="relative mb-5 group">
              {/* Ultra-luxe animated outer radial glow for the logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 via-violet-600/20 to-blue-500/30 rounded-full blur-2xl opacity-90 group-hover:scale-115 transition-transform duration-700 pointer-events-none" />
              {/* Micro border ring with luxury gold and royal indigo touch */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-indigo-500/40 to-[#f9e29c] opacity-90 p-[2px] pointer-events-none rounded-full" style={{ padding: '2px' }}>
                <div className={`w-full h-full rounded-full ${isDarkMode ? "bg-[#090a10]" : "bg-[#f8fafd]"}`} />
              </div>
              <img
                src={LOGO_URL}
                alt="AAO Logo"
                className="w-28 h-28 md:w-34 md:h-34 rounded-full object-cover border-2 border-[#d4af37]/30 dark:border-[#d4af37]/45 shadow-[0_0_35px_rgba(99,102,241,0.25)] relative z-10 transition-all duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h1 
                className={`text-2.5xl sm:text-3xl md:text-3.5xl lg:text-4xl font-display font-black mb-3.5 tracking-tight ${
                  lang === "ar" ? "leading-snug" : "leading-tight"
                } transition-all duration-300`}
                style={{
                  color: isDarkMode ? "#ffffff" : "#1e1b4b",
                  textShadow: isDarkMode 
                    ? "0 0 15px rgba(99,102,241,0.95), 0 0 30px rgba(99,102,241,0.5)" 
                    : "0 1px 2px rgba(0,0,0,0.05), 0 0 12px rgba(99,102,241,0.15)",
                }}
              >
                {isLoggedIn ? t.welcomeBack : t.normalUserViewTitle}
              </h1>
              <p
                className={`text-xs md:text-sm lg:text-[14px] leading-relaxed max-w-xl mx-auto font-bold transition-all ${
                  isDarkMode ? "text-slate-300 opacity-80" : "text-slate-800 opacity-100"
                }`}
              >
                {isLoggedIn ? t.adminTitle : t.normalUserViewSubtitle}
              </p>
            </motion.div>
          </motion.div>

          {/* Clock Widget (Standard human centered display element) */}
          <ClockWidget isDarkMode={isDarkMode} lang={lang} />

          {/* Hidden reference for bulk imports */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportBackup}
            accept=".json"
            className="hidden"
          />

          {/* --- ADMIN DASHBOARD PANEL (ONLY visible when logged in as admin) --- */}
          {isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`w-full max-w-3xl p-6 rounded-[2.4rem] border shadow-2xl ${
                isDarkMode
                  ? "bg-[#0b0c16] border-slate-800/80"
                  : "bg-white border-slate-200 shadow-indigo-500/5"
              }`}
            >
              {/* Header admin actions */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 text-indigo-500">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="text-sm font-black uppercase tracking-wide">
                      {t.adminTitle}
                    </h3>
                  </div>
                  <p className="text-[11px] opacity-60 font-semibold">
                    {t.activeCodesCount}:{" "}
                    <span className="text-indigo-500 font-extrabold">
                      {pageCodesList.length + waCodesList.length}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleExportBackup}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-[11px] font-black border border-indigo-500/10 transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t.exportBtn}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-neutral-500/10 hover:bg-neutral-500/20 text-slate-300 text-[11px] font-black border border-white/5 transition-all"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{t.importBtn}</span>
                  </motion.button>
                </div>
              </div>

              {/* Dynamic Notification and Error indicators */}
              {adminFormError && (
                <div className="mb-4 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                  {adminFormError}
                </div>
              )}
              {adminFormSuccess && (
                <div className="mb-4 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl">
                  {adminFormSuccess}
                </div>
              )}

              {/* Tab Selector Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  onClick={() => {
                    setAdminActiveTab("page");
                    setAdminFormError("");
                    setAdminFormSuccess("");
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-2 ${
                    adminActiveTab === "page"
                      ? "bg-indigo-500/10 border-indigo-500/35 text-indigo-400 font-extrabold shadow-sm"
                      : isDarkMode
                        ? "bg-slate-950/40 border-white/5 text-slate-500 hover:text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{t.pageCodesTab}</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full">
                    {pageCodesList.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setAdminActiveTab("wa");
                    setAdminFormError("");
                    setAdminFormSuccess("");
                  }}
                  className={`py-3 px-4 rounded-xl text-xs font-black transition-all border flex items-center justify-center gap-2 ${
                    adminActiveTab === "wa"
                      ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-400 font-extrabold shadow-sm"
                      : isDarkMode
                        ? "bg-slate-950/40 border-white/5 text-slate-500 hover:text-slate-300"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.waCodesTab}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">
                    {waCodesList.length}
                  </span>
                </button>
              </div>

              {/* Dynamic Add Code mapping inline form */}
              <form
                onSubmit={handleAddCode}
                className={`p-4 rounded-xl border transition-all duration-300 mb-6 space-y-4 ${
                  isDarkMode
                    ? "bg-slate-950/60 border-white/5 focus-within:border-indigo-500/25"
                    : "bg-slate-50 border-slate-200 focus-within:border-indigo-300"
                }`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 space-y-1.5">
                    <label
                      className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {t.codeLabel}
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={newCodeKey}
                      onChange={(e) => {
                        setNewCodeKey(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      placeholder={t.placeholderCode}
                      className={`auto-resize-textarea resize-none overflow-y-hidden w-full py-2.5 px-3 rounded-lg border outline-none text-xs transition-all font-mono font-bold ${
                        isDarkMode
                          ? "border-white/10 bg-slate-950/50 text-white focus:border-indigo-500/40"
                          : "border-slate-200 bg-white text-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5"
                      }`}
                    />
                  </div>

                  <div className="flex-[2] space-y-1.5">
                    <label
                      className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {t.urlLabel}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={newCodeUrl}
                      onChange={(e) => {
                        setNewCodeUrl(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      placeholder={t.placeholderUrl}
                      className={`auto-resize-textarea resize-none overflow-y-hidden w-full py-2.5 px-3 rounded-lg border outline-none text-xs transition-all font-mono ${
                        isDarkMode
                          ? "border-white/10 bg-slate-950/50 text-white focus:border-indigo-500/40"
                          : "border-slate-200 bg-white text-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-1.5">
                    <label
                      className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {t.noteLabel}
                    </label>
                    <textarea
                      rows={2}
                      value={newCodeNote}
                      onChange={(e) => {
                        setNewCodeNote(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                      placeholder={t.placeholderNote}
                      className={`auto-resize-textarea resize-none overflow-y-hidden w-full py-2.5 px-3 rounded-lg border outline-none text-xs transition-all ${
                        isDarkMode
                          ? "border-white/10 bg-slate-950/50 text-white focus:border-indigo-500/40"
                          : "border-slate-200 bg-white text-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5"
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 text-right md:text-left">
                    <label
                      className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}
                    >
                      {t.maxUsesLabel}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newCodeMaxUses}
                      onChange={(e) => setNewCodeMaxUses(e.target.value)}
                      placeholder={t.placeholderMaxUses}
                      className={`w-full py-2.5 px-3 rounded-lg border outline-none text-xs transition-all ${
                        isDarkMode
                          ? "border-white/10 bg-slate-950/50 text-white focus:border-indigo-500/40"
                          : "border-slate-200 bg-white text-slate-800 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/5"
                      }`}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-md shadow-indigo-500/10"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addBtn}</span>
                  </motion.button>
                </div>
              </form>

              {/* Live Search block inside registered keys (Helpful when managing 1,000+ items!) */}
              <div className="relative mb-4 flex items-center pr-[1px] pl-[1px] rounded-xl border border-white/5 bg-slate-950/40 p-1">
                <div className="p-2.5">
                  <Search className="w-4 h-4 opacity-40" />
                </div>
                <input
                  type="text"
                  placeholder={t.searchBtn}
                  value={adminSearchQuery}
                  onChange={(e) => setAdminSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-xs font-medium py-2 text-inherit"
                />
                {adminSearchQuery && (
                  <button
                    onClick={() => setAdminSearchQuery("")}
                    className="p-2 opacity-40 hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mappings Listing Registry Grid/Rows */}
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
                {(() => {
                  const targetList =
                    adminActiveTab === "page" ? pageCodesList : waCodesList;
                  const query = adminSearchQuery.trim().toLowerCase();
                  const filtered = targetList.filter((item) => {
                    if (!query) return true;
                    return (
                      item.code.toLowerCase().includes(query) ||
                      item.url.toLowerCase().includes(query) ||
                      (item.note && item.note.toLowerCase().includes(query))
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <p className="text-center py-8 text-xs text-slate-500 font-bold">
                        {t.noResults}
                      </p>
                    );
                  }

                  return filtered.map((item, idx) => {
                    const keyName = `${adminActiveTab}_${item.code}`;
                    const isEditing = editingKey === keyName;

                    if (isEditing) {
                      return (
                        <div
                          key={keyName}
                          className={`p-3.5 rounded-xl border flex flex-col gap-3 ${
                            isDarkMode
                              ? "bg-slate-900/90 border-indigo-500/40"
                              : "bg-indigo-50/50 border-indigo-200"
                          }`}
                        >
                          <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2.5" dir="ltr">
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest text-left">
                                  {t.codeLabel}
                                </span>
                                <textarea
                                  rows={2}
                                  value={editCode}
                                  onChange={(e) => {
                                    setEditCode(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                  }}
                                  className="auto-resize-textarea resize-none overflow-y-hidden w-full py-2 px-3 rounded-lg border border-white/10 bg-slate-950 text-white text-xs outline-none focus:border-indigo-500/60 transition-all font-mono font-bold text-left"
                                  placeholder={t.placeholderCode}
                                />
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest text-left">
                                  {t.urlLabel}
                                </span>
                                <textarea
                                  rows={5}
                                  value={editUrl}
                                  onChange={(e) => {
                                    setEditUrl(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                  }}
                                  className="auto-resize-textarea resize-none overflow-y-hidden w-full py-2 px-3 rounded-lg border border-white/10 bg-slate-950 text-white text-xs outline-none focus:border-indigo-500/60 transition-all font-mono text-left"
                                  placeholder={t.placeholderUrl}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="md:col-span-2 flex flex-col gap-1">
                                <span
                                  className="text-[10px] font-black text-indigo-400 uppercase tracking-widest text-right"
                                  dir={lang === "ar" ? "rtl" : "ltr"}
                                >
                                  {t.noteLabel}
                                </span>
                                <textarea
                                  rows={2}
                                  value={editNote}
                                  onChange={(e) => {
                                    setEditNote(e.target.value);
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                  }}
                                  className="auto-resize-textarea resize-none overflow-y-hidden w-full py-2 px-3 rounded-lg border border-white/10 bg-slate-950 text-white text-xs outline-none focus:border-indigo-500/30 transition-all font-sans"
                                  placeholder={t.placeholderNote}
                                  dir={lang === "ar" ? "rtl" : "ltr"}
                                />
                              </div>

                              <div className="flex flex-col gap-1">
                                <span
                                  className="text-[10px] font-black text-indigo-400 uppercase tracking-widest text-right"
                                  dir={lang === "ar" ? "rtl" : "ltr"}
                                >
                                  {t.maxUsesLabel}
                                </span>
                                <input
                                  type="number"
                                  min="0"
                                  value={editMaxUses}
                                  onChange={(e) => setEditMaxUses(e.target.value)}
                                  placeholder={t.placeholderMaxUses}
                                  className="w-full py-2 px-3 rounded-lg border border-white/10 bg-slate-950 text-white text-xs outline-none focus:border-indigo-500/30 transition-all h-[36px] font-sans text-right"
                                  dir={lang === "ar" ? "rtl" : "ltr"}
                                />
                              </div>
                            </div>
                          </div>

                          <div
                            className="flex items-center gap-1.5 justify-end"
                            dir={lang === "ar" ? "rtl" : "ltr"}
                          >
                            <button
                              onClick={() =>
                                handleSaveEdit(adminActiveTab, item.code)
                              }
                              className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[11px] font-black hover:bg-emerald-600 transition-all flex items-center gap-1 shadow-sm"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.saveBtnText}</span>
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className={`px-3 py-1.5 rounded-lg text-[11px] font-black transition-all border ${
                                isDarkMode
                                  ? "bg-slate-800 border-white/5 text-slate-300 hover:bg-slate-700"
                                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-100"
                              }`}
                            >
                              <span>{t.cancelBtnText}</span>
                            </button>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={keyName}
                        className={`p-3.5 rounded-xl border flex flex-col gap-2 transition-all duration-300 ${
                          isDarkMode
                            ? "bg-slate-950/50 border-white/5 hover:border-indigo-500/20"
                            : "bg-slate-50 border-slate-200 hover:border-indigo-500/10 shadow-sm"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div
                            className="flex-1 min-w-0 pr-2 text-right"
                            dir="ltr"
                          >
                            <div className="flex items-center gap-2 justify-end">
                              <span
                                onClick={() =>
                                  handleCopyLink(item.url, keyName)
                                }
                                className="text-[10px] break-all opacity-45 cursor-pointer hover:underline transition-all block max-w-[220px] sm:max-w-md truncate font-sans"
                                title={
                                  lang === "ar"
                                    ? "اضغط لنسخ الرابط المستهدف"
                                    : "Click to copy target URL"
                                }
                              >
                                {item.url}
                              </span>
                              <span className="text-xs font-mono font-bold select-all bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-lg">
                                {item.code}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => handleCopyLink(item.url, keyName)}
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "bg-slate-900 text-indigo-300 hover:bg-slate-800"
                                  : "bg-white text-indigo-600 hover:bg-slate-50 border border-slate-100 shadow-sm"
                              }`}
                            >
                              {copyStatus === keyName ? (
                                <Check className="w-3.5 h-3.5" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              onClick={() =>
                                handleStartEdit(
                                  adminActiveTab,
                                  item.code,
                                  item.url,
                                  item.note || "",
                                  item.maxUses || 0,
                                )
                              }
                              className={`p-1.5 rounded-lg transition-all ${
                                isDarkMode
                                  ? "bg-slate-900 text-indigo-300 hover:bg-slate-800"
                                  : "bg-white text-indigo-600 hover:bg-slate-50 border border-slate-100 shadow-sm"
                              }`}
                              title={t.editBtnText}
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() =>
                                handleDeleteCode(
                                  idx,
                                  targetList,
                                  adminActiveTab === "page",
                                )
                              }
                              className="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/25 transition-all"
                              title={t.deleteBtn}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Note banner block under each code item card */}
                        {item.note && (
                          <div
                            className="flex items-start gap-1.5 mt-2 border-t border-black/[0.03] dark:border-white/[0.03] pt-2"
                            style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                          >
                            <div className="px-1.5 py-0.5 bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-500 dark:text-indigo-400 rounded text-[9px] font-bold flex items-center gap-1 shrink-0">
                              <Sparkles className="w-2.5 h-2.5" />
                              <span>
                                {lang === "ar" ? "ملاحظة المشرف" : "Admin Note"}
                              </span>
                            </div>
                            <p className="text-[10px] md:text-[11px] font-medium text-slate-500 dark:text-slate-450 leading-relaxed italic break-words pr-1 text-right">
                              {item.note}
                            </p>
                          </div>
                        )}

                        {/* Usage stats counter row */}
                        <div
                          className="flex items-center gap-2 text-[10px] mt-1.5 justify-end"
                          style={{ direction: lang === "ar" ? "rtl" : "ltr" }}
                        >
                          <div className="flex items-center gap-1.5 bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold">
                            <Activity className="w-3 h-3 text-indigo-400" />
                            <span>
                              {t.usesCountText}:{" "}
                              <strong className={`${isDarkMode ? "text-indigo-300" : "text-indigo-700"} font-extrabold font-sans`}>
                                {item.currentUses || 0}
                              </strong>
                              {" / "}
                              <strong className="opacity-80 font-sans">
                                {item.maxUses ? item.maxUses : t.unlimitedUses}
                              </strong>
                            </span>
                          </div>
                          {item.maxUses && (item.currentUses || 0) >= item.maxUses && (
                            <span className="text-[9px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-black">
                              {lang === "ar" ? "منتهي الصلاحية" : "Expired (Max limit)"}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </motion.div>
          ) : (
            <div className="w-full md:max-w-4xl flex flex-col items-center">
              {/* Symmetrical Horizontal Redirection Gateways */}
              <div className="grid grid-cols-2 gap-3 sm:gap-6 md:gap-8 w-full max-w-4xl mb-10">
                {/* Redirect Box 1: Excel Page Redirect (Super Dynamic Premium Glass Card) */}
                <motion.div
                  animate={pageCodeError ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.15 }}
                  className={`relative p-3.5 sm:p-6 md:p-8 rounded-[1.8rem] sm:rounded-[2rem] border transition-all duration-150 flex flex-col justify-between gap-4 sm:gap-6 shadow-2xl overflow-hidden group ${
                    isDarkMode
                      ? "bg-[#0c0e18] border-slate-800/80 focus-within:border-indigo-500/60 focus-within:ring-4 focus-within:ring-indigo-500/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-indigo-600/80 hover:shadow-[0_20px_50px_rgba(99,102,241,0.03)]"
                      : "bg-white border-slate-200 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/5 shadow-[0_12px_35px_rgba(0,0,0,0.03)] hover:border-indigo-400 hover:shadow-[0_20px_45px_rgba(99,102,241,0.06)]"
                  }`}
                >
                  {/* Micro-glow indicator line at the top of card to look incredibly sleek */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                  
                  {/* Subtly animated inner holographic back-glow */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-125" />

                  {/* Top luxury status tracking bar inside the gateway */}
                  <div className="flex items-center justify-between w-full text-[8.5px] font-mono tracking-wider text-slate-400 dark:text-indigo-400/80 border-b border-slate-100 dark:border-white/5 pb-2.5 sm:pb-3">
                    <span className="flex items-center gap-1 sm:gap-1.5 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-ping" />
                      {lang === 'ar' ? 'بوابة المستندات' : 'DOCUMENTS GATE'}
                    </span>
                    <span className="hidden xs:inline">NODE // EXCEL_SRC</span>
                  </div>

                  <div
                    className="flex items-center justify-between w-full relative z-10"
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-100 ${
                          isDarkMode
                            ? "bg-indigo-500/10 text-indigo-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                            : "bg-indigo-55 text-indigo-700 shadow-sm"
                        }`}
                      >
                        <FileSpreadsheet className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      </div>
                      <div className="text-right">
                        <h4
                          className={`text-[11px] sm:text-xs md:text-sm font-black tracking-tight transition-all ${
                            isDarkMode ? "text-slate-200" : "text-slate-900"
                          }`}
                        >
                          {t.excelShortcutLabel}
                        </h4>
                        <p className={`text-[9px] sm:text-[10px] mt-0.5 line-clamp-1 transition-all ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}>
                          {lang === 'ar' ? 'تنزيل النماذج والمستندات' : 'Download sheets instantly'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3.5 relative z-10">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.enterPageCode}
                        value={enteredPageCode}
                        onChange={(e) => setEnteredPageCode(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleGoPage();
                        }}
                        className={`w-full py-2.5 px-3 sm:py-3.5 sm:px-4 rounded-xl border text-[10px] sm:text-xs md:text-sm outline-none transition-all text-center uppercase placeholder:text-slate-400 dark:placeholder:text-slate-550 tracking-widest ${
                          pageCodeError
                            ? "border-red-500 text-red-500 bg-red-500/5 font-sans font-bold"
                            : isDarkMode
                              ? "bg-[#080b13] border-slate-800/90 text-slate-100 focus:border-indigo-500/60 focus:bg-[#0c101d] font-mono font-bold shadow-inner"
                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-400 focus:bg-white font-mono font-bold"
                        }`}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.012, y: -0.5 }}
                      whileTap={{ scale: 0.988 }}
                      onClick={handleGoPage}
                      className="w-full py-2.5 sm:py-3.5 md:py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-[10.5px] sm:text-xs md:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-indigo-600/15"
                    >
                      <span className="tracking-wide">{t.btnGo}</span>
                      {lang === "ar" ? (
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {pageCodeError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[9.5px] sm:text-[11px] text-red-400 font-bold flex items-center gap-1 justify-center mt-0.5 z-10"
                      >
                        <span>{pageCodeErrorMsg || t.invalidCode}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Redirect Box 2: WhatsApp Redirect (Super Dynamic Premium Glass Card) */}
                <motion.div
                  animate={waCodeError ? { x: [-6, 6, -4, 4, -2, 2, 0] } : {}}
                  transition={{ duration: 0.15 }}
                  className={`relative p-3.5 sm:p-6 md:p-8 rounded-[1.8rem] sm:rounded-[2rem] border transition-all duration-150 flex flex-col justify-between gap-4 sm:gap-6 shadow-2xl overflow-hidden group ${
                    isDarkMode
                      ? "bg-[#0c0e18] border-slate-800/80 focus-within:border-emerald-500/60 focus-within:ring-4 focus-within:ring-emerald-500/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-[#10b981]/70 hover:shadow-[0_20px_50px_rgba(16,185,129,0.03)]"
                      : "bg-white border-slate-200 focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-500/5 shadow-[0_12px_35px_rgba(0,0,0,0.03)] hover:border-emerald-400 hover:shadow-[0_20px_45px_rgba(16,185,129,0.06)]"
                  }`}
                >
                  {/* Micro-glow indicator line at the top of card to look incredibly sleek */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                  {/* Subtly animated inner holographic back-glow */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/5 dark:bg-emerald-550/8 rounded-full blur-3xl pointer-events-none transition-all duration-500 group-hover:scale-125" />

                  {/* Top luxury status tracking bar inside the gateway */}
                  <div className="flex items-center justify-between w-full text-[8.5px] font-mono tracking-wider text-slate-400 dark:text-emerald-400/70 border-b border-slate-100 dark:border-white/5 pb-2.5 sm:pb-3">
                    <span className="flex items-center gap-1 sm:gap-1.5 font-bold">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                      {lang === 'ar' ? 'بوابة التواصل' : 'CONNECT GATE'}
                    </span>
                    <span className="hidden xs:inline">LINK // SOCIAL_WA</span>
                  </div>

                  <div
                    className="flex items-center justify-between w-full relative z-10"
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-100 ${
                          isDarkMode
                            ? "bg-emerald-500/10 text-emerald-400 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                            : "bg-emerald-50 border border-emerald-150 text-emerald-700 shadow-sm"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                      </div>
                      <div className="text-right">
                        <h4
                          className={`text-[11px] sm:text-xs md:text-sm font-black tracking-tight transition-all ${
                            isDarkMode ? "text-slate-200" : "text-slate-900"
                          }`}
                        >
                          {t.waShortcutLabel}
                        </h4>
                        <p className={`text-[9px] sm:text-[10px] mt-0.5 line-clamp-1 transition-all ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}>
                          {lang === 'ar' ? 'الانتقال المباشر للجروبات' : 'Join public social nodes'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3.5 relative z-10">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={t.enterWaCode}
                        value={enteredWaCode}
                        onChange={(e) => setEnteredWaCode(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleGoWa();
                        }}
                        className={`w-full py-2.5 px-3 sm:py-3.5 sm:px-4 rounded-xl border text-[10px] sm:text-xs md:text-sm outline-none transition-all text-center uppercase placeholder:text-slate-400 dark:placeholder:text-slate-550 tracking-widest ${
                          waCodeError
                            ? "border-red-500 text-red-500 bg-red-500/5 font-sans font-bold"
                            : isDarkMode
                              ? "bg-[#080b13] border-slate-800/90 text-slate-100 focus:border-emerald-500/60 focus:bg-[#0c101d] font-mono font-bold shadow-inner"
                              : "bg-slate-50 border-slate-200 text-slate-800 focus:border-emerald-400 focus:bg-white font-mono font-bold"
                        }`}
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.012, y: -0.5 }}
                      whileTap={{ scale: 0.988 }}
                      onClick={handleGoWa}
                      className="w-full py-2.5 sm:py-3.5 md:py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-[10.5px] sm:text-xs md:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-lg shadow-emerald-600/15"
                    >
                      <span className="tracking-wide">{t.btnGo}</span>
                      {lang === "ar" ? (
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      ) : (
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      )}
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {waCodeError && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-[9.5px] sm:text-[11px] text-red-400 font-bold flex items-center gap-1 justify-center mt-0.5 z-10"
                      >
                        <span>{waCodeErrorMsg || t.invalidCode}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Interactive Get My Code Direct Messenger Box */}
              <motion.a
                href="https://wa.me/201226949834"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.01, y: -0.5 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full max-w-[420px] mx-auto px-4 py-2.5 rounded-xl border text-center flex items-center justify-center gap-2 mb-6 cursor-pointer shadow-sm transition-all duration-100 ${
                  isDarkMode
                    ? "bg-indigo-500/5 border-white/5 hover:border-indigo-500/30 text-slate-300 hover:text-indigo-200"
                    : "bg-white border-indigo-500/15 hover:border-indigo-500/35 text-indigo-800 hover:text-indigo-900 shadow-sm shadow-indigo-500/5"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 shrink-0 text-indigo-500 animate-pulse" />
                  <span className="absolute top-[-2px] right-[-2px] w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="absolute top-[-2px] right-[-2px] w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] md:text-xs font-bold">
                  {lang === "ar"
                    ? "للحصول على كود مخصص، تواصل معنا فوراً"
                    : "To obtain a custom code, contact us instantly"}
                </span>
                <ArrowLeft
                  className="w-3.5 h-3.5 text-indigo-500 shrink-0 select-none"
                  style={{
                    transform: lang === "ar" ? "none" : "rotate(180deg)",
                  }}
                />
              </motion.a>

              {/* Dynamic Public Resources & Links - Exquisite Vertical Stack matching the screenshot */}
              <div className="w-full flex flex-col items-center max-w-xl px-2">
                <div className="w-full flex flex-col gap-3.5 mb-3">
                  <AnimatePresence>
                    {(() => {
                      const filteredLinks = LINKS.filter((link) => {
                        if (!searchQuery.trim()) return true;
                        const q = searchQuery.toLowerCase();
                        return (
                          link.title.ar.toLowerCase().includes(q) ||
                          link.title.en.toLowerCase().includes(q) ||
                          link.description.ar.toLowerCase().includes(q) ||
                          link.description.en.toLowerCase().includes(q)
                        );
                      });

                      if (filteredLinks.length === 0) {
                        return (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-6 text-xs text-slate-500 font-bold"
                          >
                            {t.noResults}
                          </motion.div>
                        );
                      }

                      const isSearching = searchQuery.trim().length > 0;
                      return filteredLinks.map((link, idx) => {
                        const cardKey = `public_link_${link.url}`;
                        return (
                          <motion.a
                            key={cardKey}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.99, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.99, y: -8 }}
                            transition={{ duration: 0.12, delay: isSearching ? 0 : Math.min(idx * 0.01, 0.05) }}
                            whileHover={{ y: -2, scale: 1.008 }}
                            className={`p-5 md:p-[22px] rounded-2xl border transition-all duration-100 flex flex-row items-center justify-between gap-5 shadow-sm border-l-[6px] ${link.borderColor} relative group overflow-hidden will-change-transform ${
                              isDarkMode
                                ? "bg-[#0c0e18] border-slate-800/60 hover:bg-[#111425] hover:border-slate-700 shadow-slate-950/20"
                                : "bg-white border-slate-200 hover:bg-slate-50 shadow-sm"
                            }`}
                            style={{ direction: "ltr" }}
                          >
                            {/* Decorative Shimmer Overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/[0.012] to-transparent rotate-45 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                            </div>

                            {/* Center and Left aligned textual contents */}
                            <div
                              className="flex-1 min-w-0 pr-1 text-right"
                              style={{
                                direction: lang === "ar" ? "rtl" : "ltr",
                              }}
                            >
                              <h4 className={`text-[15px] md:text-[16px] font-black leading-snug tracking-tight mb-1 transition-colors duration-100 ${
                                isDarkMode 
                                  ? "text-white group-hover:text-indigo-300" 
                                  : "text-slate-900 group-hover:text-indigo-600"
                              }`}>
                                {lang === "ar" ? link.title.ar : link.title.en}
                              </h4>
                              <p className={`text-[12px] md:text-[13px] leading-relaxed font-semibold line-clamp-1 transition-all duration-100 ${
                                isDarkMode 
                                  ? "text-slate-400" 
                                  : "text-slate-600"
                              }`}>
                                {lang === "ar" ? link.description.ar : link.description.en}
                              </p>
                            </div>

                            {/* Sleek icon wrapper right side */}
                            <div
                              className={`w-13 h-13 md:w-15 md:h-15 rounded-xl flex items-center justify-center shrink-0 shadow-inner transition-transform group-hover:scale-105 duration-100 ${
                                isDarkMode
                                  ? "bg-[#161f36]/80 border border-white/5 text-slate-300 group-hover:text-white"
                                  : "bg-slate-50 border border-slate-150 text-slate-650"
                              }`}
                            >
                              {link.icon}
                            </div>
                          </motion.a>
                        );
                      });
                    })()}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* Symmetrical direct Customer Action Hotlines block - Docked on a single, compact, stylish row */}
          <footer className="w-full flex flex-col items-center gap-6 mt-10 pb-8">
            <div className="text-center space-y-3.5 w-full max-w-xl px-4">
              <div className="flex flex-row flex-nowrap items-center justify-center gap-3">
                {/* 1. Direct Phone Call (Indigo) */}
                <motion.a
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  href="tel:01226949834"
                  className={`group w-11 h-11 md:w-12 md:h-12 rounded-xl transition-all duration-100 border flex items-center justify-center ${
                    isDarkMode
                      ? "bg-[#10192d]/80 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-300 shadow-lg shadow-indigo-950/25"
                      : "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-5 hover:border-indigo-300 shadow-sm"
                  }`}
                  title={
                    lang === "ar"
                      ? "الاتصال الهاتفي المباشر"
                      : "Direct Phone Call"
                  }
                >
                  <Phone className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[2px]" />
                </motion.a>

                {/* 2. WhatsApp Direct Chat (Emerald) */}
                <motion.a
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  href="https://wa.me/201226949834"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-11 h-11 md:w-12 md:h-12 rounded-xl transition-all duration-100 border flex items-center justify-center ${
                    isDarkMode
                      ? "bg-[#10192d]/80 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 hover:text-emerald-300 shadow-lg shadow-emerald-950/25"
                      : "bg-white border-emerald-100 text-emerald-600 hover:bg-emerald-50 hover:border-emerald-300 shadow-sm"
                  }`}
                  title={
                    lang === "ar" ? "واتساب المباشر" : "Direct WhatsApp Chat"
                  }
                >
                  <div className="relative flex items-center justify-center">
                    <MessageCircle className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[2px]" />
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-slate-900 animate-ping" />
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-slate-900" />
                  </div>
                </motion.a>

                {/* 3. Official Facebook Page (Blue) */}
                <motion.a
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  href="https://www.facebook.com/share/1DYAWSkqaf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-11 h-11 md:w-12 md:h-12 rounded-xl transition-all duration-100 border flex items-center justify-center ${
                    isDarkMode
                      ? "bg-[#10192d]/80 border-blue-500/20 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-300 shadow-lg shadow-indigo-950/25"
                      : "bg-white border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-sm"
                  }`}
                  title={
                    lang === "ar"
                      ? "صفحة الفيسبوك الرسمية"
                      : "Official Facebook Page"
                  }
                >
                  <Facebook className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[2px]" />
                </motion.a>

                {/* 4. Official WhatsApp Channel (Teal) */}
                <motion.a
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.94 }}
                  href="https://whatsapp.com/channel/0029VaLCqlfI7Be8J6Hk0122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-11 h-11 md:w-12 md:h-12 rounded-xl transition-all duration-100 border flex items-center justify-center ${
                    isDarkMode
                      ? "bg-[#10192d]/80 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-300 shadow-lg shadow-indigo-950/25"
                      : "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm"
                  }`}
                  title={
                    lang === "ar"
                      ? "قناة واتساب (عبدالعزيز عمران)"
                      : "WhatsApp Channel (Abdelaziz Omran)"
                  }
                >
                  <Megaphone className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[2px]" />
                </motion.a>

                {/* 5. Google Shared Website (Amber) */}
                <motion.a
                  whileHover={{ scale: 1.05, y: -1.5 }}
                  whileTap={{ scale: 0.96 }}
                  href="https://share.google/gvXGu46XZj6zK461s"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group w-9 h-9 rounded-lg transition-all duration-100 border flex items-center justify-center ${
                    isDarkMode
                      ? "bg-[#10192d]/80 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 hover:border-indigo-500/50 hover:text-indigo-300"
                      : "bg-white border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 shadow-sm"
                  }`}
                  title={
                    lang === "ar"
                      ? "الموقع الإلكتروني الرسمي"
                      : "Official Website"
                  }
                >
                  <Globe className="w-3.5 h-3.5 stroke-[2px]" />
                </motion.a>
              </div>

              <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-2">
                <p
                  className={`text-[10.5px] font-bold opacity-60 ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}
                >
                  {t.copyright}{" "}
                  <span
                    onClick={() => {
                      setShowLoginForm(true);
                      setEmail("");
                      setPassword("");
                      setError("");
                    }}
                    className="cursor-default hover:opacity-90 transition-opacity font-extrabold select-none"
                  >
                    AAO
                  </span>{" "}
                  &copy; {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
