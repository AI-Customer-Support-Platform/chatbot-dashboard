import { languageList } from "@/i18n/config";
import i18n from "i18next";

export const saveLang = (lang: string) => {
  localStorage.setItem("website_lang", lang);
};

export const getLang = () => {
  const savedLang = localStorage.getItem("website_lang");
  const browserLang = navigator.language;
  const validLang = languageList.map((lang) => lang.code);

  if (savedLang && validLang.includes(savedLang)) {
    return savedLang;
  }

  if (validLang.includes(browserLang)) {
    return browserLang;
  }

  return "en";
};

export const initLang = () => {
  const lang = getLang();
  i18n.changeLanguage(lang);
};
