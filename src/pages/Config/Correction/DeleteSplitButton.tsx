import { useState } from "react";

import { DeleteIcon } from "@/components/icons";

import DeleteSplitModal from "./DeleteSplitModal";

interface DeleteSplitButtonProps {
  refresh: () => void;
  splitId: string;
}

const DeleteSplitButton: React.FC<DeleteSplitButtonProps> = ({
  refresh,
  splitId,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <button
        className="text-red-300 hover:text-red-600"
        onClick={() => setShowModal(true)}
      >
        <DeleteIcon />
      </button>

      {showModal && (
        <DeleteSplitModal
          setShowModal={setShowModal}
          refresh={refresh}
          splitId={splitId}
        />
      )}
    </div>
  );
};

export default DeleteSplitButton;
