import { activateElement } from "@/features/editor/services/editor.service";
import { editor$ } from "@/features/editor/store/editor";
import { presentation$ } from "@/features/editor/store/presentation";
import { type Observable, batch } from "@legendapp/state";
import { Show, use$, useObservable } from "@legendapp/state/react";
import type Konva from "konva";
import { useCallback, useRef, useState } from "react";
import { Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";
import { onDrag, onTransform } from "../services/elements.service";

interface SlideElementProps {
  isReadOnly?: boolean;
  item$: Observable<string>;
}

export default function SlideElement({
  item$: elementId$,
  isReadOnly = false,
}: SlideElementProps) {
  const textRef = useRef<Konva.Text | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const element$ = useObservable(
    () => presentation$.data.slideElements[elementId$.get()],
  );

  const element = use$(element$);

  const isSelected$ = useObservable(
    () => editor$.activeElementId.get() === elementId$.get(),
  );

  const setTrRef = useCallback((trRef: Konva.Transformer) => {
    if (trRef?.nodes && textRef.current) {
      trRef.nodes([textRef.current]);
    }
  }, []);

  return (
    <>
      <Text
        draggable
        visible={!isEditing}
        ref={textRef}
        {...element.style}
        fill={element.style.color}
        align={element.style.textAlign}
        text={element.content}
        offsetX={element.style.width / 2}
        offsetY={element.style.height / 2}
        fontVariant={element.style.bold ? "bold" : undefined}
        fontStyle={element.style.italic ? "italic" : undefined}
        textDecoration={element.style.underline ? "underline" : undefined}
        onDblClick={() => setIsEditing(true)}
        onMouseDown={() => {
          activateElement(elementId$.peek());
        }}
        onDragEnd={() => {
          const node = textRef.current;
          if (!node) return;
          const elementId = elementId$.peek();
          onDrag(elementId, node);
        }}
        onTransformEnd={() => {
          const node = textRef.current;
          if (!node) return;
          const elementId = elementId$.peek();
          onTransform(elementId, node);
        }}
      />

      <Show if={() => isSelected$.get()}>
        <Transformer
          centeredScaling
          ref={setTrRef}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          visible={!isReadOnly && !isEditing}
          anchorCornerRadius={100}
          borderStrokeWidth={2}
          borderStroke="#006fee"
          anchorStroke="#006fee"
          anchorStrokeWidth={2}
        />
      </Show>

      {isEditing ? (
        <Html>
          <input
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
            value={element.content}
            // className="absolute inset-0 origin-center"
            onBlur={() => setIsEditing(false)}
            onKeyUp={(e) => {
              console.log(e.key);
              if (e.key === "Escape") {
                setIsEditing(false);
              }
            }}
            onChange={(e) => {
              if (!textRef.current) return;
              const updatedText = e.currentTarget.value;
              const size = textRef.current?.measureSize(updatedText);
              batch(() => {
                element$.style.width.set(size.width);
                element$.style.height.set(size.height);
                element$.content.set(updatedText);
              });
            }}
            style={{
              ...element.style,
              transform: `translate3d(${element.style.x - element.style.width / 2}px, ${element.style.y - element.style.height / 2}px, 0)`,
            }}
          />
        </Html>
      ) : null}
    </>
  );
}
