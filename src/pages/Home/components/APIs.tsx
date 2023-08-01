import APIItem from "./APIItem";
import { useState } from "react";
import TitleWithRefreshButton from "@/components/TitleWithRefreshButton";
import Skeleton from "react-loading-skeleton";

const APIs = () => {
  const [isLoading, setIsLoading] = useState(false);

  let timer: undefined | number = undefined;
  const handleClickRefreshButton = () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    clearTimeout(timer);
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="mb-8">
      <TitleWithRefreshButton
        title="APIs"
        isLoading={isLoading}
        handleClickRefresh={handleClickRefreshButton}
      />

      {!isLoading ? (
        <section>
          <APIItem name="web" active={false} />
          <APIItem
            name="instagram"
            active={true}
            totalTokens={100}
            remainingTokens={23}
          />
          <APIItem name="line" active={false} />
        </section>
      ) : (
        <section className="flex flex-col gap-2">
          <Skeleton className="h-20 max-w-3xl rounded-full" />
          <Skeleton className="h-20 max-w-3xl" />
          <Skeleton className="h-20 max-w-3xl" />
        </section>
      )}
    </div>
  );
};
export default APIs;
