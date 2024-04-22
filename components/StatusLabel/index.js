import CustomText from "@/components/CustomText";

const StatusLabel = ({ status }) => {
  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "pending-bg-color";
      case "completed":
        return "completed-bg-color";
      case "Pending Confirmation":
        return "tertiary-bg-color";
      case "Confirmed":
        return "primary-bg-color";
      case "Cancelled":
        return "error-bg-color";
      default:
        return "pending-bg-color";
    }
  };

  return (
    <div className="flex">
      <CustomText
        textClassName={`white-text font-size-xxsmall ${statusColor(status)} px-3 py-0.5 rounded-2xl`}
      >
        {status}
      </CustomText>
    </div>
  );
};

export default StatusLabel;
