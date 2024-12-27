import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";
import { isEmpty } from "lodash";
import moment from "moment";

const BalanceUnit = ({
  balanceUnit,
  balanceCredit,
  lastConnectedAt,
  isShowBalanceInPrice,
}) => {
  return (
    <div className="balance-container">
      <div className="flex justify-center items-center">
        <CustomText textClassName="text-base">
          {isShowBalanceInPrice ? "Balance Credit" : "Balance Unit"}
        </CustomText>
        <CustomText textClassName="text-lg primary-text font-bold pl-2">
          {isShowBalanceInPrice
            ? isEmpty(balanceCredit)
              ? "0"
              : balanceCredit
            : isEmpty(balanceUnit)
              ? "0"
              : balanceUnit}
        </CustomText>
      </div>

      <CustomText textClassName="disable-text text-xs italic">
        Last ConnectedAt: {moment(lastConnectedAt).format("DD MMM YYYY, HH:mm")}
      </CustomText>
    </div>
  );
};

export default BalanceUnit;
