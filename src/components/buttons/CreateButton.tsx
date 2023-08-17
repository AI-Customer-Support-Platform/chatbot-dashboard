import { useTranslation } from "react-i18next";
import { PlusIcon } from "../icons";

interface CreateButtonProps {
  handleClickCreateButton: () => void;
  name?: string;
}

const CreateButton: React.FC<CreateButtonProps> = ({
  handleClickCreateButton,
  name,
}) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={handleClickCreateButton}
      className="flex select-none flex-col items-center justify-center rounded-lg bg-slate-50/50 py-16 transition-transform duration-300 hover:-translate-y-2 hover:bg-slate-50/70 hover:shadow-lg active:scale-105"
    >
      <PlusIcon className="text-slate-400" />
      <span className="text-xl font-bold text-slate-400/80">
        {name ? name : t("Create")}
      </span>
    </button>
  );
};
export default CreateButton;
