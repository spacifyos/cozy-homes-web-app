import CustomText from "@/components/CustomText";
import _ from "lodash";
import Constant from "@/src/utils/Constant";

const StatusLabel = ({ status }) => {
  const statusColor = (status) => {
    const statusUpperCase = _.upperCase(status);

    switch (statusUpperCase) {
      case "PENDING" ||
        "DUE SOON" ||
        "AUTHORIZED" ||
        "PENDING VERIFICATION" ||
        "ON HOLD":
        return "pending-bg-color";
      case "IN PROGRESS" || "PENDING CONFIRMATION":
        return "tertiary-bg-color";
      case "COMPLETED" || "PAID" || "APPROVED":
        return "completed-bg-color";
      case "CONFIRMED" || "NEW" || "UNPAID":
        return "primary-bg-color";
      case "CANCELLED" || "OVERDUE" || "REJECTED":
        return "error-bg-color";
      case "DRAFT":
        return "disable-bg-color";

      default:
        return "pending-bg-color";
    }
  };

  return (
    <div className="flex">
      <CustomText
        textClassName={`text-white text-center text-xs ${statusColor(status)} px-3 py-0.5 rounded-2xl`}
      >
        {status}
      </CustomText>
    </div>
  );
};

export default StatusLabel;
