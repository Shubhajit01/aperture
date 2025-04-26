import logoUrl from "@/assets/images/logo.svg";

interface LogoProps {
  scale?: number;
  className?: string;
}

export { logoUrl };

export default function Logo({ className, scale = 1 }: LogoProps) {
  const width = Math.floor(59 * scale);
  const height = Math.floor(36 * scale);

  return (
    <img
      src={logoUrl}
      width={width}
      height={height}
      className={className}
      alt="Stylized blue infinity symbol with nested shapes"
    />
  );
}
