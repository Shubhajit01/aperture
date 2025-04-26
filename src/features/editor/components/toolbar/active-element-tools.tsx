import { Show } from "@legendapp/state/react";
import { editor$ } from "../../store/editor";
import AlignmentTools from "./alignment-tools";
import ElementSpecificTools from "./element-specific-tools";
import TransformerTools from "./tranformer-tools";

export default function ActiveElementTools() {
  return (
    <Show if={editor$.activeElementId}>
      <AlignmentTools />
      <TransformerTools />
      <ElementSpecificTools />
    </Show>
  );
}
