import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const CustomHeader = ({
  children,
  pageTitle,
  hideGoBackButton = false,
  hideBgImage = false,
  onClickGoBack,
  padding = false,
}) => {
  return (
    <div className="flex-1 relative bg-color">
      {hideBgImage ? (
        false
      ) : (
        <CustomImage
          className={"absolute right-0 w-3/5"}
          src={Images.topBackgroundImage}
        />
      )}

      <div
        className={`flex items-center global-horizontal-padding pb-5 ${padding ? "pt-12" : "pt-5"}`}
      >
        {hideGoBackButton ? (
          false
        ) : (
          <div onClick={onClickGoBack}>
            <CustomImage className={"me-5 w-2.5"} src={Images.leftIcon} />
          </div>
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
