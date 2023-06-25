import PlusIcon from "@/components/icons/PlusIcon";

interface CreateButtonProps {
  handleClickCreateButton: () => void;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  handleClickCreateButton,
}) => {
  return (
    <button
      onClick={handleClickCreateButton}
      className="flex select-none flex-col items-center justify-center rounded-lg bg-slate-50/50 py-16 transition-transform duration-300 hover:-translate-y-2 hover:bg-slate-50/70 hover:shadow-lg active:scale-105"
    >
      <PlusIcon className="text-slate-400" />
      <span className="text-xl font-bold text-slate-400/80">Create</span>
    </button>
  );
};
export default CreateButton;
