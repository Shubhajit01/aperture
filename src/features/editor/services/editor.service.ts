import { batch } from "@legendapp/state";
import { editor$ } from "../store/editor";
import { presentation$ } from "../store/presentation";
import { getElementObservableById } from "./elements.service";
import * as R from "remeda";

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

export function copyElement(elementId: string) {
  editor$.clipboard.set({
    type: "element",
    id: elementId,
  });
}

export function copySlide(slideId: string) {
  editor$.clipboard.set({
    type: "slide",
    id: slideId,
  });
}

export function paste() {
  const clipboard = editor$.clipboard.peek();
  if (!clipboard) return;

  if (clipboard.type === "slide") {
    duplicateSlide(clipboard.id, true);
  } else if (clipboard.type === "element") {
    const activeSlideId = editor$.activeSlide.peek();
    if (activeSlideId) {
      duplicateElement(clipboard.id, activeSlideId);
    }
  }

  return clipboard.type;
}

export function duplicateSlide(slideId: string, insertAtEnd = false) {
  const slide = R.clone(presentation$.data.slides[slideId].peek());
  slide.id = crypto.randomUUID();

  const slideIds = presentation$.data.slideIds.peek();
  const newSlideIds = [] as string[];
  for (const id of slideIds) {
    newSlideIds.push(id);
    if (id === slideId && !insertAtEnd) {
      newSlideIds.push(slide.id);
    }
  }
  if (insertAtEnd) {
    newSlideIds.push(slide.id);
  }

  const slideElements = slide.elementIds
    .map((id) => presentation$.data.slideElements[id].peek())
    .map((element) => R.clone({ ...element, id: crypto.randomUUID() }));

  const slideElementIds = slideElements.map((element) => element.id);
  slide.elementIds = slideElementIds;

  batch(() => {
    presentation$.data.slideIds.set(newSlideIds);
    presentation$.data.slides[slide.id].set(slide);
    for (const element of slideElements) {
      presentation$.data.slideElements[element.id].set(element);
    }
    activateSlide(slide.id);
  });
}

export function duplicateElement(elementId: string, slideId: string) {
  const element = getElementObservableById(elementId).peek();
  const duplicatedElement = R.clone(element);
  duplicatedElement.id = crypto.randomUUID();
  duplicatedElement.slideId = slideId;
  duplicatedElement.style.x += 10;
  duplicatedElement.style.y += 10;

  batch(() => {
    presentation$.data.slides[slideId].elementIds.push(duplicatedElement.id);
    presentation$.data.slideElements[duplicatedElement.id].set(
      duplicatedElement,
    );
    activateElement(duplicatedElement.id);
  });
}
