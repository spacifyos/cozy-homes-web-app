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
        <p>{buttonText}</p>
      )}
    </button>
  );
};

export default CustomButton;
