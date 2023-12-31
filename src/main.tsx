import "./assets/index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "github-markdown-css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Auth0Provider } from "@auth0/auth0-react";

import router from "./config/routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "offline_access openid profile email",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
  </React.StrictMode>
);
