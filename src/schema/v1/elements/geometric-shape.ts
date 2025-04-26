import { dimSchema } from "../common/dim";
import { metaSchema } from "../common/meta";

export const geometricShapeSchema = metaSchema.and({
  type: "'geometric-shape'",
  shapeType: "'rectangle' | 'square' | 'circle' | 'triangle'",
  style: dimSchema.and({}),
});

export type GeometricShapeSchema = typeof geometricShapeSchema.infer;
