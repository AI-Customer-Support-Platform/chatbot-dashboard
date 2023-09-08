import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Main from "@/layout/Main/Main";
import { NotFound } from "@/pages";
import Correction from "@/pages/Config/Correction/Correction";
import Documents from "@/pages/Config/Documents/Documents";
import UploadSegments from "@/pages/Config/Documents/UploadSegments";

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
            path: "",
            element: <Documents />,
          },
          {
            path: "correction",
            element: <Correction />,
          },
        ],
      },
      {
        path: "/:documentId/segments",
        element: <UploadSegments />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
