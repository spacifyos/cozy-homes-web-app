import Images from "@/src/utils/Image";
import _ from "lodash";
import FeatureComponent from "@/components/MyStay/FeatureComponent";

const featureLists = [
  { name: "Scan", icon: Images.qrIcon },
  // { name: "Smart Lock", icon: Images.lockIcon },
  { name: "E-Agreement", icon: Images.agreementIcon },
  { name: "Help Center", icon: Images.helpIcon },
];

const FeatureSection = () => {
  return (
    <div className="grid grid-cols-3 gap-4 flex justify-center pb-7">
      {_.map(featureLists, (item) => {
        return <FeatureComponent item={item} />;
      })}
    </div>
  );
};

export default FeatureSection;
