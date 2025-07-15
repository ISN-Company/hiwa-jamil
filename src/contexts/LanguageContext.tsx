import * as React from 'react';

type Language = 'EN' | 'AR' | 'KU';

interface Translation {
  [key: string]: string;
}

interface Translations {
  [key: string]: Translation;
}

const translations: Translations = {
  EN: {
    // Navigation
    home: "Home",
    about: "About",
    brands: "Brands",
    contact: "Contact",
    bookService: "Book Service",
    
    // Home Page
    heroTitle: "High Quality Oil in Kurdistan",
    heroSubtitle: "Quality vehicle maintenance for cars, motorcycles, and trucks. Fast, reliable service you can trust since 2020.",
    bookServiceNow: "Book Now",
    callNow: "Call Now",
    
    // Why Choose Us
    whyChooseUs: "Why Choose Hiwa Jamil Oil?",
    whyChooseDesc: "With over 15 years of experience in the automotive industry, we've built a reputation for excellence, reliability, and customer satisfaction.",
    yearsExperience: "Years of Experience",
    happyCustomers: "Happy Customers",
    servicesCompleted: "Oil Sold",
    serviceLocations: "Service Locations",
    
    // Our Story
    ourStory: "Our Story",
    storyText1: "Founded in 2009, Hiwa Jamil Oil began as a small family business with a simple mission: to provide the best automotive care in Kurdistan Region.",
    storyText2: "Over the years, we've grown to become a trusted name in the industry, serving thousands of customers with dedication, expertise, and genuine care for their vehicles.",
    storyText3: "Today, we continue to uphold our founding values while embracing modern technology and techniques to serve you better.",
    customerRating: "Customer Rating",
    servingKurdistan: "Serving Kurdistan",
    since2009: "Since 2009",
    
    // Brands
    trustedBrands: "Trusted Brands We Use",
    brandsDesc: "We partner with the world's leading oil and automotive brands",
    
    // CTA
    readyToGive: "Ready to Give Your Vehicle",
    careCTATitle: "The Care It Deserves?",
    careCTADesc: "Don't wait until it's too late. Regular maintenance keeps your vehicle running smoothly, saves you money, and ensures your safety on the road.",
    speakWithTeam: "Speak with our team",
    scheduleService: "Schedule your service",
    bookAppointment: "Book Appointment",
    findLocation: "Find our location",
    visitUs: "Visit Us",
    getDirections: "Get Directions",
    businessHours: "Business Hours",
    nowOpen: "Now Open: Express Service Available",
    location: "Location",
    nearCentralMarket: "Near Central Market",
    
    // Footer
    professionalOil: "High Quality Oil  Since 2009.",
    quickLinks: "Quick Links",
    contactInfo: "Contact Info",
    allRightsReserved: "All rights reserved.",
  },
  
  AR: {
    // Navigation  
    home: "الرئيسية",
    about: "حولنا", 
    brands: "العلامات التجارية",
    contact: "اتصل بنا",
    bookService: "احجز خدمة",
    
    // Home Page
    heroTitle: "خدمات زيوت محترفة في كوردستان",
    heroSubtitle: "صيانة مركبات عالية الجودة للسيارات والدراجات النارية والشاحنات. خدمة سريعة وموثوقة يمكنك الوثوق بها منذ عام 2020.",
    bookServiceNow: "احجز خدمة الآن",
    callNow: "اتصل الآن",
    
    // Why Choose Us
    whyChooseUs: "لماذا تختار خدمات زيوت هيوا جميل؟",
    whyChooseDesc: "مع أكثر من 15 عامًا من الخبرة في صناعة السيارات، بنينا سمعة للتميز والموثوقية ورضا العملاء.",
    yearsExperience: "سنوات من الخبرة",
    happyCustomers: "عملاء سعداء",
    servicesCompleted: "خدمات مكتملة",
    serviceLocations: "مواقع الخدمة",
    
    // Our Story
    ourStory: "قصتنا",
    storyText1: "تأسست خدمات زيوت هيوا جميل عام 2009 كعمل عائلي صغير برسالة بسيطة: تقديم أفضل رعاية سيارات في إقليم كوردستان.",
    storyText2: "على مر السنين، نمونا لنصبح اسمًا موثوقًا في الصناعة، نخدم آلاف العملاء بالتفاني والخبرة والرعاية الحقيقية لمركباتهم.",
    storyText3: "اليوم، نواصل دعم قيمنا التأسيسية بينما نتبنى التكنولوجيا والتقنيات الحديثة لخدمتك بشكل أفضل.",
    customerRating: "تقييم العملاء",
    servingKurdistan: "نخدم كوردستان",
    since2009: "منذ 2009",
    
    // Brands
    trustedBrands: "العلامات التجارية الموثوقة التي نستخدمها",
    brandsDesc: "نتشارك مع أهم علامات الزيوت والسيارات العالمية",
    
    // CTA
    readyToGive: "مستعد لإعطاء مركبتك",
    careCTATitle: "الرعاية التي تستحقها؟",
    careCTADesc: "لا تنتظر حتى فوات الأوان. الصيانة المنتظمة تحافظ على تشغيل مركبتك بسلاسة وتوفر لك المال وتضمن سلامتك على الطريق.",
    speakWithTeam: "تحدث مع فريقنا",
    scheduleService: "جدولة خدمتك",
    bookAppointment: "احجز موعد",
    findLocation: "اعثر على موقعنا",
    visitUs: "زورنا",
    getDirections: "احصل على الاتجاهات",
    businessHours: "ساعات العمل",
    nowOpen: "مفتوح الآن: خدمة سريعة متاحة",
    location: "الموقع",
    nearCentralMarket: "بالقرب من السوق المركزي",
    
    // Footer
    professionalOil: "خدمات تغيير زيت وصيانة مركبات محترفة للسيارات والدراجات والشاحنات. خدمة عالية الجودة يمكنك الوثوق بها منذ 2020.",
    quickLinks: "روابط سريعة",
    contactInfo: "معلومات الاتصال",
    allRightsReserved: "جميع الحقوق محفوظة.",
  },
  
  KU: {
    // Navigation
    home: "سەرەتا",
    about: "دەربارەمان",
    brands: "براندەکان", 
    contact: "پەیوەندی",
    bookService: "خزمەتگوزاری تۆمار بکە",
    
    // Home Page
    heroTitle: "خزمەتگوزاری زەیتی پیشەیی لە کوردستان",
    heroSubtitle: "چاکردنەوەی ئۆتۆمبێلی باش بۆ ئۆتۆمبێل، مۆتۆر و بارهەڵگر. خزمەتگوزاری خێرا و متمانەپێکراو کە لە ساڵی 2020ەوە پشتی پێ دەبەستیت.",
    bookServiceNow: "ئێستا خزمەتگوزاری تۆمار بکە",
    callNow: "ئێستا پەیوەندی بکە",


    // Why Choose Us
    whyChooseUs: "بۆچی خزمەتگوزاری زەیتی هیوا جەمیل هەڵبژێریت؟",
    whyChooseDesc: "بە زیاد لە 15 ساڵ ئەزموونی لە بواری ئۆتۆمبێل، ناوبانگێکی باشمان بۆ باشی، متمانەپێکراوی و ڕازیبوونی کڕیار دروست کردووە.",
    yearsExperience: "ساڵ ئەزموون",
    happyCustomers: "کڕیاری ڕازی",
    servicesCompleted: "خزمەتگوزاری تەواوکراو",
    serviceLocations: "شوێنی خزمەتگوزاری",
    
    // Our Story
    ourStory: "چیرۆکی ئێمە",
    storyText1: "لە ساڵی 2009دا، خزمەتگوزاری زەیتی هیوا جەمیل وەک بزنسێکی بچووکی خێزانی دەستی پێکرد بە ئامانجێکی سادە: باشترین چاودێری ئۆتۆمبێل لە هەرێمی کوردستان پێشکەش بکات.",
    storyText2: "بە تێپەڕینی ساڵەکان، گەشەمان کرد و بووین بە ناوێکی متمانەپێکراو لە پیشەسازیدا، بە هەزاران کڕیار بە بەختەوەری، شارەزایی و چاودێری ڕاستەقینە بۆ ئۆتۆمبێلەکانیان خزمەت کردوون.",
    storyText3: "ئەمڕۆ، بەردەوامین لە پاراستنی بەهاکانی بناغەیی خۆمان لە هەمان کاتدا تەکنەلۆژیا و تەکنیکە نوێیەکان دەگرینەبەر بۆ ئەوەی باشتر خزمەتتان بکەین.",
    customerRating: "هەڵسەنگاندنی کڕیار",
    servingKurdistan: "خزمەتگوزاری کوردستان",
    since2009: "لە 2009ەوە",
    
    // Brands
    trustedBrands: "براندە متمانەپێکراوەکان کە بەکاریان دەهێنین",
    brandsDesc: "ئێمە لەگەڵ پێشەنگی جیهانی زەیت و ئۆتۆمبێل هاوبەشی دەکەین",
    
    // CTA
    readyToGive: "ئامادەیت ئۆتۆمبێلەکەت",
    careCTATitle: "ئەو چاودێرییە بدەیت کە شایانی ئەوە؟",
    careCTADesc: "چاوەڕێ مەکە تا درەنگ دەبێت. چاکردنەوەی بەردەوام ئۆتۆمبێلەکەت بە نەرمی کاردەکات، پارە پاشەکەوت دەکات و سەلامەتیت لەسەر ڕێگا دڵنیا دەکات.",
    speakWithTeam: "لەگەڵ تیمەکەمان قسە بکە",
    scheduleService: "خزمەتگوزارییەکەت ڕێکخستن بکە",
    bookAppointment: "کاتی تۆمار بکە",
    findLocation: "شوێنەکەمان بدۆزەرەوە",
    visitUs: "سەردانمان بکە",
    getDirections: "ڕێنیشاندەر وەربگرە",
    businessHours: "کاتژمێرەکانی کار",
    nowOpen: "ئێستا کراوەیە: خزمەتگوزاری خێرا بەردەستە",
    location: "شوێن",
    nearCentralMarket: "نزیک بازاڕی ناوەندی",
    
    // Footer
    professionalOil: "خزمەتگوزاری گۆڕینی زەیت و چاکردنەوەی ئۆتۆمبێلی پیشەیی بۆ ئۆتۆمبێل، مۆتۆر و بارهەڵگر. خزمەتگوزاری باش کە لە 2020ەوە متمانەی پێ دەکەیت.",
    quickLinks: "بەستەری خێرا",
    contactInfo: "زانیاری پەیوەندی",
    allRightsReserved: "هەموو مافەکان پارێزراون.",
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = React.useState<Language>('EN');

  const t = (key: string): string => {
    return translations[language][key] || translations['EN'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};