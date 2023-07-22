import LoadingIcon from "@/components/icons/LoadingIcon";
import { Collection } from "@/config/constants";
import useAPI from "@/hooks/useAPI";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface DeleteCollectionModalProps {
  collection: Collection | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCollectionModal: React.FC<DeleteCollectionModalProps> = ({
  collection,
  setIsOpen,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherDeleteCollection } = useAPI();
  const navigate = useNavigate();

  const handleClickDeleteButton = async () => {
    if (!collection) {
      return;
    }

    try {
      setIsLoading(true);
      await fetcherDeleteCollection(collection.id);
      setIsOpen(false);
      navigate("/");
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
      <section className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Delete Collection</h1>
      </section>
      <section className="mb-8">
        <h2>Are you sure you want to delete the collection?</h2>
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
export default DeleteCollectionModal;
