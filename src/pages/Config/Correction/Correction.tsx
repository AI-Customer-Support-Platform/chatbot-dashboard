import classNames from "classnames";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";

import CustomButton from "@/components/buttons/CustomButton";
import { LoadingIcon } from "@/components/icons";
import useAPI from "@/hooks/useAPI";
import useCollectionData from "@/hooks/useCollectionData";
import { TDocumentSplit } from "@/types";

import CollectionInfo from "../components/CollectionInfo";
import Split from "./Split";

const Correction = () => {
  const { collectionData } = useCollectionData();
  const [question, setQuestion] = useState("");
  const { fetcherQueryDocumentSplits } = useAPI();
  const [documentSplits, setDocumentSplits] = useState<TDocumentSplit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const fetchQueryDocumentSplits = async () => {
    if (!collectionData || question.trim() === "") {
      return;
    }

    try {
      setIsLoading(true);
      const resp = await fetcherQueryDocumentSplits(
        collectionData?.id,
        question
      );
      setDocumentSplits(resp.results[0].results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (
      !isLoading &&
      e.key === "Enter" &&
      !e.shiftKey &&
      !e.nativeEvent.isComposing
    ) {
      e.preventDefault();
      fetchQueryDocumentSplits();
    }
  };

  return (
    <div>
      <CollectionInfo collectionData={collectionData} />
      {collectionData ? (
        <section className="mb-6 flex w-full flex-col items-start rounded-lg border bg-white p-2 transition hover:shadow-md">
          <label className="mb-1 font-bold" htmlFor="question">
            {t("Question")}
          </label>

          <textarea
            rows={2}
            className={classNames(
              "mb-2 w-full rounded border bg-gray p-1 outline-2 focus-within:bg-white focus-within:outline focus-within:outline-blue-500"
            )}
            placeholder={t("Enter your question here")}
            onChange={(event) => {
              setQuestion(event.target.value);
            }}
            onKeyDown={handleKeyDown}
            id="question"
            value={question}
          />

          {!isLoading ? (
            <>
              <CustomButton
                name={t("Query")}
                classNames="text-white"
                handleClick={fetchQueryDocumentSplits}
              />
            </>
          ) : (
            <div className="animate-spin">
              <LoadingIcon />
            </div>
          )}
        </section>
      ) : (
        <>
          <Skeleton className="h-32" />
        </>
      )}

      {documentSplits.length !== 0 && (
        <section>
          <h2 className="mb-2 text-xl font-bold">{t("Matched splits")}</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {documentSplits.map((documentSplit) => {
              return (
                <Split
                  documentSplit={documentSplit}
                  refresh={fetchQueryDocumentSplits}
                  key={documentSplit.id}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
export default Correction;
