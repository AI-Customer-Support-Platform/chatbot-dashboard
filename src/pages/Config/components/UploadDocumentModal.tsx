import LoadingIcon from "@/components/icons/LoadingIcon";
import ModalContainer from "@/components/modal/ModalContainer";
import { Collection } from "@/config/constants";
import useAPI from "@/hooks/useAPI";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface UploadDocumentModalProps {
  collection: Collection | undefined;
  setIsOpen: (show: boolean) => void;
  refresh: () => void;
}

const supportedFileTypes = [
  "md",
  "docx",
  "csv",
  "ppt",
  "pptx",
  "txt",
  "pdf",
  "doc",
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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files) {
      return;
    }

    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleClickUpload = async () => {
    if (!collection) {
      return;
    }

    if (!selectedFile) {
      toast("⚠️ Please select a file");
      return;
    }

    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !supportedFileTypes.includes(fileExtension)) {
      toast("⚠️ Unsupported file type");
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
      toast.error("⚠️ Upload failed");
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer title="Upload Document" setIsShow={setIsOpen}>
      <section className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col ">
          <input id="file" type="file" onChange={handleFileChange} />
        </div>
        <div className="flex flex-col ">
          <label className="ml-2 text-slate-400" htmlFor="name">
            custom name
          </label>
          <input
            ref={nameRef}
            id="name"
            className="rounded-lg border p-1 px-2 outline-none"
            type="text"
          />
        </div>
      </section>
      <section className="flex place-content-center">
        {isLoading ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          <button
            onClick={handleClickUpload}
            className=" rounded bg-black px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
          >
            Upload
          </button>
        )}
      </section>
    </ModalContainer>
  );
};
export default UploadDocumentModal;
