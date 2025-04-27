import { activateSlide } from "@/features/editor/services/editor.service";
import { editor$ } from "@/features/editor/store/editor";
import { presentation$ } from "@/features/editor/store/presentation";
import { cn } from "@heroui/react";
import type { Observable } from "@legendapp/state";
import {
  Computed,
  useMountOnce,
  useObservable,
  useObserve,
} from "@legendapp/state/react";
import { useMeasure } from "@legendapp/state/react-hooks/useMeasure";
import { $React } from "@legendapp/state/react-web";
import { type ComponentRef, type RefObject, useRef } from "react";
import { Layer, Stage } from "react-konva";
import { removeSlide } from "../services/presentation.service";
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

  const aspectRatio$ = useObservable(() => {
    const properties = presentation$.properties.get();
    return properties.width / properties.height;
  });

  const scale$ = useObservable(() => {
    const dimension = dimension$.get();
    const properties = presentation$.properties.get();
    return Math.min(
      (dimension.width || 0) / properties.width,
      (dimension.height || 0) / properties.height,
    );
  });

  useMountOnce(() => {
    btnRef.current?.focus();
  });

  useObserve(() => {
    if (isActive$.get()) {
      btnRef.current?.focus();
    }
  });

  return (
    <$React.button
      type="button"
      ref={btnRef}
      onClick={() => activateSlide(item$.peek())}
      onFocus={() => activateSlide(item$.peek())}
      aria-label="Slide"
      $style={() => ({ aspectRatio: aspectRatio$.get() })}
      $className={() =>
        cn(
          "bg-content2 ring-2 relative ring-offset-6 rounded-md ring-offset-default-100 w-full focus:outline-none transition-color",
          isActive$.get() ? "ring-primary-500" : "ring-default-200/60",
        )
      }
      onKeyUp={(e: React.KeyboardEvent) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          removeSlide(item$.peek());
        }
      }}
    >
      <Computed>
        <Stage
          width={dimension$.width.get()}
          height={dimension$.height.get()}
          className="w-full h-full"
        >
          <Computed>
            <Layer scaleX={scale$.get()} scaleY={scale$.get()}>
              <Slide isReadOnly slideId$={item$} />
            </Layer>
          </Computed>
        </Stage>
      </Computed>

      <div className="absolute inset-0" />
    </$React.button>
  );
}
