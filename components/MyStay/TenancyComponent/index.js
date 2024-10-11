import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomLabelValue from "@/components/CustomLabelValue";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import * as tenancySelector from "@/src/selectors/tenancy";
import { useEffect, useRef, useState } from "react";

const TenancyComponent = ({ item, t }) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  const tenancyId = tenancySelector.getId(item);
  const tenancyCode = tenancySelector.getTenancyCode(item);
  const propertyName = tenancySelector.getPropertyName(item);
  const unitName = tenancySelector.getUnitName(item);
  const roomName = tenancySelector.getRoomName(item);
  const tenancyPeriod = tenancySelector.getTenancyPeriod(item);
  const rental = tenancySelector.getInitialRentalFee(item);
  const tenancyRemaining = tenancySelector.getTenancyRemainingDay(item);
  const totalDays = tenancySelector.getTotalDays(item);

  return (
    <a
      href={`/my-property/${tenancyId}`}
      className="tenancy-container cursor-pointer grid grid-cols-2 gap-2"
    >
      {/*<CustomImage*/}
      {/*  src={Images.moreIcon}*/}
      {/*  width={25}*/}
      {/*  height={25}*/}
      {/*  className="absolute right-4 top-3 cursor-pointer"*/}
      {/*  onClick={onClickTenancyViewMore}*/}
      {/*/>*/}

      <div className="flex flex-col items-start col-span-1">
        <div className="primary-bg-color p-2 global-border-radius mb-1 ">
          <CustomImage src={Images.buildingIcon} imageStyle={{ width: 35 }} />
        </div>

        <div className={"pb-2"}>
          <CustomText textClassName="font-bold font-size-small primary-text">
            {_.isEmpty(propertyName) ? "-" : propertyName}
          </CustomText>
          <CustomText textClassName="font-size-xsmall" lineClamp={1}>
            {_.isEmpty(unitName) ? "" : unitName}
            {_.isEmpty(roomName) ? "" : ", " + roomName}
          </CustomText>
        </div>

        <CustomLabelValue
          label={t("myStay.tenancyCode")}
          value={_.isEmpty(tenancyCode) ? "-" : tenancyCode}
          highlight
        />

        <CustomLabelValue
          label={t("myStay.tenancyPeriod")}
          value={_.isEmpty(tenancyPeriod) ? "-" : tenancyPeriod}
          highlight
        />

        <CustomLabelValue
          label={t("myStay.rentalFee")}
          value={`RM${_.isEmpty(rental) ? "0" : rental}`}
          highlight
        />

        {/*<AutoPayButton*/}
        {/*  onChangeAutoPay={onChangeAutoPay}*/}
        {/*  isChecked={isChecked}*/}
        {/*/>*/}
      </div>

      <div
        className="flex-1 flex justify-center items-center col-span-1"
        ref={targetRef}
      >
        <RadialProgressComponent
          t={t}
          dimensions={dimensions}
          tenancyRemaining={tenancyRemaining}
          totalDays={totalDays}
        />
      </div>

      {/*{tenancyViewMore ? (*/}
      {/*  <CustomDropdown*/}
      {/*    items={[*/}
      {/*      { title: "Overview", function: onClickGoToMyTenancy },*/}
      {/*    ]}*/}
      {/*    top={40}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  false*/}
      {/*)}*/}
    </a>
  );
};

export default TenancyComponent;
