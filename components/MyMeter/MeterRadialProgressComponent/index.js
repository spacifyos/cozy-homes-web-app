import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import moment from "moment";

const MeterRadialProgressComponent = ({ t, balanceUnit }) => {
  const [meterUnit, setMeterUnit] = useState(0);
  const [percentage, setPercentage] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newNumber = meterUnit + 1;
  //     const newPercentage = (newNumber / 365) * 100;
  //
  //     if (newPercentage <= 70) {
  //       setMeterUnit(newNumber);
  //       setPercentage(newPercentage);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }, 3);
  //
  //   return () => clearInterval(interval);
  // }, [meterUnit]);

  return (
    <div
      className="radial-progress primaryWhite-bg-color primary-text border-16 border-secondary-color global-box-shadow"
      style={{
        "--value": 100,
        "--size": `9rem`,
        "--thickness": "0.8rem",
      }}
      role="progressbar"
    >
      <div className="flex-col flex justify-column items-center">
        <div className="flex items-end gap-1">
          <CustomText textClassName="font-size-xlarge primary-text font-bold">
            {isEmpty(balanceUnit) ? "0" : balanceUnit}
          </CustomText>

          <CustomText textClassName="font-size-xxsmall disable-text line-clamp-1">
            {t("myMeterOverview.unit")}
          </CustomText>
        </div>

        <CustomText textClassName="font-size-xxsmall font-bold">
          {moment().format("DD MMM YYYY")}
        </CustomText>
      </div>
    </div>
  );
};

export default MeterRadialProgressComponent;
