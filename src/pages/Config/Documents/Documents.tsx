import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { TDocument } from "@/types";

import DocumentCard from "./DocumentCard";
import FileSpaceInfo from "./FileSpaceInfo";
import UploadCollectionModal from "./UploadDocumentModal";
import CollectionInfo from "../components/CollectionInfo";
import useCollectionData from "@/hooks/useCollectionData";

const Documents = () => {
  const [documents, setDocuments] = useState<TDocument[]>([]);
  const [isOpenUploadDocumentModal, setIsOpenUploadDocumentModal] =
    useState(false);
  const { t } = useTranslation();
  const { refresh, collectionData: collection } = useCollectionData();

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
      <CollectionInfo collectionData={collection} />
      <FileSpaceInfo refresh={!collection} />

      <button
        onClick={handleClickUploadDocumentButton}
        className="mb-6 flex items-center rounded-md border-2  bg-black/70 px-3 py-2 font-bold text-white hover:bg-black"
      >
        {t("Upload-long")}
      </button>
      <section>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {collection ? (
            <>
              {documents.map((document) => (
                <DocumentCard
                  collection_id={collection.id}
                  refresh={refresh}
                  key={document.id}
                  document={document}
                />
              ))}
            </>
          ) : (
            <>
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
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
