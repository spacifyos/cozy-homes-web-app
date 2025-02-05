import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import moment from "moment";

const MeterRadialProgressComponent = ({
  balanceUnit,
  balanceCredit,
  isShowBalanceInPrice,
}) => {
  return (
    <div
      className="radial-progress bg-white text-primary border-16 border-secondary-color global-box-shadow"
      style={{
        "--value": 100,
        "--size": `9rem`,
        "--thickness": "0.8rem",
      }}
      role="progressbar"
    >
      <div className="flex-col flex justify-column items-center">
        <div className="flex items-end gap-1">
          <CustomText textClassName="text-base text-primary font-bold">
            {isShowBalanceInPrice
              ? isEmpty(balanceCredit)
                ? "0"
                : balanceCredit
              : isEmpty(balanceUnit)
                ? "0"
                : balanceUnit}
          </CustomText>

          <CustomText textClassName="text-xs disable-text line-clamp-1">
            {isShowBalanceInPrice ? "credit" : "unit"}
          </CustomText>
        </div>

        <CustomText textClassName="text-xs font-bold">
          {moment().format("DD MMM YYYY")}
        </CustomText>
      </div>
    </div>
  );
};

export default MeterRadialProgressComponent;
