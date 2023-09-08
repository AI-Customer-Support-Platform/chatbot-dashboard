import classNames from "classnames";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";

import FileInputButton from "@/components/buttons/FileInputButton";
import { LoadingIcon } from "@/components/icons";
import ModalContainer from "@/components/modal/ModalContainer";
import useAPI from "@/hooks/useAPI";
import { TCollectionData } from "@/types";

interface UploadDocumentModalProps {
  collection: TCollectionData | undefined;
  setIsOpen: (show: boolean) => void;
  refresh: () => void;
}

const supportedFileTypes = [
  "txt",
  "md",
  "csv",
  "pdf",
  "docx",
  "doc",
  "ppt",
  "pptx",
];

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  collection,
  setIsOpen,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherUploadDocument } = useAPI();
  const nameRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { t } = useTranslation();

  const handleFileChange = (file: File | null) => {
    if (!file) {
      return;
    }

    const { name } = file;
    const fileExtension = name.split(".").pop()?.toLowerCase();

    const isSupportedFileType =
      fileExtension && supportedFileTypes.includes(fileExtension);
    const nameRefCurrent = nameRef.current;

    if (!isSupportedFileType) {
      toast(`⚠️ ${t("Unsupported file type")}`);
      setSelectedFile(null);
    } else {
      setSelectedFile(file);
      if (nameRefCurrent) {
        nameRefCurrent.value = name;
      }
    }
  };

  const handleClickUpload = async () => {
    if (!collection) {
      return;
    }

    if (!selectedFile) {
      toast(`⚠️ ${t("Please select a file")}`);
      return;
    }

    const customName = nameRef.current?.value || selectedFile.name;

    try {
      setIsLoading(true);
      await fetcherUploadDocument(collection.id, selectedFile, customName);
      setIsLoading(false);
      setIsOpen(false);
      setTimeout(() => {
        refresh();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error(t("Upload failed"));
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer
      title={t("Upload Document")}
      setIsShow={!isLoading ? setIsOpen : undefined}
    >
      <section className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 ">
          <section className="ml-2">
            <span className="text-slate-400">{t("Supported File Types")}</span>
            <span className="block text-sm text-slate-500">
              {supportedFileTypes.join(", ")}
            </span>
          </section>
          <section className="flex justify-center">
            <FileInputButton onChange={handleFileChange} />
          </section>
          {selectedFile && (
            <section className="ml-2">
              <span className="text-slate-400">{t("Chosen File")}</span>
              <span className="block max-w-[400px] text-sm text-slate-500">
                {selectedFile ? selectedFile.name : "None"}{" "}
              </span>
            </section>
          )}
        </div>
        <div
          className={classNames("flex flex-col ", {
            hidden: !selectedFile,
          })}
        >
          <label className="ml-2 text-slate-400" htmlFor="filename">
            {t("Custom Document Name")}
          </label>
          <input
            ref={nameRef}
            id="filename"
            placeholder={t("optional")}
            className="rounded-lg border p-1 px-2 outline-none"
            type="text"
          />
        </div>
      </section>
      {selectedFile && (
        <section className="flex place-content-center">
          {isLoading ? (
            <LoadingIcon className="animate-spin" />
          ) : (
            <button
              onClick={handleClickUpload}
              className=" rounded bg-black px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
            >
              {t("Upload")}
            </button>
          )}
        </section>
      )}
    </ModalContainer>
  );
};
export default UploadDocumentModal;
