import { useState } from "react";

import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { TDocument } from "@/types";

import DeleteDocumentModal from "./DeleteDocumentModal";
import { DeleteIcon } from "@/components/icons";
import { calculateTimeDifference } from "@/utils/utils";

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
  );
};

export default DocumentCard;
