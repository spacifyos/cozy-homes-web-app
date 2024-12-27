import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const FeatureSection = ({ }) => {
  return (
    <div className="grid grid-cols-4 gap-4 flex justify-center pb-7">
      <FeatureComponent disable name={"Scan"} icon={Images.qrIcon} />
      <FeatureComponent
        disable
        name={"Smart Lock"}
        icon={Images.lockIcon}
      />
      <FeatureComponent
        name={"EAgreement"}
        icon={Images.agreementIconActive}
        route="/user/e-agreement"
      />
      <FeatureComponent
        disable
        name={"help Center"}
        icon={Images.helpIcon}
      />
    </div>
  );
};

export default FeatureSection;
