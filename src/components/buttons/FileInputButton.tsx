import { ChangeEvent } from "react";
import UploadFileIcon from "../icons/UploadFileIcon";

interface FileInputButtonProps {
  onChange: (file: File | null) => void;
}

const FileInputButton: React.FC<FileInputButtonProps> = ({ onChange }) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  return (
    <label className="flex w-64 cursor-pointer select-none flex-col items-center rounded-lg border border-blue-500 bg-white px-4 py-6 uppercase tracking-wide text-blue-500 transition duration-200 hover:bg-blue-500 hover:text-white hover:shadow-lg active:bg-blue-600">
      <UploadFileIcon className="h-20 w-20" />
      <span className="mt-2 text-base leading-normal">Select a file</span>
      <input type="file" className="hidden" onChange={handleFileChange} />
    </label>
  );
};

export default FileInputButton;
