import DesktopModal from "@/components/DesktopModal";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { get, isEmpty, isEqual, map } from "lodash";
import CustomButton from "@/components/CustomButton";
import * as listingSelector from "@/src/selectors/listing";
import CustomSelect from "@/components/CustomSelect";
import CustomInput from "@/components/CustomInput";
import RangeSlider from "react-range-slider-input";

const DesktopFilterModal = ({
  sortValue,
  setSortValue,
  newSortTag,
  genderValue,
  setGenderValue,
  amenities,
  onClickSelectAmenities,
  onClickGeneralTag,
  newGeneralTag,
  genderTag,
  stateOption,
  setStateValue,
  stateValue,
  cityValue,
  setCityValue,
  onClickSubmitCity,
  spaceTypeTag,
  spaceTypeValue,
  setSpaceTypeValue,
  priceRange,
  setPriceRange,
  tenureTag,
  setTenureValue,
  tenureValue,
  onClickApply,
  onClickClearAll,
  onClickCloseFilterModal,
}) => {
  return (
    <DesktopModal id="desktop_filter_modal" styles={{ maxWidth: 600 }}>
      <div className="p-6">
        <div className="flex items-center">
          <CustomText textClassName="flex-1 text-center text-base font-bold">
            Filters
          </CustomText>
          <form method="dialog" className={`flex justify-end`}>
            <button
              className="btn btn-sm btn-circle btn-ghost right-2"
              onClick={onClickCloseFilterModal}
            >
              <CustomImage
                className="xl:w-4 lg:w-4 md:w-4 sm:w-3 w-3"
                src={Images.closeIconBlack}
              />
            </button>
          </form>
        </div>

        <div className="divider-line"></div>

        <div className="pb-5">
          <CustomText textClassName="text-sm font-bold">Location</CustomText>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <CustomSelect
              selectClassName="min-h-10 h-10"
              className="h-10"
              placeholder={"State"}
              optionList={stateOption}
              onChange={(e) => setStateValue(e.target.value)}
              value={stateValue}
            />

            <CustomInput
              inputClassName="min-h-10 h-10"
              className="h-10"
              placeholder={"City"}
              value={cityValue}
              onChange={(e) => setCityValue(e.target.value)}
              onClickRightIcon={onClickSubmitCity}
            />
          </div>
        </div>

        <div className="pb-5">
          <CustomText textClassName="text-sm font-bold">Space Type</CustomText>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <CustomSelect
              selectClassName="min-h-10 h-10"
              className="h-10 max-w-full"
              placeholder={"Select Type"}
              optionList={spaceTypeTag}
              onChange={(e) => setSpaceTypeValue(e.target.value)}
              value={spaceTypeValue}
            />
          </div>
        </div>

        <div className="pb-5 xl:hidden lg:hidden md:hidden sm:block block">
          <CustomText textClassName="text-sm font-bold">
            Tenure Period
          </CustomText>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <CustomSelect
              selectClassName="min-h-10 h-10"
              className="h-10 max-w-full mb-2"
              placeholder={"Select Period"}
              styles={{ maxWidth: "none", margin: 0 }}
              selectStyles={{ height: 40 }}
              optionList={tenureTag}
              onChange={(e) => setTenureValue(e.target.value)}
              value={tenureValue}
            />
          </div>
        </div>

        <div className="pb-5 xl:hidden lg:hidden md:hidden sm:block block">
          <CustomText textClassName="text-sm font-bold">Your Budget</CustomText>

          <div className="grid grid-cols-1 gap-2 pt-2">
            <RangeSlider
              className="price-range-slider"
              min={0}
              max={10000}
              value={priceRange}
              onInput={setPriceRange}
            />

            <div className="flex justify-between items-center">
              <CustomText textClassName="text-xs">RM{priceRange[0]}</CustomText>
              <CustomText textClassName="text-xs">RM{priceRange[1]}</CustomText>
            </div>
          </div>
        </div>

        <div className="pb-5">
          <CustomText textClassName="text-sm font-bold">Shorting By</CustomText>

          <div className="flex gap-2 pt-2">
            {map(newSortTag, (item, index) => {
              const name = listingSelector.getName(item);
              const code = listingSelector.getCode(item);

              return (
                <CustomButton
                  key={name}
                  buttonText={name}
                  buttonClassName={`btn-sm ${isEqual(sortValue, code) ? "btn-primary" : "btn-white"} mr-2`}
                  textClassName="text-xs"
                  onClick={() =>
                    setSortValue(isEqual(sortValue, code) ? "" : code)
                  }
                />
              );
            })}
          </div>
        </div>

        {isEmpty(newGeneralTag) ? (
          false
        ) : (
          <div className="pb-5">
            <CustomText textClassName="text-sm font-bold">
              Specify Tag
            </CustomText>

            <div className="pt-2 flex flex-wrap gap-2">
              {map(newGeneralTag, (list, index) => {
                const name = listingSelector.getName(list);
                const code = listingSelector.getCode(list);
                const isActive = get(list, ["isActive"], "");

                return (
                  <CustomButton
                    key={name}
                    buttonText={name}
                    buttonClassName={`${isActive ? "btn-primary" : "btn-white"} btn-sm mr-2`}
                    textClassName="text-xs"
                    onClick={() => onClickGeneralTag(name, code)}
                  />
                );
              })}
            </div>
          </div>
        )}

        <div className="pb-5">
          <CustomText textClassName="text-sm font-bold">Amenities</CustomText>

          <div className="flex flex-wrap gap-2 pt-2">
            {map(amenities, (amenity) => {
              const name = listingSelector.getName(amenity);
              const icon = listingSelector.getImageUrl(amenity);
              const code = listingSelector.getCode(amenity);
              const iconActive = listingSelector.getImageUrlActive(amenity);
              const isActive = get(amenity, ["isActive"], false);

              return (
                <CustomButton
                  key={name}
                  reverse
                  icon={isActive ? iconActive : icon}
                  buttonText={name}
                  buttonClassName={`btn-sm ${isActive ? "btn-primary" : "btn-white"} mr-2`}
                  textClassName="text-xs"
                  onClick={() => onClickSelectAmenities(name, code)}
                />
              );
            })}
          </div>
        </div>

        <div className="">
          <CustomText textClassName="text-sm font-bold">Gender</CustomText>

          <div className="flex gap-2 pt-2">
            {map(genderTag, (item) => {
              const title = get(item, ["label"], "");
              const value = get(item, ["value"], "");

              return (
                <CustomButton
                  key={title}
                  buttonText={title}
                  buttonClassName={`btn-sm ${isEqual(genderValue, value) ? "btn-primary" : "btn-white"} mr-2`}
                  textClassName="text-xs"
                  onClick={() =>
                    setGenderValue(isEqual(genderValue, value) ? "" : value)
                  }
                />
              );
            })}
          </div>
        </div>

        <div className="divider-line"></div>

        <div className="grid grid-cols-2 gap-2">
          <CustomButton
            buttonText="Clear All"
            buttonClassName="btn-white"
            onClick={onClickClearAll}
          />
          <CustomButton
            buttonText="Apply"
            buttonClassName="btn-primary"
            onClick={onClickApply}
          />
        </div>
      </div>
    </DesktopModal>
  );
};

export default DesktopFilterModal;
