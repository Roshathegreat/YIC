import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YIC — Plastic Governance Ledger",
  description:
    "Sourced plastic policy and corporate disclosure data for Japan, the United States, and Taiwan, with a youth-facing translation by the lobster Ise.",
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
