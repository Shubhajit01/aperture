import {
  Button,
  ButtonGroup,
  type ButtonProps,
  type ButtonVariantProps,
  Tooltip,
  cn,
} from "@heroui/react";
import type { ComponentProps } from "react";

export function ToolbarButtonGroup({
  children,
  size = "sm",
  variant = "flat",
  color,
  isIconOnly = true,
}: { children: React.ReactNode } & Pick<
  ButtonVariantProps,
  "variant" | "size" | "color" | "isIconOnly"
>) {
  return (
    <ButtonGroup
      isIconOnly={isIconOnly}
      size={size}
      variant={variant}
      color={color}
    >
      {children}
    </ButtonGroup>
  );
}

export function ToolbarButton({
  label,
  icon: Icon,
  isActive,
  ...props
}: {
  label: string;
  isActive?: boolean;
  icon: HugeIcon;
} & Omit<ButtonProps, "children" | "startContent" | "endContent">) {
  return (
    <Tooltip content={label}>
      <Button {...props} color={isActive ? "secondary" : props.color}>
        <Icon size={16} />
      </Button>
    </Tooltip>
  );
}

export function QuickPopoverAction({
  type = "button",
  className = "",
  label,
  ...props
}: Omit<ComponentProps<"button">, "children"> & { label: string }) {
  return (
    <button
      type={type}
      className={cn(
        "font-medium text-xs text-primary cursor-pointer",
        className,
      )}
      {...props}
    >
      {label}
    </button>
  );
}
