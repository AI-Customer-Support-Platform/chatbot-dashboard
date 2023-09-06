import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CustomButton from "@/components/buttons/CustomButton";
import { LoadingIcon } from "@/components/icons";
import useAPI from "@/hooks/useAPI";

interface DeleteSplitModalProps {
  setShowModal: (showModal: boolean) => void;
  refresh: () => void;
  splitId: string;
}

const DeleteSplitModal = ({
  setShowModal,
  refresh,
  splitId,
}: DeleteSplitModalProps) => {
  const { collectionId } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherDeleteDocumentSplit } = useAPI();

  const fetchDeleteDocumentSplit = async () => {
    if (!collectionId || !splitId) {
      return;
    }

    try {
      setIsLoading(true);
      await fetcherDeleteDocumentSplit(collectionId, splitId);
      refresh();
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowModal(false)}
        className="fixed inset-0 z-10 h-screen w-full bg-transparent"
      ></div>

      <section className="absolute bottom-10 right-0  z-10 flex w-52 flex-col gap-2 rounded-lg border-2 bg-white p-2 shadow-xl">
        <h2>{t("Are you sure you want to delete the split?")}</h2>
        <div className="flex justify-between gap-4">
          {!isLoading ? (
            <>
              <CustomButton
                handleClick={fetchDeleteDocumentSplit}
                name={t("Delete")}
                classNames="text-white bg-red-600"
              />
              <CustomButton
                handleClick={() => setShowModal(false)}
                name={t("Cancel")}
                classNames="text-white"
              />
            </>
          ) : (
            <div className="animate-spin">
              <LoadingIcon />
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default DeleteSplitModal;
