import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import RefreshIcon from "@/components/icons/RefreshIcon";
import classNames from "classnames";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import CreateButton from "@/components/buttons/CreateButton";
import UploadCollectionModal from "./UploadDocumentModal";
import DocumentCard from "./DocumentCard";
import { Collection, IDocument } from "@/config/constants";

interface CollectionInfoProps {
  collection: Collection | undefined;
  handleClickRefresh: () => void;
}

const Documents: React.FC<CollectionInfoProps> = ({
  collection,
  handleClickRefresh,
}) => {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [isOpenUploadDocumentModal, setIsOpenUploadDocumentModal] =
    useState(false);

  const handleClickUploadDocumentButton = () => {
    setIsOpenUploadDocumentModal(true);
  };

  useEffect(() => {
    if (!collection) return;
    const _documents = [...collection.documents];

    _documents.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setDocuments(_documents);
  }, [collection]);

  return (
    <div>
      <section className="mb-8 flex  items-center gap-4">
        <h1 className="text-3xl font-bold">Documents</h1>
        <button
          onClick={handleClickRefresh}
          title="refresh"
          className={classNames(" text-slate-500", {
            "animate-spin": !collection,
          })}
        >
          <RefreshIcon />
        </button>
      </section>
      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!collection ? (
            <>
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </>
          ) : (
            <>
              <CreateButton
                name="Upload"
                handleClickCreateButton={handleClickUploadDocumentButton}
              />

              {documents.map((document) => (
                <DocumentCard
                  collection_id={collection.id}
                  refresh={handleClickRefresh}
                  key={document.id}
                  document={document}
                />
              ))}
            </>
          )}
        </div>
      </section>
      <section>
        <PortalModalCenter
          isOpen={isOpenUploadDocumentModal}
          setIsOpen={setIsOpenUploadDocumentModal}
          allowClickOutside={true}
        >
          <UploadCollectionModal
            collection={collection}
            setIsOpen={setIsOpenUploadDocumentModal}
            refresh={handleClickRefresh}
          />
        </PortalModalCenter>
      </section>
    </div>
  );
};
export default Documents;
