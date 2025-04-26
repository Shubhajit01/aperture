import { commonFonts } from "@/config/fonts";
import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import type { SchemaV1 } from "@/schema/v1/schema.v1";
import type { SlideSchema } from "@/schema/v1/slide";
import Konva from "konva";

export function createBlankPresentation(): SchemaV1 {
  const slide = createBlankSlide();

  return {
    version: 1,
    id: "e49e5584-509e-4865-841d-a709e5de625d",
    name: "Untitled Presentation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    properties: {
      width: 854,
      height: 480,
    },
    data: {
      slideIds: [slide.id],
      slides: { [slide.id]: slide },
      slideElements: {},
    },
  };
}

export function createBlankSlide(): SlideSchema {
  return {
    id: crypto.randomUUID(),
    elementIds: [],
    style: {
      backgroundColor: "#ffffff",
    },
  };
}

export function createBlankTextBox(slideId: string): TextboxSchema {
  const fontConfig = {
    fontSize: 24,
    fontWeight: 500,
    fontFamily: commonFonts[0].fontFamily,
  };
  const content = "Click here to edit";

  const text = new Konva.Text(fontConfig);
  const { width, height } = text.measureSize(content);

  return {
    slideId,
    type: "text",
    id: crypto.randomUUID(),
    content,
    style: {
      x: 0,
      y: 0,
      rotation: 0,
      width,
      height,
      color: "#000000",
      backgroundColor: "transparent",
      ...fontConfig,
      textAlign: "left",
    },
  };
}
