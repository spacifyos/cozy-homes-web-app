import Color from "@/src/utils/Color";
import { Toaster } from "react-hot-toast";
import { appWithTranslation, useTranslation } from "next-i18next";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/src/utils/store";
import BottomNavigate from "@/components/BottomNavigate";
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
import { useEffect } from "react";
import * as commonSelector from "@/src/selectors/common";
import { DefaultSeo } from "next-seo";
import Images from "@/src/utils/Image";
import Helper from "@/src/utils/Helper";

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
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");
  const pathname = get(router, ["pathname"], "");
  const dispatch = useDispatch();

  const getSelectOptionRequest = () =>
    dispatch(commonAction.getSelectOptionRequest());
  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const selectOptionDataLoading = useSelector((state) =>
    commonSelector.getSelectOptionDateLoading(state),
  );

  useEffect(() => {
    const chatBotElements = Array.from(
      document.getElementsByClassName("bot--bubble-holder"),
    );
    const botWidget = Array.from(
      document.getElementsByClassName("bot-widget-holder"),
    );
    //
    //   botWidget.forEach((element) => {
    //     element.remove();
    //   });
    //
    //   chatBotElements.forEach((element) => {
    //     element.remove();
    //   });
    //
    //   const script = Helper.documentGetElementById(src);
    //   if (script) {
    //     document.body.removeChild(script);
    //   }
    // }

    if (!isEmpty(botWidget)) {
      for (let i = 0; i < botWidget.length; i++) {
        if (isEqual(pathname, "/chat")) {
          botWidget[i].style.display = "block";

          // window.location.reload()
          // // router.reload();
          // return;
        } else {
          botWidget[i].style.display = "none";
        }
      }
    }

    if (!isEmpty(chatBotElements)) {
      for (let i = 0; i < chatBotElements.length; i++) {
        if (isEqual(pathname, "/chat")) {
          chatBotElements[i].style.display = "block";
        } else {
          chatBotElements[i].style.display = "none";
        }
      }
    }
  }, [router]);

  useEffect(() => {
    if (isEmpty(selectOptionData)) {
      getSelectOptionRequest();
    }
  }, []);

  const onClickChangeTab = (route) => {
    router.push(route);
  };

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
    <div
      className={
        "flex flex-col justify-center items-center h-full overflow-hidden"
      }
      style={{ backgroundColor: Color.primaryBgColor }}
    >
      <DefaultSeo
        title="Spacify Asia"
        openGraph={{
          url: process.env.DOMAIN,
          title: "Spacify Asia",
          description: "",
          images: [
            {
              url: Images.logoImage,
              width: 1080,
              height: 810,
              alt: `Spacify Image`,
            },
          ],
          siteName: process.env.DOMAIN,
        }}
      />
      <div
        style={{ maxWidth: 500, zIndex: 1 }}
        className={
          "primaryWhite-bg-color flex flex-col w-screen min-h-screen h-full relative overflow-hidden"
        }
      >
        <Toaster />

        <Component {...pageProps} />

        {isEqual(routeName, "/explore") ||
        isEqual(routeName, "/my-property") ||
        isEqual(routeName, "/owner") ||
        isEqual(routeName, "/account") ||
        isEqual(routeName, "/owner/account") ||
        isEqual(routeName, "/sign-in") ||
        isEqual(routeName, "/chat") ||
        isEqual(routeName, "/owner/chat") ? (
          <BottomNavigate
            t={t}
            routeName={routeName}
            routeQuery={routeQuery}
            onClickChangeTab={onClickChangeTab}
          />
        ) : (
          false
        )}
      </div>
    </div>
  );
}

export default appWithTranslation(MyApp);
