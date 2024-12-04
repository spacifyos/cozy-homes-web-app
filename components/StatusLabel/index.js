import CustomText from "@/components/CustomText";
import _ from "lodash";

const StatusLabel = ({ status }) => {
  const statusColor = (status) => {
    const statusUpperCase = _.upperCase(status);

    switch (statusUpperCase) {
      case "PENDING":
        return "pending-bg-color";
      case "DUE SOON":
        return "pending-bg-color";
      case "IN PROGRESS":
        return "pending-bg-color";
      case "COMPLETED":
        return "completed-bg-color";
      case "PENDING CONFIRMATION":
        return "tertiary-bg-color";
      case "CONFIRMED":
        return "primary-bg-color";
      case "NEW":
        return "primary-bg-color";
      case "CANCELLED":
        return "error-bg-color";
      case "OVERDUE":
        return "error-bg-color";
      case "PAID":
        return "completed-bg-color";
      case "UNPAID":
        return "primary-bg-color";
      case "AUTHORIZED":
        return "pending-bg-color";
      case "PENDING VERIFICATION":
        return "pending-bg-color";
      case "REJECTED":
        return "error-bg-color";
      case "APPROVED":
        return "completed-bg-color";
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
