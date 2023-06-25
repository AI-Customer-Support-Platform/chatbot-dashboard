import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import RefreshIcon from "@/components/icons/RefreshIcon";
import classNames from "classnames";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import CreateButton from "@/components/buttons/CreateButton";

interface CollectionInfoProps {
  collection: Collection | undefined;
  handleClickRefresh: () => void;
}

const Documents: React.FC<CollectionInfoProps> = ({
  collection,
  handleClickRefresh,
}) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [isOpenCreateDocumentModal, setIsOpenCreateDocumentModal] =
    useState(false);

  const handleClickCreateDocumentButton = () => {
    setIsOpenCreateDocumentModal(true);
  };

  useEffect(() => {
    if (!collection) return;

    setDocuments(collection.documents);
    console.log("documents: ", collection.documents);
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
                handleClickCreateButton={handleClickCreateDocumentButton}
              />
            </>
          )}
        </div>
      </section>
      <section>
        <PortalModalCenter
          isOpen={isOpenCreateDocumentModal}
          setIsOpen={setIsOpenCreateDocumentModal}
        >
          <div>Create Documents</div>
        </PortalModalCenter>
      </section>
    </div>
  );
};
export default Documents;
