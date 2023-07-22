import classNames from "classnames";

interface ProgressBarProps {
  progressPercentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => {
  const percent = progressPercentage > 100 ? 100 : progressPercentage;
  const formattedPercentage = progressPercentage.toFixed(1);
  return (
    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className={classNames(
          "rounded-full bg-blue-600 p-0.5  text-sm font-bold leading-none text-blue-100",
          {
            "text-center": percent > 10,
          }
        )}
        style={{ width: `${percent}%` }}
      >
        <span
          className={classNames({
            "inline-block translate-x-12 text-black": percent <= 10,
          })}
        >{`${formattedPercentage}%`}</span>
      </div>
    </div>
  );
};
export default ProgressBar;
