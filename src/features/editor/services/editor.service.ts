import { batch } from "@legendapp/state";
import { editor$ } from "../store/editor";

export function activateSlide(slideId: string) {
  batch(() => {
    editor$.activeSlide.set(slideId);
    editor$.activeElementId.set(null);
  });
}

export function activateElement(elementId: string | null) {
  editor$.activeElementId.set(elementId);
}

export function getOptionalActiveElementId() {
  return editor$.activeElementId.peek();
}

export function getActiveElementId() {
  return getOptionalActiveElementId() || "";
}

export function zoomIn() {
  editor$.visibleZoomLevel.set((pre) => pre + 0.05);
}

export function zoomOut() {
  editor$.visibleZoomLevel.set((pre) => pre - 0.05);
}

export function resetZoom() {
  editor$.visibleZoomLevel.set(editor$.fitZoomLevel.peek());
}
