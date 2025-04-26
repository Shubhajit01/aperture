import { resizeTextToFit } from "@/features/editor/elements/textbox/textbox.service";
import { getActiveElementId } from "@/features/editor/services/editor.service";
import {
  rotateByCenter,
  snapToCenter,
} from "@/features/editor/services/elements.service";
import { editor$ } from "@/features/editor/store/editor";
import {
  NumberInput,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Slider,
} from "@heroui/react";
import { Computed, Show, useObservable } from "@legendapp/state/react";
import {
  AlignSelectionIcon,
  ArrowAllDirectionIcon,
  RotateTopRightIcon,
} from "hugeicons-react";
import { presentation$ } from "../../store/presentation";
import {
  QuickPopoverAction,
  ToolbarButton,
  ToolbarButtonGroup,
} from "./common";

export default function TransformerTools() {
  const activeElement$ = useObservable(
    () => presentation$.data.slideElements[editor$.activeElementId.get() ?? ""],
  );

  const style$ = activeElement$.style;

  return (
    <ToolbarButtonGroup>
      <Popover placement="bottom">
        <PopoverTrigger>
          <ToolbarButton label="Change Position" icon={ArrowAllDirectionIcon} />
        </PopoverTrigger>
        <PopoverContent className="gap-3 p-4 w-56">
          <div className="flex justify-between items-center w-full">
            <p className="font-medium self-start">Position</p>

            <QuickPopoverAction
              label="Snap to center"
              onClick={() => snapToCenter(getActiveElementId())}
            />
          </div>
          <Computed>
            <NumberInput
              size="sm"
              label="X"
              value={style$.x.get()}
              onValueChange={style$.x.set}
            />
          </Computed>

          <Computed>
            <NumberInput
              size="sm"
              label="Y"
              value={style$.y.get()}
              onValueChange={style$.y.set}
            />
          </Computed>
        </PopoverContent>
      </Popover>

      <Popover placement="bottom">
        <PopoverTrigger>
          <ToolbarButton label="Change Size" icon={AlignSelectionIcon} />
        </PopoverTrigger>
        <PopoverContent className="gap-3 p-4 w-56">
          <div className="flex justify-between items-center w-full">
            <p className="font-medium self-start">Size</p>

            <Show if={() => activeElement$.type.get() === "text"}>
              <QuickPopoverAction
                label="Fit to content"
                onClick={() => resizeTextToFit(getActiveElementId())}
              />
            </Show>
          </div>
          <Computed>
            <NumberInput
              size="sm"
              label="Width"
              value={style$.width.get()}
              onValueChange={style$.width.set}
            />
          </Computed>

          <Computed>
            <NumberInput
              size="sm"
              label="Height"
              value={style$.height.get()}
              onValueChange={style$.height.set}
            />
          </Computed>
        </PopoverContent>
      </Popover>

      <Popover placement="bottom">
        <PopoverTrigger>
          <ToolbarButton label="Change Rotation" icon={RotateTopRightIcon} />
        </PopoverTrigger>
        <PopoverContent className="gap-3 p-4 w-xs">
          <div className="flex items-center justify-between w-full">
            <p className="font-medium self-start">Rotation</p>
            <Show if={style$.rotation}>
              <QuickPopoverAction
                label="Reset"
                onClick={() => rotateByCenter(getActiveElementId(), 0)}
              />
            </Show>
          </div>

          <Computed>
            <Slider
              showSteps
              minValue={0}
              maxValue={360}
              step={30}
              value={style$.rotation.get()}
              onChange={(val) => {
                if (typeof val === "number") {
                  rotateByCenter(getActiveElementId(), val);
                }
              }}
            />
          </Computed>
        </PopoverContent>
      </Popover>
    </ToolbarButtonGroup>
  );
}
