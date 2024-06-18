import CustomText from "@/components/CustomText";

const StatusBorder = ({ status }) => {
  const statusBorderColor = (status) => {
    switch (status) {
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
        textClassName={`font-bold font-size-xxsmall ${statusBorderColor(status)} px-3 py-0.5 rounded-2xl`}
      >
        {status}
      </CustomText>
    </div>
  );
};

export default StatusBorder;
