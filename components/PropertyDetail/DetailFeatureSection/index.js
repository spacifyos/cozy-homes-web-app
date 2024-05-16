import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";

const DetailFeatureSection = ({ item }) => {
    const icon = _.get(item,["icon"],"")
    const name=_.get(item,["name"],"")
    const detail=_.get(item,["detail"],"")
    const bgColor=_.get(item,["bgColor"],"")
  return (
      <div className={`detail-feature-container ${bgColor}`}>
        <CustomImage src={icon} width={20} />
        <CustomText textClassName="disable-text font-size-xxsmall h-8 leading-3">
          {name}
        </CustomText>
        <CustomText textClassName="primary-text font-size-small font-bold">
          {detail}
        </CustomText>
      </div>
  );
};

export default DetailFeatureSection;
