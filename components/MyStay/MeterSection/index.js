import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";
import { isEmpty, map } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Icons from "@/components/Icons";

const MeterSection = ({ data }) => {
  return (
    <div className="pb-7">
      <div className="flex justify-between items-center pb-2">
        <CustomText textClassName="section-title">My Meter</CustomText>

        <a href={"/user/my-meter"} className="flex">
          <CustomText textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs">
            View More
          </CustomText>

          <CustomImage src={Icons.rightIconBlack} className="w-1.5" />
        </a>
      </div>

      {isEmpty(data) ? (
        <div className="bg-white p-6 global-border-radius global-box-shadow">
          <CustomEmptyBox
          variant="meter"
          emptyTitle="No meters connected"
          emptyDesc="Meter readings will appear here once your unit is set up."
        />
        </div>
      ) : (
        map(data, (item, index) => {
          return <MeterComponent key={index} item={item} />;
        })
      )}
    </div>
  );
};

export default MeterSection;
