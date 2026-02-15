import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Logos Boilerplate — V6.0 (Sovereign)",
  description: "Recursive Sync and 6/11-aligned components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}
