import { activateElement } from "@/features/editor/services/editor.service";
import { presentation$ } from "@/features/editor/store/presentation";
import type { Observable } from "@legendapp/state";
import { Computed, For, useObservable } from "@legendapp/state/react";
import { useMemo } from "react";
import { Rect } from "react-konva";
import SlideElement from "./slide-element";

interface SlideProps {
  slideId$: Observable<string>;
  isReadOnly?: boolean;
}

export default function Slide({ slideId$, isReadOnly }: SlideProps) {
  const slide$ = useObservable(() => {
    const slideId = slideId$?.get();
    return presentation$.data.slides[slideId];
  });

  const extraProps = useMemo(() => ({ isReadOnly }), [isReadOnly]);

  return (
    <>
      <Computed>
        <Rect
          fill={slide$.style.backgroundColor.get()}
          width={presentation$.properties.width.get()}
          height={presentation$.properties.height.get()}
          onClick={() => {
            activateElement(null);
          }}
        />
      </Computed>

      <For
        optimized
        each={slide$.elementIds}
        itemProps={extraProps}
        item={SlideElement}
      />
    </>
  );
}
