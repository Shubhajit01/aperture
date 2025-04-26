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
  centeredScaling?: boolean;
  enableSideAnchors?: boolean;
  keepRatio?: boolean;
  rotateEnabled?: boolean;
};

export default function useSlideElement<TProps, TRef extends Shape>({
  elementId,
  isReadOnly,
  centeredScaling = false,
  enableSideAnchors = true,
  keepRatio = false,
  showTransformer = true,
  rotateEnabled = true,
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
        <TransformerElement
          node={nodeRef}
          rotateEnabled={rotateEnabled}
          enableSideAnchors={enableSideAnchors}
          keepRatio={keepRatio}
          isReadOnly={isReadOnly}
          centeredScaling={centeredScaling}
        />
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
