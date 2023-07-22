import CloseIcon from "@/components/icons/CloseIcon";
import LoadingIcon from "@/components/icons/LoadingIcon";
import { Collection } from "@/config/constants";
import useAPI from "@/hooks/useAPI";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

interface UpdateCollectionModalProps {
  collection: Collection | undefined;
  setIsOpen: (show: boolean) => void;
  refresh: () => void;
}

const UpdateCollectionModal: React.FC<UpdateCollectionModalProps> = ({
  collection,
  setIsOpen,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherUpdateCollection } = useAPI();
  const { collectionId } = useParams();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleClickUpdate = async () => {
    if (!collectionId) {
      return;
    }

    if (!nameRef.current || !nameRef.current.value) {
      toast("⚠️ Name is required");
      return;
    }
    try {
      setIsLoading(true);
      await fetcherUpdateCollection(
        collectionId,
        nameRef.current.value,
        descriptionRef.current?.value
      );

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

  useEffect(() => {
    if (!collection || !nameRef.current || !descriptionRef.current) {
      return;
    }

    nameRef.current.value = collection.name;
    descriptionRef.current.value = collection?.description
      ? collection.description
      : "";
  }, [collection]);

  return (
    <div className="rounded-lg bg-white p-4">
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-xl font-bold">Update Collection</h1>
        <button onClick={() => setIsOpen(false)} className="hover:opacity-50">
          <CloseIcon />
        </button>
      </section>
      <section className="mb-4 flex flex-col gap-4">
        <div className="flex flex-col ">
          <label className="ml-2 text-slate-400" htmlFor="name">
            name
          </label>
          <input
            ref={nameRef}
            id="name"
            className="rounded-lg border p-1 px-2 outline-none"
            type="text"
          />
        </div>
        <div className="flex flex-col ">
          <label className="ml-2 text-slate-400" htmlFor="name">
            description
          </label>
          <textarea
            ref={descriptionRef}
            id="description"
            className="rounded-lg border p-1 px-2 outline-none"
          />
        </div>
      </section>
      <section className="flex place-content-center">
        {isLoading ? (
          <LoadingIcon className="animate-spin" />
        ) : (
          <button
            onClick={handleClickUpdate}
            className=" rounded bg-black px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
          >
            Update
          </button>
        )}
      </section>
    </div>
  );
};
export default UpdateCollectionModal;
