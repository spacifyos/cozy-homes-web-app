import Images from "@/src/utils/Image";
import _ from "lodash";
import MeterFeatureComponent from "@/components/MyMeter/MeterFeatureComponent";

const MeterFeature = ({ t, onClickToTopUpMeter }) => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-center pb-7">
      <MeterFeatureComponent
        name={"Top Up"}
        icon={Images.topUpIcon}
        onClick={()=>onClickToTopUpMeter(1)}
      />

      <MeterFeatureComponent
        name={"Clear Balance"}
        icon={Images.clearIcon}
      />

      <MeterFeatureComponent
        name={"Usage"}
        icon={Images.usageIcon}
      />

      <MeterFeatureComponent
        name={"Disconnect"}
        icon={Images.disconnect}
      />
    </div>
  );
};

export default MeterFeature;
