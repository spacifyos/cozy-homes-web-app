import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import MeterRadialProgressComponent from "@/components/MyMeter/MeterRadialProgressComponent";
import MeterDetail from "@/components/MyMeter/MeterDetail";
import BalanceUnit from "@/components/MyMeter/BalanceUnit";
import MeterFeature from "@/components/MyMeter/MeterFeature";
import MeterUsageSection from "@/components/MyMeter/MeterUsageSection";
import { useRouter } from "next/router";
import { useState } from "react";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";

export { getServerSideProps };

const MyMeter = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToMeterOverview = () => {
    router.push(`/my-meter/1`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myMeter")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      rightButtonIcon={Images.filterProIcon}
    >
      <div className="pb-1 global-horizontal-padding">
        {_.map(Array(12), (item) => (
          <MeterUsageComponent
            t={t}
            onClickToMeterOverview={onClickToMeterOverview}
          />
        ))}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyMeter);
