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
      {/* lightweight non-blocking legacy inline redirect for very old browsers */}

      <script dangerouslySetInnerHTML={{ __html: "(function(){try{var keys=['rb:oldBrowserDismissed','unsupported_browser_dismissed_v1'];try{for(var i=0;i<keys.length;i++){var s=null;try{s=localStorage.getItem(keys[i])}catch(e){}if(s){return;}}}catch(e){}function isOld(){try{if(typeof Promise==='undefined')return true;if(typeof fetch==='undefined')return true; if(typeof Array.prototype.includes!=='function')return true; if(typeof Object.assign!=='function')return true; var ua=(navigator.userAgent||'').toLowerCase(); if(/msie |trident\//.test(ua))return true; var m=ua.match(/chrome\/(\d+)/); if(/android 4\./.test(ua) && m && parseInt(m[1],10)<80) return true; var fm=ua.match(/firefox\/(\d+)/); if(fm && parseInt(fm[1],10)<60) return true; return false;}catch(e){return false;}} if(isOld()){ try{ if(window && window.location && window.location.pathname && window.location.pathname.indexOf('/oldbrowser.html')===-1){ window.location.replace('/oldbrowser.html'); } }catch(e){} } }catch(e){} })();" }} />
      
      {/* fallback non-blocking script for slightly newer legacy browsers */}
      <Script src="/oldbrowser.js" strategy="afterInteractive" />
        {children}

      </body>
    </html>
  );
}
