import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import { Chat, Config, Home, Login, NotFound } from "@/pages";

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
        path: "/config/:collectionId",
        element: <Config />,
      },
      {
        path: "/chat/:collectionId",
        element: <Chat />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
