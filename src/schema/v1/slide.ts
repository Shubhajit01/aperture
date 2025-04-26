import { type } from "arktype";

export const slideSchema = type({
  id: "string.uuid.v4",
  "name?": "string | null",
  elementIds: "string[]",
  style: {
    backgroundColor: "string.hex",
  },
});

export type SlideSchema = typeof slideSchema.infer;
