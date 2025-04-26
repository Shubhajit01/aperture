import { type } from "arktype";

export const metaSchema = type({
  id: "string.uuid.v4",
  "name?": "string | null",
  slideId: "string",
});

export type MetaSchema = typeof metaSchema.infer;
