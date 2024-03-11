import CustomText from "@/components/CustomText";

const CustomButton = ({
  buttonClassName,
  buttonText,
  buttonStyles,
  loading,
  onClick,
  disable,
  textClassName,
}) => {
  return (
    <button
      className={`btn ${disable || loading ? "no-animation" : ""} ${buttonClassName}`}
      style={{ ...buttonStyles }}
      onClick={onClick}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <p className={textClassName}>{buttonText}</p>
      )}
    </button>
  );
};

export default CustomButton;
