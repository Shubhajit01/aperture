import { commonFonts } from "@/config/fonts";
import type { TextboxSchema } from "@/schema/v1/elements/textbox";
import { Select, SelectItem } from "@heroui/react";
import type { Observable } from "@legendapp/state";
import { Computed, Memo } from "@legendapp/state/react";
import { $React } from "@legendapp/state/react-web";
import {
  MinusSignIcon,
  PlusSignIcon,
  TextBoldIcon,
  TextColorIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "hugeicons-react";
import type { ChangeEvent } from "react";
import {
  decrementFontSize,
  incrementFontSize,
  toggleBold,
  toggleItalic,
  toggleUnderline,
  updateFontFamily,
  updateFontSize,
} from "../../services/textbox.service";
import ColorPickerPopup from "./color-input";
import { ToolbarButton, ToolbarButtonGroup } from "./common";

export default function TextTools({
  element$,
}: { element$: Observable<TextboxSchema> }) {
  const style$ = element$.style;
  return (
    <>
      <Computed>
        <Select
          size="sm"
          className="max-w-32"
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

        <div className="relative h-full">
          <$React.input
            type="number"
            min={1}
            className="h-full bg-content2 absolute inset-0 px-2.5 text-sm tabular-nums font-mono"
            $value={() => Math.round(style$.fontSize.get())}
            onInput={(e: ChangeEvent<HTMLInputElement>) =>
              updateFontSize(element$.id.peek(), e.currentTarget.valueAsNumber)
            }
          />
          <span className="px-2.5 text-sm tabular-nums font-mono">
            <Memo>{Math.round(style$.fontSize.get())}</Memo>
          </span>
        </div>

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
        <ColorPickerPopup color$={style$.color}>
          <ToolbarButton label="Select text color" icon={TextColorIcon} />
        </ColorPickerPopup>
      </ToolbarButtonGroup>
    </>
  );
}
