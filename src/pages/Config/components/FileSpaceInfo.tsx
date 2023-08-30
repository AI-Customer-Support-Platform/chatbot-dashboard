import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import ProgressBar from "@/components/ProgressBar";
import useAPI from "@/hooks/useAPI";
import { useRootState } from "@/state/root";
import { bytesToMB } from "@/utils/utils";

interface FileSpaceInfoProps {
  refresh: boolean;
}

const FileSpaceInfo: React.FC<FileSpaceInfoProps> = ({ refresh }) => {
  const [initLoaded, setInitLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const { fetcherUserStorage } = useAPI();
  const { storage, setStorage } = useRootState();
  const { t } = useTranslation();

  const fetchUserStorage = useCallback(async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      setInitLoaded(true);
      const resp = await fetcherUserStorage();
      setStorage(resp);
    } catch (error) {
      console.error(error);
      setStorage({
        total_space: 0,
        remaining_space: 0,
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, fetcherUserStorage, setStorage]);

  useEffect(() => {
    if (refresh) {
      setNeedRefresh(true);
    }
  }, [refresh]);

  useEffect(() => {
    if (!initLoaded) {
      const timer = setTimeout(() => {
        fetchUserStorage();
      }, 0);

      return () => {
        clearTimeout(timer);
      };
    } else if (needRefresh) {
      setNeedRefresh(false);
      fetchUserStorage();
    }
  }, [fetchUserStorage, initLoaded, needRefresh]);

  return (
    <div className="-mt-4 mb-8 max-w-3xl">
      {!isLoading ? (
        <section>
          <h3 className="mb-2 font-bold text-slate-600 ">{t("Storage")}</h3>
          <span className="mb-1 block text-sm text-slate-600">
            <span className="font-bold">
              {bytesToMB(storage.total_space - storage.remaining_space)}{" "}
            </span>
            ／
            <span className="font-bold">
              {" "}
              {bytesToMB(storage.total_space)}{" "}
            </span>
            {t("used")}
          </span>

          {
            <ProgressBar
              numerator={storage.total_space - storage.remaining_space}
              denominator={storage.total_space}
              bgColor="bg-slate-500"
            />
          }
        </section>
      ) : (
        <Skeleton className="h-20 max-w-3xl" />
      )}
    </div>
  );
};
export default FileSpaceInfo;
