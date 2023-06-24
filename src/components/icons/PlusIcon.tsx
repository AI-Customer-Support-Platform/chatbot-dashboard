interface PlusIconProps {
  className?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 22 22"
    >
      <path fill="currentColor" d="M12 17h-2v-5H5v-2h5V5h2v5h5v2h-5Z" />
    </svg>
  );
};
export default PlusIcon;
