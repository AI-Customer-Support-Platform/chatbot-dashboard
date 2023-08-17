import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { languageList } from "@/config/i18n/i18n";
import { getLang, saveLang } from "@/utils/i18n";
import { useTranslation } from "react-i18next";
import { isClickOutside } from "@/utils/utils";
import { TriangleIcon } from "../icons";

const SwitchLangButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [t, i18n] = useTranslation();
  const langContainerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectLang = (langCode: string) => {
    setCurrentLang(langCode);
    saveLang(langCode);
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (isClickOutside(langContainerRef, event)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const addClickListener = () => {
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);
    };

    const removeClickListener = () => {
      document.removeEventListener("click", handleClickOutside);
    };

    if (isOpen) {
      addClickListener();
    } else {
      removeClickListener();
    }

    return removeClickListener;
  }, [isOpen]);

  useEffect(() => {
    const lang = getLang();
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <div className="relative flex select-none flex-col items-center gap-1">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 rounded-lg bg-slate-100 p-2 text-sm font-bold  text-black shadow"
      >
        <span className="leading-none">{t("language")}</span>
        <div
          className={classNames("transition duration-300", {
            "-translate-y-[1px] rotate-180": isOpen,
          })}
        >
          <TriangleIcon fill="black" />
        </div>
      </button>
      {isOpen && (
        <div
          ref={langContainerRef}
          className="absolute top-9 rounded-[10px] border bg-slate-100 p-2 text-black shadow"
        >
          <ul className="flex flex-col gap-2">
            {languageList.map((lang) => (
              <li
                onClick={() => handleSelectLang(lang.code)}
                key={lang.code}
                className={classNames(
                  "rounded-[4px] px-2 py-1 text-sm font-normal hover:cursor-pointer",
                  {
                    "hover:bg-slate-300/60": currentLang !== lang.code,
                    "bg-slate-300/50": currentLang === lang.code,
                  }
                )}
              >
                {lang.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default SwitchLangButton;
