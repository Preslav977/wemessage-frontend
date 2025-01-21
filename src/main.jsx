import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css'
import App from "./App.jsx";
import Router from "./router/router.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import routes from "./router/routes";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

export default Router;
