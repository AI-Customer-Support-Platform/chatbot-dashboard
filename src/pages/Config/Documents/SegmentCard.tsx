import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { getTokenCount } from "@/utils/tokenizer";

interface SegmentCardProps {
  order: number;
  segment: string;
}
const SegmentCard: React.FC<SegmentCardProps> = ({ order, segment }) => {
  const tokenCount = getTokenCount(segment);
  const { t } = useTranslation();

  return (
    <div className="mb-4 flex items-center rounded-lg border bg-stone-200 shadow ">
      <section className="flex w-fit items-center justify-center px-1">
        <span className="h-full text-sm">{order + 1}</span>
      </section>

      <section
        className={classNames("flex-1 overflow-auto rounded-lg p-2", {
          "bg-red-100": tokenCount > 900,
          "bg-white": tokenCount <= 900,
        })}
      >
        {tokenCount > 900 && (
          <span className="font-bold text-red-600">
            {t(
              "This segment is too long. Please split it into smaller sections."
            )}
          </span>
        )}
        <pre>{segment}</pre>
      </section>
    </div>
  );
};
export default SegmentCard;
