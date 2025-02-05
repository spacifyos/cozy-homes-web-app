import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { get, isEqual, map } from "lodash";
import Link from "next/link";
import CustomInput from "@/components/CustomInput";
import Images from "@/src/utils/Image";
import CustomSelect from "@/components/CustomSelect";
import * as commonSelector from "@/src/selectors/common";
import { useState } from "react";

const DesktopSearchBar = ({
  onClickSearch,
  optionList,
  searchTypeValue,
  setSearchTypeValue,
}) => {
  const stateOption = commonSelector.getState(optionList);

  const [keywordValue, setKeywordValue] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCityValue] = useState("");

  const searchType = [
    {
      name: "Co-Living",
      value: "coLiving",
    },
    // {
    //   name: "Whole Unit",
    //   value: "wholeUnit",
    // },
    // {
    //   name: "Short Stay",
    //   value: "shortStay",
    // },
  ];

  return (
    <div className="flex justify-center xl:py-0 lg:py-8 md:py-6 sm:py-6 py-4">
      <div
        className="xl:absolute lg:block md:block sm:block block z-10 container"
        style={{ bottom: -180, width: "100%" }}
      >
        {/*<div className="flex">*/}
        {/*  {map(searchType, (type) => {*/}
        {/*    const name = get(type, ["name"], "");*/}
        {/*    const value = get(type, ["value"], "");*/}

        {/*    return (*/}
        {/*      <div*/}
        {/*        onClick={() => setSearchTypeValue(value)}*/}
        {/*        className={`cursor-pointer px-6 py-4 w-40 ${isEqual(searchTypeValue, value) ? "bg-white" : "bg-primary-background"}`}*/}
        {/*        style={{ borderRadius: "10px 10px 0 0" }}*/}
        {/*      >*/}
        {/*        <CustomText*/}
        {/*          textClassName={`text-center ${isEqual(searchTypeValue, value) ? "text-primary font-bold" : "disable-text"} text-base`}*/}
        {/*        >*/}
        {/*          {name}*/}
        {/*        </CustomText>*/}
        {/*      </div>*/}
        {/*    );*/}
        {/*  })}*/}
        {/*</div>*/}

        <div
          className="xl:p-8 lg:p-8 md:p-6 sm:p-4 p-4 global-box-shadow bg-white"
          style={{ borderRadius: "10px 10px 10px 10px" }}
        >
          <div className="grid xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-4">
            <CustomInput
              rightIcon={Images.searchOutlineActiveIcon}
              className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2"
              placeholder="Search Rooms ..."
              value={keywordValue}
              onChange={(e) => setKeywordValue(e.target.value)}
            />

            <CustomSelect
              placeholder={"Select State"}
              className="col-span-1"
              styles={{ maxWidth: "none" }}
              optionList={stateOption}
              onChange={(e) => setStateValue(e.target.value)}
              value={stateValue}
            />

            <CustomInput
              className="col-span-1"
              placeholder="City"
              value={cityValue}
              onChange={(e) => setCityValue(e.target.value)}
            />

            <div className="xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2">
              <CustomButton
                buttonClassName="btn-primary w-full"
                buttonText="Search"
                onClick={() =>
                  onClickSearch(keywordValue, stateValue, cityValue)
                }
              />
            </div>
          </div>

          {/*<div className="grid grid-cols-12 gap-2">*/}
          {/*  <div className="col-span-10 grid grid-cols-4 gap-2">*/}
          {/*    <CustomSelect*/}
          {/*      placeholder={"Select Space Type"}*/}
          {/*      className="col-span-1 max-w-none"*/}
          {/*      optionList={[]}*/}
          {/*      // onChange={onChangeStateValue}*/}
          {/*      // value={stateValue}*/}
          {/*    />*/}

          {/*    <CustomSelect*/}
          {/*      placeholder={"Select Attraction"}*/}
          {/*      className="col-span-1 max-w-none"*/}
          {/*      optionList={[]}*/}
          {/*      // onChange={onChangeStateValue}*/}
          {/*      // value={stateValue}*/}
          {/*    />*/}

          {/*    <CustomSelect*/}
          {/*      placeholder={"Select University/College"}*/}
          {/*      className="col-span-1 max-w-none"*/}
          {/*      optionList={[]}*/}
          {/*      // onChange={onChangeStateValue}*/}
          {/*      // value={stateValue}*/}
          {/*    />*/}

          {/*    <CustomSelect*/}
          {/*      placeholder={"Select LRT/MRT"}*/}
          {/*      className="col-span-1 max-w-none"*/}
          {/*      optionList={[]}*/}
          {/*      // onChange={onChangeStateValue}*/}
          {/*      // value={stateValue}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <div className="col-span-2">*/}
          {/*    <CustomButton*/}
          {/*      buttonClassName="btn-primary w-full"*/}
          {/*      buttonText="Search"*/}
          {/*      onClick={onClickSearch}*/}
          {/*    />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default DesktopSearchBar;
