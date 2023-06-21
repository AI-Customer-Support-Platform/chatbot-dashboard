import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer, Header, Main } from "./layouts";

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />

      <Main>
        <Outlet />
      </Main>
      <Footer />

      <ScrollRestoration />
    </div>
  );
};

export default App;
