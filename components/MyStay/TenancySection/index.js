import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useState } from "react";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";

const TenancyLabel = () => {
  return (
    <div className={"pb-2"}>
      <CustomText textClassName="font-bold font-size-small primary-text">
        M Vertica
      </CustomText>
      <CustomText textClassName="font-size-xsmall">A-01-01, Room 1</CustomText>
    </div>
  );
};

const AutoPayButton = ({ isChecked = false, onClickChangeAutoPay }) => {
  return (
    <div className="flex justify-center items-center secondary-bg-color px-3 py-2 global-border-radius mt-1">
      <CustomText
        textClassName={`${isChecked ? "primary-text" : "disable-text"} font-bold pr-3`}
      >
        AutoPay
      </CustomText>
      <input
        type="checkbox"
        className={`toggle ${isChecked ? "toggle-primary-color" : "toggle-disable-color"} [--tglbg:#E8E8E8]`}
        checked={isChecked}
        onClick={onClickChangeAutoPay}
      />
    </div>
  );
};

const TenancySection = () => {
  const [isChecked, setIsChecked] = useState(true);

  const onClickChangeAutoPay = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="pb-7">
      <CustomText textClassName="font-size-xxlarge font-bold pb-3">
        My Tenancy
      </CustomText>

      <div className="primaryWhite-bg-color global-box-shadow global-border-radius px-4 py-3 flex justify-between items-center">
        <div className="flex flex-col items-start">
          <div className="primary-bg-color p-3 global-border-radius mb-1">
            <CustomImage src={Images.buildingIcon} width={20} height={20} />
          </div>

          <TenancyLabel />

          <CustomLabelValue label={"Tenancy Code"} value={"Roomz-T123456789"} />

          <CustomLabelValue
            label={"Tenancy Period"}
            value={"01 Jan 2024 - 31 Dec 2025"}
          />

          <CustomLabelValue label={"Rental Fee"} value={"RM750"} />

          <AutoPayButton
            onClickChangeAutoPay={onClickChangeAutoPay}
            isChecked={isChecked}
          />
        </div>

        <div className="flex-1 flex justify-center items-center">
          <RadialProgressComponent />
        </div>
      </div>
    </div>
  );
};

export default TenancySection;
