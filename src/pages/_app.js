import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import { NextUIProvider } from "@nextui-org/react";
import { useState } from 'react';
import { useRouter } from 'next/router';
import System from '@/contexts/System.js';

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(' dark text-foreground bg-background ');
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <System value={{ theme, setTheme }}>
        <Head>
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />

          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png" />
          <link rel="manifest" href="/favicon_package/site.webmanifest" />
          <link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg" color="#eb5604" />
          <meta name="apple-mobile-web-app-title" content="Origin" />
          <meta name="application-name" content="Origin" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
          <title>會員禮計算機</title>

          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="apple-mobile-web-app-title" content="會員禮計算機" />
          <meta name="application-name" content="會員禮計算機" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="msapplication-TileImage" content="/favicon/mstile-144x144.png" />
          <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
        </Head>
        <div className={theme + ' min-h-[100vh]'}>
          <Component {...pageProps}></Component>
        </div>
      </System>
    </NextUIProvider>
  )
}