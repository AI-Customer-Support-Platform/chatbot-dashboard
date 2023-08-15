import { useNavigate } from "react-router-dom";
import { ArrorBackIcon } from "../icons";

const BackToHomeButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="flex h-8 w-16 items-center rounded-lg border-2 border-black/20 bg-white hover:scale-105 hover:border-black/40 hover:shadow active:scale-100"
      title="Back to home"
    >
      <ArrorBackIcon height="24px" fill="#888" />
    </button>
  );
};

export default BackToHomeButton;
