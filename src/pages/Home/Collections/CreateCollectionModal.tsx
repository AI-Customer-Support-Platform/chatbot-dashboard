import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import { LoadingIcon } from "@/components/icons";
import ModalContainer from "@/components/modal/ModalContainer";
import useAPI from "@/hooks/useAPI";

interface CreateCollectionModalProps {
  setIsOpen: (show: boolean) => void;
  refresh: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  setIsOpen,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherCreateCollection } = useAPI();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const [isValidInput, setIsValidInput] = useState(false);
  const { t } = useTranslation();

  const handleNameChange = () => {
    const inputValue = nameRef.current?.value?.trim();
    setIsValidInput(!!inputValue);
  };

  const handleClickCreate = async () => {
    if (!nameRef.current || !nameRef.current.value) {
      toast("⚠️ Name is required");
      return;
    }

    try {
      setIsLoading(true);
      await fetcherCreateCollection(
        nameRef.current.value,
        descriptionRef.current?.value
      );
      setIsLoading(false);
      setIsOpen(false);
      setTimeout(() => {
        refresh();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(t("Create collection failed"));
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer title={t("Create Collection")} setIsShow={setIsOpen}>
      <section className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col ">
          <label className="ml-2 text-slate-400" htmlFor="name">
            {t("Name")}
          </label>
          <input
            ref={nameRef}
            id="name"
            className="rounded-lg border p-1 px-2 outline-none"
            type="text"
            placeholder={t("required")}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex flex-col ">
          <label className="ml-2 text-slate-400" htmlFor="description">
            {t("Description")}
          </label>
          <textarea
            ref={descriptionRef}
            id="description"
            className="rounded-lg border p-1 px-2 outline-none"
            placeholder={t("optional")}
          />
        </div>
      </section>
      {isValidInput && (
        <section className="flex place-content-center">
          {isLoading ? (
            <LoadingIcon className="animate-spin" />
          ) : (
            <button
              onClick={handleClickCreate}
              className=" rounded bg-black px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
            >
              {t("Create")}
            </button>
          )}
        </section>
      )}
    </ModalContainer>
  );
};
export default CreateCollectionModal;
