import { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import CustomButton from "@/components/buttons/CustomButton";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { TCollectionData } from "@/types";

import DeleteCollectionModal from "./DeleteCollectionModal";

interface DeleteCollectionProps {
  collectionData: TCollectionData | undefined;
}
const DeleteCollection: React.FC<DeleteCollectionProps> = ({
  collectionData,
}) => {
  const [isOpenDeleteCollectionModal, setIsOpenDeleteCollectionModal] =
    useState(false);
  const { t } = useTranslation();

  const handleClickDeleteCollectionButton = () => {
    setIsOpenDeleteCollectionModal(true);
  };

  return (
    <section className="mb-8 flex flex-col gap-4">
      <h2 className="text-3xl font-bold">{t("Danger Zone")}</h2>
      {collectionData ? (
        <>
          <CustomButton
            handleClick={handleClickDeleteCollectionButton}
            name={t("Delete the collection")}
            classNames="bg-red-500 w-fit text-white"
          />
          <PortalModalCenter
            show={isOpenDeleteCollectionModal}
            setIsShow={setIsOpenDeleteCollectionModal}
          >
            <DeleteCollectionModal
              collection={collectionData}
              setIsOpen={setIsOpenDeleteCollectionModal}
            />
          </PortalModalCenter>
        </>
      ) : (
        <div className="flex gap-6">
          <section className="h-auto w-48">
            <Skeleton className="text-4xl" />
          </section>
        </div>
      )}
    </section>
  );
};
export default DeleteCollection;
