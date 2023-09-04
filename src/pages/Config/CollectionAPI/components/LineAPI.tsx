import useUserPlanDetails from "@/hooks/useUserPlanDetails";
import APIItem from "@/pages/Home/APIs/APIItem";
import { useAuth0 } from "@auth0/auth0-react";
import Skeleton from "react-loading-skeleton";
import CollectionInfo from "../../components/CollectionInfo";
import useCollectionData from "@/hooks/useCollectionData";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import { getLineBotSetupSteps } from "./line-bot-setup-steps";
import { useEffect, useState } from "react";
import { TCollectionData, TCollectionInfo } from "@/types";
import { LoadingIcon } from "@/components/icons";
import CustomButton from "@/components/buttons/CustomButton";
import useAPI from "@/hooks/useAPI";
import { copyTextToClipboard } from "@/utils/utils";
import toast from "react-hot-toast";

const LineAPI = () => {
  const { isLoading: isPlanDetailsLoading, planDetials } = useUserPlanDetails();
  const { user } = useAuth0();
  const { collectionData, refresh } = useCollectionData();
  const { t } = useTranslation();
  const [collectionInfo, setCollectionInfo] = useState<
    TCollectionInfo | undefined
  >(undefined);
  const [isCollectionInfoChanged, setIsCollectionInfoChanged] = useState(false);
  const [isUpdateInfoLoading, setIsUpdateInfoLoading] = useState(false);
  const { fetcherUpdateCollection } = useAPI();

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

    try {
      setIsUpdateInfoLoading(true);

      const { line_channel_access_token, line_language } = collectionInfo;
      const updatedInfo = {
        ...collectionInfo,
        ...(line_channel_access_token === ""
          ? {}
          : { line_channel_access_token }),
        ...(line_language === "" ? {} : { line_language }),
      };

      await fetcherUpdateCollection(collectionData.id, updatedInfo);

      refresh();
      setIsCollectionInfoChanged(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdateInfoLoading(false);
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

  const getLineWebhookURL = () => {
    if (!collectionData) {
      return "";
    }

    return (
      import.meta.env.VITE_APP_BASE_URL + `/line-webhook/${collectionData.id}`
    );
  };

  const handleClickCopyWebhookURL = () => {
    const copied = copyTextToClipboard(getLineWebhookURL());
    if (copied) {
      toast("📋 Copied to clipboard");
    }
  };

  useEffect(() => {
    if (collectionData) {
      setCollectionInfoFromData(collectionData);
    }
  }, [collectionData]);

  return (
    <>
      <CollectionInfo collectionData={collectionData} />

      {!isPlanDetailsLoading && user?.email_verified ? (
        <section className="w-full">
          <APIItem name="line" apiDetails={planDetials.line} />
        </section>
      ) : (
        <section className="mb-6 flex flex-col gap-2">
          <Skeleton className="h-20 max-w-3xl" />
        </section>
      )}

      {collectionData ? (
        <div className=" mb-6 max-w-3xl rounded-lg border bg-white p-4">
          <section className="mb-4 flex max-w-3xl flex-col">
            <label className="mb-1 font-bold" htmlFor="line-webhook">
              {t("LINE bot Webhook URL:")}
            </label>
            <div className="flex w-full gap-3">
              <input
                className="flex-1 rounded-md border bg-slate-50 px-2 focus-within:bg-white"
                id="line-webhook"
                type="text"
                readOnly
                value={getLineWebhookURL()}
                onClick={(event) => {
                  event.currentTarget.select();
                }}
              />
              <CustomButton
                classNames="text-white"
                name="copy"
                handleClick={handleClickCopyWebhookURL}
              />
            </div>
          </section>

          <section className="mb-4 flex max-w-3xl flex-col">
            <label
              className="mb-1 font-bold"
              htmlFor="line_channel_access_token"
            >
              Channel Access Token
            </label>
            <textarea
              onChange={(event) => {
                handleInputChange(
                  event.target.value,
                  "line_channel_access_token"
                );
              }}
              rows={3}
              className="rounded border border-slate-300 bg-slate-50 p-1 outline-2 focus-within:bg-white focus-within:outline focus-within:outline-blue-500"
              id="line_channel_access_token"
              placeholder={t("Copy and paste your Channel Access Token here")}
              value={collectionInfo?.line_channel_access_token || ""}
            ></textarea>
          </section>
          <section className="flex items-baseline gap-3">
            <label className="mb-1 font-bold" htmlFor="line_bot_lang">
              {t("Language settings for the LINE bot:")}
            </label>
            <select
              className="h-8 cursor-pointer rounded border bg-white p-1"
              id="line_bot_lang"
              value={collectionInfo?.line_language || "ja"}
              onChange={(event) => {
                handleInputChange(event.target.value, "line_language");
              }}
            >
              <option value="en">English</option>
              <option value="ja">日本語</option>
            </select>
          </section>

          {isCollectionInfoChanged && (
            <section className="mt-4 flex gap-4">
              {!isUpdateInfoLoading ? (
                <>
                  <CustomButton
                    handleClick={handleClickUpdate}
                    name={t("Save")}
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
        <section className="mb-6 h-64 max-w-3xl">
          <Skeleton className="h-64" />
        </section>
      )}

      <section>
        <ReactMarkdown
          className="markdown-body rounded-lg border p-4 md:p-8"
          linkTarget="_blank"
          children={getLineBotSetupSteps()}
        />
      </section>
    </>
  );
};

export default LineAPI;
