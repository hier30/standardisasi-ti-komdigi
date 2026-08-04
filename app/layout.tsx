import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";
import { PortalProvider } from "@/components/providers/portal-provider";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: { default: "Dashboard Standardisasi TI Komdigi", template: "%s | Standardisasi TI Komdigi" },
  description: "Katalog resmi Standardisasi Teknologi Informasi Kementerian Komunikasi dan Digital.",
  icons: {
    icon: [{ url: "/komdigi-icon.png", type: "image/png" }],
    shortcut: "/komdigi-icon.png",
    apple: "/komdigi-icon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><PortalProvider><ToastProvider>{children}</ToastProvider></PortalProvider></body></html>;
}
