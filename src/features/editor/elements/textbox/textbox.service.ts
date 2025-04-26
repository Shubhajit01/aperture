import { presentation$ } from "@/features/editor/store/presentation";
import Konva from "konva";

export function resizeTextToFit(elementId: string) {
  const element$ = presentation$.data.slideElements[elementId];
  const element = element$.peek();
  const txt = new Konva.Text({
    ...element.style,
    fontVariant: element.style.bold ? "bold" : undefined,
    fontStyle: element.style.italic ? "italic" : undefined,
    textDecoration: element.style.underline ? "underline" : undefined,
  });

  const size = txt.measureSize(element.content);
  element$.style.assign({
    width: size.width,
    height: size.height,
  });
}

export function toggleBold(elementId: string) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.bold.set((pre) => !pre);
  resizeTextToFit(elementId);
}

export function toggleItalic(elementId: string) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.italic.set((pre) => !pre);
  resizeTextToFit(elementId);
}

export function toggleUnderline(elementId: string) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.underline.set((pre) => !pre);
  resizeTextToFit(elementId);
}

export function updateFontFamily(elementId: string, fontFamily: string) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.fontFamily.set(fontFamily);
  resizeTextToFit(elementId);
}

export function updateFontSize(elementId: string, fontSize: number) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.fontSize.set(fontSize);
  resizeTextToFit(elementId);
}

export function incrementFontSize(elementId: string) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.fontSize.set((pre) => pre + 1);
  resizeTextToFit(elementId);
}

export function decrementFontSize(elementId: string) {
  const element$ = presentation$.data.slideElements[elementId];
  element$.style.fontSize.set((pre) => Math.max(0, pre - 1));
  resizeTextToFit(elementId);
}
