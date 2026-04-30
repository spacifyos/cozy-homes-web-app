import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";
import {
  QrIcon,
  SmartLockIcon,
  AgreementIcon,
  HelpCenterIcon,
} from "@/components/Icons";

const FeatureSection = ({ }) => {
  return (
    <div className="grid grid-cols-4 gap-4 flex justify-center pb-7">
      <FeatureComponent disable name={"Scan"} icon={QrIcon} />
      <FeatureComponent
        disable
        name={"Smart Lock"}
        icon={SmartLockIcon}
      />
      <FeatureComponent
        name={"EAgreement"}
        icon={AgreementIcon}
        route="/user/e-agreement"
      />
      <FeatureComponent
        disable
        name={"help Center"}
        icon={HelpCenterIcon}
      />
    </div>
  );
};

export default FeatureSection;
