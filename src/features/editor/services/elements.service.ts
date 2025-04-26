import { presentation$ } from "@/features/editor/store/presentation";
import type { SlideElementsSchema } from "@/schema/v1/slide-elements";
import { batch } from "@legendapp/state";
import type Konva from "konva";
import { resizeTextToFit } from "../elements/textbox/textbox.service";
import { getPresentationCenter, toPositiveRotation } from "./utils";

export function getElementObservableById(elementId: string) {
  return presentation$.data.slideElements[elementId];
}

export function patchElement(
  elementId: string,
  props: Partial<SlideElementsSchema>,
) {
  const element$ = getElementObservableById(elementId);
  element$.assign(props);
}

export function onTransform(elementId: string, node: Konva.Node) {
  const x = node.x();
  const y = node.y();
  const width = node.width();
  const height = node.height();
  const scaleX = node.scaleX();
  const scaleY = node.scaleY();
  const rotation = toPositiveRotation(node.rotation());

  const element$ = getElementObservableById(elementId);

  batch(() => {
    element$.style.assign({
      x,
      y,
      rotation,
      width: scaleX * width,
      height: scaleY * height,
    });

    if ("fontSize" in element$.style) {
      const fontSize$ = element$.style.fontSize;
      const currentFontSize = fontSize$.peek();
      fontSize$.set(currentFontSize * scaleX);
    }
  });

  node.scaleX(1);
  node.scaleY(1);
  resizeTextToFit(element$.id.peek());
}

export function onDrag(elementId: string, node: Konva.Node) {
  const x = node.x();
  const y = node.y();
  const element$ = getElementObservableById(elementId);
  element$.style.assign({
    x,
    y,
  });
}

export function snapElementToSlideLeft(elementId: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.x.set(element$.style.width.peek() / 2);
}

export function snapElementToSlideRight(elementId: string) {
  const element$ = getElementObservableById(elementId);
  const slideWidth = presentation$.properties.width.peek();
  const elementWidth = element$.style.width.peek();
  element$.style.x.set(slideWidth - elementWidth / 2);
}

export function snapElementToSlideMiddle(elementId: string) {
  const element$ = getElementObservableById(elementId);
  const center = getPresentationCenter();
  element$.style.x.set(center.x);
}

export function snapElementToSlideTop(elementId: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.y.set(element$.style.height.peek() / 2);
}

export function snapElementToSlideBottom(elementId: string) {
  const element$ = getElementObservableById(elementId);
  const slideHeight = presentation$.properties.height.peek();
  const elementHeight = element$.style.height.peek();
  element$.style.y.set(slideHeight - elementHeight / 2);
}

export function snapElementToSlideCenter(elementId: string) {
  const element$ = getElementObservableById(elementId);
  const center = getPresentationCenter();
  element$.style.y.set(center.y);
}

export function rotateByCenter(elementId: string, rotation: number) {
  const element$ = getElementObservableById(elementId);
  element$.style.rotation.set(rotation);
}

export function snapToCenter(elementId: string) {
  batch(() => {
    snapElementToSlideCenter(elementId);
    snapElementToSlideMiddle(elementId);
  });
}
