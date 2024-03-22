import Color from "@/src/utils/Color";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import SplashScreen from "@/pages/splash-screen";
import { useEffect } from "react";
import { useRouter } from "next/router";
import _ from "lodash";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const router = useRouter();

  // useEffect(() => {
  //   setTimeout(() => {
  //     router.replace("/explore");
  //   }, 1000);
  // });

  return (
    <div
      className={"container flex-1 h-screen"}
      style={{ backgroundColor: Color.primaryWhiteColor }}
    >
      <SplashScreen />
    </div>
  );
}

export default withTranslation("common")(Home);
