import { Inter } from "next/font/google";
import Color from "@/src/utils/Color";
import Toast from "@/src/utils/Toast";
import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");
  const notify = () => Toast.error("Wow so easy!");

  return (
    <div
      className={"container flex-1"}
      style={{ backgroundColor: Color.primaryWhiteColor }}
    >
      <button onClick={notify}>{t("h1")}</button>
    </div>
  );
}

export default withTranslation("common")(Home);
