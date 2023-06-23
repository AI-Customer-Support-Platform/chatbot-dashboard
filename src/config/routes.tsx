import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Home, NotFound } from "@/pages";
import Login from "@/pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
