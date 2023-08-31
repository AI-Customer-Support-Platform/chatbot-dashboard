import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { Chat, Config, Home, Login, NotFound } from "@/pages";
import Collections from "@/pages/Home/components/Collections/Collections";
import APIs from "@/pages/Home/components/APIs/APIs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/",
            element: <Collections />,
          },
          {
            path: "/usage",
            element: <APIs />,
          },
        ],
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
