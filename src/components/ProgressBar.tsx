interface ProgressBarProps {
  progressPercentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => {
  const percent = progressPercentage > 100 ? 100 : progressPercentage;
  const formattedPercentage = progressPercentage.toFixed(1);
  return (
    <div className="w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="rounded-full bg-blue-600 p-0.5 text-center text-sm font-bold leading-none text-blue-100"
        style={{ width: `${percent}%` }}
      >
        {`${formattedPercentage}%`}
      </div>
    </div>
  );
};
export default ProgressBar;
