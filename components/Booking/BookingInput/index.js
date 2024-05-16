import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";

const BookingInput = ({
  className = "",
  placeholder,
  errorMessage,
  title,
  name,
  inputClassName,
  rightIcon = "",
  type = "text",
  value,
  onChange,
  disabled = false,
  bgColor = "bg-color",
  style,
}) => {
  return (
    <label className={`form-control w-full mb-2 ${className}`}>
      <CustomText textClassName="input-title">{title}</CustomText>
      <div className={`flex items-center gap-2 booking-input ${bgColor}`}>
        <input
          type={type}
          placeholder={placeholder}
          className={`${bgColor} ${inputClassName}`}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required
          style={style}
        />
        {_.isEmpty(errorMessage) ? (
          false
        ) : (
          <CustomText textClassName="error-message">
            * {errorMessage}
          </CustomText>
        )}
        {!_.isEmpty(rightIcon) ? (
          <CustomImage src={rightIcon} height={20} width={20} />
        ) : (
          false
        )}
      </div>
    </label>
  );
};

export default BookingInput;
