import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";

const CustomHeader = ({
  children,
  pageTitle,
  hideGoBackButton = false,
  onClickGoBack,
  onClickRightButton,
  rightButtonIcon,
  padding = false,
  onClickRightSecondButton,
  rightSecondButtonIcon,
  rightContent,
  isFiltered = false,
}) => {
  return (
    <div
      style={{ maxWidth: 500, zIndex: 1 }}
      className={
        "sm:block primaryWhite-bg-color flex flex-col w-screen min-h-screen h-full relative overflow-hidden"
      }
    >
      <div className="flex-1 relative bg-color overflow-hidden flex flex-col">
        <div
          className={`flex items-center justify-between global-horizontal-padding pb-5 ${padding ? "pt-12" : "pt-5"} overflow-hidden`}
        >
          <div className="flex justify-center items-center">
            {hideGoBackButton ? (
              false
            ) : (
              <div onClick={onClickGoBack} className="cursor-pointer">
                <CustomImage
                  className={"me-5 cursor-pointer"}
                  src={Images.leftIcon}
                  imageStyle={{ width: 10, height: 10 }}
                />
              </div>
            )}

            <CustomText textClassName={"font-bold"} styles={{ fontSize: 18 }}>
              {pageTitle}
            </CustomText>
          </div>

          <div className="flex justify-center items-center gap-4">
            {isEmpty(rightSecondButtonIcon) ? (
              false
            ) : (
              <CustomImage
                src={rightSecondButtonIcon}
                imageStyle={{ width: 23, height: 23 }}
                onClick={onClickRightSecondButton}
                className="cursor-pointer"
              />
            )}

            <div
              style={{ width: 23, height: 23 }}
              onClick={onClickRightButton}
              className="relative"
            >
              {isEmpty(rightButtonIcon) ? (
                rightContent
              ) : (
                <CustomImage
                  src={rightButtonIcon}
                  imageStyle={{ width: 23, height: 23 }}
                  onClick={onClickRightButton}
                  className="cursor-pointer"
                />
              )}
              {isFiltered ? (
                <div
                  className="w-2.5 h-2.5 rounded-2xl error-bg-color absolute "
                  style={{ top: -10, right: -10 }}
                ></div>
              ) : (
                false
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default CustomHeader;
