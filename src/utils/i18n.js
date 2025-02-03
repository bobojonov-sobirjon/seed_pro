import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "../locales/en/translation.json";
import translationRU from "../locales/ru/translation.json";
import translationCN from "../locales/cn/translation.json";

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
  cn: {
    translation: translationCN,
  },
};

i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next.
  .init({
    resources,
    fallbackLng: "ru", // Default language
    lng: localStorage.getItem("language") || "ru", // Load from localStorage or default to Russian
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },
  });

export default i18n;
