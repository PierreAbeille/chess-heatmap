import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GameProvider } from "./context/game-context";
import { ErrorProvider } from "./context/error-context";
import { ErrorPopup } from "./components/error-popup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chess Heatmap",
  description: "Did you ever wanted to see a heatmap of your chess games?",   
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorProvider>
          <GameProvider>
            {children}
          </GameProvider>
          <ErrorPopup />
        </ErrorProvider>
      </body>
    </html>
  );
}
