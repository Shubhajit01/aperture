import { activateSlide } from "@/features/editor/services/editor.service";
import { editor$ } from "@/features/editor/store/editor";
import { presentation$ } from "@/features/editor/store/presentation";
import { cn } from "@heroui/react";
import type { Observable } from "@legendapp/state";
import { use$, useObservable, useSelector } from "@legendapp/state/react";
import { useMeasure } from "@legendapp/state/react-hooks/useMeasure";
import { $React } from "@legendapp/state/react-web";
import { type ComponentRef, type RefObject, useRef } from "react";
import { Layer, Stage } from "react-konva";
import Slide from "./slide";

interface SlidePreviewProps {
  item$: Observable<string>;
}

export default function SlidePreview({ item$ }: SlidePreviewProps) {
  const btnRef = useRef<ComponentRef<"button">>(null);
  const dimension$ = useMeasure(btnRef as RefObject<HTMLButtonElement>);

  const isActive$ = useObservable(
    () => item$.get() === editor$.activeSlide.get(),
  );

  const { width, height } = use$(dimension$);

  const aspectRatio = useSelector(() => {
    const properties = presentation$.properties.get();
    return properties.width / properties.height;
  });

  const scale = useSelector(() => {
    const dimension = dimension$.get();
    const properties = presentation$.properties.get();
    return Math.min(
      (dimension.width || 0) / properties.width,
      (dimension.height || 0) / properties.height,
    );
  });

  return (
    <$React.button
      type="button"
      ref={btnRef}
      onClick={() => activateSlide(item$.peek())}
      onFocus={() => activateSlide(item$.peek())}
      aria-label="Slide"
      style={{ aspectRatio }}
      $className={() =>
        cn(
          "bg-content2 ring-2 relative ring-offset-6 rounded-md ring-offset-default-100 w-full focus:outline-none transition-color",
          isActive$.get() ? "ring-primary-500" : "ring-default-200/60",
        )
      }
    >
      <Stage width={width} height={height} className="w-full h-full">
        <Layer scaleX={scale} scaleY={scale}>
          <Slide isReadOnly slideId$={item$} />
        </Layer>
      </Stage>

      <div className="absolute inset-0" />
    </$React.button>
  );
}
