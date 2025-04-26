import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import type { Observable } from "@legendapp/state";
import { Switch } from "@legendapp/state/react";
import { editor$ } from "../../store/editor";
import TextTools from "./text-tools";

export default function ElementSpecificTools() {
  return (
    <Switch value={editor$.activeElementType}>
      {{
        text: () => (
          <TextTools
            element$={editor$.activeElement as Observable<TextboxSchema>}
          />
        ),
        default: () => (
          <div>Unknown Element - {editor$.activeElementType.peek()}</div>
        ),
      }}
    </Switch>
  );
}
