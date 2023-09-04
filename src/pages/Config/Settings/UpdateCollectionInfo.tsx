import classNames from "classnames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import { LoadingIcon } from "@/components/icons";
import useAPI from "@/hooks/useAPI";
import { TCollectionData, TCollectionInfo } from "@/types";

import CustomButton from "@/components/buttons/CustomButton";

interface UpdateCollectionInfoProps {
  refresh: () => void;
  collectionData: TCollectionData | undefined;
}

const UpdateCollectionInfo: React.FC<UpdateCollectionInfoProps> = ({
  refresh,
  collectionData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherUpdateCollection } = useAPI();
  const [collectionInfo, setCollectionInfo] = useState<
    TCollectionInfo | undefined
  >(undefined);
  const [isCollectionInfoChanged, setIsCollectionInfoChanged] = useState(false);
  const { t } = useTranslation();

  const handleInputChange = (value: string, type: keyof TCollectionInfo) => {
    setIsCollectionInfoChanged(true);
    setCollectionInfo((prevInfo) => ({
      ...prevInfo,
      [type]: value,
    }));
  };

  const handleClickUpdate = async () => {
    if (!collectionData || !collectionInfo) {
      return;
    }

    if (collectionInfo.name.trim() === "") {
      toast(`⚠️ ${t("Name is required")}`);
      return;
    }

    try {
      setIsLoading(true);

      const { description, fallback_msg } = collectionInfo;
      const updatedInfo = {
        ...collectionInfo,
        ...(fallback_msg === "" ? {} : { fallback_msg }),
        ...(description === "" ? {} : { description }),
      };

      await fetcherUpdateCollection(collectionData.id, updatedInfo);

      refresh();
      setIsCollectionInfoChanged(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCollectionInfoFromData = (data: TCollectionData) => {
    const {
      name,
      description,
      fallback_msg,
      line_channel_access_token,
      line_language,
    } = data;
    setCollectionInfo({
      name,
      description,
      fallback_msg,
      line_channel_access_token,
      line_language,
    });
  };

  const handleClickCancelUpdateButton = () => {
    if (collectionData) {
      setIsCollectionInfoChanged(false);
      setCollectionInfoFromData(collectionData);
    }
  };

  useEffect(() => {
    if (collectionData) {
      setCollectionInfoFromData(collectionData);
    }
  }, [collectionData]);

  return (
    <>
      <section className="mb-6 flex flex-col gap-4">
        <h2 className="text-3xl font-bold">{t("Collection Info")}</h2>
        <div className="flex items-center gap-6">
          {collectionInfo ? (
            <div className="max-w-sm">
              <section className="mb-3 flex flex-col">
                <label className="mb-1 font-bold" htmlFor="name">
                  {t("Name")}
                </label>
                <input
                  onChange={(event) => {
                    handleInputChange(event.target.value, "name");
                  }}
                  className={classNames(
                    "rounded border bg-slate-100 p-1 outline-2 focus-within:bg-slate-50 focus-within:outline focus-within:outline-blue-500",
                    {
                      "border-slate-300": collectionInfo.name,
                      "outline outline-red-500 focus-within:outline-red-500":
                        !collectionInfo.name,
                    }
                  )}
                  placeholder={t("required")}
                  type="text"
                  id="name"
                  value={collectionInfo.name}
                />
              </section>

              <section className="mb-3 flex flex-col">
                <label className="mb-1 font-bold" htmlFor="description">
                  {t("Description")}
                </label>
                <textarea
                  onChange={(event) => {
                    handleInputChange(event.target.value, "description");
                  }}
                  className="rounded border border-slate-300 bg-slate-100 p-1 outline-2 focus-within:bg-slate-50 focus-within:outline focus-within:outline-blue-500"
                  id="description"
                  placeholder={t("optional")}
                  value={collectionInfo.description}
                ></textarea>
              </section>

              <section className="mb-3 flex flex-col">
                <label className="mb-1 font-bold" htmlFor="fallback-message">
                  {t("Fallback message")}
                </label>
                <textarea
                  onChange={(event) => {
                    handleInputChange(event.target.value, "fallback_msg");
                  }}
                  className="rounded border border-slate-300 bg-slate-100 p-1 outline-2 focus-within:bg-slate-50 focus-within:outline focus-within:outline-blue-500"
                  id="fallback-message"
                  value={collectionInfo.fallback_msg}
                ></textarea>
                <span className="mt-1 text-xs text-slate-600">
                  {t(
                    "This message serves as a fallback response for the user if the plan expires or if there are insufficient tokens."
                  )}
                </span>
              </section>

              {isCollectionInfoChanged && (
                <section className="mb-24 flex gap-4">
                  {!isLoading ? (
                    <>
                      <CustomButton
                        handleClick={handleClickUpdate}
                        name={t("Update info")}
                        classNames="text-white bg-green-600"
                      />
                      <CustomButton
                        handleClick={handleClickCancelUpdateButton}
                        name={t("Cancel")}
                        classNames="text-white"
                      />
                    </>
                  ) : (
                    <div className="animate-spin">
                      <LoadingIcon />
                    </div>
                  )}
                </section>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UpdateCollectionInfo;
