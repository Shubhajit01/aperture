import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useInput,
} from "@heroui/react";
import type { Observable } from "@legendapp/state";
import { Computed } from "@legendapp/state/react";
import { ColorPickerIcon } from "hugeicons-react";
import { useMemo } from "react";
import { HexAlphaColorPicker, HexColorInput } from "react-colorful";

interface ColorPickerPopup {
  children: React.ReactNode;
  color$: Observable<string>;
}

export default function ColorPickerPopup({
  color$,
  children,
}: ColorPickerPopup) {
  const { getInputProps, getInnerWrapperProps, getInputWrapperProps } =
    useInput({ size: "sm", classNames: { inputWrapper: "grow" } });

  const { inputProps, innerWrapperProps, inputWrapperProps } = useMemo(
    () => ({
      inputProps: getInputProps(),
      inputWrapperProps: getInputWrapperProps(),
      innerWrapperProps: getInnerWrapperProps(),
    }),
    [getInputProps, getInnerWrapperProps, getInputWrapperProps],
  );

  const pickColor = () => {
    if (!window.EyeDropper) return;
    const eye = new window.EyeDropper();
    eye.open().then((result) => color$.set(result.sRGBHex));
  };

  return (
    <Popover placement="bottom-end">
      <Computed>
        <PopoverTrigger style={{ color: color$.get() }}>
          {children}
        </PopoverTrigger>
      </Computed>
      <PopoverContent className="p-4 gap-2 justify-stretch">
        <p className="font-medium text-base self-start">Pick text color</p>
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
              <Button
                radius="sm"
                isIconOnly
                size="sm"
                variant="flat"
                className="rounded-s-(--heroui-radius-small)"
                onPress={pickColor}
              >
                <ColorPickerIcon size={16} />
              </Button>
            ) : null}
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
