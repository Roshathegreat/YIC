import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YIC — Marine Plastic Pollution Ledger & Wooby's Tide Report",
  description:
    "A sourced record of plastic policy, corporate disclosures, and treaty positions for Japan, the United States, and Taiwan — paired with Wooby's Tide Report, a kid-facing news layer about marine plastic pollution.",
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
