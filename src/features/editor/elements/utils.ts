import type { Observable } from "@legendapp/state";
import type { Shape } from "konva/lib/Shape";
import { onDrag, onTransform } from "../services/elements.service";

export function getCommonSlideElementProps({
  elementId$,
  node,
}: { elementId$: Observable<string>; node: Shape | null }) {
  if (!node) {
    return {};
  }

  return {
    draggable: true,
    onDragEnd: () => {
      const elementId = elementId$.peek();
      onDrag(elementId, node);
    },
    onTransformEnd: () => {
      const elementId = elementId$.peek();
      onTransform(elementId, node);
    },
  };
}
