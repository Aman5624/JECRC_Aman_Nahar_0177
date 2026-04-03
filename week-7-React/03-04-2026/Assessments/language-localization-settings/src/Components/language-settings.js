import { createContext, useContext, useState } from "react";

// ─── Translations ───────────────────────────────────────────────────────────
const translations = {
  en: {
    code: "EN", name: "English", flag: "🇬🇧", dir: "ltr",
    nav: { home: "Home", about: "About", services: "Services", contact: "Contact" },
    hero: {
      badge: "Speak the World's Language",
      headline: "Communication Without Borders",
      sub: "Our platform bridges the gap between cultures, offering seamless multilingual experiences.",
      cta: "Get Started", secondary: "Learn More",
    },
    features: {
      title: "Why Choose LinguaFlow?",
      list: [
        { icon: "⚡", title: "Instant Translation", desc: "Real-time language switching without page reloads." },
        { icon: "🌐", title: "RTL Support", desc: "Full right-to-left layout support for Arabic, Hebrew and beyond." },
        { icon: "🔒", title: "Enterprise Security", desc: "SOC 2 certified with end-to-end encryption." },
      ],
    },
    footer: "© 2026 LinguaFlow. All rights reserved.",
    currentLang: "Current Language",
  },
  fr: {
    code: "FR", name: "Français", flag: "🇫🇷", dir: "ltr",
    nav: { home: "Accueil", about: "À Propos", services: "Services", contact: "Contact" },
    hero: {
      badge: "Parlez la Langue du Monde",
      headline: "Communication Sans Frontières",
      sub: "Notre plateforme comble le fossé entre les cultures et offre des expériences multilingues fluides.",
      cta: "Commencer", secondary: "En Savoir Plus",
    },
    features: {
      title: "Pourquoi Choisir LinguaFlow?",
      list: [
        { icon: "⚡", title: "Traduction Instantanée", desc: "Changement de langue en temps réel sans rechargement." },
        { icon: "🌐", title: "Support RTL", desc: "Support complet des mises en page de droite à gauche." },
        { icon: "🔒", title: "Sécurité Entreprise", desc: "Certifié SOC 2 avec chiffrement de bout en bout." },
      ],
    },
    footer: "© 2026 LinguaFlow. Tous droits réservés.",
    currentLang: "Langue Actuelle",
  },
  ja: {
    code: "JA", name: "日本語", flag: "🇯🇵", dir: "ltr",
    nav: { home: "ホーム", about: "私たちについて", services: "サービス", contact: "お問い合わせ" },
    hero: {
      badge: "世界の言語を話そう",
      headline: "国境を越えたコミュニケーション",
      sub: "私たちのプラットフォームは文化の溝を埋め、シームレスな多言語体験を提供します。",
      cta: "始める", secondary: "詳しく見る",
    },
    features: {
      title: "LinguaFlowを選ぶ理由",
      list: [
        { icon: "⚡", title: "リアルタイム翻訳", desc: "ページの再読み込みなしにリアルタイムで言語を切り替えられます。" },
        { icon: "🌐", title: "RTLサポート", desc: "アラビア語、ヘブライ語など右から左へのレイアウトを完全サポート。" },
        { icon: "🔒", title: "エンタープライズセキュリティ", desc: "SOC 2認定とエンドツーエンド暗号化を提供します。" },
      ],
    },
    footer: "© 2026 LinguaFlow. 全著作権所有。",
    currentLang: "現在の言語",
  },
  ar: {
    code: "AR", name: "العربية", flag: "🇸🇦", dir: "rtl",
    nav: { home: "الرئيسية", about: "من نحن", services: "الخدمات", contact: "تواصل معنا" },
    hero: {
      badge: "تحدث بلغة العالم",
      headline: "تواصل بلا حدود",
      sub: "منصتنا تجسر الفجوة بين الثقافات وتوفر تجارب متعددة اللغات.",
      cta: "ابدأ الآن", secondary: "اعرف أكثر",
    },
    features: {
      title: "لماذا تختار LinguaFlow؟",
      list: [
        { icon: "⚡", title: "ترجمة فورية", desc: "تبديل اللغة في الوقت الفعلي دون إعادة تحميل الصفحة." },
        { icon: "🌐", title: "دعم RTL", desc: "دعم كامل لتخطيطات من اليمين إلى اليسار للعربية والعبرية." },
        { icon: "🔒", title: "أمان للمؤسسات", desc: "بنية تحتية معتمدة SOC 2 مع تشفير كامل." },
      ],
    },
    footer: "© 2026 LinguaFlow. جميع الحقوق محفوظة.",
    currentLang: "اللغة الحالية",
  },
};

// ─── Context ─────────────────────────────────────────────────────────────────
export const LangContext = createContext(null);

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export const useLang = () => useContext(LangContext);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  return (
    <LangContext.Provider value={{ lang, setLang, t, translations }}>
      {children}
    </LangContext.Provider>
  );
}

// ─── Language Switcher Component ──────────────────────────────────────────────
export function LangSwitcher() {
  const { lang, setLang, translations } = useLang();
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {Object.entries(translations).map(([code, data]) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          title={data.name}
          style={{
            padding: "5px 11px",
            border: lang === code ? "2px solid #e8c97a" : "2px solid rgba(255,255,255,0.15)",
            borderRadius: "20px",
            background: lang === code ? "rgba(232,201,122,0.15)" : "transparent",
            color: lang === code ? "#e8c97a" : "rgba(255,255,255,0.6)",
            fontSize: "12px", fontWeight: lang === code ? "700" : "400",
            cursor: "pointer", transition: "all 0.25s",
          }}
        >
          {data.flag} {data.code}
        </button>
      ))}
    </div>
  );
}