import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const FeatureSection = ({ t }) => {
  const featureLists = [
    { name: t("myStay.scan"), icon: Images.qrIcon },
    // { name: "Smart Lock", icon: Images.lockIcon },
    { name: t("myStay.eAgreement"), icon: Images.agreementIcon },
    { name: t("myStay.helpCenter"), icon: Images.helpIcon },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 flex justify-center pb-7">
      {_.map(featureLists, (item) => {
        return <FeatureComponent item={item} />;
      })}
    </div>
  );
};

export default FeatureSection;
