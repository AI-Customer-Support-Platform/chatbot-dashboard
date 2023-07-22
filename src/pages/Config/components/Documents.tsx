import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import CreateButton from "@/components/buttons/CreateButton";
import UploadCollectionModal from "./UploadDocumentModal";
import DocumentCard from "./DocumentCard";
import { Collection, IDocument } from "@/config/constants";
import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";

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
    if (!collection) {
      return;
    }

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
      <TitleWithRefreshButton
        title="Documents"
        isLoading={!collection}
        handleClickRefresh={handleClickRefresh}
      />

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
