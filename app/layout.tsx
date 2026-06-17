import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IronPeak Construction",
  description:
    "A modern construction company website for commercial builds, residential projects, renovations, and project management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
