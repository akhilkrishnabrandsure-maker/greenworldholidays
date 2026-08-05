import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Green World Holidays",
    template: "%s | Green World Holidays",
  },
  description:
    "Premium travel packages, vehicle rentals, and destination management in Kerala and South India.",
};
import { Providers } from "@/contexts/Providers";
import { FloatingEnquiryPopup } from "@/shared/components/common/FloatingEnquiryPopup";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (process.env.NODE_ENV === 'development' && !process.env.GOOGLE_SCRIPT_URL) {
    console.warn('\n⚠️ Google Sheets Web App URL is not configured.\nPlease add GOOGLE_SCRIPT_URL to .env.local\n');
  }
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          <FloatingEnquiryPopup />
        </Providers>
      </body>
    </html>
  );
}
