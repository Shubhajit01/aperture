import type Konva from "konva";
import { useCallback } from "react";
import { Transformer } from "react-konva";

interface TransformerElementProps {
  node: Konva.Shape | null;
  isReadOnly?: boolean;
}

export default function TransformerElement({
  node,
  isReadOnly,
}: TransformerElementProps) {
  const setTrRef = useCallback(
    (trRef: Konva.Transformer) => {
      if (node && trRef) {
        trRef.nodes([node]);
      }
    },
    [node],
  );

  return (
    <Transformer
      centeredScaling
      ref={setTrRef}
      enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
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
