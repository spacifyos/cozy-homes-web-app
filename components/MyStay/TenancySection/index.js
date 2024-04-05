import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useEffect, useRef, useState } from "react";
import RadialProgressComponent from "@/components/MyStay/RadialProgressComponent";
import _ from "lodash";
import {useRouter} from "next/router";
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
    <div className="auto-pay-button">
      <CustomText
        textClassName={`${isChecked ? "primary-text" : "disable-text"} font-bold pr-3`}
      >
        AutoPay
      </CustomText>
      <input
        type="checkbox"
        className={`toggle default-toggle ${isChecked ? "toggle-primary-color" : "toggle-disable-color"} [--tglbg:#E8E8E8]`}
        checked={isChecked}
        onClick={onClickChangeAutoPay}
      />
    </div>
  );
};

const TenancySection = ({ t }) => {
  const [isChecked, setIsChecked] = useState(true);
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);
  const router= useRouter();
    const onClickGoToMyTenancy = () => {
        router.push("/my-tenancy");

    };
  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  const onClickChangeAutoPay = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="pb-7 ">
      <CustomText textClassName="section-title">
        {t("myStay.myTenancy")}
      </CustomText>

      <div className="tenancy-container">
        <CustomImage
          src={Images.moreIcon}
          width={25}
          height={25}
          className="absolute right-4 top-3"
        />
        <div className="flex flex-col items-start">
          <div className="primary-bg-color p-2 global-border-radius mb-1">
            <CustomImage src={Images.buildingIcon} width={30} height={30}
            onClick={onClickGoToMyTenancy}
            />
          </div>

          <TenancyLabel />

          <CustomLabelValue
            label={t("myStay.tenancyCode")}
            value={"Roomz-T123456789"}
          />

          <CustomLabelValue
            label={t("myStay.tenancyPeriod")}
            value={"01 Jan 2024 - 31 Dec 2025"}
          />

          <CustomLabelValue label={t("myStay.rentalFee")} value={"RM750"} />

          <AutoPayButton
            onClickChangeAutoPay={onClickChangeAutoPay}
            isChecked={isChecked}
          />
        </div>

        <div
          className="flex-1 flex justify-center items-center"
          ref={targetRef}
        >
          <RadialProgressComponent t={t} dimensions={dimensions} />
        </div>
      </div>
    </div>
  );
};

export default TenancySection;
