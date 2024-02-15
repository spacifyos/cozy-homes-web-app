import "@/styles/globals.css";
import Color from "@/src/utils/Color";
import { Toaster } from "react-hot-toast";
import { appWithTranslation } from "next-i18next";
import { makeStore } from "../src/utils/store";
import withRedux from "next-redux-wrapper";

function App({ Component, pageProps }) {
  return (
    <div
      className={"flex flex-col justify-center items-center h-screen"}
      style={{ backgroundColor: Color.primaryBgColor }}
    >
      <div
        className={
          "flex flex-col w-screen max-w-screen-sm h-full relative overflow-scroll"
        }
      >
        <Toaster />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default appWithTranslation(withRedux(makeStore)(App));
