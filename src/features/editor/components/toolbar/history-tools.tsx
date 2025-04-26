import { Computed } from "@legendapp/state/react";
import { ArrowMoveUpLeftIcon, ArrowMoveUpRightIcon } from "hugeicons-react";
import { redo, redos$, undo, undos$ } from "../../store/presentation";
import { ToolbarButton, ToolbarButtonGroup } from "./common";

export default function HistoryTools() {
  return (
    <ToolbarButtonGroup>
      <Computed>
        <ToolbarButton
          label="Undo"
          onPress={undo}
          icon={ArrowMoveUpLeftIcon}
          isDisabled={!undos$.get()}
        />
      </Computed>

      <Computed>
        <ToolbarButton
          label="Redo"
          onPress={redo}
          icon={ArrowMoveUpRightIcon}
          isDisabled={!redos$.get()}
        />
      </Computed>
    </ToolbarButtonGroup>
  );
}
