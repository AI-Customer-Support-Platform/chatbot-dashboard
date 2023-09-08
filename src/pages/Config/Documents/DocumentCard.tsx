import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { DeleteIcon } from "@/components/icons";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { TDocument } from "@/types";
import { calculateTimeDifference } from "@/utils/utils";

import DeleteDocumentModal from "./DeleteDocumentModal";

interface DocumentCardProps {
  collection_id: string;
  document: TDocument;
  refresh: () => void;
}
const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  refresh,
  collection_id,
}) => {
  const [isOpenDeleteDocumentModal, setIsOpenDeleteDocumentModal] =
    useState(false);
  const { t } = useTranslation();

  const handleClickDeleteDocumentButton = () => {
    setIsOpenDeleteDocumentModal(true);
  };
  return (
    <div className="flex h-32 flex-col justify-between overflow-hidden overflow-ellipsis rounded-lg border bg-white shadow transition hover:shadow-md ">
      <section className="overflow-auto p-2">
        <h2 className="text-xl">{document?.file_name}</h2>
      </section>
      <section className="flex items-end justify-between p-2">
        <span className="text-slate-500">
          {calculateTimeDifference(document.created_at)} ago
        </span>
        <div className="flex items-end gap-4">
          <section className="rounded-md border bg-stone-500 px-1 text-white hover:bg-stone-600">
            <Link to={`${document.id}/segments`}>
              {t("Add segments manually")}
            </Link>
          </section>
          <section className="flex items-end">
            <button
              className="text-red-300 hover:text-red-600"
              onClick={handleClickDeleteDocumentButton}
            >
              <DeleteIcon />
            </button>
            <PortalModalCenter
              show={isOpenDeleteDocumentModal}
              setIsShow={setIsOpenDeleteDocumentModal}
            >
              <DeleteDocumentModal
                refresh={refresh}
                setIsOpen={setIsOpenDeleteDocumentModal}
                collection_id={collection_id}
                document_id={document.id}
              />
            </PortalModalCenter>
          </section>
        </div>
      </section>
    </div>
  );
};

export default DocumentCard;
