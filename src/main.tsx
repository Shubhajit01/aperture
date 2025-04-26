import "./styles/fonts.css";
import "./styles/globals.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "./lib/router";

const router = createRouter();
const rootRef = document.getElementById("root");
if (rootRef) {
  createRoot(rootRef).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
