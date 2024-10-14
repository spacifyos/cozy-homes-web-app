import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { get, isEqual, map } from "lodash";
import Link from "next/link";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import * as commonSelector from "@/src/selectors/common";

const DesktopSearchBar = ({
  onClickSearch,
  optionList,
  searchTypeValue,
  setSearchTypeValue,
}) => {
  const stateOption = commonSelector.getState(optionList);

  const searchType = [
    {
      name: "Co-Living",
      value: "coLiving",
    },
    {
      name: "Whole Unit",
      value: "wholeUnit",
    },
    {
      name: "Short Stay",
      value: "shortStay",
    },
  ];

  return (
    <div className="flex justify-center">
      <div
        className="absolute z-10 container"
        style={{ bottom: -210, width: "100%" }}
      >
        <div className="flex">
          {map(searchType, (type) => {
            const name = get(type, ["name"], "");
            const value = get(type, ["value"], "");

            return (
              <div
                onClick={() => setSearchTypeValue(value)}
                className={`cursor-pointer px-6 py-4 w-36 ${isEqual(searchTypeValue, value) ? "primaryWhite-bg-color" : "bg-color"}`}
                style={{ borderRadius: "10px 10px 0 0" }}
              >
                <CustomText
                  textClassName={`text-center ${isEqual(searchTypeValue, value) ? "primary-text font-bold" : "disable-text"} font-size-large`}
                >
                  {name}
                </CustomText>
              </div>
            );
          })}
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
              className="col-span-1"
              styles={{ maxWidth: "none" }}
              optionList={stateOption}
              // onChange={onChangeStateValue}
              // value={stateValue}
            />

            <CustomInput
              className="col-span-1"
              placeholder="City"
              // value={keywordValue}
              // onChange={onChangeKeywordValue}
              // onClickRightIcon={onClickSubmitKeyword}
            />
          </div>

          <div className="grid grid-cols-12 gap-2 pb-5 global-horizontal-padding">
            <div className="col-span-10 grid grid-cols-4 gap-2">
              <CustomSelect
                placeholder={"Select Space Type"}
                className="col-span-1 max-w-none"
                optionList={[]}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />

              <CustomSelect
                placeholder={"Select Attraction"}
                className="col-span-1 max-w-none"
                optionList={[]}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />

              <CustomSelect
                placeholder={"Select University/College"}
                className="col-span-1 max-w-none"
                optionList={[]}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />

              <CustomSelect
                placeholder={"Select LRT/MRT"}
                className="col-span-1 max-w-none"
                optionList={[]}
                // onChange={onChangeStateValue}
                // value={stateValue}
              />
            </div>

            <div className="col-span-2">
              <CustomButton
                buttonClassName="primary-btn w-full"
                buttonText="Search"
                onClick={onClickSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSearchBar;
