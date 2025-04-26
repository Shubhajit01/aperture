import { type } from "arktype";
import { slideSchema } from "./slide";
import { slideElementsSchema } from "./slide-elements";

export const schemaV1 = type({
  version: "1",
  id: "string.uuid.v4",
  name: "string >= 5",
  createdAt: "string.date.iso",
  updatedAt: "string.date.iso",
  properties: {
    width: "number",
    height: "number",
  },
  data: {
    slideIds: "string.uuid[]",
    slides: {
      "[string]": slideSchema,
    },
    slideElements: {
      "[string]": slideElementsSchema,
    },
  },
});

export const editorJsonSchemaV1 = schemaV1.toJsonSchema();

export type SchemaV1 = typeof schemaV1.infer;
