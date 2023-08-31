import UpdateCollectionInfo from "./UpdateCollectionInfo";
import DeleteCollection from "./DeleteCollection";
import useCollectionData from "@/hooks/useCollectionData";

const Settings = () => {
  const { refresh, collectionData } = useCollectionData();

  return (
    <>
      <UpdateCollectionInfo refresh={refresh} collectionData={collectionData} />

      <DeleteCollection collectionData={collectionData} />
    </>
  );
};
export default Settings;
