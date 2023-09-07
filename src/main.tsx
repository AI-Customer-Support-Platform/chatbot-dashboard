import "./assets/index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Correction from "./pages/Config/Correction/Correction";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster />
    <Correction />
  </React.StrictMode>
);
