import {
  AlignBottomIcon,
  AlignHorizontalCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignVerticalCenterIcon,
} from "hugeicons-react";
import { getActiveElementId } from "../../services/editor.service";
import {
  snapElementToSlideBottom,
  snapElementToSlideCenter,
  snapElementToSlideLeft,
  snapElementToSlideMiddle,
  snapElementToSlideRight,
  snapElementToSlideTop,
} from "../../services/elements.service";
import { ToolbarButton, ToolbarButtonGroup } from "./common";

export default function AlignmentTools() {
  return (
    <>
      <ToolbarButtonGroup>
        <ToolbarButton
          label="Align to start"
          icon={AlignLeftIcon}
          onPress={() => snapElementToSlideLeft(getActiveElementId())}
        />

        <ToolbarButton
          label="Align to middle"
          icon={AlignHorizontalCenterIcon}
          onPress={() => snapElementToSlideMiddle(getActiveElementId())}
        />

        <ToolbarButton
          label="Align to end"
          icon={AlignRightIcon}
          onPress={() => snapElementToSlideRight(getActiveElementId())}
        />
      </ToolbarButtonGroup>
      <ToolbarButtonGroup>
        <ToolbarButton
          label="Align to top"
          icon={AlignTopIcon}
          onPress={() => snapElementToSlideTop(getActiveElementId())}
        />

        <ToolbarButton
          label="Align to center"
          icon={AlignVerticalCenterIcon}
          onPress={() => snapElementToSlideCenter(getActiveElementId())}
        />

        <ToolbarButton
          label="Align to bottom"
          icon={AlignBottomIcon}
          onPress={() => snapElementToSlideBottom(getActiveElementId())}
        />
      </ToolbarButtonGroup>
    </>
  );
}
