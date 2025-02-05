import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { useEffect, useRef, useState } from "react";
import CustomLabelValue from "@/components/CustomLabelValue";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import Images from "@/src/utils/Image";
import * as tenancySelector from "@/src/selectors/tenancy";
import moment from "moment";

const AutoPayButton = ({ isChecked = false, onChangeAutoPay }) => {
  return (
    <div className="tenancy-auto-pay-button">
      <CustomText
        textClassName={`${isChecked ? "text-primary" : "text-disable"} font-bold text-xs pr-3`}
      >
        AutoPay
      </CustomText>
      <input
        type="checkbox"
        className={`toggle default-toggle ${isChecked ? "toggle-primary-color" : "toggle-disable-color"} [--tglbg:#E8E8E8]`}
        checked={isChecked}
        onChange={onChangeAutoPay}
      />
    </div>
  );
};

const TenancyDetail = ({ t, onChangeAutoPay, isChecked, data }) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  const tenancyCode = tenancySelector.getTenancyCode(data);
  const propertyName = tenancySelector.getPropertyName(data);
  const unitName = tenancySelector.getUnitName(data);
  const roomName = tenancySelector.getRoomName(data);
  const tenancyPeriod = tenancySelector.getTenancyPeriod(data);
  const rental = tenancySelector.getInitialRentalFee(data);
  const tenancyRemaining = tenancySelector.getTenancyRemainingDay(data);
  const totalDays = tenancySelector.getTotalDays(data);
  const createdAt = tenancySelector.getCreatedAt(data);
  const address = tenancySelector.getAddress(data);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  return (
    <div className="global-border-radius global-box-shadow bg-white pt-4 pb-2 px-4">
      <div className="flex justify-between items-center">
        <CustomLabelValue
          label={"Tenancy Code"}
          value={_.isEmpty(tenancyCode) ? "-" : tenancyCode}
          highlight
        />

        {/*<AutoPayButton*/}
        {/*  onChangeAutoPay={onChangeAutoPay}*/}
        {/*  isChecked={isChecked}*/}
        {/*/>*/}
      </div>
      <div
        className="flex mx-16 justify-center items-center py-4"
        ref={targetRef}
      >
        {totalDays !== 0 && tenancyRemaining !== 0 ? (
          <RadialProgressComponent
            dimensions={dimensions}
            tenancyRemaining={tenancyRemaining}
            totalDays={totalDays}
          />
        ) : (
          false
        )}
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-end py-3">
          <div className="bg-primary p-2 global-border-radius ">
            <CustomImage src={Images.buildingIcon} imageStyle={{ width: 30 }} />
          </div>

          <div className={"pl-2"}>
            <CustomText textClassName="font-bold text-sm text-primary">
              {_.isEmpty(propertyName) ? "-" : propertyName}
            </CustomText>
            <CustomText textClassName="text-xs">
              {_.isEmpty(unitName) ? "" : unitName}
              {_.isEmpty(roomName) ? "" : ", " + roomName}
            </CustomText>
          </div>
        </div>
        <CustomLabelValue
          label={"Rental Fee"}
          value={`RM${_.isEmpty(rental) ? "0" : rental} / monthly`}
        />
        <CustomLabelValue
          label={"Tenancy Period"}
          value={_.isEmpty(tenancyPeriod) ? "-" : tenancyPeriod}
        />
        <CustomLabelValue
          label={"Address"}
          value={_.isEmpty(address) ? "-" : address}
        />
        <CustomLabelValue
          label={"Created At"}
          value={moment(createdAt).format("DD MMM YYYY, HH:mm:ss")}
        />
      </div>
    </div>
  );
};

export default TenancyDetail;
