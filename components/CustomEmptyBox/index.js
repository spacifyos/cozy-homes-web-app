import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomEmptyBox = ({
  emptyImage = Images.questionMarkIcon,
  emptyTitle = "No data found",
  emptyDesc = "No content found try again later.",
}) => {
  return (
    <div className={"flex justify-center items-center flex-col px-4"}>
      <div className={"pb-2"}>
        <CustomImage src={emptyImage} width={60} height={60} />
      </div>
      <CustomText textClassName="font-size-large font-bold disable-text">
        {emptyTitle}
      </CustomText>
      <CustomText textClassName="font-size-xsmall disable-text">
        {emptyDesc}
      </CustomText>
    </div>
  );
};

export default CustomEmptyBox;
