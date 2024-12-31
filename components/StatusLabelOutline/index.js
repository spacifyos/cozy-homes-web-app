import CustomText from "@/components/CustomText";
import Constant from "@/src/utils/Constant";
import _ from "lodash";

const StatusBorder = ({ status }) => {
  const statusBorderColor = (status) => {
    const statusUpperCase = _.upperCase(status);

    switch (statusUpperCase) {
      case "HIGH":
        return "pending-border-color";
      case "CRITICAL":
        return "critical-border-color";
      case "NORMAL":
        return "completed-border-color";
      case "LOW":
        return "low-border-color";

      default:
        return "pending-border-color";
    }
  };

  return (
    <div className="flex">
      <CustomText
        textClassName={`font-bold text-xs ${statusBorderColor(status)} px-3 py-0.5 rounded-2xl`}
      >
        {status}
      </CustomText>
    </div>
  );
};

export default StatusBorder;
