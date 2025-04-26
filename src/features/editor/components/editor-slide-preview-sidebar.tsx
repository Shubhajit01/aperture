import { For } from "@legendapp/state/react";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { presentation$ } from "../store/presentation";
import SlidePreview from "./slide-preview";

export default function EditorSlidePreviewSidebar() {
  const [parentRef] = useAutoAnimate();
  return (
    <aside
      ref={parentRef}
      className="bg-white w-72 p-6 flex flex-col gap-8 shrink-0 overflow-y-auto max-h-full"
    >
      <For optimized each={presentation$.data.slideIds} item={SlidePreview} />
    </aside>
  );
}
