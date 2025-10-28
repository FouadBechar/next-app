import type { Metadata } from "next";
import Head from "next/head";
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Environmental Protection & More | Fouad Bechar',
  description: 'Environmental protection, social justice, domestic violence, web hosting, artificial intelligence, and many other important topics.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        {/* Load Geist fonts at runtime from Google Fonts (avoids build-time fetch) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`antialiased`}>
      {/* lightweight non-blocking fallback for very old browsers (ES5) */}
      <Script src="https://fouadbechar.vercel.app/oldbrowser.js" strategy="afterInteractive" />
        {children}

      </body>
    </html>
  );
}
