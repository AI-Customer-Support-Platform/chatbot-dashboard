import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

interface CollectionInfoProps {
  collection: Collection | undefined;
}

const CollectionInfo: React.FC<CollectionInfoProps> = ({ collection }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(collection);
  }, [collection]);

  return (
    <>
      <CustomButton
        handleClick={() => navigate("/")}
        name="Back"
        classNames="mb-12 bg-white text-black"
      />
      <div className="mb-12 flex flex-col gap-4">
        <div className="mb-4 flex items-center gap-6">
          {collection ? (
            <div className="flex flex-col">
              <h1 className="mb-4 text-3xl font-extrabold">
                {collection?.name}
              </h1>
              <p className="text-base">{collection?.description}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="w-64">
                <Skeleton className="text-3xl" />
              </div>
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
            </div>
          )}
        </div>
        {collection ? (
          <section className="flex gap-4">
            <CustomButton name="Edit" classNames="text-white" />
            <CustomButton name="Chat" classNames="bg-blue-500 text-white" />
            <CustomButton name="Delete" classNames="bg-red-500 text-white" />
          </section>
        ) : (
          <section className="w-24">
            <Skeleton className="text-3xl" />
          </section>
        )}
      </div>
    </>
  );
};

interface CustomButtonProps {
  name: string;
  classNames?: string;
  handleClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  name,
  classNames,
  handleClick,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`rounded-lg bg-black/70 px-2 py-1 font-bold hover:scale-105 active:scale-110 ${classNames}`}
    >
      {name}
    </button>
  );
};

export default CollectionInfo;
