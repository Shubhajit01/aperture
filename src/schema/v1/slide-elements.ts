import { geometricShapeSchema } from "./elements/geometric-shape";
import { textboxSchema } from "./elements/textbox";

export const slideElementsSchema = textboxSchema.or(geometricShapeSchema);

export type SlideElementsSchema = typeof slideElementsSchema.infer;
