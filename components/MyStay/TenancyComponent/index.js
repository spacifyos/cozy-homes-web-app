import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { isEmpty } from "lodash";
import CustomLabelValue from "@/components/CustomLabelValue";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import * as tenancySelector from "@/src/selectors/tenancy";
import { useEffect, useRef, useState } from "react";

const TenancyComponent = ({ item }) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef && targetRef.current) {
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
      href={`/user/my-property/${tenancyId}`}
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
        <div className="bg-primary p-2 global-border-radius mb-1 ">
          <CustomImage src={Images.buildingIcon} imageStyle={{ width: 35 }} />
        </div>

        <div className={"pb-2"}>
          <CustomText textClassName="font-bold text-sm text-primary">
            {isEmpty(propertyName) ? "-" : propertyName}
          </CustomText>
          <CustomText textClassName="text-xs" lineClamp={1}>
            {isEmpty(unitName) ? "" : unitName}
            {isEmpty(roomName) ? "" : ", " + roomName}
          </CustomText>
        </div>

        <CustomLabelValue
          label="Tenancy Code"
          value={isEmpty(tenancyCode) ? "-" : tenancyCode}
          highlight
        />

        <CustomLabelValue
          label="Tenancy Period"
          value={isEmpty(tenancyPeriod) ? "-" : tenancyPeriod}
          highlight
        />

        <CustomLabelValue
          label="Rental Fee"
          value={`RM${isEmpty(rental) ? "0" : rental}`}
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
