import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { get, isEqual, map } from "lodash";
import Link from "next/link";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import Constant from "@/src/utils/Constant";

const DesktopSearchBar = ({ onClickRoomSearch, onClickCarParkSearch }) => {
  return (
    <div className="flex justify-center">
      <div className="w-4/5 absolute z-10" style={{ bottom: -100 }}>
        <div className="flex">
          <div
            onClick={onClickCarParkSearch}
            className="cursor-pointer px-6 py-4 primaryWhite-bg-color"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <CustomText textClassName="text-center primary-text font-bold font-size-large">
              Room for Rent
            </CustomText>
          </div>

          <div
            onClick={onClickCarParkSearch}
            className="cursor-pointer px-6 py-4 bg-color"
            style={{
              borderRadius: "10px 10px 0 0",
            }}
          >
            <CustomText textClassName="text-center disable-text font-bold font-size-large">
              Car Park for Rent
            </CustomText>
          </div>
        </div>

        <div
          className="p-3 global-box-shadow primaryWhite-bg-color py-6 mb-3"
          style={{ borderRadius: "0 10px 10px 10px" }}
        >
          <div className="grid grid-cols-3 gap-2 pb-5 global-horizontal-padding">
            <CustomInput
              rightIcon={Images.searchOutlineActiveIcon}
              className="col-span-1"
              placeholder="Keyword"
              // value={keywordValue}
              // onChange={onChangeKeywordValue}
              // onClickRightIcon={onClickSubmitKeyword}
            />

            <CustomSelect
              placeholder={"Select State"}
              className="col-span-1 max-w-none"
              // optionList={Constant.STATE_CODE}
              // onChange={onChangeStateValue}
              // value={stateValue}
            />

            <CustomSelect
              placeholder={"Select State"}
              className="col-span-1 max-w-none"
              // optionList={Constant.STATE_CODE}
              // onChange={onChangeStateValue}
              // value={stateValue}
            />
          </div>

          <div className="grid grid-cols-12 gap-2 pb-5 global-horizontal-padding">
            <div className="col-span-10 grid grid-cols-4 gap-2">
              <CustomSelect
                placeholder={"Select State"}
                className="col-span-1 max-w-none"
                // optionList={Constant.STATE_CODE}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />

              <CustomSelect
                placeholder={"Select State"}
                className="col-span-1 max-w-none"
                // optionList={Constant.STATE_CODE}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />

              <CustomSelect
                placeholder={"Select State"}
                className="col-span-1 max-w-none"
                // optionList={Constant.STATE_CODE}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />

              <CustomSelect
                placeholder={"Select State"}
                className="col-span-1 max-w-none"
                // optionList={Constant.STATE_CODE}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />
            </div>

            <div className="col-span-2">
              <CustomButton
                buttonClassName="primary-btn w-full"
                buttonText="Search"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSearchBar;
