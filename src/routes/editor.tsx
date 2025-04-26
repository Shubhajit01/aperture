import EditorNavbar from "@/features/editor/components/editor-navbar";
import EditorSlidePreviewSidebar from "@/features/editor/components/editor-slide-preview-sidebar";

import EditorToolbar from "@/features/editor/components/editor-toolbar";
import Slide from "@/features/editor/components/slide";
import SlideViewPort from "@/features/editor/components/slide-view-port";
import { editor$ } from "@/features/editor/store/editor";
import type { Observable } from "@legendapp/state";
import { Show } from "@legendapp/state/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex flex-col w-screen h-dvh overflow-hidden divide-y divide-default-200/60">
      <div className="grow-0">
        <EditorNavbar />
        <EditorToolbar />
      </div>

      <div className="grow items-stretch flex divide-x divide-default-200/60 overflow-hidden">
        <EditorSlidePreviewSidebar />
        <SlideViewPort>
          <Show if={editor$.activeSlide}>
            {(slideId) => (
              <Slide
                key={slideId}
                slideId$={editor$.activeSlide as Observable<string>}
              />
            )}
          </Show>
        </SlideViewPort>
      </div>
    </main>
  );
}
