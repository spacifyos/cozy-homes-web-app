import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const FeatureSection = ({ t, onClickToAgreement}) => {
  const featureLists = [
    { name: t("myStay.scan"), icon: Images.qrIcon },
    { name: t("myStay.smartLock"), icon: Images.lockIcon },
    { name: t("myStay.eAgreement"), icon: Images.agreementIcon },
    { name: t("myStay.helpCenter"), icon: Images.helpIcon },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 flex justify-center pb-7">
      <FeatureComponent name={t("myStay.scan")} icon={Images.qrIcon} />
      <FeatureComponent name={t("myStay.smartLock")} icon={Images.lockIcon} />
      <FeatureComponent
        name={t("myStay.eAgreement")}
        icon={Images.agreementIcon}
        onClickToNextPage={onClickToAgreement}
      />
      <FeatureComponent name={t("myStay.helpCenter")} icon={Images.helpIcon} />
    </div>
  );
};

export default FeatureSection;
