import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const DesktopFeatureSection = ({ t }) => {
  return (
    <div className="flex gap-5 pb-7">
      <FeatureComponent disable name={t("myStay.scan")} icon={Images.qrIcon} />
      <FeatureComponent
        disable
        name={t("myStay.smartLock")}
        icon={Images.lockIcon}
      />
      <FeatureComponent
        name={t("myStay.eAgreement")}
        icon={Images.agreementIconActive}
        route="/e-agreement"
      />
      <FeatureComponent
        disable
        name={t("myStay.helpCenter")}
        icon={Images.helpIcon}
      />
    </div>
  );
};

export default DesktopFeatureSection;
