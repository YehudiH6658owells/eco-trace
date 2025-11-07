import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "EcoTrace - Privacy-Preserving Carbon Footprint Tracking",
  description: "Track your carbon footprint with privacy using FHEVM technology",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`ecotrace-bg text-foreground antialiased`}>
        <div className="fixed inset-0 w-full h-full ecotrace-bg z-[-20] min-w-[850px]"></div>
        <main className="flex flex-col max-w-screen-lg mx-auto pb-20 min-w-[850px]">
          <nav className="flex w-full px-3 md:px-0 h-fit py-10 justify-between items-center">
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="text-4xl">🌿</div>
                <h1 className="text-3xl font-bold text-green-800">EcoTrace</h1>
              </a>
            </div>
            <div className="flex items-center gap-6">
              <a
                href="/how-it-works"
                className="text-sm text-gray-600 hover:text-green-600 transition-colors"
              >
                How It Works
              </a>
              <p className="text-sm text-gray-600">Privacy-Preserving Carbon Tracking</p>
            </div>
          </nav>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}

