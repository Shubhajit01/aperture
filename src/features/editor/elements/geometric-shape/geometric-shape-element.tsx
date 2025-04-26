import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import { use$ } from "@legendapp/state/react";
import type Konva from "konva";
import type { ComponentProps } from "react";
import { Rect } from "react-konva";
import useSlideElement from "../../hooks/use-slide-element";
import { presentation$ } from "../../store/presentation";
import type { ElementProps } from "../type/element-props";

export default function GeometricShapeElement({
  item$,
  isReadOnly,
}: ElementProps) {
  const elementId = use$(item$);
  const element = use$(
    presentation$.data.slideElements[elementId],
  ) as GeometricShapeSchema;

  const { props, setNodeRef, transformer } = useSlideElement<
    ComponentProps<typeof Rect>,
    Konva.Rect
  >({
    elementId,
    ...element.style,
    showTransformer: !isReadOnly,
    offsetX: element.style.width / 2,
    offsetY: element.style.height / 2,
  });

  return (
    <>
      <Rect ref={setNodeRef} {...props} />
      {transformer}
    </>
  );
}
