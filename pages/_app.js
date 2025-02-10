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
import Helper from "@/src/utils/Helper";
import Head from "next/head";
import Script from "next/script";

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

  // useEffect(() => {
  //   for (let i = 0; i < botWidget.length; i++) {
  //     if (isEqual(pathname, "/user/chat")||isEqual(pathname, "/user/owner/chat")) {
  //       botWidget[i].style.display = "block";
  //     } else {
  //       botWidget[i].style.display = "none";
  //     }
  //   }
  // }, [divRef.current, router, botWidget]);

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
        {/*<link rel="canonical" href={`${process.env.DOMAIN}`} />*/}
        <meta
          name="keywords"
          content="Spacify Asia, Property, Rental Management, Smart Meter"
        />
        {/*<title>Spacify Asia</title>*/}
        {/*<meta*/}
        {/*  name="description"*/}
        {/*  content="Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!"*/}
        {/*/>*/}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          content="width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=5"
          name="viewport"
        />
        <meta name="theme-color" content="#d71440" />
        <meta name="msapplication-navbutton-color" content="#d71440" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#d71440" />

        <meta name="msvalidate.01" content="74EA887B8E4E9BA232E18AB9F69FDC63" />

        <meta
          name="google-site-verification"
          content="GSqA3N1MuPQZCb1VL6Fws8kSrrC3sKXCR0d7wGmvLmk"
        />

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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap"
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
          <Script
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
              "name": "Spacify Asia | BELIVE VENTURES SDN BHD",
              "telephone": "+603-58789831",
              "url": "https://www.sapcify.asia/",
              "image": "${Images.logoImage}",
              "logo": "${Images.logoImage}",
              "description":
                "Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!"
            }`}
          </Script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script
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
                  "Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!",
                "name": "Spacify Asia | BELIVE VENTURES SDN BHD",
                "telephone": "+603-58789831",
                "url": "https://www.sapcify.asia/",
                "image": "${Images.logoImage}"
              }`}
          </Script>
        ) : (
          false
        )}

        {isEqual(process.env.PRODUCTION, "PRODUCTION") ? (
          <Script
            id="WebSite"
            type="application/ld+json"
            strategy="afterInteractive"
          >
            {`{
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Spacify Asia | BELIVE VENTURES SDN BHD",
                "image": "${Images.logoImage}",
                "url": "https://www.sapcify.asia/",
                "description":
                  "Don't be lost finding quality & affordable rooms for rent! Find and rent a Spacify-standard room you love with ease now!"
              }`}
          </Script>
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
