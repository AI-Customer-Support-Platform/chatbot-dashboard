import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import { ConfigIcon } from "../icons";
import CustomButton from "./CustomButton";

const ConfigButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleToggle = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <button className="hover:opacity-70" onClick={handleToggle}>
        <ConfigIcon />
      </button>
      {showModal && <ConfigModal setShowModal={setShowModal} />}
    </>
  );
};

interface SwitchLangModalProps {
  setShowModal: (showModal: boolean) => void;
}

const ConfigModal = ({ setShowModal }: SwitchLangModalProps) => {
  const baseUrlInputRef = useRef<HTMLInputElement>(null);
  const collectionInputRef = useRef<HTMLInputElement>(null);
  const tokenInputRef = useRef<HTMLInputElement>(null);
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { t } = useTranslation();

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const setFromLocalStorage = (
    ref: React.RefObject<HTMLInputElement>,
    key: string
  ) => {
    const storedValue = localStorage.getItem(key);
    ref.current!.value = storedValue || "";
  };

  const handleInputChange = () => {
    setIsInputChanged(true);
  };

  useEffect(() => {
    setFromLocalStorage(baseUrlInputRef, "base-url");
    setFromLocalStorage(collectionInputRef, "collection-id");
    setFromLocalStorage(tokenInputRef, "token");
  }, []);

  const handleClickSave = () => {
    const newBaseUrl = baseUrlInputRef.current!.value;
    const newCollectionId = collectionInputRef.current!.value;
    const newToken = tokenInputRef.current!.value;

    saveToLocalStorage("base-url", newBaseUrl);
    saveToLocalStorage("collection-id", newCollectionId);
    saveToLocalStorage("token", newToken);

    setIsInputChanged(false);
    window.location.reload();
  };

  const handleClickCancel = () => {
    setFromLocalStorage(baseUrlInputRef, "base-url");
    setFromLocalStorage(collectionInputRef, "collection-id");
    setFromLocalStorage(tokenInputRef, "token");

    setIsInputChanged(false);
  };
  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="fixed inset-0 z-20 h-screen w-full bg-transparent"
      ></div>
      <div className="absolute right-10 top-20 z-20 w-full max-w-3xl rounded-[10px] border-2 border-black/10 bg-white p-2 text-black shadow-xl">
        <section className="mb-4 flex flex-col items-start">
          <label className="text-sm text-slate-600" htmlFor="baseurl">
            Base URL
          </label>

          <input
            id="baseurl"
            className="w-full rounded border bg-slate-50 p-1"
            placeholder="https://api.example.com"
            ref={baseUrlInputRef}
            onChange={handleInputChange}
            type="text"
          />
        </section>

        <section className="mb-4 flex flex-col items-start">
          <label className="text-sm text-slate-600" htmlFor="collection-id">
            Collection ID
          </label>
          <input
            className="w-full rounded border bg-slate-50 p-1"
            id="collection-id"
            placeholder="27373e41-82eb-4304-92a5-93d9f5521e64"
            ref={collectionInputRef}
            onChange={handleInputChange}
            type="text"
          />
        </section>

        <section className="mb-4 flex flex-col items-start">
          <label className="text-sm text-slate-600" htmlFor="token">
            Token
          </label>
          <input
            className="w-full rounded border bg-slate-50 p-1"
            id="token"
            placeholder="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkNOb2FkX1NXaXZDOGlhVUl"
            ref={tokenInputRef}
            onChange={handleInputChange}
            type="text"
          />
        </section>

        {isInputChanged && (
          <section className="flex justify-center gap-4">
            <CustomButton
              handleClick={handleClickSave}
              name={t("Save")}
              classNames="text-white bg-green-600"
            />
            <CustomButton
              handleClick={handleClickCancel}
              name={t("Cancel")}
              classNames="text-white"
            />
          </section>
        )}
      </div>
    </>
  );
};
export default ConfigButton;
