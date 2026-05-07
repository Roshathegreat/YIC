import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YIC — Wooby & the Plastic Ledger",
  description:
    "Plastic-pollution data for the world's biggest countries and brands. Two surfaces: a researcher Ledger and Wooby — a kid-friendly classroom view.",
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
