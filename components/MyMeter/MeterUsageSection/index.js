import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import MeterUsageComponent from "@/components/MyMeter/MeterUsageComponent";

const InvoiceSection = ({ t, selectChange, onClickChange }) => {
  const btnMeterUsage = [{ btn: "Daily" }, { btn: "Monthly" }];
  return (
    <div>
      <CustomText textClassName="section-title">
          Meter Usage
      </CustomText>

      <div className="flex items-center pb-3">
        {_.map(btnMeterUsage, (item, index) => {
          const btn = _.get(item, ["btn"], "");
          return (
            <CustomButton
              key={index}
              buttonText={btn}
              buttonClassName={`btn-sm ${_.isEqual(selectChange, btn) ? "btn-primary" : "default-btn"} mr-2`}
              textClassName="text-xs"
              onClick={() => onClickChange(btn)}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-3">
        {_.map(Array(3), (item, index) => (
          <MeterUsageComponent t={t} key={index} />
        ))}
      </div>
    </div>
  );
};

export default InvoiceSection;
