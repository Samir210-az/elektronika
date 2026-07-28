import "./globals.css";
import Script from "next/script";
import { StoreProvider } from "@/context/StoreContext";
import { PwaInstallProvider } from "@/context/PwaInstallContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";

const SITE_URL = "https://elektronika-az.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Elektronika — Premium Elektron Texnika Mağazası Azərbaycanda",
    template: "%s | Elektronika",
  },
  description:
    "Elektronika-da qulaqlıq, noutbuk, ağıllı saat, kamera və digər orijinal elektron məhsulları sərfəli qiymətə əldə edin. Pulsuz çatdırılma, bütün Azərbaycana çatdırılma, WhatsApp üzərindən sürətli sifariş.",
  keywords: [
    "elektronika",
    "elektron mağaza Azərbaycan",
    "qulaqlıq al",
    "noutbuk al Bakı",
    "ağıllı saat",
    "aksiya kamerası",
    "onlayn elektronika mağazası",
    "pulsuz çatdırılma Azərbaycan",
  ],
  authors: [{ name: "s_akhundoff" }],
  applicationName: "Elektronika",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Elektronika" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: SITE_URL,
    siteName: "Elektronika",
    title: "Elektronika — Premium Elektron Texnika Mağazası",
    description:
      "Orijinal elektron məhsullar, pulsuz çatdırılma və sürətli WhatsApp sifariş sistemi ilə Elektronika-da.",
    images: [{ url: "/icons/icon-512.png", width: 512, height: 512, alt: "Elektronika" }],
  },
  twitter: {
    card: "summary",
    title: "Elektronika — Premium Elektron Texnika Mağazası",
    description: "Orijinal elektron məhsullar, pulsuz çatdırılma və sürətli sifariş.",
    images: ["/icons/icon-512.png"],
  },
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport = {
  themeColor: "#0A0E27",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: "Elektronika",
  url: SITE_URL,
  description:
    "Orijinal elektron məhsullar satan onlayn mağaza — pulsuz çatdırılma, WhatsApp üzərindən sifariş.",
  areaServed: "AZ",
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className="antialiased">
        <Script id="ld-json" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <PwaInstallProvider>
          <StoreProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
            <InstallPrompt />
          </StoreProvider>
        </PwaInstallProvider>
      </body>
    </html>
  );
}
