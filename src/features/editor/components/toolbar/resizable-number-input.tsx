import type { Observable } from "@legendapp/state";
import { Memo } from "@legendapp/state/react";
import { $React } from "@legendapp/state/react-web";
import type { ChangeEvent } from "react";

interface ResizableNumberInputProps {
  value$: Observable<number>;
  onChange: (next: number) => void;
}

export default function ResizableNumberInput({
  value$,
  onChange,
}: ResizableNumberInputProps) {
  return (
    <div className="relative h-full shrink-0">
      <$React.input
        type="number"
        min={1}
        className="h-full bg-content2 absolute inset-0 px-2.5 text-sm tabular-nums font-mono"
        $value={() => Math.round(value$.get())}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          onChange(e.currentTarget.valueAsNumber)
        }
      />
      <div className="px-2.5 text-sm tabular-nums font-mono opacity-0">
        <Memo>{Math.round(value$.get())}</Memo>
      </div>
    </div>
  );
}
