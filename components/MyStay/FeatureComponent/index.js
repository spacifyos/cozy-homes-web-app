import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";

const FeatureComponent = ({ item }) => {
  const name = _.get(item, ["name"], "");
  const icon = _.get(item, ["icon"], "");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="global-box-shadow global-border-radius w-full p-3 mb-2 flex justify-center items-center min-h-24 primaryWhite-bg-color">
        <CustomImage src={icon} imageStyle={{ width: 50, height: 55 }} />
      </div>

      <CustomText textClassName="font-size-small font-bold">{name}</CustomText>
    </div>
  );
};

export default FeatureComponent;
