import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const MeterSection = ({ data }) => {
  return (
    <div className="pb-7">
      <div className="flex justify-between items-center pb-2">
        <CustomText textClassName="section-title">
          My Meter
        </CustomText>

        <a href={"/user/my-meter"} className="flex">
          <CustomText textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
            View More
          </CustomText>

          <CustomImage src={Images.rightIcon} className="w-1.5" />
        </a>
      </div>

      {isEmpty(data) ? (
        <CustomEmptyBox emptyTitle="No meter found" />
      ) : (
        map(data, (item, index) => {
          return <MeterComponent key={index} item={item} />;
        })
      )}
    </div>
  );
};

export default MeterSection;
