import { Outlet, ScrollRestoration } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen">
      <Outlet />

      <ScrollRestoration />
    </div>
  );
};

export default App;
