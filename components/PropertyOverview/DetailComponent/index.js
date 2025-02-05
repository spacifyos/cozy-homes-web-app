import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import _, { isEmpty } from "lodash";

const DetailComponent = ({ propertyName, unitRoomName, address }) => {
  return (
    <div className="pb-4 pt-3">
      <div className=" flex flex-col items-start">
        <CustomText textClassName="text-base font-bold pb-1">
          {isEmpty(propertyName) ? "-" : propertyName}
        </CustomText>

        {/*<CustomText textClassName="text-base font-bold text-primary pb-1">*/}
        {/*  {isEmpty(unitRoomName) ? "-" : unitRoomName}*/}
        {/*</CustomText>*/}
        <CustomText textClassName="text-disable text-sm pb-1">
          {isEmpty(address) ? "-" : address}
        </CustomText>
      </div>
    </div>
  );
};

export default DetailComponent;
