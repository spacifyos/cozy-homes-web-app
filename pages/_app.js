import "@/styles/globals.scss";
import Color from "@/src/utils/Color";
import { Toaster } from "react-hot-toast";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/utils/store";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div
          className={"flex flex-col justify-center items-center h-screen"}
          style={{ backgroundColor: Color.primaryBgColor }}
        >
          <div
            style={{ maxWidth: 500 }}
            className={"flex flex-col w-screen h-full relative overflow-scroll"}
          >
            <Toaster />
            <Component {...pageProps} />
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default appWithTranslation(App);
