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
  reverse = false,
}) => {
  return (
    <button
      className={`btn ${disable || loading ? "no-animation" : ""} ${reverse ? "flex-row-reverse" : "flex"} ${buttonClassName}`}
      style={{ ...buttonStyles }}
      onClick={disable ? () => {} : onClick}
    >
      {loading ? (
        <span className="loading loading-spinner white-text"></span>
      ) : !_.isEmpty(buttonText) ? (
        <p className={textClassName}>{buttonText}</p>
      ) : (
        false
      )}

      {!_.isEmpty(icon) ? (
        <CustomImage
          src={icon}
          imageStyle={{ width: imageWidth, height: imageHeight, ...imageStyle }}
        />
      ) : (
        false
      )}
    </button>
  );
};

export default CustomButton;
