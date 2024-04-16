import CustomText from "@/components/CustomText";
import _ from "lodash";

const TenancyFeeComponent = ({ item }) => {
  const name = _.get(item, ["name"], "");
  const num = _.get(item, ["num"], "");

  return (
    <div className="flex flex-row gap-2 pb-2 w-full justify-between">
      <CustomText textClassName="font-bold">{name}</CustomText>

      <CustomText>{num}</CustomText>
    </div>
  );
};

export default TenancyFeeComponent;
