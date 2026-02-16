import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conduit — The Settlement Layer for Agentic Commerce",
  description:
    "Stablecoin payment rail for autonomous AI agents. Instant USDC settlement on Solana with built-in compliance.",
  openGraph: {
    title: "Conduit — The Settlement Layer for Agentic Commerce",
    description:
      "Stablecoin payment rail for autonomous AI agents. Instant USDC settlement on Solana with built-in compliance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
