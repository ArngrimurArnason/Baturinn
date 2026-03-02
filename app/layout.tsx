import type { Metadata } from "next";
import Navbar from "../components/nav";
import Footer from "../components/footer";
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  weight: ['700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Baturinn",
  description: "Tilbuinn að verða sjóveikur ?" ,
  icons: {
    // Favicon.com
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
      <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
