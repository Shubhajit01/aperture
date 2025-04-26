import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import {
  CircleIcon,
  Rectangular01Icon,
  SquareIcon,
  Triangle01Icon,
} from "hugeicons-react";

export const geometricShapes: {
  id: GeometricShapeSchema["shapeType"];
  label: string;
  icon: HugeIcon;
}[] = [
  { id: "square", label: "Square", icon: SquareIcon },
  { id: "rectangle", label: "Rectangle", icon: Rectangular01Icon },
  { id: "circle", label: "Circle", icon: CircleIcon },
  { id: "triangle", label: "Triangle", icon: Triangle01Icon },
];
