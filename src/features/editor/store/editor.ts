import { observable, observe, whenReady } from "@legendapp/state";
import { presentation$ } from "./presentation";

export const editor$ = observable({
  activeSlide: null as string | null,
  activeElementId: null as string | null,
  activeTool: null as string | null,
  isAutoSaveEnabled: false,
  fitZoomLevel: 1,
  visibleZoomLevel: 1,
  clipboard: null as {
    type: "slide" | "element";
    id: string;
  } | null,
  activeElement: () => {
    const activeElementId = editor$.activeElementId.get();
    return activeElementId
      ? presentation$.data.slideElements[activeElementId].get()
      : null;
  },
  activeElementType: () => {
    return editor$.activeElement.get()?.type || null;
  },
});

whenReady(presentation$.data.slideIds, (slideIds) => {
  editor$.activeSlide.set(slideIds[0]);
});

observe(() => {
  console.log(editor$.get());
});
