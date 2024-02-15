import CustomText from "@/components/CustomText";

const CustomButton = ({
  buttonClassName,
  buttonText,
  buttonStyles,
  loading,
  onClick,
  disable,
}) => {
  return (
    <button
      className={`btn btn-md ${disable || loading ? "no-animation" : ""} ${buttonClassName}`}
      style={{ ...buttonStyles }}
      onClick={onClick}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <CustomText size={"small"}>{buttonText}</CustomText>
      )}
    </button>
  );
};

export default CustomButton;
