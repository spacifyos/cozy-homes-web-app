import Color from "@/src/utils/Color";
import { Toaster } from "react-hot-toast";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/utils/store";
import BottomNavigate from "@/components/BottomNavigate";
import { useRouter } from "next/router";
import _ from "lodash";
import "react-multi-carousel/lib/styles.css";
import "@/styles/globals.scss";
import "react-multi-carousel/lib/styles.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import "@/src/lib/swiper/swiper.css";
import "@/src/lib/swiper/modules/effect-cards.css";

function App({ Component, pageProps }) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeName = _.get(router, ["route"], "");

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div
          className={
            "flex flex-col justify-center items-center h-full overflow-hidden"
          }
          style={{ backgroundColor: Color.primaryBgColor }}
        >
          <div
            style={{ maxWidth: 500 }}
            className={
              "primaryWhite-bg-color flex flex-col w-screen min-h-screen h-full relative overflow-hidden"
            }
          >
            <Toaster />

            <Component {...pageProps} />

            {_.isEqual(routeName, "/explore") ||
            _.isEqual(routeName, "/my-stay") ||
            _.isEqual(routeName, "/account") ||
            _.isEqual(routeName, "/sign-in") ? (
              <BottomNavigate
                t={t}
                routeName={routeName}
                onClickChangeTab={onClickChangeTab}
              />
            ) : (
              false
            )}
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default appWithTranslation(App);
