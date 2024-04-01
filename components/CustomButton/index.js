import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";

const CustomButton = ({
  buttonClassName,
  buttonText,
  buttonStyles,
  loading,
  onClick,
  disable,
  textClassName,
  icon = "",
  imageStyle,
  imageWidth = 20,
  imageHeight = 20,
}) => {
  return (
    <button
      className={`btn ${disable || loading ? "no-animation" : ""} ${buttonClassName}`}
      style={{ ...buttonStyles }}
      onClick={onClick}
    >
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : !_.isEmpty(buttonText) ? (
        <p className={textClassName}>{buttonText}</p>
      ) : (
        false
      )}

      {!_.isEmpty(icon) ? (
        <CustomImage
          src={icon}
          width={imageWidth}
          height={imageHeight}
          imageStyle={imageStyle}
        />
      ) : (
        false
      )}
    </button>
  );
};

export default CustomButton;
