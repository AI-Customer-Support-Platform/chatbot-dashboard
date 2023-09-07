import classNames from "classnames";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LoadingIcon } from "@/components/icons";
import useAPI from "@/hooks/useAPI";
import useCollectionData from "@/hooks/useCollectionData";
import { TDocument } from "@/types";

import CollectionInfo from "../components/CollectionInfo";
import SegmentCard from "./SegmentCard";

const UploadSegments = () => {
  const navigate = useNavigate();
  const { documentId, collectionId } = useParams();
  const [document, setDocument] = useState<TDocument | undefined>(undefined);
  const { collectionData } = useCollectionData();
  const [segmentsInput, setSegmentsInput] = useState<string>("");
  const [segments, setSegments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherUploadDocumentSegments } = useAPI();

  const handleSegmentsInputChange = (input: string) => {
    setSegmentsInput(input);
    const _segments = input
      .split("\n\n")
      .filter((segment) => segment.trim() !== "")
      .map((segment) => segment.trim());

    setSegments(_segments);
  };

  const handleEmptySegments = () => {
    setSegmentsInput("");
    setSegments([]);
  };

  const handleClickUploadSegmentsButton = async () => {
    if (!collectionId || !documentId) {
      return;
    }

    try {
      setIsLoading(true);
      await fetcherUploadDocumentSegments(collectionId, segments, documentId);
      handleEmptySegments();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (documentId && collectionData?.documents) {
      const document = collectionData.documents.find(
        (doc) => doc.id === documentId
      );

      if (!document) {
        navigate(`/config/${collectionData.id}`);
      } else {
        setDocument(document);
      }
    }
  }, [documentId, collectionData, navigate]);

  return (
    <>
      <main className="flex flex-col p-4 sm:p-8">
        <section className="mx-auto w-full max-w-6xl">
          <CollectionInfo collectionData={collectionData} />
        </section>
        <section className="mx-auto mb-4 flex w-full max-w-6xl flex-wrap gap-2">
          <span>Manually import segments into: </span>
          <span className="font-bold">{document?.file_name}</span>
        </section>

        <section className="grid grid-cols-1 gap-4 overflow-hidden md:h-[85vh] md:grid-cols-2">
          <div className="flex h-[85vh] w-full flex-col gap-2 rounded-lg border bg-white p-2">
            <section className="flex justify-between">
              <label htmlFor="input" className="text-lg font-bold">
                Input
              </label>
              {segmentsInput.trim() !== "" && (
                <button
                  className="rounded border-2 px-1 hover:bg-slate-50"
                  onClick={handleEmptySegments}
                >
                  empty
                </button>
              )}
            </section>

            <textarea
              id="input"
              className={classNames(
                "h-full flex-1  resize-none rounded border bg-gray p-2 outline-2 focus-within:bg-white focus-within:outline focus-within:outline-blue-500"
              )}
              onChange={(event) =>
                handleSegmentsInputChange(event.target.value)
              }
              value={segmentsInput}
            />
          </div>

          <div className="flex h-[85vh] flex-col gap-2 overflow-hidden rounded-lg border bg-white p-2">
            <section className="flex justify-between">
              <label htmlFor="output" className="text-lg font-bold">
                Output
              </label>
              {segments.length > 0 && (
                <>
                  <span>
                    <span className="font-bold">{segments.length}</span>{" "}
                    segments
                  </span>
                  {!isLoading ? (
                    <>
                      <button
                        className="rounded-lg border bg-blue-500 px-2 font-bold text-white hover:bg-blue-600"
                        onClick={handleClickUploadSegmentsButton}
                      >
                        Upload
                      </button>
                    </>
                  ) : (
                    <div className="flex w-20 items-center justify-center">
                      <LoadingIcon className="h-6 w-6 animate-spin" />
                    </div>
                  )}
                </>
              )}
            </section>
            <section className="flex-1 overflow-y-auto rounded border bg-gray p-2">
              {segments.map((segment, index) => (
                <SegmentCard segment={segment} order={index} key={index} />
              ))}
            </section>
          </div>
        </section>
      </main>
    </>
  );
};
export default UploadSegments;
