import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import CreateButton from "@/components/buttons/CreateButton";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";
import { TCollectionData, TDocument } from "@/types";

import DocumentCard from "./DocumentCard";
import FileSpaceInfo from "./FileSpaceInfo";
import UploadCollectionModal from "./UploadDocumentModal";

interface DocumentsProps {
  collection: TCollectionData | undefined;
  refresh: () => void;
}

const Documents: React.FC<DocumentsProps> = ({ collection, refresh }) => {
  const [documents, setDocuments] = useState<TDocument[]>([]);
  const [isOpenUploadDocumentModal, setIsOpenUploadDocumentModal] =
    useState(false);
  const { t } = useTranslation();

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
        title={t("Documents")}
        isLoading={!collection}
        refresh={refresh}
      />
      <FileSpaceInfo refresh={!collection} />

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
                name={t("Upload")}
                handleClickCreateButton={handleClickUploadDocumentButton}
              />

              {documents.map((document) => (
                <DocumentCard
                  collection_id={collection.id}
                  refresh={refresh}
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
          show={isOpenUploadDocumentModal}
          setIsShow={setIsOpenUploadDocumentModal}
          allowClickOutside={true}
        >
          <UploadCollectionModal
            collection={collection}
            setIsOpen={setIsOpenUploadDocumentModal}
            refresh={refresh}
          />
        </PortalModalCenter>
      </section>
    </div>
  );
};
export default Documents;
