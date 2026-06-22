import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800"],
});

export const metadata = {
  title: "P. Akshay Reddy | Full Stack Developer",
  description: "Portfolio of P. Akshay Reddy, Full Stack Developer and AI Enthusiast.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : new URL('http://localhost:3000'),
  openGraph: {
    title: "P. Akshay Reddy | Full Stack Developer",
    description: "Portfolio of P. Akshay Reddy, Full Stack Developer and AI Enthusiast.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/ai-interview-screenshot.png",
        width: 1200,
        height: 630,
        alt: "Portfolio showcase image"
      }
    ]
  },
  twitter: {
    card: "summary_large_image"
  },
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body style={{ backgroundColor: '#050508' }}>
        {children}
      </body>
    </html>
  );
}
