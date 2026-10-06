import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
import "../public/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
      <RouterProvider router={router} />
  </StrictMode>,
);
