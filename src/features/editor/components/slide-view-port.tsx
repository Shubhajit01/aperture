import { useObserve } from "@legendapp/state/react";
import { useMeasure } from "@legendapp/state/react-hooks/useMeasure";
import { type ComponentRef, type RefObject, useRef } from "react";
import { Layer } from "react-konva";

import { editor$ } from "@/features/editor/store/editor";
import { presentation$ } from "@/features/editor/store/presentation";
import { $React } from "@legendapp/state/react-web";
import SlideStage from "./slide-stage";

interface SlideViewPortProps {
  children: React.ReactNode;
}

export default function SlideViewPort({ children }: SlideViewPortProps) {
  const containerRef = useRef<ComponentRef<"div">>(null);
  const dimension$ = useMeasure(containerRef as RefObject<HTMLDivElement>);

  const zoom$ = editor$.visibleZoomLevel;

  useObserve(() => {
    const dimension = dimension$.get();
    const properties = presentation$.properties.get();

    const initialZoom = Math.min(
      Number(dimension.width || 0) / properties.width,
      Number(dimension.height || 0) / properties.height,
    );

    editor$.assign({
      fitZoomLevel: initialZoom,
      visibleZoomLevel: initialZoom,
    });
  });

  return (
    <div className="bg-content2 p-20 grow flex items-center justify-center overflow-hidden">
      <$React.div
        ref={containerRef}
        $style={() => ({ transform: `scale(${zoom$.get()})` })}
        className="size-full flex items-center justify-center"
      >
        <SlideStage>
          <Layer>{children}</Layer>
          <Layer name="top" />
        </SlideStage>
      </$React.div>
    </div>
  );
}
