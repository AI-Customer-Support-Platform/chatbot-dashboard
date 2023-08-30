import { ChangeEvent, DragEvent } from "react";
import { useTranslation } from "react-i18next";

import { UploadFileIcon } from "../icons";

interface FileInputButtonProps {
  onChange: (file: File | null) => void;
}

const FileInputButton: React.FC<FileInputButtonProps> = ({ onChange }) => {
  const { t } = useTranslation();
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add("border-blue-500", "bg-blue-100");
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-blue-500", "bg-blue-100");
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove("border-blue-500", "bg-blue-100");

    const file = e.dataTransfer.files?.[0] || null;
    if (file) {
      onChange(file);
    }
  };

  return (
    <label
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="flex w-64 cursor-pointer select-none flex-col items-center rounded-lg border border-blue-500 bg-white px-4 py-6 uppercase tracking-wide text-blue-500 transition duration-200 hover:bg-blue-500 hover:text-white hover:shadow-lg active:bg-blue-600"
    >
      <UploadFileIcon className="h-20 w-20" />
      <span className="mt-2 text-base leading-normal">
        {t("Select or Drag a file")}
      </span>
      <input type="file" className="hidden" onChange={handleFileChange} />
    </label>
  );
};

export default FileInputButton;
