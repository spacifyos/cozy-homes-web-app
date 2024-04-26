import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const FeatureSection = ({ t, onClickToAgreement, onClickToHelpCenter }) => {
  return (
    <div className="grid grid-cols-4 gap-4 flex justify-center pb-7">
      <FeatureComponent name={t("myStay.scan")} icon={Images.qrIcon} />
      <FeatureComponent name={t("myStay.smartLock")} icon={Images.lockIcon} />
      <FeatureComponent
        name={t("myStay.eAgreement")}
        icon={Images.agreementIconActive}
        onClickToNextPage={onClickToAgreement}
      />
      <FeatureComponent name={t("myStay.helpCenter")} icon={Images.helpIcon} onClickToHelpCenter={onClickToHelpCenter}/>
    </div>
  );
};

export default FeatureSection;
