import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";

const InvoiceSection = ({ t, selectChange, onClickChange }) => {
    return (
        <div>
            <CustomText textClassName="font-size-xlarge font-bold pb-2">
                {t("myMeter.meterUsage")}
            </CustomText>

            <div className="flex items-center pb-3">
                <CustomButton
                    buttonText="Daily"
                    buttonClassName={`btn-sm ${_.isEqual(selectChange, "Daily") ? "primary-btn" : "default-btn"} mr-2`}
                    textClassName="font-size-xsmall"
                    onClick={() => onClickChange("Daily")}
                />
                <CustomButton
                    buttonText="Monthly"
                    buttonClassName={`btn-sm ${_.isEqual(selectChange, "Monthly") ? "primary-btn" : "default-btn"} mr-2`}
                    textClassName="font-size-xsmall"
                    onClick={()=> onClickChange("Monthly")}
                />
            </div>

            {_.map(Array(3), (item) => (
                <MeterUsageComponent t={t} />
            ))}
        </div>
    );
};

export default InvoiceSection;