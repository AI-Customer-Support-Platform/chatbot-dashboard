import { useState } from "react";

import { DeleteIcon } from "@/components/icons";

import DeleteSegmentModal from "./DeleteSegmentModal";

interface DeleteSegmentButtonProps {
  refresh: () => void;
  segmentId: string;
}

const DeleteSegmentButton: React.FC<DeleteSegmentButtonProps> = ({
  refresh,
  segmentId,
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
        <DeleteSegmentModal
          setShowModal={setShowModal}
          refresh={refresh}
          segmentId={segmentId}
        />
      )}
    </div>
  );
};

export default DeleteSegmentButton;
