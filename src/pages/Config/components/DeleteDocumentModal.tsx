import LoadingIcon from "@/components/icons/LoadingIcon";
import ModalHeader from "@/components/modal/ModalHeader";
import useAPI from "@/hooks/useAPI";
import { useState } from "react";

interface DeleteDocumentModalProps {
  refresh: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  collection_id: string;
  document_id: string;
}

const DeleteDocumentModal: React.FC<DeleteDocumentModalProps> = ({
  refresh,
  setIsOpen,
  collection_id,
  document_id,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherDeleteDocument } = useAPI();

  const handleClickDeleteButton = async () => {
    if (!collection_id || !document_id) {
      return;
    }

    try {
      setIsLoading(true);
      await fetcherDeleteDocument(collection_id, document_id);
      setIsOpen(false);
      setTimeout(() => {
        refresh();
      }, 500);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCancelButton = () => {
    setIsOpen(false);
  };

  return (
    <div className="rounded-lg bg-white p-4">
      <ModalHeader title="Delete Document" />
      <section className="mb-8">
        <h2>Are you sure you want to delete the document?</h2>
      </section>
      <section className="flex place-content-center gap-8">
        {isLoading ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          <>
            <button
              onClick={handleClickDeleteButton}
              className=" rounded bg-red-500 px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
            >
              Delete
            </button>

            <button
              onClick={handleClickCancelButton}
              className=" rounded border bg-white px-2 py-1 text-lg font-extrabold text-black transition-transform duration-300 hover:scale-105 active:scale-110"
            >
              Cancel
            </button>
          </>
        )}
      </section>
    </div>
  );
};
export default DeleteDocumentModal;
