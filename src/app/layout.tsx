import type { Metadata } from "next";
import "./globals.css";
import { RootProps } from "@/types/global-types";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: {
    template: '%s - Weather Api',
    default: 'Weather Api'
  },
  description: "A simple weather api build using NextJS",
};

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute={'class'} defaultTheme="dark" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
