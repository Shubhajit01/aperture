import type { Observable } from "@legendapp/state";

export interface ElementProps {
  isReadOnly?: boolean;
  item$: Observable<string>;
}
