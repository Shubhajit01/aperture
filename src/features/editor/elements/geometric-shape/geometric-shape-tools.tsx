import ColorPickerPopup from "@/features/editor/components/toolbar/color-input";
import {
  ToolbarButton,
  ToolbarButtonGroup,
} from "@/features/editor/components/toolbar/common";
import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import type { Observable } from "@legendapp/state";
import { PaintBucketIcon } from "hugeicons-react";

export default function GeometricShapeTools({
  element$,
}: { element$: Observable<GeometricShapeSchema> }) {
  const style$ = element$.style;

  return (
    <>
      <ToolbarButtonGroup>
        <ColorPickerPopup color$={style$.fill}>
          <ToolbarButton label="Select fill color" icon={PaintBucketIcon} />
        </ColorPickerPopup>
      </ToolbarButtonGroup>
    </>
  );
}
