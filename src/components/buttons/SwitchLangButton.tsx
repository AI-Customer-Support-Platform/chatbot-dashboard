import classNames from "classnames";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { languageList } from "@/i18n/config";
import { getLang, saveLang } from "@/utils/i18n";

import { LanguageIcon, TriangleIcon } from "../icons";

const SwitchLangButton = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [t, i18n] = useTranslation();

  const handleToggle = () => {
    setShowModal((prev) => !prev);
  };
  const handleSelectLang = (langCode: string) => {
    setCurrentLang(langCode);
    saveLang(langCode);
    i18n.changeLanguage(langCode);
    setShowModal(false);
  };

  useEffect(() => {
    const lang = getLang();
    setCurrentLang(lang);
    i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <div className="relative flex select-none flex-col items-center gap-1">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1 rounded-lg border bg-white px-2 py-2 text-sm font-bold  text-black"
      >
        <LanguageIcon width={18} height={18} />
        <span className="leading-none">{t("language")}</span>
        <div
          className={classNames("transition duration-300", {
            "-translate-y-[1px] rotate-180": showModal,
          })}
        >
          <TriangleIcon fill="black" />
        </div>
      </button>
      {showModal && (
        <SwitchLangModal
          setShowModal={setShowModal}
          currentLang={currentLang}
          handleSelectLang={handleSelectLang}
        />
      )}
    </div>
  );
};

interface SwitchLangModalProps {
  setShowModal: (showModal: boolean) => void;
  currentLang: string;
  handleSelectLang: (langCode: string) => void;
}

const SwitchLangModal = ({
  setShowModal,
  currentLang,
  handleSelectLang,
}: SwitchLangModalProps) => {
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="fixed inset-0 z-20 h-screen w-full bg-transparent"
      ></div>
      <div className="absolute top-9 z-20 rounded-[10px] border bg-white p-2 text-black shadow">
        <ul className="flex flex-col items-center gap-2">
          {languageList.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => handleSelectLang(lang.code)}
                className={classNames(
                  "rounded-[4px] px-2 py-1 text-sm font-normal hover:cursor-pointer",
                  {
                    "hover:bg-slate-200": currentLang !== lang.code,
                    "bg-slate-200/70": currentLang === lang.code,
                  }
                )}
              >
                {lang.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SwitchLangButton;
