import '@/styles/globals.css';
import React from 'react';
import Head from 'next/head';
import { NextUIProvider } from "@nextui-org/react";
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState(' dark text-foreground bg-background ');
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
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
        <title>Origin 網站管理平台</title>
      </Head>
      <div className={theme + ' min-h-[100vh]'}>
        <Component {...pageProps}></Component>
      </div>
    </NextUIProvider>
  )
}