import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";
import {
  QrIcon,
  SmartLockIcon,
  HelpCenterIcon,
} from "@/components/Icons";

const DesktopFeatureSection = ({}) => {
  return (
    <div className="flex gap-5 pb-7">
      <FeatureComponent disable name="Scan" icon={QrIcon} />
      <FeatureComponent
        disable
        name="Smart Lock"
        icon={SmartLockIcon}
      />
      <FeatureComponent
        disable
        name="Help Center"
        icon={HelpCenterIcon}
      />
    </div>
  );
};

export default DesktopFeatureSection;
