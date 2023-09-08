import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <main className="mx-auto flex max-w-6xl flex-col p-4 sm:p-8">
      <Outlet />
    </main>
  );
};
export default Main;
