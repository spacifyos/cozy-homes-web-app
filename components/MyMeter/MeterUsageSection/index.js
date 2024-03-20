import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";

const InvoiceSection = ({ t }) => {
    return (
        <div>
            <CustomText textClassName="font-size-xxlarge font-bold pb-2">
                {t("myMeter.meterUsage")}
            </CustomText>

            <div className="flex items-center pb-3">
                <CustomButton
                    buttonText="Daily"
                    buttonClassName="btn-sm primary-btn mr-2"
                    textClassName="font-size-xsmall"
                />
                <CustomButton
                    buttonText="Monthly"
                    buttonClassName="btn-sm default-btn mr-2"
                    textClassName="font-size-xsmall"
                />
            </div>

            {_.map(Array(3), (item) => (
                <MeterUsageComponent t={t} />
            ))}
        </div>
    );
};

export default InvoiceSection;