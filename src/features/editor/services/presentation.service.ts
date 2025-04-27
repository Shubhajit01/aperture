import type { GeometricShapeType } from "@/schema/v1/elements/geometric-shape";
import { batch } from "@legendapp/state";
import { presentation$ } from "../store/presentation";
import { activateElement, activateSlide } from "./editor.service";
import {
  createBlankGeometricShape,
  createBlankSlide,
  createBlankTextBox,
} from "./presentation-blanks.service";
import { getPresentationCenter } from "./utils";
import { editor$ } from "../store/editor";

export function updatePresentationName(name: string) {
  presentation$.name.set(name);
}

export function addSlide() {
  const slide = createBlankSlide();
  batch(() => {
    presentation$.data.slideIds.push(slide.id);
    presentation$.data.slides[slide.id].set(slide);
    activateSlide(slide.id);
  });
}

export function addTextBox(slideId: string) {
  const textbox = createBlankTextBox(slideId);
  const center = getPresentationCenter();
  textbox.style.x = center.x;
  textbox.style.y = center.y;

  batch(() => {
    presentation$.data.slideElements[textbox.id].set(textbox);
    presentation$.data.slides[slideId].elementIds.push(textbox.id);
    activateElement(textbox.id);
  });
}

export function addGeometricShape(
  slideId: string,
  shapeType: GeometricShapeType,
) {
  const shape = createBlankGeometricShape(slideId, shapeType);
  const center = getPresentationCenter();
  shape.style.x = center.x;
  shape.style.y = center.y;

  batch(() => {
    presentation$.data.slideElements[shape.id].set(shape);
    presentation$.data.slides[slideId].elementIds.push(shape.id);
    activateElement(shape.id);
  });
}

export function removeElement(elementId: string) {
  const element = presentation$.data.slideElements[elementId].peek();
  batch(() => {
    presentation$.data.slides[element.slideId].elementIds.set((pre) =>
      pre.filter((item) => item !== elementId),
    );
    presentation$.data.slideElements[elementId].delete();
  });
}

export function removeSlide(slideId: string) {
  const slideElements = presentation$.data.slides[slideId].elementIds.peek();
  const activeElementId = editor$.activeElementId.peek();

  const slideIds = presentation$.data.slideIds.peek();

  const newSlideIds = [] as string[];
  let index = -1;

  for (let i = 0; i < slideIds.length; i++) {
    if (slideIds[i] === slideId) {
      index = i;
    } else {
      newSlideIds.push(slideIds[i]);
    }
  }

  const isAllSlidesDeleted = newSlideIds.length === 0;

  batch(() => {
    if (activeElementId) {
      const activeElement =
        presentation$.data.slideElements[activeElementId].peek();
      if (activeElement.slideId === slideId) {
        activateElement(null);
      }
    }

    presentation$.data.slideIds.set(newSlideIds);
    presentation$.data.slides[slideId].delete();
    for (const elementId of slideElements) {
      presentation$.data.slideElements[elementId].delete();
    }

    if (isAllSlidesDeleted) {
      addSlide();
    } else {
      activateSlide(index === 0 ? newSlideIds[0] : newSlideIds[index - 1]);
    }
  });
}
