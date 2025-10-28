import "../globals2.css";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
