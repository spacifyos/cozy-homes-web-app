import CustomText from "@/components/CustomText";
import { upperCase } from "lodash";

const StatusLabel = ({ status }) => {
  const statusColor = (status) => {
    const statusUpperCase = upperCase(status);

    switch (statusUpperCase) {
      case "PENDING":
      case "DUE SOON":
      case "AUTHORIZED":
      case "PENDING VERIFICATION":
      case "ON HOLD":
        return "pending-bg-color";

      case "IN PROGRESS":
      case "PENDING CONFIRMATION":
        return "tertiary-bg-color";

      case "COMPLETED":
      case "PAID":
      case "APPROVED":
      case "CLOSED":
        return "completed-bg-color";

      case "CONFIRMED":
      case "NEW":
      case "UNPAID":
        return "primary-bg-color";

      case "CANCELLED":
      case "OVERDUE":
      case "REJECTED":
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
