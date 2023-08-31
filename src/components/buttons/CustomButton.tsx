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
export default CustomButton;
