interface EyeDropper {
  // biome-ignore lint/suspicious/noMisleadingInstantiator: Invalid
  new (): EyeDropper;
  open(options?: { signal?: AbortSignal }): Promise<{ sRGBHex: string }>;
}

interface Window {
  EyeDropper?: EyeDropper;
}

type HugeIcon = React.ComponentType<
  Omit<import("hugeicons-react").HugeiconsProps, "ref"> &
    React.RefAttributes<SVGSVGElement>
>;
