import { Toaster } from "react-hot-toast";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/utils/store";
import { useRouter } from "next/router";
import { isEmpty, get, isEqual } from "lodash";
import "react-multi-carousel/lib/styles.css";
import "@/styles/globals.scss";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import "@/src/lib/swiper/swiper.css";
import "@/src/lib/swiper/modules/effect-cards.css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import * as commonAction from "@/src/actions/common";
import React, { useEffect, useRef } from "react";
import * as commonSelector from "@/src/selectors/common";
import { DefaultSeo } from "next-seo";
import Images from "@/src/utils/Image";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      {/*<PersistGate loading={null} persistor={persistor}>*/}
      <AppContent Component={Component} pageProps={pageProps} />
      {/*</PersistGate>*/}
    </Provider>
  );
}

function AppContent({ Component, pageProps }) {
  const router = useRouter();
  const pathname = get(router, ["pathname"], "");
  const dispatch = useDispatch();
  const divRef = useRef();

  const getSelectOptionRequest = () =>
    dispatch(commonAction.getSelectOptionRequest());
  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const selectOptionDataLoading = useSelector((state) =>
    commonSelector.getSelectOptionDateLoading(state),
  );

  useEffect(() => {
    if (isEmpty(selectOptionData)) {
      getSelectOptionRequest();
    }
  }, []);

  useEffect(() => {
    typeof window !== "undefined" &&
      document.addEventListener("gesturestart", function (e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
      });

    typeof window !== "undefined" &&
      document.addEventListener("gesturechange", function (e) {
        e.preventDefault();

        document.body.style.zoom = 0.99;
      });

    typeof window !== "undefined" &&
      document.addEventListener("gestureend", function (e) {
        e.preventDefault();
        document.body.style.zoom = 1;
      });
  }, []);

  return (
    <div ref={divRef}>
      <Head>
        <meta
          name="keywords"
          content="CozyHomes, Property, Rental Management, Smart Meter"
        />
        {/*<title>CozyHomes</title>*/}
        {/*<meta*/}
        {/*  name="description"*/}
        {/*  content="Your one-stop solution to Property & Tenant Management. Part of The Makeover Guys @themakeover.my"*/}
        {/*/>*/}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=1"
          name="viewport"
        />
        <meta name="theme-color" content="#36A9E1" />
        <meta name="msapplication-navbutton-color" content="#36A9E1" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#36A9E1" />

        <meta name="msvalidate.01" content="74EA887B8E4E9BA232E18AB9F69FDC63" />

        <meta
          name="google-site-verification"
          content="GSqA3N1MuPQZCb1VL6Fws8kSrrC3sKXCR0d7wGmvLmk"
        />

        <link rel="icon" href="/cozyHomes/favicon.ico" sizes="any" />
        <link rel="icon" sizes="32x32" href="/cozyHomes/favicon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/cozyHomes/favicon-16x16.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/cozyHomes/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/cozyHomes/android-chrome-512x512.png"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/cozyHomes/apple-touch-icon.png"
        />

        <link rel="manifest" href="/cozyHomes/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <script
            strategy="afterInteractive"
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-JSLN7PTKGY"
          ></script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <script id="" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JSLN7PTKGY');
            `}
          </script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <script
            id="Organization"
            type="application/ld+json"
            strategy="afterInteractive"
          >
            {`{
              "@context": "https://schema.org",
              "@type": "Organization",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MY",
                "addressLocality": "Malaysia, Selangor",
                "postalCode": "47500",
                "streetAddress":
                  "No. 42-46, Ground Floor, Jalan SS 19/1D, Subang Jaya, Selangor."
              },
              "email": "spacify.asia@gmail.com",
              "name": "CozyHomes | The Property Guys Sdn Bhd",
              "telephone": "+603-58789831",
              "url": "https://www.sapcify.asia/",
              "image": "${Images.logo}",
              "logo": "${Images.logo}",
              "description":
                "Your one-stop solution to Property & Tenant Management. Part of The Makeover Guys @themakeover.my"
            }`}
          </script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <script
            id="LocalBusiness"
            type="application/ld+json"
            strategy="afterInteractive"
          >
            {`{
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "MY",
                  "postalCode": "47500",
                  "addressLocality": "Malaysia, Selangor",
                  "addressRegion": "MY",
                  "streetAddress":
                    "No. 42-46, Ground Floor, Jalan SS 19/1D, Subang Jaya, Selangor."
                },
                "description":
                  "Your one-stop solution to Property & Tenant Management. Part of The Makeover Guys @themakeover.my",
                "name": "CozyHomes | The Property Guys Sdn Bhd",
                "telephone": "+603-58789831",
                "url": "https://www.sapcify.asia/",
                "image": "${Images.logo}"
              }`}
          </script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <script
            id="WebSite"
            type="application/ld+json"
            strategy="afterInteractive"
          >
            {`{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "CozyHomes | The Property Guys Sdn Bhd",
                "image": "${Images.logo}",
                "url": "https://www.sapcify.asia/",
                "description":
                  "Your one-stop solution to Property & Tenant Management. Part of The Makeover Guys @themakeover.my"
              }`}
          </script>
        ) : (
          false
        )}
      </Head>

      <Toaster />

      <Component {...pageProps} />
    </div>
  );
}

export default appWithTranslation(MyApp);
