import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { KeyboardShortcutsModal } from "@/components/ui/KeyboardShortcutsModal";
import { GlobalNavigationShortcuts } from "@/components/ui/GlobalNavigationShortcuts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AqarFlow | Real Estate Management & Property Operations Platform",
  description:
    "Pakistan-first verified property discovery portal and agency operations workspace (ERP + CRM). Powered by VIRELEO Project 01.",
  keywords: [
    "AqarFlow",
    "Pakistan real estate",
    "property portal",
    "Islamabad properties",
    "Lahore DHA houses",
    "Karachi real estate",
    "real estate CRM",
    "VIRELEO"
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
        <AuthProvider>
          <GlobalNavigationShortcuts />
          <CommandPalette />
          <KeyboardShortcutsModal />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
