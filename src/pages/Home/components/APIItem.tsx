import ProgressBar from "@/components/ProgressBar";
import classNames from "classnames";

interface APIItemProps {
  name: string;
  active: boolean;
  totalTokens?: number;
  remainingTokens?: number;
}

const APIItem: React.FC<APIItemProps> = ({
  name,
  active,
  totalTokens,
  remainingTokens,
}) => {
  return (
    <div className="mb-2 flex max-w-3xl flex-col justify-between overflow-auto rounded-lg bg-white/50 p-2 transition duration-300 hover:bg-white/70 hover:shadow">
      <section className="mb-2 flex justify-between gap-4">
        <span className="text-xl font-bold">{name}</span>

        <UnOrSubscribeButton active={active} />
      </section>
      <section
        className={classNames("", {
          "text-center": !active,
        })}
      >
        {active ? (
          <div>
            <section>
              <span className="mb-1 block text-sm text-slate-500">
                Total tokens:{" "}
                <span className="font-bold text-black/60">{totalTokens}</span>
              </span>

              <span className="mb-1 block text-sm text-slate-500">
                Remaining tokens:{" "}
                <span className="font-bold text-blue-600">
                  {remainingTokens}
                </span>
              </span>

              {totalTokens && remainingTokens && (
                <ProgressBar
                  progressPercentage={(remainingTokens / totalTokens) * 100}
                />
              )}
            </section>
          </div>
        ) : (
          <span className="font-extralight italic text-stone-400">
            Subscribe to activate this API
          </span>
        )}
      </section>
    </div>
  );
};

const UnOrSubscribeButton: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <>
      {active ? (
        <button className="rounded-lg border bg-white px-1 text-sm text-slate-500 transition duration-200 hover:scale-105 hover:border-2 hover:border-red-400 hover:font-bold hover:text-red-500 active:scale-110 ">
          Unsubscribe
        </button>
      ) : (
        <button className="rounded-lg border bg-white px-1 text-sm text-slate-500 transition duration-200 hover:scale-105 hover:border-2 hover:border-blue-400 hover:font-bold hover:text-blue-500 active:scale-110 ">
          Subscribe
        </button>
      )}
    </>
  );
};
export default APIItem;
