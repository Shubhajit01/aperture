import { textboxSchema } from "./elements/textbox";

export const slideElementsSchema = textboxSchema;

export type SlideElementsSchema = typeof slideElementsSchema.infer;
