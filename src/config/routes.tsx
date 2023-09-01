import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import { Login, NotFound } from "@/pages";

import APIs from "@/pages/Home/APIs/APIs";

import Main from "@/layout/Main/Main";
import Collections from "@/pages/Home/Collections/Collections";
import Documents from "@/pages/Config/Documents/Documents";
import Settings from "@/pages/Config/Settings/Settings";
import CollectionAPI from "@/pages/Config/CollectionAPI/CollectionAPI";
import WebAPI from "@/pages/Config/CollectionAPI/components/WebAPI";
import LineAPI from "@/pages/Config/CollectionAPI/components/LineAPI";
import InstagramAPI from "@/pages/Config/CollectionAPI/components/InstagramAPI";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
        children: [
          {
            path: "/",
            element: <Collections />,
          },
          {
            path: "usage",
            element: <APIs />,
          },
        ],
      },
      {
        path: "config/:collectionId",
        element: <Main />,
        children: [
          {
            path: "",
            element: <Documents />,
          },
          {
            path: "api",
            element: <CollectionAPI />,
          },
          {
            path: "api/web",
            element: <WebAPI />,
          },
          {
            path: "api/line",
            element: <LineAPI />,
          },
          {
            path: "api/instagram",
            element: <InstagramAPI />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "login",
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
