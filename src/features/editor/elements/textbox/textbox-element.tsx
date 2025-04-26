import { presentation$ } from "@/features/editor/store/presentation";
import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import { use$ } from "@legendapp/state/react";
import type Konva from "konva";
import { type ComponentProps, useState } from "react";
import { Text } from "react-konva";
import useSlideElement from "../../hooks/use-slide-element";
import type { ElementProps } from "../type/element-props";
import TextboxEditor from "./textbox-editor";

export default function TextboxElement({
  item$: elementId$,
  isReadOnly = false,
}: ElementProps) {
  const [isEditing, setIsEditing] = useState(false);

  const elementId = use$(elementId$);
  const element = use$(
    presentation$.data.slideElements[elementId],
  ) as TextboxSchema;

  const { setNodeRef, transformer, props } = useSlideElement<
    ComponentProps<typeof Text>,
    Konva.Text
  >({
    elementId,
    isReadOnly,
    ...element.style,
    visible: !isEditing,
    text: element.content,
    centeredScaling: true,
    enableSideAnchors: false,
    keepRatio: true,
    fill: element.style.color,
    showTransformer: !isEditing,
    align: element.style.textAlign,
    offsetX: element.style.width / 2,
    offsetY: element.style.height / 2,
    fontVariant: element.style.bold ? "bold" : undefined,
    fontStyle: element.style.italic ? "italic" : undefined,
    textDecoration: element.style.underline ? "underline" : undefined,
  });

  return (
    <>
      {transformer}

      <Text {...props} ref={setNodeRef} onDblClick={() => setIsEditing(true)} />

      <TextboxEditor
        show={isEditing}
        style={element.style}
        elementId={element.id}
        content={element.content}
        onDone={() => setIsEditing(false)}
      />
    </>
  );
}
