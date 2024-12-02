import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomEmptyBox = ({
  emptyImage = Images.questionMarkIcon,
  emptyTitle = "No data found",
  emptyDesc = "No data available now try again later.",
  textColor = "#545454",
}) => {
  return (
    <div className={"flex justify-center items-center flex-col px-4"}>
      <div className={"pb-2"}>
        <CustomImage src={emptyImage} className="w-14" />
      </div>
      <CustomText
        textClassName={`xl:text-base lg:text-base md:text-base sm:text-sm text-sm font-semibold pb-1`}
        styles={{ color: textColor }}
      >
        {emptyTitle}
      </CustomText>
      <CustomText
        textClassName={`xl:text-sm lg:text-sm md:text-sm sm:text-sm text-xs`}
        styles={{ color: textColor }}
      >
        {emptyDesc}
      </CustomText>
    </div>
  );
};

export default CustomEmptyBox;
