import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const CustomOwnerHeader = ({
  onClickGoBack,
  title,
  hideGoBackButton = false,
  rightButton,
  rightButtonIcon,
  onClickRightButton,
  headerContent,
  children,
  className,
}) => {
  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className={`body-container py-5 ${className}`}>
        <div
          className={`flex items-center justify-between overflow-hidden pb-5`}
        >
          <div className="flex justify-center items-center">
            {hideGoBackButton ? (
              false
            ) : (
              <div onClick={onClickGoBack} className="cursor-pointer">
                <CustomImage
                  className={"me-5 cursor-pointer"}
                  src={Images.leftIconWhite}
                  imageStyle={{ width: 10 }}
                />
              </div>
            )}

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              {title}
            </CustomText>
          </div>

          {rightButton ? (
            rightButton
          ) : rightButtonIcon?(
            <CustomImage
              src={rightButtonIcon}
              imageStyle={{ width: 25, height: 25 }}
              onClick={onClickRightButton}
              className="cursor-pointer"
            />
          ):false}
        </div>

        {headerContent}
      </div>

      {children}
    </div>
  );
};

export default CustomOwnerHeader;
