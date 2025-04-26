import { presentation$ } from "@/features/editor/store/presentation";
import type { Observable } from "@legendapp/state";
import { use$ } from "@legendapp/state/react";
import type Konva from "konva";
import { type ComponentProps, useState } from "react";
import { Text } from "react-konva";
import useSlideElement from "../../hooks/use-slide-element";
import TextboxEditor from "./textbox-editor";

interface TextboxElementProps {
  isReadOnly?: boolean;
  item$: Observable<string>;
}

export default function TextboxElement({
  item$: elementId$,
  isReadOnly = false,
}: TextboxElementProps) {
  const [isEditing, setIsEditing] = useState(false);

  const elementId = use$(elementId$);
  const element = use$(presentation$.data.slideElements[elementId]);

  const { setNodeRef, transformer, props } = useSlideElement<
    ComponentProps<typeof Text>,
    Konva.Text
  >({
    elementId,
    isReadOnly,
    ...element.style,
    showTransformer: !isEditing,
    visible: !isEditing,
    fill: element.style.color,
    align: element.style.textAlign,
    text: element.content,
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
