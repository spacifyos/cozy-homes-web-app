import "@/styles/globals.css";
import Color from "@/src/utils/Color";
import { Toaster } from "react-hot-toast";
import { appWithTranslation } from "next-i18next";

function App({ Component, pageProps }) {
  return (
    <div
      className={"flex flex-col justify-center items-center h-screen"}
      style={{ backgroundColor: Color.primaryBgColor }}
    >
      <div className={"flex flex-col w-screen max-w-screen-sm h-full"}>
        <Toaster />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default appWithTranslation(App);
