import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const BalanceUnit = ({ t }) => {
  return (
    <div className="balance-container">
      <div className="flex justify-center items-center">
        <CustomText textClassName="font-size-normal">
          {t("myMeter.balanceUnit")}:
        </CustomText>
        <CustomText textClassName="font-size-xxlarge primary-text font-bold pl-2">
          9999999
        </CustomText>
      </div>

      <CustomText textClassName="disable-text font-size-xxsmall italic">
        {t("myMeter.lastConnectedAt")}: 15 Dec 2022, 2:15pm
      </CustomText>
    </div>
  );
};

export default BalanceUnit;
