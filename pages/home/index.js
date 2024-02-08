import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");

  return <h1>{t("h1")}</h1>;
}

export default withTranslation("common")(Home);
