import classNames from "classnames";
import React from "react";

interface ProgressBarProps {
  numerator: number;
  denominator: number;
  bgColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  numerator,
  denominator,
  bgColor = "bg-blue-600",
}) => {
  const progressPercentage =
    denominator !== 0 ? (numerator / denominator) * 100 : 100;
  const percent = progressPercentage > 100 ? 100 : progressPercentage;
  const formattedPercentage = progressPercentage.toFixed(1);
  return (
    <div className="bg-gray-200 dark:bg-gray-700 w-full rounded-full border">
      <div
        className={classNames(
          "rounded-full p-0.5  text-sm font-bold leading-none text-blue-100",
          {
            "text-center": percent > 10,
          },
          bgColor
        )}
        style={{ width: `${percent}%` }}
      >
        <span
          className={classNames({
            "inline-block translate-x-20 text-black": percent <= 10,
          })}
        >{`${formattedPercentage}%`}</span>
      </div>
    </div>
  );
};
export default ProgressBar;
