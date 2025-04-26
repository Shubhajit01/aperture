import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import { use$ } from "@legendapp/state/react";
import { match } from "arktype";
import type Konva from "konva";
import type { ComponentProps } from "react";
import { Circle, Line, Rect } from "react-konva";
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
    ComponentProps<typeof Rect | typeof Circle | typeof Line>,
    Konva.Rect | Konva.Circle | Konva.Line
  >({
    elementId,
    ...element.style,
    showTransformer: !isReadOnly,
    keepRatio: element.shapeType === "circle",
    enableSideAnchors: element.shapeType !== "circle",
    offsetX:
      element.shapeType !== "circle" ? element.style.width / 2 : undefined,
    offsetY:
      element.shapeType !== "circle" ? element.style.height / 2 : undefined,
  });

  const renderShape = match
    .in<GeometricShapeSchema>()
    .at("shapeType")
    .match({
      "'rectangle'": () => <Rect ref={setNodeRef} {...props} />,
      "'circle'": () => <Circle {...props} ref={setNodeRef} />,
      "'triangle'": () => (
        <Line
          closed
          {...props}
          ref={setNodeRef}
          points={[
            element.style.width / 2,
            0,
            0,
            element.style.height,
            element.style.width,
            element.style.height,
          ]}
        />
      ),
      "'line'": () => (
        <Line
          {...props}
          ref={setNodeRef}
          stroke={element.style.stroke}
          strokeWidth={element.style.strokeWidth}
          points={[
            0,
            element.style.height / 2,
            element.style.width,
            element.style.height / 2,
          ]}
        />
      ),
    })
    .default(() => null);

  return (
    <>
      {renderShape(element)}
      {transformer}
    </>
  );
}
