import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { CursorTextIcon, GeometricShapes01Icon } from "hugeicons-react";
import { geometricShapes } from "../../elements/geometric-shape/constants";
import { addTextBox } from "../../services/presentation.service";
import { editor$ } from "../../store/editor";
import { ToolbarButton, ToolbarButtonGroup } from "./common";

export default function InsertElementsTools() {
  return (
    <ToolbarButtonGroup>
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

      <Dropdown placement="bottom-end" classNames={{ content: "min-w-20" }}>
        <DropdownTrigger>
          <ToolbarButton label="Add a shape" icon={GeometricShapes01Icon} />
        </DropdownTrigger>

        <DropdownMenu items={geometricShapes}>
          {(shape) => (
            <DropdownItem
              id={shape.id}
              key={shape.id}
              startContent={<shape.icon size={16} />}
            >
              {shape.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </ToolbarButtonGroup>
  );
}
