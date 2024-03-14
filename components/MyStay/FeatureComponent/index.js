import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";

const FeatureComponent = ({ item }) => {
  const name = _.get(item, ["name"], "");
  const icon = _.get(item, ["icon"], "");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="global-box-shadow global-border-radius p-3 mb-2 flex justify-center items-center min-h-24 primaryWhite-bg-color">
        <CustomImage src={icon} height={50} width={50} className="w-3/5"  />
      </div>

      <CustomText textClassName="font-semibold">{name}</CustomText>
    </div>
  );
};

export default FeatureComponent;
