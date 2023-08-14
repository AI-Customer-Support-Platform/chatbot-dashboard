import { useEffect, useState, useCallback } from "react";
import CollectionCard from "./CollectionCard";
import Skeleton from "react-loading-skeleton";
import useAPI from "@/hooks/useAPI";
import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import CreateCollectionModal from "./CreateCollectionModal";
import CreateButton from "@/components/buttons/CreateButton";
import { TCollectionData } from "@/types";
import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";
import { useAuth0 } from "@auth0/auth0-react";
import toast from "react-hot-toast";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [collections, setCollections] = useState<TCollectionData[]>([]);
  const [isOpenCreateCollectionModal, setIsOpenCreateCollectionModal] =
    useState(false);
  const { fetcherQueryCollections } = useAPI();
  const { user } = useAuth0();

  const fetchCollections = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setInitLoaded(true);

      const resp = await fetcherQueryCollections();
      const _collections = resp.collections;

      _collections.sort((a, b) => {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      });

      setCollections(_collections);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, fetcherQueryCollections]);

  const handleClickCreateCollectionButton = () => {
    if (!user?.email_verified) {
      toast("⚠️ Email Verification Required");
      return;
    }

    setIsOpenCreateCollectionModal(true);
  };

  useEffect(() => {
    if (!initLoaded) {
      const timer = setTimeout(() => {
        fetchCollections();
      }, 0);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [initLoaded, fetchCollections]);

  return (
    <div>
      <TitleWithRefreshButton
        title="Collections"
        isLoading={isLoading}
        refresh={fetchCollections}
      />

      <section>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading ? (
            <>
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </>
          ) : (
            <>
              <CreateButton
                handleClickCreateButton={handleClickCreateCollectionButton}
              />
              {collections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  name={collection.name}
                  description={collection?.description}
                  collectionId={collection.id}
                />
              ))}
            </>
          )}
        </div>
      </section>
      <section>
        <PortalModalCenter
          show={isOpenCreateCollectionModal}
          setIsShow={setIsOpenCreateCollectionModal}
        >
          <CreateCollectionModal
            setIsOpen={setIsOpenCreateCollectionModal}
            refresh={fetchCollections}
          />
        </PortalModalCenter>
      </section>
    </div>
  );
};
export default Collections;
