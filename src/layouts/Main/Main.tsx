interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <main className="-mt-20 min-h-screen pt-20">{children}</main>;
};
export default Main;
