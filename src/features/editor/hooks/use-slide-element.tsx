import TransformerElement from "@/features/editor/elements/common/transformer-element";
import { useSelector } from "@legendapp/state/react";
import type { Shape } from "konva/lib/Shape";
import { useState } from "react";
import { activateElement } from "../services/editor.service";
import { onDrag, onTransform } from "../services/elements.service";
import { editor$ } from "../store/editor";

type UseSlideElementOptions<T> = T & {
  elementId: string;
  showTransformer?: boolean;
  isReadOnly?: boolean;
};

export default function useSlideElement<TProps, TRef extends Shape>({
  elementId,
  isReadOnly,
  showTransformer = true,
  ...elementProps
}: UseSlideElementOptions<TProps>) {
  const [nodeRef, setNodeRef] = useState<TRef | null>(null);
  const isSelected = useSelector(
    () => editor$.activeElementId.get() === elementId,
  );

  return {
    nodeRef,
    setNodeRef,
    transformer:
      showTransformer && isSelected ? (
        <TransformerElement isReadOnly={isReadOnly} node={nodeRef} />
      ) : null,
    props: {
      ...elementProps,
      draggable: true,
      onMouseDown: () => {
        activateElement(elementId);
      },
      onDragEnd: () => {
        if (nodeRef) {
          onDrag(elementId, nodeRef);
        }
      },
      onTransformEnd: () => {
        if (nodeRef) {
          onTransform(elementId, nodeRef);
        }
      },
    },
  };
}
