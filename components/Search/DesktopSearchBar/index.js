import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import RangeSlider from "react-range-slider-input";
import CustomSelect from "@/components/CustomSelect";
import "react-range-slider-input/dist/style.css";
import CustomImage from "@/components/CustomImage";

const DesktopSearchBar = ({
  onClickOpenModal,
  tenureTag,
  tenureValue,
  keywordValue,
  onChangeKeywordValue,
  setPriceRange,
  priceRange,
  onClickSubmitKeyword,
  onChangeTenurePeriod,
  onThumbDragEnd,
  isFilter,
}) => {
  return (
    <div className="grid xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-10 grid-cols-10 gap-5 pb-6">
      <div className="xl:col-span-1 xl:block hidden"></div>

      <div className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-8 col-span-8 global-border-radius global-box-shadow primaryWhite-bg-color flex flex-col justify-center ">
        <CustomText textClassName="font-size-xxsmall pt-2 pl-4">
          Keyword
        </CustomText>
        <CustomInput
          hideShadow
          rightIcon={Images.searchOutlineActiveIcon}
          className=""
          placeholder="Keyword"
          value={keywordValue}
          onChange={onChangeKeywordValue}
          onClickRightIcon={onClickSubmitKeyword}
        />
      </div>

      <div className="col-span-3 xl:block lg:block md:block sm:hidden hidden global-border-radius global-box-shadow primaryWhite-bg-color px-4 py-2 flex flex-col justify-center">
        <CustomText textClassName="font-size-xxsmall">Your Budget</CustomText>

        <RangeSlider
          className="price-range-slider"
          min={0}
          max={10000}
          value={priceRange}
          onInput={setPriceRange}
          rangeSlideDisabled
          onThumbDragEnd={onThumbDragEnd}
        />

        <div className="flex justify-between items-center">
          <CustomText textClassName="font-size-xxsmall">
            RM{priceRange[0]}
          </CustomText>
          <CustomText textClassName="font-size-xxsmall">
            RM{priceRange[1]}
          </CustomText>
        </div>
      </div>

      <div className="col-span-3 xl:block lg:block md:block sm:hidden hidden global-border-radius global-box-shadow primaryWhite-bg-color flex flex-col justify-center ">
        <CustomText textClassName="font-size-xxsmall pt-2 pl-4">
          Tenure Period
        </CustomText>
        <CustomSelect
          hideShadow
          placeholder={"Select Period"}
          className="mb-2"
          styles={{ maxWidth: "none", margin: 0 }}
          selectStyles={{ height: 40 }}
          optionList={tenureTag}
          onChange={onChangeTenurePeriod}
          value={tenureValue}
        />
      </div>

      <div
        className="default-btn xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2 h-full flex justify-center items-center relative"
        onClick={onClickOpenModal}
      >
        {isFilter ? (
          <div className="absolute top-3 right-3 primary-bg-color w-2 h-2 rounded-2xl"></div>
        ) : (
          false
        )}

        <CustomImage src={Images.filterProIcon} className="w-6" />
      </div>

      <div className="col-span-1 xl:block hidden"></div>
    </div>
  );
};

export default DesktopSearchBar;
