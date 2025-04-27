import { removeElement } from "@/features/editor/services/presentation.service";
import { editor$ } from "../store/editor";

export function handleKeyboardAction(event: React.KeyboardEvent) {
  const activeSlideId = editor$.activeSlide.peek();
  const activeElementId = editor$.activeElementId.peek();

  if (!activeSlideId) return;

  const { key } = event;
  switch (key) {
    case "Delete":
    case "Backspace": {
      if (activeElementId) {
        removeElement(activeElementId);
      }
      break;
    }
  }
}
