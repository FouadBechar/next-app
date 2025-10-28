"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import React from "react";

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      {children}
    </ThemeProvider>
  );
}
