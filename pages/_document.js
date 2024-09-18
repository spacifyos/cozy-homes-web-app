import { Html, Head, Main, NextScript } from "next/document";
import Images from "@/src/utils/Image";
import { isEqual } from "lodash";
import Script from "next/script";
import React, { useEffect } from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Spacify Asia" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#d71440" />
        <meta name="msapplication-navbutton-color" content="#d71440" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#d71440" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JSLN7PTKGY"
          />
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script id="" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JSLN7PTKGY');
            `}
          </Script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script id="" type="application/ld+json" strategy="afterInteractive">
            {`{
              "@context": "https://schema.org",
              "@type": "Organization",
              address: {
                "@type": "PostalAddress",
                addressCountry: "MY",
                addressLocality: "Malaysia, Selangor",
                postalCode: "47500",
                streetAddress:
                  "No. 42-46, Ground Floor, Jalan SS 19/1D, Subang Jaya, Selangor.",
              },
              email: "spacify.asia@gmail.com",
              name: "Spacify Asia | BELIVE VENTURES SDN BHD",
              telephone: "+603-58789831",
              url: "https://www.sapcify.asia/",
              image: Images.logoImage,
              logo: Images.logoImage,
              description:
                "Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!",
            }`}
          </Script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script id="" type="application/ld+json">
            {`{
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                address: {
                  "@type": "PostalAddress",
                  addressCountry: "MY",
                  postalCode: "47500",
                  addressLocality: "Malaysia, Selangor",
                  addressRegion: "MY",
                  streetAddress:
                    "No. 42-46, Ground Floor, Jalan SS 19/1D, Subang Jaya, Selangor.",
                },
                description:
                  "Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!",
                name: "Spacify Asia | BELIVE VENTURES SDN BHD",
                telephone: "+603-58789831",
                url: "https://www.sapcify.asia/",
                image: Images.logoImage,
              }`}
          </Script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script type="application/ld+json">
            {`{
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Spacify Asia | BELIVE VENTURES SDN BHD",
                image: Images.logoImage,
                url: "https://www.sapcify.asia/",
                description:
                  "Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!",
              }`}
          </Script>
        ) : (
          false
        )}
      </Head>
      <body id="root-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
