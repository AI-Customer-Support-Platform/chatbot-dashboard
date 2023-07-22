import classNames from "classnames";
import RefreshIcon from "./icons/RefreshIcon";

interface TitleWithRefreshButtonProps {
  title: string;
  isLoading: boolean;
  handleClickRefresh: () => void;
  classname?: string;
}

const TitleWithRefreshButton: React.FC<TitleWithRefreshButtonProps> = ({
  title,
  isLoading,
  handleClickRefresh,
  classname,
}) => {
  return (
    <section className="mb-8 flex items-center gap-4">
      <h1 className={`text-3xl font-bold ${classname}`}>{title}</h1>
      <button
        onClick={handleClickRefresh}
        title="refresh"
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
