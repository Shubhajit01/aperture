import ColorPickerPopup from "@/features/editor/components/toolbar/color-input";
import {
  ToolbarButton,
  ToolbarButtonGroup,
} from "@/features/editor/components/toolbar/common";
import type { GeometricShapeSchema } from "@/schema/v1/elements/geometric-shape";
import type { Observable } from "@legendapp/state";
import { Show } from "@legendapp/state/react";
import {
  MinusSignIcon,
  PaintBucketIcon,
  PlusSignIcon,
  StrokeOutsideIcon,
} from "hugeicons-react";
import ResizableNumberInput from "../../components/toolbar/resizable-number-input";
import {
  decrementStrokeWidth,
  incrementStrokeWidth,
} from "./geometric-shape.service";

export default function GeometricShapeTools({
  element$,
}: { element$: Observable<GeometricShapeSchema> }) {
  const style$ = element$.style;

  return (
    <>
      <ToolbarButtonGroup>
        <Show if={() => element$.shapeType.get() !== "line"}>
          <ColorPickerPopup title="Pick fill color" color$={style$.fill}>
            <ToolbarButton label="Change fill color" icon={PaintBucketIcon} />
          </ColorPickerPopup>
        </Show>

        <ColorPickerPopup title="Pick stroke color" color$={style$.stroke}>
          <ToolbarButton label="Change stroke color" icon={StrokeOutsideIcon} />
        </ColorPickerPopup>
      </ToolbarButtonGroup>

      <ToolbarButtonGroup>
        <ToolbarButton
          label="Decrease stroke width"
          icon={MinusSignIcon}
          onPress={() => decrementStrokeWidth(element$.id.peek())}
        />
        <ResizableNumberInput
          value$={style$.strokeWidth}
          onChange={style$.strokeWidth.set}
        />
        <ToolbarButton
          label="Increase stroke width"
          icon={PlusSignIcon}
          onPress={() => incrementStrokeWidth(element$.id.peek())}
        />
      </ToolbarButtonGroup>
    </>
  );
}
