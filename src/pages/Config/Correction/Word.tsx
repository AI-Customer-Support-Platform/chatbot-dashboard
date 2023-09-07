import classNames from "classnames";
import { TDocumentSplit } from "@/types";

interface WordProps {
  matchedWord: TDocumentSplit;
}

const Word: React.FC<WordProps> = ({ matchedWord }) => {
  return (
    <div className="rounded-lg border bg-white p-2 transition hover:shadow-md">
      <span className="mb-2 block">Score:{matchedWord.score.toFixed(4)}</span>

      <section className="mb-2">
        <div
          className={classNames(
            "w-full rounded border bg-gray p-2 outline-2 focus-within:bg-white focus-within:outline focus-within:outline-blue-500"
          )}
        >
          {matchedWord.text}
        </div>
      </section>
    </div>
  );
};
export default Word;
