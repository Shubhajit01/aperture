import { cn } from "@heroui/react";
import { Show } from "@legendapp/state/react";
import { CloudLoadingIcon, CloudSavingDone01Icon } from "hugeicons-react";
import { editor$ } from "../store/editor";

export default function EditorAutosave() {
  const isAutoSaving = false;

  const Icon = isAutoSaving ? CloudLoadingIcon : CloudSavingDone01Icon;
  const text = isAutoSaving ? "Saving" : "Saved";

  return (
    <Show if={editor$.isAutoSaveEnabled}>
      <span
        className={cn(
          "inline-flex items-center gap-1",
          isAutoSaving ? "text-secondary-500" : "text-default-500",
        )}
      >
        <Icon
          className={cn("size-5", isAutoSaving ? "" : "text-success-700")}
        />
        <span className="text-sm font-medium">{text}</span>
      </span>
    </Show>
  );
}
