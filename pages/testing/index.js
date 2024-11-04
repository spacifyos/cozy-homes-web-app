import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import BottomNavigate from "@/components/BottomNavigate";
import { get } from "lodash";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

const Testing = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

  const onClickGoBack = () => {
    router.back();
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <CustomHeader pageTitle="Reno Expert" onClickGoBack={onClickGoBack}>
      <iframe
        src="https://staging.renoxpert.my/owner/home"
        style={{ width: "100%", height: "100%" }}
      />

      <BottomNavigate
        t={t}
        routeName={routeName}
        routeQuery={routeQuery}
        onClickChangeTab={onClickChangeTab}
      />
    </CustomHeader>
  );
};

export default withTranslation("common")(Testing);
