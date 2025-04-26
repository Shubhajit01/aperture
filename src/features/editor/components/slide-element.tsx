import type { SlideElementsSchema } from "@/schema/v1/slide-elements";
import type { Observable } from "@legendapp/state";
import { Switch, useObservable } from "@legendapp/state/react";
import TextboxElement from "../elements/textbox/textbox-element";
import { presentation$ } from "../store/presentation";

interface SlideElementProps {
  isReadOnly?: boolean;
  item$: Observable<string>;
}

type ElementRendererMap = {
  [k in SlideElementsSchema["type"]]: () => React.ReactNode;
};

export default function SlideElement({ item$, isReadOnly }: SlideElementProps) {
  const elementType$ = useObservable(
    () => presentation$.data.slideElements[item$.get()].type,
  );

  const rendererMap: ElementRendererMap = {
    text: () => <TextboxElement item$={item$} isReadOnly={isReadOnly} />,
  };

  return <Switch value={elementType$}>{rendererMap}</Switch>;
}
