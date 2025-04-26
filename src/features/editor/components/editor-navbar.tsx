import Logo from "@/features/shared/components/Logo";
import { Avatar, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { $React } from "@legendapp/state/react-web";
import type { ChangeEvent } from "react";
import { updatePresentationName } from "../services/presentation.service";
import { presentation$ } from "../store/presentation";
import EditorAutosave from "./editor-autosave";

export default function EditorNavbar() {
  return (
    <Navbar maxWidth="full">
      <NavbarBrand className="flex items-center">
        <Logo scale={0.6} />
        <$React.input
          className="text-xl ml-2 pl-1 max-w-60"
          $value={presentation$.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updatePresentationName(e.currentTarget.value)
          }
        />
      </NavbarBrand>
      <NavbarContent justify="end">
        <EditorAutosave />
        <Avatar
          size="sm"
          color="primary"
          src="https://avatar.vercel.sh/aperture"
        />
      </NavbarContent>
    </Navbar>
  );
}
