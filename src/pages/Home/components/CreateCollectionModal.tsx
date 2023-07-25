import LoadingIcon from "@/components/icons/LoadingIcon";
import ModalContainer from "@/components/modal/ModalContainer";
import useAPI from "@/hooks/useAPI";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface CreateCollectionModalProps {
  setIsOpen: (show: boolean) => void;
  refresh: () => void;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  setIsOpen,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherCreateCollection } = useAPI();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleClickCreate = async () => {
    if (!nameRef.current || !nameRef.current.value) {
      toast("⚠️ Name is required");
      return;
    }

    try {
      setIsLoading(true);
      await fetcherCreateCollection(
        nameRef.current.value,
        descriptionRef.current?.value
      );
      setIsLoading(false);
      setIsOpen(false);
      setTimeout(() => {
        refresh();
      }, 500);
    } catch (error) {
      console.error(error);
      toast.error("⚠️ Create collection failed");
      setIsLoading(false);
    }
  };

  return (
    <ModalContainer title="Create Collection" setIsShow={setIsOpen}>
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
          <label className="ml-2 text-slate-400" htmlFor="description">
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
            onClick={handleClickCreate}
            className=" rounded bg-black px-2 py-1 text-lg font-extrabold text-white transition-transform duration-300 hover:scale-105 active:scale-110"
          >
            Create
          </button>
        )}
      </section>
    </ModalContainer>
  );
};
export default CreateCollectionModal;
