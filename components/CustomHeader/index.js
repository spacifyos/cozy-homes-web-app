import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomHeader = ({ children, pageTitle, hideGoBackButton = false }) => {
  return (
    <div className="global-horizontal-padding flex-1 relative bg-color ">
      <CustomImage
        className={"absolute right-0 w-3/5"}
        src={Images.topBackgroundImage}
      />

      <div className="flex items-center pb-5 pt-12">
        {hideGoBackButton ? (
          false
        ) : (
          <CustomImage className={"me-5 w-2.5"} src={Images.leftIcon} />
        )}
        <CustomText textClassName={"font-bold"} styles={{ fontSize: 20 }}>
          {pageTitle}
        </CustomText>
      </div>
      {children}
    </div>
  );
};

export default CustomHeader;
