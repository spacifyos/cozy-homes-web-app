import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";

export { getServerSideProps };

const MyMeter = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToMeterOverview = (id) => {
    router.push(`/my-meter/${id}`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myMeter")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      rightButtonIcon={Images.filterProIcon}
    >
      <div className="pb-1 global-horizontal-padding">
        {_.map(Array(12), (item, index) => (
          <MeterUsageComponent
            t={t}
            key={index}
            onClickToMeterOverview={onClickToMeterOverview}
          />
        ))}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyMeter);
