import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomHeader = ({ children, pageTitle }) => {
  return (
    <div className="global-horizontal-padding flex-1 relative ">
      <CustomImage
        className={"absolute right-0 w-3/5 h-20"}
        src={Images.topBackgroundImage}
      />
      <div className="flex items-center pb-5 pt-10">
        <CustomImage className={"me-5 w-2.5"} src={Images.rightIcon} />
        <CustomText textClassName={"font-bold"} styles={{ fontSize: 20 }}>
          {pageTitle}
        </CustomText>
      </div>
      {children}
    </div>
  );
};

export default CustomHeader;
