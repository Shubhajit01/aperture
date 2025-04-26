import { getElementObservableById } from "@/features/editor/services/elements.service";
import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";

export function incrementStrokeWidth(elementId: string) {
  const element$ = getElementObservableById<GeometricShapeSchema>(elementId);
  element$.style.strokeWidth.set((pre) => pre + 1);
}

export function decrementStrokeWidth(elementId: string) {
  const element$ = getElementObservableById<GeometricShapeSchema>(elementId);
  element$.style.strokeWidth.set((pre) => Math.max(0, pre - 1));
}
