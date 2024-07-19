import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";

const CustomHeader = ({
  children,
  pageTitle,
  hideGoBackButton = false,
  hideBgImage = true,
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
    <div className="flex-1 relative bg-color overflow-hidden flex flex-col">
      {/*{hideBgImage ? (*/}
      {/*  false*/}
      {/*) : (*/}
      {/*  <CustomImage*/}
      {/*    className={"absolute right-0 w-3/5"}*/}
      {/*    src={Images.topBackgroundImage}*/}
      {/*  />*/}
      {/*)}*/}

      <div
        className={`flex items-center justify-between global-horizontal-padding pb-5 ${padding ? "pt-12" : "pt-5"} overflow-hidden`}
      >
        <div className="flex justify-center items-center">
          {hideGoBackButton ? (
            false
          ) : (
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 w-2.5 cursor-pointer"}
                src={Images.leftIcon}
              />
            </div>
          )}

          <CustomText textClassName={"font-bold"} styles={{ fontSize: 18 }}>
            {pageTitle}
          </CustomText>
        </div>

        <div className="flex justify-center items-center gap-4">
          {_.isEmpty(rightSecondButtonIcon) ? (
            false
          ) : (
            <CustomImage
              src={rightSecondButtonIcon}
              imageStyle={{ width: 25, height: 25 }}
              onClick={onClickRightSecondButton}
              className="cursor-pointer"
            />
          )}
          <div
            style={{ width: 25, height: 25 }}
            onClick={onClickRightButton}
            className="relative"
          >
            {_.isEmpty(rightButtonIcon) ? (
              rightContent
            ) : (
              <CustomImage
                src={rightButtonIcon}
                imageStyle={{ width: 25, height: 25 }}
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
  );
};

export default CustomHeader;
