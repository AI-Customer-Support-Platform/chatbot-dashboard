import classNames from "classnames";
import { RefreshIcon } from "./icons";
import { useTranslation } from "react-i18next";

interface TitleWithRefreshButtonProps {
  title: string;
  isLoading: boolean;
  refresh: () => void;
  classname?: string;
}

const TitleWithRefreshButton: React.FC<TitleWithRefreshButtonProps> = ({
  title,
  isLoading,
  refresh,
  classname,
}) => {
  const { t } = useTranslation();
  return (
    <section className="mb-8 flex items-center gap-4">
      <h1 className={`text-3xl font-bold ${classname}`}>{title}</h1>
      <button
        onClick={refresh}
        title={t("refresh")}
        className={classNames("text-slate-500", {
          "animate-spin": isLoading,
        })}
      >
        <RefreshIcon />
      </button>
    </section>
  );
};
export default TitleWithRefreshButton;
