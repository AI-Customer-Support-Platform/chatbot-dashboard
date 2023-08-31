import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import useAPI from "@/hooks/useAPI";
import { TCollectionData } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";

import CollectionCard from "./CollectionCard";
import CreateCollectionModal from "./CreateCollectionModal";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [initLoaded, setInitLoaded] = useState(false);
  const [collections, setCollections] = useState<TCollectionData[]>([]);
  const [isOpenCreateCollectionModal, setIsOpenCreateCollectionModal] =
    useState(false);
  const { fetcherQueryCollections } = useAPI();
  const { user } = useAuth0();
  const { t } = useTranslation();

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
      toast(`⚠️ ${t("Email Verification Required")}`);
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
      <section className="mx-auto flex max-w-6xl justify-start">
        <button
          onClick={handleClickCreateCollectionButton}
          className="mb-6 flex items-center rounded-md border-2  bg-black/70 px-3 py-2 font-bold text-white hover:bg-black"
        >
          {t("Create")}
        </button>
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

      <section>
        <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:max-w-6xl lg:grid-cols-3 ">
          {isLoading ? (
            <>
              <Skeleton className="h-52" />
              <Skeleton className="h-52" />
              <Skeleton className="h-52" />
            </>
          ) : (
            <>
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
      <section></section>
    </div>
  );
};
export default Collections;
