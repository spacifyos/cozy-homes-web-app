import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomEmptyBox = ({ emptyImage = Images.emptyImage, emptyTitle = "Data cannot available now!" }) => {
  return (
    <div className={"flex justify-center items-center flex-col"}>
      <div className={"pb-3"}>
          <CustomImage src={emptyImage} width={"100"} />
      </div>
      <CustomText>{emptyTitle}</CustomText>
    </div>
  );
};

export default CustomEmptyBox;
