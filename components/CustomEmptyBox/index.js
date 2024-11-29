import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomEmptyBox = ({
  emptyImage = Images.questionMarkIcon,
  emptyTitle = "No data found",
  emptyDesc = "No data available now try again later.",
  textColor = "disable-text",
}) => {
  return (
    <div className={"flex justify-center items-center flex-col px-4"}>
      <div className={"pb-2"}>
        <CustomImage src={emptyImage} imageStyle={{ width: 60 }} />
      </div>
      <CustomText
        textClassName={`text-base font-semibold pb-1 ${textColor}`}
      >
        {emptyTitle}
      </CustomText>
      <CustomText textClassName={`text-sm ${textColor}`}>
        {emptyDesc}
      </CustomText>
    </div>
  );
};

export default CustomEmptyBox;
