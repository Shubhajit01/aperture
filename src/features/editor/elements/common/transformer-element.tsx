import type Konva from "konva";
import { useCallback } from "react";
import { Transformer } from "react-konva";

export interface TransformerElementProps {
  centeredScaling?: boolean;
  node: Konva.Shape | null;
  isReadOnly?: boolean;
  enableSideAnchors?: boolean;
  keepRatio?: boolean;
  rotateEnabled?: boolean;
}

export default function TransformerElement({
  node,
  isReadOnly,
  centeredScaling,
  enableSideAnchors = true,
  keepRatio = false,
  rotateEnabled = true
}: TransformerElementProps) {
  const setTrRef = useCallback(
    (trRef: Konva.Transformer) => {
      if (node && trRef) {
        trRef.nodes([node]);
      }
    },
    [node],
  );

  const anchors = ["top-left", "top-right", "bottom-left", "bottom-right"];
  if (enableSideAnchors) {
    anchors.push("top-center");
    anchors.push("bottom-center");
    anchors.push("middle-left");
    anchors.push("middle-right");
  }

  return (
    <Transformer
      ref={setTrRef}
      rotateEnabled={rotateEnabled}
      keepRatio={keepRatio}
      centeredScaling={centeredScaling}
      enabledAnchors={anchors}
      visible={!isReadOnly}
      anchorCornerRadius={100}
      anchorSize={7}
      borderStrokeWidth={2}
      borderStroke="#006fee"
      anchorStroke="#006fee"
      anchorStrokeWidth={2}
    />
  );
}
