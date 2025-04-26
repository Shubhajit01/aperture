import { dimSchema } from "../common/dim";
import { metaSchema } from "../common/meta";

export const geometricShapeSchema = metaSchema.and({
  type: "'geometric-shape'",
  shapeType: "'rectangle' | 'circle' | 'triangle' | 'line'",
  style: dimSchema.and({
    fill: "string",
    stroke: "string",
    strokeWidth: "number",
    "radius?": "number",
  }),
});

export type GeometricShapeSchema = typeof geometricShapeSchema.infer;
export type GeometricShapeType = GeometricShapeSchema["shapeType"];
