import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";

const InvoiceSection = ({ t, selectChange, onClickChange }) => {
  const btnMeterUsage = [{ btn: "Daily" }, { btn: "Monthly" }];
  return (
    <div>
      <CustomText textClassName="section-title">
        {t("myMeterOverview.meterUsage")}
      </CustomText>

      <div className="flex items-center pb-3">
        {_.map(btnMeterUsage, (item, index) => {
          const btn = _.get(item, ["btn"], "");
          return (
            <CustomButton
                key={index}
              buttonText={btn}
              buttonClassName={`btn-sm ${_.isEqual(selectChange, btn) ? "primary-btn" : "default-btn"} mr-2`}
              textClassName="font-size-xsmall"
              onClick={() => onClickChange(btn)}
            />
          );
        })}
      </div>

      {_.map(Array(3), (item, index) => (
        <MeterUsageComponent t={t} key={index} />
      ))}
    </div>
  );
};

export default InvoiceSection;
