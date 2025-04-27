import { removeElement } from "@/features/editor/services/presentation.service";
import { editor$ } from "../store/editor";
import { duplicateElement } from "./editor.service";
import { moveElement } from "./elements.service";
import { ARROW_KEY_DIRECTIONS } from "../constants";

export function handleKeyboardAction(event: React.KeyboardEvent) {
  const activeSlideId = editor$.activeSlide.peek();
  const activeElementId = editor$.activeElementId.peek();

  if (!activeSlideId || !activeElementId) return;

  const { key, metaKey, ctrlKey, altKey, shiftKey } = event;
  console.log("key::", key, metaKey, ctrlKey, altKey, shiftKey);

  if (key === "Delete" || key === "Backspace") {
    removeElement(activeElementId);

    return;
  }

  if (key === "d" && (event.metaKey || event.ctrlKey)) {
    event.preventDefault();

    duplicateElement(activeElementId, activeSlideId);
    return;
  }

  if (key.startsWith("Arrow")) {
    event.preventDefault();
    moveElement(activeElementId, ARROW_KEY_DIRECTIONS[key], event.shiftKey);
    return;
  }
}
