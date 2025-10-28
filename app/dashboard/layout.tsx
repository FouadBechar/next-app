import "../globals2.css";
import ThemeWrapper from "@/components/ThemeWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <ThemeWrapper>{children}</ThemeWrapper>;
}
