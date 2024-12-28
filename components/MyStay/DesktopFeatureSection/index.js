import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const DesktopFeatureSection = ({}) => {
  return (
    <div className="flex gap-5 pb-7">
      <FeatureComponent disable name="Scan" icon={Images.qrIcon} />
      <FeatureComponent disable name="Smart Lock" icon={Images.lockIcon} />
      <FeatureComponent
        name="E Agreement"
        icon={Images.agreementIconActive}
        route="/user/e-agreement"
      />
      <FeatureComponent
        name="Help Center"
        icon={Images.helpIcon}
        disable
        // route="/user/help-center"
      />
    </div>
  );
};

export default DesktopFeatureSection;
