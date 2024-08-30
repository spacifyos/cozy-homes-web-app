import { Html, Head, Main, NextScript } from "next/document";
import Images from "@/src/utils/Image";
import { isEqual } from "lodash";

export default function Document() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Malaysia, Kuala Lumpur",
      postalCode: "F-75002",
      streetAddress: "38 avenue de l'Opéra",
    },
    email: "",
    name: "Spacify Asia",
    telephone: "",
    url: "https://www.sapcify.asia/",
    image: Images.logoImage,
    logo: Images.logoImage,
    description: "",
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mexico Beach",
      addressRegion: "MY",
      streetAddress: "3102 Highway 98",
    },
    description: "",
    name: "Spacify Asia",
    telephone: "",
    url: "https://www.sapcify.asia/",
    image: Images.logoImage,
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Spacify Asia",
    image: Images.logoImage,
    url: "https://www.sapcify.asia/",
    description: "",
  };

  const generateJsonLd = (schema) => {
    return {
      __html: JSON.stringify(schema),
    };
  };

  return (
    <Html lang="en">
      <Head>
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
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JSLN7PTKGY"
          ></script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <script>
            {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-JSLN7PTKGY');`}
          </script>
        ) : (
          false
        )}

        {/*{isEqual(process.env.PRODUCTION, "PRODUCTION") ? (*/}
        {/*  <script*/}
        {/*    type="application/ld+json"*/}
        {/*    dangerouslySetInnerHTML={generateJsonLd(organizationSchema)}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  false*/}
        {/*)}*/}

        {/*{isEqual(process.env.PRODUCTION, "PRODUCTION") ? (*/}
        {/*  <script*/}
        {/*    type="application/ld+json"*/}
        {/*    dangerouslySetInnerHTML={generateJsonLd(localBusinessSchema)}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  false*/}
        {/*)}*/}

        {/*{isEqual(process.env.PRODUCTION, "PRODUCTION") ? (*/}
        {/*  <script*/}
        {/*    type="application/ld+json"*/}
        {/*    dangerouslySetInnerHTML={generateJsonLd(websiteSchema)}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  false*/}
        {/*)}*/}
      </Head>
      <body id="root-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
