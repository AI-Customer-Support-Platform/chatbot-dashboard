import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Main from "@/layout/Main/Main";
import { Login, NotFound } from "@/pages";
import CollectionAPI from "@/pages/Config/CollectionAPI/CollectionAPI";
import InstagramAPI from "@/pages/Config/CollectionAPI/components/InstagramAPI";
import LineAPI from "@/pages/Config/CollectionAPI/components/LineAPI";
import WebAPI from "@/pages/Config/CollectionAPI/components/WebAPI";
import Documents from "@/pages/Config/Documents/Documents";
import Settings from "@/pages/Config/Settings/Settings";
import APIs from "@/pages/Home/APIs/APIs";
import Collections from "@/pages/Home/Collections/Collections";

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
          // {
          //   path: "correction",
          //   element: <Correction />,
          // },
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
      // {
      //   path: "/config/:collectionId/:documentId/segments",
      //   element: <UploadSegments />,
      // },
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
