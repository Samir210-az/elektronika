import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InstallPrompt from "@/components/InstallPrompt";

export const metadata = {
  title: "Elektronika — Premium Texnika Mağazası",
  description: "Ən son elektron məhsullar, sürətli çatdırılma və etibarlı ödəniş.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Elektronika" },
};

export const viewport = {
  themeColor: "#0A0E27",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="az">
      <body className="antialiased">
        <StoreProvider>
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
          <InstallPrompt />
        </StoreProvider>
      </body>
    </html>
  );
}
