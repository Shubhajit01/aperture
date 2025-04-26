import type { SchemaV1 } from "@/schema/v1/schema.v1";
import { observable } from "@legendapp/state";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { syncObservable } from "@legendapp/state/sync";

import { undoRedo } from "@legendapp/state/helpers/undoRedo";
import { createBlankPresentation } from "../services/presentation-blanks.service";

export const presentation$ = observable<SchemaV1>(createBlankPresentation());

export const { undo, redo, undos$, redos$ } = undoRedo(presentation$, {
  limit: 100,
});

syncObservable(presentation$, {
  persist: {
    name: `presentation:${presentation$.id.peek()}`,
    plugin: ObservablePersistLocalStorage,
  },
});
