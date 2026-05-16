// ============================================================
// ملف إعدادات الموقع — المصدر الوحيد للمعلومات
// ============================================================
// أي تغيير هنا سيظهر في الموقع بالكامل تلقائياً.
// يمكنك تغيير الصور، النصوص، الألوان، وأي شيء آخر من هنا.

export const siteConfig = {
  // === معلومات الشخص (Identity) ===
  personName: "Farida", // الاسم البرمجي (يفضل بالانجليزي)
  personNameDisplay: "Farida", // الاسم الذي سيظهر في الموقع
  profileImage: "/images/profile.jpg", // الصورة الشخصية (اللي في الدائرة)
  senderName: "Your Best Friend", // اسم الشخص اللي باعت الهدية
  age: 20, // السن
  birthdayDate: "3 Feb", // تاريخ الميلاد (يوم وشهر)
  birthdayFull: "February 3rd", // التاريخ بالكامل

  // === إعدادات المتصفح (Site Meta) ===
  title: "Happy 20th Birthday, Farida! 🎂", // عنوان الموقع في المتصفح
  description:
    "A cinematic birthday experience crafted with love for Farida's 20th birthday.", // وصف الموقع
  url: "https://birthday-Farida.vercel.app", // لينك الموقع بعد الرفع
  ogImage: "/og-image.jpg", // صورة المعاينة لما تبعت اللينك

  // === محتوى الواجهة (Hero Content) ===
  hero: {
    line1: "Happy",
    line2: "Birthday",
    dateBadge: "3 Feb",
    cta1Label: "Click here Farida", // الكلام اللي على الزرار الأول
    cta2Label: "Yours Farida", // الكلام اللي على الزرار الثاني
    scrollHint: "Scroll to explore", // تلميح التمرير لأسفل
  },

  // === محتوى التورتة (Cake Scene Content) ===
  cake: {
    heading: "Happy 20th Birthday!",
  },

  // === محتوى البطاقة / الجواب (Card / Envelope Content) ===
  card: {
    coverGreeting: "Dear Farida", // التحية على الغلاف
    coverTitle: "Happy Birthday!",
    coverTeaser: "A surprise message just for you...", // نص تشويقي قبل فتح الجواب
    messageTitle: "To You!",
    messageBody: `Happy Birthday, Farida ❤️

From the moment we met, something in my life shifted—like the universe quietly guiding me toward someone meant for me. You brought warmth into the parts of me I didn't even know were cold, And you expanded my days with a dimension I can only call my own.`, // الرسالة نفسها (تقدر تستخدم أكتر من سطر)
    messageSignature: "Your Best Friend, Farida.", // التوقيع في آخر الرسالة
  },

  // === المحتوى النهائي (Final Section) ===
  final: {
    heading: "Happy Birthday, Farida!",
    subheading: "Wishing you the most magical day 🎉",
    message:
      "May this year bring you everything your heart desires. You deserve all the love, joy, and magic in the world.",
    cta: "Watch Again 🔁", // زرار إعادة العرض
  },

  // === معرض الصور (Gallery Content) ===
  gallery: {
    title: "Memories of You", // عنوان قسم الصور
    subheading: "A collection of beautiful moments captured in time.", // الوصف تحت العنوان
    memories: [
      { image: "/images/memory1.jpg", caption: "The beginning of forever" },
      { image: "/images/memory2.jpg", caption: "Shared smiles & laughter" },
      { image: "/images/memory3.jpg", caption: "Every moment is a gift" },
      { image: "/images/memory4.jpg", caption: "The light of my days" },
      { image: "/images/memory5.jpg", caption: "Always & Forever" },
      { image: "/images/memory6.jpg", caption: "Happy 20th, Farida!" },
    ],
  },

  // === لوحة الألوان (Color Palette) ===
  colors: {
    primaryPink: "#e8717a",
    lightPink: "#f09a9d",
    darkPink: "#c94b57",
    redAccent: "#cc2936",
    whiteSoft: "#fff5f5",
  },

  // === روابط التنقل (Navigation Links) ===
  nav: [
    { label: "Home", href: "#hero" },
    { label: "Memories", href: "#gallery" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
