import { presentation$ } from "../store/presentation";

export function getPresentationCenter() {
  const { width, height } = presentation$.properties.peek();
  return { x: width / 2, y: height / 2 };
}

export function toPositiveRotation(negativeAngle: number) {
  return ((negativeAngle % 360) + 360) % 360;
}
