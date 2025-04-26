import Konva from "konva";
import { getElementObservableById } from "../../services/elements.service";

export function resizeTextToFit(elementId: string) {
  const element$ = getElementObservableById(elementId);
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
  const element$ = getElementObservableById(elementId);
  element$.style.bold.set((pre) => !pre);
  resizeTextToFit(elementId);
}

export function toggleItalic(elementId: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.italic.set((pre) => !pre);
  resizeTextToFit(elementId);
}

export function toggleUnderline(elementId: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.underline.set((pre) => !pre);
  resizeTextToFit(elementId);
}

export function updateFontFamily(elementId: string, fontFamily: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.fontFamily.set(fontFamily);
  resizeTextToFit(elementId);
}

export function updateFontSize(elementId: string, fontSize: number) {
  const element$ = getElementObservableById(elementId);
  element$.style.fontSize.set(fontSize);
  resizeTextToFit(elementId);
}

export function incrementFontSize(elementId: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.fontSize.set((pre) => pre + 1);
  resizeTextToFit(elementId);
}

export function decrementFontSize(elementId: string) {
  const element$ = getElementObservableById(elementId);
  element$.style.fontSize.set((pre) => Math.max(0, pre - 1));
  resizeTextToFit(elementId);
}

export function updateTextContent({
  elementId,
  content,
}: { elementId: string; content: string }) {
  const element$ = getElementObservableById(elementId);
  element$.content.set(content);
  resizeTextToFit(elementId);
}
