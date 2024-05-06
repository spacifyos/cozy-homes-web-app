import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomEmptyBox = ({
  emptyImage = Images.emptyImage,
  emptyTitle = "Data not available now!",
}) => {
  return (
    <div className={"flex justify-center items-center flex-col"}>
      <div className={"pb-2"}>
        <CustomImage src={emptyImage} width={60} height={60} />
      </div>
      <CustomText textClassName="font-size-small">{emptyTitle}</CustomText>
    </div>
  );
};

export default CustomEmptyBox;
