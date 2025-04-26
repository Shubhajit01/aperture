import { Computed, useObservable } from "@legendapp/state/react";
import {
  SearchAddIcon,
  SearchMinusIcon,
  SearchReplaceIcon,
} from "hugeicons-react";
import { resetZoom, zoomIn, zoomOut } from "../../services/editor.service";
import { editor$ } from "../../store/editor";
import { ToolbarButton, ToolbarButtonGroup } from "./common";

export default function ZoomTools() {
  const isFit$ = useObservable(
    () => editor$.fitZoomLevel.get() === editor$.visibleZoomLevel.get(),
  );

  const isMinimalZoom$ = useObservable(
    () => editor$.visibleZoomLevel.get() - 0.04 <= 0.1,
  );

  return (
    <ToolbarButtonGroup>
      <Computed>
        <ToolbarButton
          label="Zoom Out"
          icon={SearchMinusIcon}
          isDisabled={isMinimalZoom$.get()}
          onPress={zoomOut}
        />
      </Computed>

      <Computed>
        <ToolbarButton
          label="Reset Zoom"
          isDisabled={isFit$.get()}
          icon={SearchReplaceIcon}
          onPress={resetZoom}
        />
      </Computed>

      <ToolbarButton label="Zoom In" icon={SearchAddIcon} onPress={zoomIn} />
    </ToolbarButtonGroup>
  );
}
