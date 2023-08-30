import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { LoadingIcon } from "@/components/icons";
import ModalContainer from "@/components/modal/ModalContainer";
import useAPI from "@/hooks/useAPI";
import { TCollectionData } from "@/types";

interface DeleteCollectionModalProps {
  collection: TCollectionData | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({
  collection,
  setIsOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherDeleteCollection } = useAPI();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClickDeleteButton = async () => {
    if (!collection) {
      return;
    }

    try {
      setIsLoading(true);
      await fetcherDeleteCollection(collection.id);
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCancelButton = () => {
    setIsOpen(false);
  };

  return (
    <ModalContainer title={t("Delete Collection")}>
      <section className="mb-8">
        <h2>{t("Are you sure you want to delete the collection?")}</h2>
      </section>
      <section className="flex place-content-center gap-8">
        {isLoading ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          <>
            <button
              onClick={handleClickDeleteButton}
              className=" rounded bg-red-500 px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
            >
              {t("Delete")}
            </button>

            <button
              onClick={handleClickCancelButton}
              className=" rounded border bg-white px-2 py-1 text-lg font-extrabold text-black transition-transform duration-300 hover:scale-105 active:scale-110"
            >
              {t("Cancel")}
            </button>
          </>
        )}
      </section>
    </ModalContainer>
  );
};
export default DeleteCollectionModal;
