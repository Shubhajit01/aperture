import Providers from "./Providers";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: WrapperProps) {
  return <Providers>{children}</Providers>;
}
