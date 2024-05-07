import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import _ from "lodash";

const DetailComponent = ({ propertyName, unitRoomName, address }) => {
  return (
    <div className="pb-4 pt-7">
      <div className=" flex flex-col items-start">
        <CustomText textClassName="font-size-large font-bold">
          {propertyName}
        </CustomText>

        <CustomText textClassName="font-size-normal font-bold primary-text pb-1">
          {unitRoomName}
        </CustomText>
        <CustomText textClassName="disable-text font-size-small pb-1">
          {address}
        </CustomText>
      </div>
    </div>
  );
};

export default DetailComponent;
