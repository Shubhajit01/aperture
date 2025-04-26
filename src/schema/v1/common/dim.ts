import { type } from "arktype";

export const dimSchema = type({
  width: "number",
  height: "number",
  x: "number",
  y: "number",
  rotation: "number",
});

export type DimSchema = typeof dimSchema.infer;
