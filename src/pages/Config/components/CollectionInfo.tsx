import PortalModalCenter from "@/components/portalDialog/PortalModalCenter";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import DeleteCollectionModal from "./DeleteCollectionModal";
import { TCollectionData, TCollectionInfo } from "@/types";
import classNames from "classnames";
import toast from "react-hot-toast";
import useAPI from "@/hooks/useAPI";
import LoadingIcon from "@/components/icons/LoadingIcon";
import BackToHomeButton from "@/components/buttons/BackToHomeButton";

interface CollectionInfoProps {
  refresh: () => void;
  collectionData: TCollectionData | undefined;
}

const CollectionInfo: React.FC<CollectionInfoProps> = ({
  refresh,
  collectionData,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { fetcherUpdateCollection } = useAPI();
  const [isOpenDeleteCollectionModal, setIsOpenDeleteCollectionModal] =
    useState(false);
  const [collectionInfo, setCollectionInfo] = useState<
    TCollectionInfo | undefined
  >(undefined);
  const [isCollectionInfoChanged, setIsCollectionInfoChanged] = useState(false);

  const handleInputChange = (value: string, type: keyof TCollectionInfo) => {
    setIsCollectionInfoChanged(true);
    setCollectionInfo((prevInfo) => ({
      ...prevInfo,
      [type]: value,
    }));
  };

  const handleClickUpdate = async () => {
    if (!collectionData || !collectionInfo) {
      return;
    }

    const { name, description, fallback_msg } = collectionInfo;

    if (name.trim() === "") {
      toast("⚠️ Name is required");
      return;
    }

    try {
      setIsLoading(true);

      const updatedInfo = {
        name,
        ...(fallback_msg === "" ? {} : { fallback_msg }),
        ...(description === "" ? {} : { description }),
      };

      await fetcherUpdateCollection(collectionData.id, updatedInfo);

      refresh();
      setIsCollectionInfoChanged(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickCancelUpdateButton = () => {
    setIsCollectionInfoChanged(false);
    setCollectionInfo(collectionData);
  };

  const handleClickDeleteCollectionButton = () => {
    setIsOpenDeleteCollectionModal(true);
  };

  useEffect(() => {
    setCollectionInfo(collectionData);
  }, [collectionData]);

  return (
    <>
      <section className="mb-8 flex gap-6">
        <BackToHomeButton />
        {collectionData ? (
          <>
            <CustomButton
              handleClick={() => {
                window.location.href = `/chat/${collectionData.id}`;
              }}
              name="Chat"
              classNames="bg-blue-500 text-white"
            />
            <CustomButton
              handleClick={handleClickDeleteCollectionButton}
              name="Delete the collection"
              classNames="hover:bg-red-500  bg-slate-300 text-slate-400 hover:text-white"
            />
            <PortalModalCenter
              show={isOpenDeleteCollectionModal}
              setIsShow={setIsOpenDeleteCollectionModal}
            >
              <DeleteCollectionModal
                collection={collectionData}
                setIsOpen={setIsOpenDeleteCollectionModal}
              />
            </PortalModalCenter>
          </>
        ) : (
          <div className="flex gap-6">
            <section className="h-auto w-16">
              <Skeleton className="text-4xl" />
            </section>

            <section className="h-auto w-48">
              <Skeleton className="text-4xl" />
            </section>
          </div>
        )}
      </section>
      <section className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          {collectionInfo ? (
            <div className="max-w-sm">
              <section className="mb-3 flex flex-col">
                <label className="mb-1 font-bold" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={(event) => {
                    handleInputChange(event.target.value, "name");
                  }}
                  className={classNames(
                    "rounded border bg-slate-100 p-1 outline-2 focus-within:bg-slate-50 focus-within:outline focus-within:outline-blue-500",
                    {
                      "border-slate-300": collectionInfo.name,
                      "outline outline-red-500 focus-within:outline-red-500":
                        !collectionInfo.name,
                    }
                  )}
                  placeholder="required"
                  type="text"
                  id="name"
                  value={collectionInfo.name}
                />
              </section>

              <section className="mb-3 flex flex-col">
                <label className="mb-1 font-bold" htmlFor="description">
                  Description
                </label>
                <textarea
                  onChange={(event) => {
                    handleInputChange(event.target.value, "description");
                  }}
                  className="rounded border border-slate-300 bg-slate-100 p-1 outline-2 focus-within:bg-slate-50 focus-within:outline focus-within:outline-blue-500"
                  id="description"
                  placeholder="optional"
                  value={collectionInfo.description}
                ></textarea>
              </section>

              <section className="mb-3 flex flex-col">
                <label className="mb-1 font-bold" htmlFor="fallback-message">
                  Fallback message
                </label>
                <textarea
                  onChange={(event) => {
                    handleInputChange(event.target.value, "fallback_msg");
                  }}
                  className="rounded border border-slate-300 bg-slate-100 p-1 outline-2 focus-within:bg-slate-50 focus-within:outline focus-within:outline-blue-500"
                  id="fallback-message"
                  value={collectionInfo.fallback_msg}
                ></textarea>
                <span className="mt-1 text-xs text-slate-600">
                  This message serves as a fallback response for the user if the
                  plan expires or if there are insufficient tokens.
                </span>
              </section>

              {isCollectionInfoChanged && (
                <section className="mb-24 flex gap-4">
                  {!isLoading ? (
                    <>
                      <CustomButton
                        handleClick={handleClickUpdate}
                        name="Update info"
                        classNames="text-white bg-green-600"
                      />
                      <CustomButton
                        handleClick={handleClickCancelUpdateButton}
                        name="Cancel"
                        classNames="text-white"
                      />
                    </>
                  ) : (
                    <div className="animate-spin">
                      <LoadingIcon />
                    </div>
                  )}
                </section>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
              <div className="w-96">
                <Skeleton className="text-3xl" />
              </div>
            </div>
          )}
        </div>
      </section>
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
      className={`rounded-lg bg-black/70 px-2 py-1 font-bold transition duration-200 hover:scale-105 active:scale-100 ${classNames}`}
    >
      {name}
    </button>
  );
};

export default CollectionInfo;
