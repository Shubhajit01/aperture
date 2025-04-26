import { commonFonts } from "@/config/fonts";
import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import { Select, SelectItem } from "@heroui/react";
import type { Observable } from "@legendapp/state";
import { Computed } from "@legendapp/state/react";
import {
  MinusSignIcon,
  PlusSignIcon,
  TextBoldIcon,
  TextColorIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "hugeicons-react";
import ColorPickerPopup from "../../components/toolbar/color-input";
import {
  ToolbarButton,
  ToolbarButtonGroup,
} from "../../components/toolbar/common";
import ResizableNumberInput from "../../components/toolbar/resizable-number-input";
import {
  decrementFontSize,
  incrementFontSize,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  updateFontFamily,
  updateFontSize,
} from "./textbox.service";

export default function TextboxTools({
  element$,
}: { element$: Observable<TextboxSchema> }) {
  const style$ = element$.style;
  return (
    <>
      <Computed>
        <Select
          size="sm"
          className="max-w-32 shrink-0"
          items={commonFonts}
          onSelectionChange={(next) =>
            updateFontFamily(element$.id.peek(), String(next.currentKey))
          }
          selectedKeys={[style$.fontFamily.get()]}
        >
          {(item) => (
            <SelectItem
              id={item.fontFamily}
              key={item.fontFamily}
              style={{ fontFamily: item.fontFamily }}
            >
              {item.label}
            </SelectItem>
          )}
        </Select>
      </Computed>

      <ToolbarButtonGroup>
        <Computed>
          <ToolbarButton
            isDisabled={style$.fontSize.get() === 1}
            label="Decrease font size"
            icon={MinusSignIcon}
            onPress={() => decrementFontSize(element$.id.peek())}
          />
        </Computed>

        <ResizableNumberInput
          value$={style$.fontSize}
          onChange={(value) => updateFontSize(element$.id.peek(), value)}
        />

        <ToolbarButton
          label="Increase font size"
          icon={PlusSignIcon}
          onPress={() => incrementFontSize(element$.id.peek())}
        />
      </ToolbarButtonGroup>

      <ToolbarButtonGroup>
        <Computed>
          <ToolbarButton
            label="Bold"
            icon={TextBoldIcon}
            isActive={style$.bold.get()}
            onPress={() => toggleBold(element$.id.peek())}
          />
        </Computed>

        <Computed>
          <ToolbarButton
            label="Italics"
            icon={TextItalicIcon}
            isActive={style$.italic.get()}
            onPress={() => toggleItalic(element$.id.peek())}
          />
        </Computed>

        <Computed>
          <ToolbarButton
            label="Underline"
            icon={TextUnderlineIcon}
            isActive={style$.underline.get()}
            onPress={() => toggleUnderline(element$.id.peek())}
          />
        </Computed>
      </ToolbarButtonGroup>

      <ToolbarButtonGroup>
        <ColorPickerPopup title="Pick text color" color$={style$.color}>
          <ToolbarButton label="Select text color" icon={TextColorIcon} />
        </ColorPickerPopup>
      </ToolbarButtonGroup>
    </>
  );
}
