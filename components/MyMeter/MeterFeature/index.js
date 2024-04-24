import Images from "@/src/utils/Image";
import _ from "lodash";
import MeterFeatureComponent from "@/components/MyMeter/MeterFeatureComponent";

const MeterFeature = ({ t, onClickToTopUpMeter }) => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-center pb-7">
      <MeterFeatureComponent
        name={t("myMeterOverview.topUp")}
        icon={Images.topUpIcon}
        onClick={onClickToTopUpMeter}
      />

      <MeterFeatureComponent
        name={t("myMeterOverview.clearBalance")}
        icon={Images.clearIcon}
      />

      <MeterFeatureComponent
        name={t("myMeterOverview.usage")}
        icon={Images.usageIcon}
      />

      <MeterFeatureComponent
        name={t("myMeterOverview.disconnect")}
        icon={Images.disconnect}
      />
    </div>
  );
};

export default MeterFeature;
