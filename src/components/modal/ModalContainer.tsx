import classNames from "classnames";
import ModalHeader from "./ModalHeader";

interface ModalContainerProps {
  children: React.ReactNode;
  title?: string;
  setIsShow?: (show: boolean) => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  title,
  setIsShow,
}) => {
  return (
    <div className="flex max-h-[98%] max-w-[98%] flex-col">
      {(title || setIsShow) && (
        <section className="flex-none rounded-t-lg bg-white p-4">
          <ModalHeader title={title} setIsShow={setIsShow} />
        </section>
      )}
      <section
        className={classNames(
          "flex-1 overflow-auto rounded-b-lg bg-white p-4",
          {
            "rounded-t-lg": !title && !setIsShow,
          }
        )}
      >
        {children}
      </section>
    </div>
  );
};
export default ModalContainer;
