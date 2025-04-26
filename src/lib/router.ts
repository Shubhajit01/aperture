import Wrapper from "@/features/shared/components/Wrapper";
import { createRouter as createTsRouter } from "@tanstack/react-router";
import { siteConfig } from "../config/stite";
import { routeTree } from "../routeTree.gen";

export function createRouter() {
  return createTsRouter({
    routeTree,
    Wrap: Wrapper,
    context: { name: siteConfig.name },
  });
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
