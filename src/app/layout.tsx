import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";
import "@copilotkit/react-ui/styles.css";

export const metadata: Metadata = {
  title: "Fractional Jobs Demo",
  description: "CopilotKit + Neon Auth demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased"}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
