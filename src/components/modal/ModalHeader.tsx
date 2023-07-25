import CloseIcon from "../icons/CloseIcon";

interface ModalHeaderProps {
  title: string;
  setIsShow?: (b: boolean) => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, setIsShow }) => {
  const handleClickCloseButton = () => {
    if (setIsShow) {
      setIsShow(false);
    }
  };
  return (
    <section className="mb-8 flex items-center justify-between gap-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      {setIsShow && (
        <button onClick={handleClickCloseButton} className="hover:opacity-50">
          <CloseIcon />
        </button>
      )}
    </section>
  );
};
export default ModalHeader;
