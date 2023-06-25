import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { useState } from "react";
import DeleteDocumentModal from "./DeleteDocumentModal";

interface DocumentCardProps {
  collection_id: string;
  document: IDocument;
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
    <div className="flex flex-col justify-between rounded-lg bg-white/40 p-4 transition-transform duration-300 hover:-translate-y-2 hover:bg-white/60 hover:shadow-lg">
      <section className="mb-8">
        <h2 className="text-xl font-bold">{document?.file_name}</h2>
      </section>
      <section>
        <DocumentButton
          handleClick={handleClickDeleteDocumentButton}
          name="Delete"
        />
      </section>
      <section>
        <PortalModalCenter
          isOpen={isOpenDeleteDocumentModal}
          setIsOpen={setIsOpenDeleteDocumentModal}
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

interface DocumentButtonProps {
  name: string;
  className?: string;
  handleClick?: () => void;
}
const DocumentButton: React.FC<DocumentButtonProps> = ({
  name,
  className,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`mb-2 flex w-full items-center justify-center gap-2 rounded border bg-white/30 py-1 text-xl font-extralight text-black transition-transform duration-300 hover:-translate-y-[2px] hover:border-2 hover:border-red-600 hover:font-extrabold hover:text-red-500 hover:opacity-90 hover:shadow-lg active:scale-105 ${className}`}
    >
      {name}
    </button>
  );
};
export default DocumentCard;
