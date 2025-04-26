import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import { useCallback } from "react";
import { Html } from "react-konva-utils";
import { updateTextContent } from "./textbox.service";

interface TextboxEditorProps {
  onDone: () => void;
  show: boolean;
  elementId: string;
  content: string;
  style: TextboxSchema["style"];
}

export default function TextboxEditor({
  show,
  content,
  elementId,
  style,
  onDone,
}: TextboxEditorProps) {
  const setRefFocus = useCallback((node: HTMLInputElement | null) => {
    node?.focus();
  }, []);

  const transform = `translate3d(${style.x - style.width / 2}px, ${style.y - style.height / 2}px, 0)`;

  if (!show) {
    return null;
  }

  return (
    <Html>
      <input
        ref={setRefFocus}
        value={content}
        onBlur={onDone}
        onKeyUp={(e) => {
          if (e.key === "Escape") {
            onDone();
          }
        }}
        onChange={(e) =>
          updateTextContent({
            elementId,
            content: e.currentTarget.value,
          })
        }
        style={{ transform, ...style }}
      />
    </Html>
  );
}
