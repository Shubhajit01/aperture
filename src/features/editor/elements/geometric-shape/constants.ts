import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import {
  CircleIcon,
  SolidLine01Icon,
  SquareIcon,
  TriangleIcon,
} from "hugeicons-react";

export const geometricShapes: {
  id: GeometricShapeSchema["shapeType"];
  label: string;
  icon: HugeIcon;
}[] = [
  { id: "line", label: "Line", icon: SolidLine01Icon },
  { id: "rectangle", label: "Rectangle", icon: SquareIcon },
  { id: "circle", label: "Circle", icon: CircleIcon },
  { id: "triangle", label: "Triangle", icon: TriangleIcon },
];
