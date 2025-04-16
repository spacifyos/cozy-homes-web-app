import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const DesktopFeatureSection = ({}) => {
  return (
    <div className="flex gap-5 pb-7">
      <FeatureComponent disable name="Scan" icon={Images.qrIconActive} />
      <FeatureComponent
        disable
        name="Smart Lock"
        icon={Images.smartLockIconActive}
      />
      {/*<FeatureComponent*/}
      {/*  name="E Agreement"*/}
      {/*  icon={Images.agreementIconActive}*/}
      {/*  route="/user/e-agreement"*/}
      {/*/>*/}
      <FeatureComponent
        disable
        name="Help Center"
        icon={Images.helpCenterIconActive}
      />
    </div>
  );
};

export default DesktopFeatureSection;
