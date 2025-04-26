import { dimSchema } from "../common/dim";
import { metaSchema } from "../common/meta";

export const geometricShapeSchema = metaSchema.and({
  type: "'geometric-shape'",
  shapeType: "'rectangle' | 'square' | 'circle' | 'triangle'",
  style: dimSchema.and({
    fill: "string",
  }),
});

export type GeometricShapeSchema = typeof geometricShapeSchema.infer;
export type GeometricShapeType = GeometricShapeSchema["shapeType"];
