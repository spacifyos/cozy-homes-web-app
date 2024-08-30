import Script from "next/script";
import React from "react";

const GoogleAnalytic = () => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-JSLN7PTKGY"
      ></Script>
      <Script strategy="lazyOnload" id="">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JSLN7PTKGY', {page_path: window.location.pathname,});
            `}
      </Script>
    </>
  );
};

export default GoogleAnalytic;
