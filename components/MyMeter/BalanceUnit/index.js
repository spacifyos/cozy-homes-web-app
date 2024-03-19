import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const BalanceUnit = ({t}) => {
    return (
        <div className="primaryWhite-bg-color global-box-shadow global-border-radius px-4 pt-3 pb-4 flex flex-col justify-center mt-3">
            <div className="flex flex-row justify-center">
                <CustomText textClassName="font-size-xlarge font-bold pb-2">
                    {t("myMeter.balanceUnit")}:
                </CustomText>
                <CustomText textClassName="font-size-xxlarge primary-text font-bold pl-2">9999999</CustomText>
            </div>
            <div className="flex flex-row justify-center">
                <CustomText textClassName="disable-text font-size-xxsmall italic"> {t("myMeter.lastConnectedAt")}: 15 Dec 2022, 2:15pm</CustomText>
            </div>
        </div>
    );
};

export default BalanceUnit;
