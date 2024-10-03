import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import RangeSlider from "react-range-slider-input";
import BookingInput from "@/components/Booking/BookingInput";
import CustomSelect from "@/components/CustomSelect";
import TagComponent from "@/components/Search/TagComponent";
import "react-range-slider-input/dist/style.css";

const DesktopSearchBar = () => {
  return (
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color p-6 pb-0 flex flex-col">
      <CustomInput
        rightIcon={Images.searchOutlineActiveIcon}
        className="pb-4"
        placeholder="Keyword"
        // value={keywordValue}
        // onChange={onChangeKeywordValue}
        // onClickRightIcon={onClickSubmitKeyword}
      />

      <CustomText textClassName="font-bold pb-2">Sort Result By</CustomText>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <CustomText>Lowest Price</CustomText>
          <input type="radio" name="radio-1" className="radio" />
        </div>

        <div className="flex justify-between items-center">
          <CustomText>Highest Price</CustomText>
          <input type="radio" name="radio-1" className="radio" />
        </div>

        <div className="flex justify-between items-center">
          <CustomText>Best Rating</CustomText>
          <input type="radio" name="radio-1" className="radio" />
        </div>
      </div>

      <div className="divider-line"></div>

      <CustomText textClassName="font-bold pb-4">Your Budget</CustomText>

      <RangeSlider className="price-range-slider" />

      <div className="gap-4 flex items-center pt-4">
        <BookingInput
          className="border-none"
          title="Minimum (RM)"
          value="0"
          style={{ border: "unset" }}
        />
        <CustomText textClassName="font-size-xxlarge">-</CustomText>
        <BookingInput title="Maximum (RM)" value="1000" />
      </div>

      <div className="divider-line"></div>

      <CustomText textClassName="font-bold pb-2">Location</CustomText>

      <CustomSelect
        hideShadow
        placeholder={"Select State"}
        className="mb-2"
        selectClassName="bg-color"
        styles={{ maxWidth: "none" }}
        // optionList={Constant.STATE_CODE}
        // onChange={onChangeStateValue}
        // value={stateValue}
      />

      <CustomSelect
        hideShadow
        placeholder={"Select City"}
        className=""
        selectClassName="bg-color"
        styles={{ maxWidth: "none" }}
        // optionList={Constant.STATE_CODE}
        // onChange={onChangeStateValue}
        // value={stateValue}
      />

      <div className="divider-line"></div>

      <CustomText textClassName="font-bold pb-2">Room Amenities</CustomText>

      <div className="flex flex-col gap-2">
        <div className="flex items-center">
          <input type="checkbox" className="checkbox" />
          <CustomText textClassName="pl-3">Window</CustomText>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="checkbox" />
          <CustomText textClassName="pl-3">Window</CustomText>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="checkbox" />
          <CustomText textClassName="pl-3">Window</CustomText>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="checkbox" />
          <CustomText textClassName="pl-3">Window</CustomText>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="checkbox" />
          <CustomText textClassName="pl-3">Window</CustomText>
        </div>

        <div className="flex items-center">
          <input type="checkbox" className="checkbox" />
          <CustomText textClassName="pl-3">Window</CustomText>
        </div>
      </div>

      <div className="divider-line"></div>

      <CustomText textClassName="font-bold pb-2">Label</CustomText>

      <div className="pb-1">
        <TagComponent
          className="flex-wrap gap-3"
          style={{ paddingLeft: 0 }}
          lists={[
            { name: "Verified Room", code: "" },
            { name: "Verified Host", code: "" },
            { name: "Zero Deposit", code: "", isActive: true },
            { name: "6 months", code: "" },
            { name: "1 year", code: "" },
            { name: "TARUMT", code: "" },
          ]}
          onClickGeneralTag={() => {}}
        />
      </div>
    </div>
  );
};

export default DesktopSearchBar;
