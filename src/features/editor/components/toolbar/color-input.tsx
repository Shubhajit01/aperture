import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  useInput,
} from "@heroui/react";
import type { Observable } from "@legendapp/state";
import { Computed, useObservable } from "@legendapp/state/react";
import { ColorPickerIcon, UnavailableIcon } from "hugeicons-react";
import { useMemo } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerPopup {
  title: string;
  children: React.ReactNode;
  color$: Observable<string>;
}

export default function ColorPickerPopup({
  color$,
  title,
  children,
}: ColorPickerPopup) {
  const { getInputProps, getInnerWrapperProps, getInputWrapperProps } =
    useInput({ size: "sm", classNames: { inputWrapper: "grow shrink" } });

  const { inputProps, innerWrapperProps, inputWrapperProps } = useMemo(
    () => ({
      inputProps: getInputProps(),
      inputWrapperProps: getInputWrapperProps(),
      innerWrapperProps: getInnerWrapperProps(),
    }),
    [getInputProps, getInnerWrapperProps, getInputWrapperProps],
  );

  const isEmptyColor$ = useObservable(() => !color$.get());

  const pickColor = () => {
    if (!window.EyeDropper) return;
    const eye = new window.EyeDropper();
    eye.open().then((result) => color$.set(result.sRGBHex));
  };

  return (
    <Popover placement="bottom-end">
      <Computed>
        <PopoverTrigger>{children}</PopoverTrigger>
      </Computed>
      <PopoverContent className="p-4 gap-2 justify-stretch">
        <p className="font-medium text-base self-start">{title}</p>
        <Computed>
          <div className="flex items-center gap-2">
            <div {...inputWrapperProps}>
              <div {...innerWrapperProps}>
                <HexColorInput
                  prefixed
                  {...inputProps}
                  color={color$.get()}
                  onChange={color$.set}
                />
              </div>
            </div>

            {"EyeDropper" in window ? (
              <Tooltip content="Open dropper">
                <Button
                  radius="sm"
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="!rounded-(--heroui-radius-small)"
                  onPress={pickColor}
                >
                  <ColorPickerIcon size={16} />
                </Button>
              </Tooltip>
            ) : null}

            <Tooltip content="Clear">
              <Computed>
                <Button
                  radius="sm"
                  isIconOnly
                  size="sm"
                  variant="flat"
                  isDisabled={isEmptyColor$.get()}
                  className="rounded-s-(--heroui-radius-small)"
                  onPress={() => color$.set("")}
                >
                  <UnavailableIcon size={16} />
                </Button>
              </Computed>
            </Tooltip>
          </div>

          <HexAlphaColorPicker
            color={color$.get()}
            onChange={color$.set}
            className="!w-full"
          />
        </Computed>
      </PopoverContent>
    </Popover>
  );
}
