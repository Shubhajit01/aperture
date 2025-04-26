import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button, ButtonGroup, Tooltip } from "@heroui/react";
import { Download02Icon, FileAddIcon, Settings01Icon } from "hugeicons-react";

import { addSlide } from "../services/presentation.service";

import ActiveElementTools from "./toolbar/active-element-tools";
import HistoryTools from "./toolbar/history-tools";
import InsertElementsTools from "./toolbar/insert-elements-tools";
import ZoomTools from "./toolbar/zoom-tools";

export default function EditorToolbar() {
  const [parentRef] = useAutoAnimate({ duration: 150, easing: "ease-out" });
  return (
    <div
      ref={parentRef}
      className="px-6 pt-1 pb-5 w-full flex items-stretch gap-4"
    >
      <ButtonGroup isIconOnly size="sm" variant="flat">
        <Tooltip content="New Slide">
          <Button color="primary" onPress={addSlide}>
            <FileAddIcon size={16} />
          </Button>
        </Tooltip>
      </ButtonGroup>

      <HistoryTools />
      <ZoomTools />
      <InsertElementsTools />
      <ActiveElementTools />

      <Button
        size="sm"
        variant="flat"
        className="ml-auto"
        startContent={<Download02Icon size={16} />}
      >
        Export
      </Button>

      <Button
        size="sm"
        variant="flat"
        startContent={<Settings01Icon size={16} />}
      >
        Settings
      </Button>
    </div>
  );
}
