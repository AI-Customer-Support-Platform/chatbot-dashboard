import { useEffect, useRef, useState } from "react";

const ConfigAPIURL = () => {
  const baseUrlInputRef = useRef<HTMLInputElement>(null);
  const collectionInputRef = useRef<HTMLInputElement>(null);
  const displayCountInputRef = useRef<HTMLInputElement>(null);
  const [isInputChanged, setIsInputChanged] = useState(false);

  const saveToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  const setFromLocalStorage = (
    ref: React.RefObject<HTMLInputElement>,
    key: string
  ) => {
    const storedValue = localStorage.getItem(key);
    ref.current!.value = storedValue || "";
  };

  const handleInputChange = () => {
    setIsInputChanged(true);
  };

  useEffect(() => {
    setFromLocalStorage(baseUrlInputRef, "base-url");
    setFromLocalStorage(collectionInputRef, "collection-id");
    setFromLocalStorage(displayCountInputRef, "display-count");
  }, []);

  const handleClickSave = () => {
    const newBaseUrl = baseUrlInputRef.current!.value;
    const newCollectionId = collectionInputRef.current!.value;
    const newDisplayCount = displayCountInputRef.current!.value;

    saveToLocalStorage("base-url", newBaseUrl);
    saveToLocalStorage("collection-id", newCollectionId);
    saveToLocalStorage("display-count", newDisplayCount);

    setIsInputChanged(false);
    window.location.reload();
  };

  const handleClickCancel = () => {
    setFromLocalStorage(baseUrlInputRef, "base-url");
    setFromLocalStorage(collectionInputRef, "collection-id");
    setFromLocalStorage(displayCountInputRef, "display-count");

    setIsInputChanged(false);
  };

  return (
    <div className="mx-4">
      <div className="mx-auto max-w-6xl rounded-md border bg-white p-2 shadow">
        <section className="mb-4 flex flex-col items-start">
          <label className="text-sm text-slate-600" htmlFor="baseurl">
            Base URL
          </label>

          <input
            id="baseurl"
            className="w-full rounded border bg-slate-50 p-1"
            placeholder="https://api.example.com"
            ref={baseUrlInputRef}
            onChange={handleInputChange}
            type="text"
          />
        </section>

        <section className="mb-4 flex flex-col items-start">
          <label className="text-sm text-slate-600" htmlFor="collection-id">
            Collection ID
          </label>
          <input
            className="w-full rounded border bg-slate-50 p-1"
            id="collection-id"
            placeholder="27373e41-82eb-4304-92a5-93d9f5521e64"
            ref={collectionInputRef}
            onChange={handleInputChange}
            type="text"
          />
        </section>

        <section className="mb-4 flex flex-col items-start">
          <label className="text-sm text-slate-600" htmlFor="display-count">
            Display count
          </label>
          <input
            className="w-full rounded border bg-slate-50 p-1"
            id="display-count"
            placeholder="4"
            ref={displayCountInputRef}
            onChange={handleInputChange}
            type="text"
          />
        </section>

        {isInputChanged && (
          <section className="flex justify-center gap-4">
            <CustomButton
              handleClick={handleClickSave}
              name="Save"
              classNames="text-white bg-green-600"
            />
            <CustomButton
              handleClick={handleClickCancel}
              name="Cancel"
              classNames="text-white"
            />
          </section>
        )}
      </div>
    </div>
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

export default ConfigAPIURL;
