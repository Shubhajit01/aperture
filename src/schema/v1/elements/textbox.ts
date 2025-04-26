import { dimSchema } from "../common/dim";
import { metaSchema } from "../common/meta";

export const textboxSchema = metaSchema.and({
  type: "'text'",
  content: "string",
  style: dimSchema.and({
    color: "string",
    backgroundColor: "string",
    fontSize: "number",
    "bold?": "boolean",
    "italic?": "boolean",
    "underline?": "boolean",
    fontFamily: "string",
    textAlign: "'center' | 'left' | 'right'",
  }),
});

export type TextboxSchema = typeof textboxSchema.infer;
