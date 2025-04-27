import type Konva from "konva";
import { useCallback } from "react";
import { Stage } from "react-konva";
import { presentation$ } from "../store/presentation";
import { observer } from "@legendapp/state/react";
import { handleKeyboardAction } from "../services/keyboard-actions";

interface SlideStageProps {
  children: React.ReactNode;
}

const StageObserver = observer(function SlideStage({
  children,
}: SlideStageProps) {
  const properties$ = presentation$.properties;

  const makeContainerFocusable = useCallback((ref: Konva.Stage) => {
    if (!ref) return;
    const container = ref.container();
    container.tabIndex = 1;
    container.className = "outline-none";
    container.focus();
  }, []);

  return (
    <div onKeyUp={(e) => handleKeyboardAction(e)}>
      <Stage
        ref={makeContainerFocusable}
        width={properties$.width.get()}
        height={properties$.height.get()}
      >
        {children}
      </Stage>
    </div>
  );
});

export default StageObserver;
