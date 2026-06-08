// ============================================================
// ملف إعدادات الموقع — المصدر الوحيد للمعلومات
// ============================================================
// أي تغيير هنا سيظهر في الموقع بالكامل تلقائياً.
// يمكنك تغيير الصور، النصوص، الألوان، وأي شيء آخر من هنا.

export const siteConfig = {
  // === معلومات الشخص (Identity) ===
  personName: " Aya ", // الاسم البرمجي (يفضل بالانجليزي)
  personNameDisplay: "Aya", // الاسم الذي سيظهر في الموقع
  profileImage: "/images/profile.jpeg", // الصورة الشخصية (اللي في الدائرة)
  senderName: "Your Best Friend", // اسم الشخص اللي باعت الهدية
  age: 25, // السن
  birthdayDate: "8th of June", // تاريخ الميلاد (يوم وشهر)
  birthdayFull: "June 8th", // التاريخ بالكامل
  musicUrl: "/audio/videoplayback.m4a", // ملف الأغنية الخلفية (مثال: /audio/videoplayback.m4a)


  // === إعدادات المتصفح (Site Meta) ===
  title: "Happy 25th Birthday, AYA! 🎂", // عنوان الموقع في المتصفح
  description:
    "A cinematic birthday experience crafted with love for Aya's 25th birthday.", // وصف الموقع
  url: "https://birthday-aya-25th.vercel.app", // لينك الموقع بعد الرفع
  ogImage: "/og-image.jpeg", // صورة المعاينة لما تبعت اللينك

  // === محتوى الواجهة (Hero Content) ===
  hero: {
    line1: "Happy",
    line2: "Birthday",
    dateBadge: "8th of June",
    cta1Label: "Click here Aya", // الكلام اللي على الزرار الأول
    cta2Label: "Yours Aya", // الكلام اللي على الزرار الثاني
    scrollHint: "Scroll to explore", // تلميح التمرير لأسفل
  },

  // === محتوى التورتة (Cake Scene Content) ===
  cake: {
    heading: "Happy 25th Birthday!",
  },

  // === محتوى البطاقة / الجواب (Card / Envelope Content) ===
  card: {
    coverGreeting: "Dear Aya", // التحية على الغلاف
    coverTitle: "Happy Birthday!",
    coverTeaser: "A surprise message just for you...", // نص تشويقي قبل فتح الجواب
    messageTitle: "To You!",
    messageBody: `To my beautiful Aya, my favorite person, and the girl who somehow manages to make my days better while also driving me a little crazy sometimes 😘 Today is all about you, and honestly, it should be. You deserve all the happiness, love, and cake in the world. (Yes, even the extra slice you’re definitely going to pretend you don’t want and then steal from someone else’s plate. 😂) Thank you for being the reason behind so many of my smiles, for always making life more exciting, and for putting up with me even when I’m being annoying. That alone deserves an award. 🏆❤️ I hope this year brings you everything you’ve been wishing for—success, happiness, good health, and countless moments that make you smile. And I hope I get to be there for as many of those moments as possible. No matter how many birthdays come and go, you’ll always be my Yaya, the girl who holds a special place in my heart and makes life brighter just by being in it. Now go enjoy your birthday, be spoiled, eat lots of cake, and remember that today you’re officially older… but don’t worry, you’re still cute. 😜❤️ Happy Birthday, Yaya. I love you more than words can ever explain. ❤️`, // الرسالة نفسها (تقدر تستخدم أكتر من سطر)
    messageSignature: "Your Best Friend, Aya.", // التوقيع في آخر الرسالة
  },

  // === المحتوى النهائي (Final Section) ===
  final: {
    heading: "Happy Birthday, Aya!",
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
      { image: "/images/memory1.jpeg", caption: "The beginning of forever" },
      { image: "/images/memory2.jpeg", caption: "Shared smiles & laughter" },
      { image: "/images/memory3.jpeg", caption: "Every moment is a gift" },
      { image: "/images/memory4.jpeg", caption: "The light of my days" },
      { image: "/images/memory5.jpeg", caption: "Always & Forever" },
      { image: "/images/memory6.jpeg", caption: "Happy 20th, Farida!" },
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
