import { batch } from "@legendapp/state";
import { presentation$ } from "../store/presentation";
import { activateElement, activateSlide } from "./editor.service";
import {
  createBlankSlide,
  createBlankTextBox,
} from "./presentation-blanks.service";
import { getPresentationCenter } from "./utils";

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

export function removeElement(elementId: string) {
  const element = presentation$.data.slideElements[elementId].peek();
  batch(() => {
    presentation$.data.slides[element.slideId].elementIds.set((pre) =>
      pre.filter((item) => item !== elementId),
    );
    presentation$.data.slideElements[elementId].delete();
  });
}
