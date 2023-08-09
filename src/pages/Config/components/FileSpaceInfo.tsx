import ProgressBar from "@/components/ProgressBar";
import { useCallback, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

interface FileSpaceInfoProps {
  refresh: boolean;
}

const FileSpaceInfo: React.FC<FileSpaceInfoProps> = ({ refresh }) => {
  const [isFirstLoading, setIsFirstLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetcherUserStorage = useCallback(() => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    setIsFirstLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [isLoading]);

  useEffect(() => {
    if (isFirstLoading) {
      return;
    }

    const timer = setTimeout(() => {
      fetcherUserStorage();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [fetcherUserStorage, isFirstLoading]);

  useEffect(() => {
    if (refresh) {
      fetcherUserStorage();
    }
  }, [refresh, fetcherUserStorage]);

  return (
    <div className="-mt-4 mb-8 max-w-3xl">
      {!isLoading ? (
        <section>
          <h3 className="mb-2 font-bold text-slate-600 ">Storage</h3>
          <span className="mb-1 block text-sm text-slate-600">
            <span className="font-bold"> {30 + "MB"} </span>of
            <span className="font-bold"> {50 + "MB"} </span>
            used
          </span>

          {
            <ProgressBar
              progressPercentage={0.3 * 100}
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
