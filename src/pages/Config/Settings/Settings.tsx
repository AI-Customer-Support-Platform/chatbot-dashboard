import useCollectionData from "@/hooks/useCollectionData";

import DeleteCollection from "./DeleteCollection";
import UpdateCollectionInfo from "./UpdateCollectionInfo";

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
