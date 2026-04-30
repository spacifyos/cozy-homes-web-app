import _ from "lodash";
import MeterFeatureComponent from "@/components/MyMeter/MeterFeatureComponent";
import {
  TopUpIcon,
  ClearIcon,
  UsageIcon,
  DisconnectIcon,
} from "@/components/Icons";

const MeterFeature = ({ t, onClickToTopUpMeter }) => {
  return (
    <div className="grid grid-cols-4 gap-4 justify-center pb-7">
      <MeterFeatureComponent
        name={"Top Up"}
        icon={TopUpIcon}
        onClick={() => onClickToTopUpMeter(1)}
      />

      <MeterFeatureComponent
        name={"Clear Balance"}
        icon={ClearIcon}
      />

      <MeterFeatureComponent
        name={"Usage"}
        icon={UsageIcon}
      />

      <MeterFeatureComponent
        name={"Disconnect"}
        icon={DisconnectIcon}
      />
    </div>
  );
};

export default MeterFeature;
