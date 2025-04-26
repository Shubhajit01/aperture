import TextboxTools from "@/features/editor/elements/textbox/textbox-tools";
import { editor$ } from "@/features/editor/store/editor";
import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import type { SlideElementsSchema } from "@/schema/v1/slide-elements";
import type { Observable } from "@legendapp/state";
import { Switch } from "@legendapp/state/react";

type ElementTypeMap = {
  [key in SlideElementsSchema["type"]]: () => React.ReactNode;
};

export default function ElementSpecificTools() {
  const elementTypeMap: ElementTypeMap = {
    text: () => (
      <TextboxTools
        // @ts-ignore
        element$={editor$.activeElement as Observable<TextboxSchema>}
      />
    ),
    "geometric-shape": () => null,
  };

  return <Switch value={editor$.activeElementType}>{elementTypeMap}</Switch>;
}
