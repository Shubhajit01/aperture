import TextboxTools from "@/features/editor/elements/textbox/textbox-tools";
import { editor$ } from "@/features/editor/store/editor";
import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import type { SlideElementsSchema } from "@/schema/v1/slide-elements";
import type { Observable } from "@legendapp/state";
import { Switch, useObservable } from "@legendapp/state/react";
import GeometricShapeTools from "../../elements/geometric-shape/geometric-shape-tools";
import { presentation$ } from "../../store/presentation";

type ElementTypeMap = {
  [key in SlideElementsSchema["type"]]: () => React.ReactNode;
};

export default function ElementSpecificTools() {
  const activeElement$ = useObservable(
    () => presentation$.data.slideElements[editor$.activeElementId.get() ?? ""],
  );

  const elementTypeMap: ElementTypeMap = {
    text: () => (
      <TextboxTools
        element$={activeElement$ as unknown as Observable<TextboxSchema>}
      />
    ),
    "geometric-shape": () => (
      <GeometricShapeTools
        element$={activeElement$ as unknown as Observable<GeometricShapeSchema>}
      />
    ),
  };

  return <Switch value={activeElement$.type}>{elementTypeMap}</Switch>;
}
