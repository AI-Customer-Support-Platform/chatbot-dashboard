import PlusIcon from "@/components/icons/PlusIcon";

const CreateCollectionButton = () => {
  return (
    <button className="flex select-none flex-col items-center justify-center rounded-lg bg-slate-50 py-16 shadow-lg transition-transform duration-300 hover:-translate-y-2 active:scale-105">
      <PlusIcon className="text-slate-400" />
      <span className="text-xl font-bold text-slate-400/80">Create</span>
    </button>
  );
};
export default CreateCollectionButton;
