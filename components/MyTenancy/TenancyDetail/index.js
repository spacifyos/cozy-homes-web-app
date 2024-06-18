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
        textClassName={`${isChecked ? "primary-text" : "disable-text"} font-bold font-size-xsmall pr-3`}
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
    <div className="global-border-radius global-box-shadow primaryWhite-bg-color mb-7 pt-4 pb-2 px-4">
      <div className="flex justify-between items-center">
        <CustomLabelValue
          label={t("myStay.tenancyCode")}
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
            t={t}
            dimensions={dimensions}
            tenancyRemaining={tenancyRemaining}
            totalDays={totalDays}
          />
        ) : (
          false
        )}
      </div>

      <div className="flex flex-col items-start">
        <div className="flex items-center py-3">
          <div className="primary-bg-color p-2 global-border-radius mb-1">
            <CustomImage src={Images.buildingIcon} width={30} height={30} />
          </div>

          <div className={"pl-2"}>
            <CustomText textClassName="font-bold font-size-small primary-text">
              {_.isEmpty(propertyName) ? "-" : propertyName}
            </CustomText>
            <CustomText textClassName="font-size-xsmall">
              {_.isEmpty(unitName) ? "" : unitName}
              {_.isEmpty(roomName) ? "" : ", " + roomName}
            </CustomText>
          </div>
        </div>
        <CustomLabelValue
          label={t("myStay.rentalFee")}
          value={`RM${_.isEmpty(rental) ? "0" : rental} / monthly`}
        />
        <CustomLabelValue
          label={t("myStay.tenancyPeriod")}
          value={_.isEmpty(tenancyPeriod) ? "-" : tenancyPeriod}
        />
        <CustomLabelValue
          label={t("myTenancy.address")}
          value={_.isEmpty(address) ? "-" : address}
        />
        <CustomLabelValue
          label={t("myTenancy.createdAt")}
          value={moment(createdAt).format("DD MMM YYYY, HH:mm:ss")}
        />
      </div>
    </div>
  );
};

export default TenancyDetail;
