import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";

const FeatureComponent = ({ item }) => {
  const name = _.get(item, ["name"], "");
  const icon = _.get(item, ["icon"], "");

  return (
    <div className="feature-container">
      <div className="feature-icon-container">
        <CustomImage src={icon} imageStyle={{ width: 50, height: 50 }} />
      </div>

      <CustomText textClassName="font-size-small font-bold">{name}</CustomText>
    </div>
  );
};

export default FeatureComponent;
