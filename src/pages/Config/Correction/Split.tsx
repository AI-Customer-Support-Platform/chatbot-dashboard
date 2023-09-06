import classNames from "classnames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CustomButton from "@/components/buttons/CustomButton";
import { LoadingIcon } from "@/components/icons";
import useAPI from "@/hooks/useAPI";
import { TDocumentSplit } from "@/types";

import DeleteSplitButton from "./DeleteSplitButton";

interface SplitProps {
  documentSplit: TDocumentSplit;
  refresh: () => void;
}

const Split: React.FC<SplitProps> = ({ documentSplit, refresh }) => {
  const [splitContent, setSplitContent] = useState(documentSplit.text);
  const [isSplitContentChanged, setIsSplitContentChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { fetcherUpdateDocumentSplit } = useAPI();
  const { collectionId } = useParams();

  const handleSplitContentChange = (value: string) => {
    setSplitContent(value);
    setIsSplitContentChanged(true);
  };

  const handleUpdateSplit = async () => {
    if (!collectionId || !documentSplit.id) {
      return;
    }

    if (splitContent.trim() === "") {
      toast(`⚠️ ${t("Split content is required")}`);
      return;
    }

    try {
      setIsLoading(true);
      await fetcherUpdateDocumentSplit(
        collectionId,
        splitContent,
        documentSplit.id
      );
      refresh();
      setIsSplitContentChanged(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCancelUpdateButton = () => {
    setSplitContent(documentSplit.text);
    setIsSplitContentChanged(false);
  };

  useEffect(() => {
    setSplitContent(documentSplit.text);
  }, [documentSplit]);

  return (
    <div className="rounded-lg border bg-white p-2 transition hover:shadow-md">
      <span className="mb-2 block">
        {t("Score") + ": "} {documentSplit.score.toFixed(4)}
      </span>

      <section className="mb-2">
        <textarea
          rows={10}
          className={classNames(
            "w-full rounded border bg-gray p-2 outline-2 focus-within:bg-white focus-within:outline focus-within:outline-blue-500",
            {
              "border border-red-500 bg-red-100 focus-within:outline-red-500":
                isSplitContentChanged && splitContent.trim() === "",
            }
          )}
          onChange={(event) => {
            handleSplitContentChange(event.target.value);
          }}
          placeholder={t("Enter a question-answer pair here")}
          value={splitContent}
        />
      </section>

      <section className="flex justify-between">
        <div>
          {isSplitContentChanged && (
            <section className="flex gap-4">
              {!isLoading ? (
                <>
                  <CustomButton
                    handleClick={handleUpdateSplit}
                    name={t("Update")}
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
        <DeleteSplitButton refresh={refresh} splitId={documentSplit.id} />
      </section>
    </div>
  );
};
export default Split;
