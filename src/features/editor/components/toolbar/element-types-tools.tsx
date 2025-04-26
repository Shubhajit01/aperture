import {
  CursorPointer02Icon,
  CursorTextIcon,
  GeometricShapes01Icon,
} from "hugeicons-react";
import { addTextBox } from "../../services/presentation.service";
import { editor$ } from "../../store/editor";
import { ToolbarButton, ToolbarButtonGroup } from "./common";

export default function ElementTypesTools() {
  return (
    <ToolbarButtonGroup>
      <ToolbarButton label="Select tool" icon={CursorPointer02Icon} />

      <ToolbarButton
        label="Add textbox"
        icon={CursorTextIcon}
        onPress={() => {
          const activeSlideId = editor$.activeSlide.peek();
          if (activeSlideId) {
            addTextBox(activeSlideId);
          }
        }}
      />

      <ToolbarButton label="Shapes" icon={GeometricShapes01Icon} />
    </ToolbarButtonGroup>
  );
}
