import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marine Plastic Pollution — Ledger & Wooby's Tide Report",
  description:
    "A sourced ledger of marine plastic pollution policy for Japan, the United States, and Taiwan — and Wooby's Tide Report, a kid-friendly retelling that links every story back to its source.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
