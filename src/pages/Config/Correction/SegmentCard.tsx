import classNames from "classnames";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

import CustomButton from "@/components/buttons/CustomButton";
import { LoadingIcon } from "@/components/icons";
import useAPI from "@/hooks/useAPI";
import { TDocumentSegment } from "@/types";

import DeleteSegmentButton from "./DeleteSegmentButton";

interface SegmentCardProps {
  documentSegment: TDocumentSegment;
  refresh: () => void;
}

const SegmentCard: React.FC<SegmentCardProps> = ({
  documentSegment,
  refresh,
}) => {
  const [segmentContent, setSegmentContent] = useState(documentSegment.text);
  const [isSegmentContentChanged, setIsSegmentContentChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const { fetcherUpdateDocumentSegment } = useAPI();
  const collectionId = localStorage.getItem("collection-id");

  const handleSegmentContentChange = (value: string) => {
    setSegmentContent(value);
    setIsSegmentContentChanged(true);
  };

  const handleUpdateSegment = async () => {
    if (!collectionId || !documentSegment.id) {
      return;
    }

    if (segmentContent.trim() === "") {
      toast(`⚠️ ${t("Segment content is required")}`);
      return;
    }

    try {
      setIsLoading(true);
      await fetcherUpdateDocumentSegment(
        collectionId,
        segmentContent,
        documentSegment.id
      );
      refresh();
      setIsSegmentContentChanged(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCancelUpdateButton = () => {
    setSegmentContent(documentSegment.text);
    setIsSegmentContentChanged(false);
  };

  useEffect(() => {
    setSegmentContent(documentSegment.text);
  }, [documentSegment]);

  return (
    <div className="rounded-lg border bg-white p-2 transition hover:shadow-md">
      <span className="mb-2 block">
        {t("Score") + ": "} {documentSegment.score.toFixed(4)}
      </span>

      <section className="mb-2">
        <textarea
          rows={10}
          className={classNames(
            "w-full rounded border bg-gray p-2 outline-2 focus-within:bg-white focus-within:outline focus-within:outline-blue-500",
            {
              "border border-red-500 bg-red-100 focus-within:outline-red-500":
                isSegmentContentChanged && segmentContent.trim() === "",
            }
          )}
          onChange={(event) => {
            handleSegmentContentChange(event.target.value);
          }}
          placeholder={t("Enter a question-answer pair here")}
          value={segmentContent}
        />
      </section>

      <section className="flex justify-between">
        <div>
          {isSegmentContentChanged && (
            <section className="flex gap-4">
              {!isLoading ? (
                <>
                  <CustomButton
                    handleClick={handleUpdateSegment}
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
        <DeleteSegmentButton refresh={refresh} segmentId={documentSegment.id} />
      </section>
    </div>
  );
};
export default SegmentCard;
