import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { TCollectionData, TDocument } from "@/types";

import DocumentCard from "./DocumentCard";
import FileSpaceInfo from "./FileSpaceInfo";
import UploadCollectionModal from "./UploadDocumentModal";
import useAPI from "@/hooks/useAPI";
import { useParams } from "react-router-dom";
import CollectionInfo from "../components/CollectionInfo";

const Documents = () => {
  const { collectionId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [collection, setCollection] = useState<TCollectionData | undefined>(
    undefined
  );
  const [documents, setDocuments] = useState<TDocument[]>([]);
  const [isOpenUploadDocumentModal, setIsOpenUploadDocumentModal] =
    useState(false);
  const { t } = useTranslation();
  const { fetcherQueryCollection } = useAPI();

  const handleClickUploadDocumentButton = () => {
    setIsOpenUploadDocumentModal(true);
  };

  const fetchCollection = useCallback(async () => {
    if (!collectionId || isLoading) {
      return;
    }

    setIsLoading(true);
    setInitLoaded(true);
    setCollection(undefined);

    const resp = await fetcherQueryCollection(collectionId);

    setCollection(resp);
    setIsLoading(false);
  }, [collectionId, isLoading, fetcherQueryCollection]);

  useEffect(() => {
    if (!initLoaded) {
      const timer = setTimeout(() => {
        fetchCollection();
      }, 0);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [initLoaded, fetchCollection]);

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
        {t("Upload")}
      </button>
      <section>
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
          {collection ? (
            <>
              {documents.map((document) => (
                <DocumentCard
                  collection_id={collection.id}
                  refresh={fetchCollection}
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
            refresh={fetchCollection}
          />
        </PortalModalCenter>
      </section>
    </div>
  );
};
export default Documents;
