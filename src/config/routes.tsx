import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Main from "@/layout/Main/Main";
import Correction from "@/pages/Config/Correction/Correction";

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
            element: <Correction />,
          },
          {
            path: "*",
            element: <Correction />,
          },
        ],
      },
    ],
  },
]);

export default router;
