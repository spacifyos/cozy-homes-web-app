import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import _, { isEmpty } from "lodash";

const DetailComponent = ({ propertyName, unitRoomName, address }) => {
  return (
    <div className="pb-4 pt-3">
      <div className=" flex flex-col items-start">
        <CustomText textClassName="font-size-large font-bold">
          {isEmpty(propertyName) ? "-" : propertyName}
        </CustomText>

        <CustomText textClassName="font-size-normal font-bold primary-text pb-1">
          {isEmpty(unitRoomName) ? "-" : unitRoomName}
        </CustomText>
        <CustomText textClassName="disable-text font-size-small pb-1">
          {isEmpty(address) ? "-" : address}
        </CustomText>
      </div>
    </div>
  );
};

export default DetailComponent;
