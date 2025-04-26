import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import paths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { FontaineTransform } from "fontaine";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react({
      babel: {
        plugins: ["@legendapp/state/babel"],
      },
    }),
    paths(),
    tailwindcss(),
    FontaineTransform.vite({
      fallbacks: ["Arial"],
      resolvePath: (id) => {
        const url = new URL(`.${id}`, import.meta.url);
        return url;
      },
    }),
  ],
});
