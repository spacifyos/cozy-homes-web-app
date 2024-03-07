import { withTranslation, useTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

function Home() {
  const { t } = useTranslation("common");

  return <div className="primaryWhite-bg-color flex-1"></div>;
}

export default withTranslation("common")(Home);
