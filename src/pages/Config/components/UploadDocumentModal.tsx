import CloseIcon from "@/components/icons/CloseIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";
import useAPI from "@/hooks/useAPI";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface UploadDocumentModalProps {
  collection: Collection | undefined;
  setIsOpen: (show: boolean) => void;
  refresh: () => void;
}

const supportedFileTypes = ["md", "docx", "csv", "ppt", "txt", "pdf", "doc"];

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
    if (!event.target || !event.target.files) return;
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleClickUpload = async () => {
    if (!collection) return;

    if (!selectedFile) {
      toast("⚠️ Please select a file");
      return;
    }

    const fileExtension = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!fileExtension || !supportedFileTypes.includes(fileExtension)) {
      toast("⚠️ Unsupported file type");
      return;
    }

    const customName = nameRef.current?.value;
    const fileName = customName ? customName : selectedFile.name;

    setIsLoading(true);
    await fetcherUploadDocument(collection?.id, selectedFile, fileName);
    setIsLoading(false);
    setIsOpen(false);
    setTimeout(() => {
      refresh();
    }, 500);
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold">Upload Document</h1>
        {!isLoading && (
          <button onClick={() => setIsOpen(false)} className="hover:opacity-50">
            <CloseIcon />
          </button>
        )}
      </section>
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
    </div>
  );
};
export default UploadDocumentModal;
