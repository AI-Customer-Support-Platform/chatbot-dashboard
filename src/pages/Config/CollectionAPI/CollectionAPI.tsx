import useCollectionData from "@/hooks/useCollectionData";
import CollectionInfo from "../components/CollectionInfo";
import CustomButton from "@/components/buttons/CustomButton";
import Skeleton from "react-loading-skeleton";
const CollectionAPI = () => {
  const { collectionData } = useCollectionData();
  const handleClickWebButton = () => {
    window.location.href = "/chat/" + collectionData?.id;
  };
  return (
    <>
      <CollectionInfo collectionData={collectionData} />
      {collectionData ? (
        <section>
          <h2 className="mb-4 text-xl">Create a chatbot for the following:</h2>

          <div className="flex gap-4">
            <CustomButton
              handleClick={handleClickWebButton}
              name="Web"
              classNames="text-white bg-blue-500"
            />
            <CustomButton name="LINE" classNames="text-white bg-green-500" />
            <CustomButton
              name="Instagram"
              classNames="text-white bg-pink-500"
            />
          </div>
        </section>
      ) : (
        <section>
          <div className="mb-4 w-80">
            <Skeleton className="text-xl" />
          </div>
          <div className="flex gap-4">
            <section className="w-24">
              <Skeleton className="text-3xl" />
            </section>
            <section className="w-24">
              <Skeleton className="text-3xl" />
            </section>
            <section className="w-36">
              <Skeleton className="text-3xl" />
            </section>
          </div>
        </section>
      )}
    </>
  );
};
export default CollectionAPI;
