import CustomText from "@/components/CustomText";
import _, { isEqual } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const BookingDateInput = ({
  className = "",
  placeholder,
  errorMessage,
  title,
  name,
  inputClassName,
  onChange,
  disabled = false,
  bgColor = "bg-color",
  required,
  type = "date",
  inputStyle,
  ...props
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      <div className="flex items-center">
        {required ? (
          <CustomText textClassName="error-message pr-1">*</CustomText>
        ) : (
          false
        )}
        <CustomText textClassName="input-title">{title}</CustomText>
      </div>

      <div
        className={`flex items-center gap-2 booking-input relative ${bgColor}`}
        style={inputStyle}
      >
        <input
          type={type}
          placeholder={placeholder}
          className={`${bgColor} ${inputClassName} resize-input-icon`}
          name={name}
          onChange={onChange}
          disabled={disabled}
          title={title}
          {...props}
        />

        {isEqual(type,"date")?<CustomImage
            src={Images.calendarIcon}
            imageStyle={{ width: isEqual(type, "month") ? 30 : 20 }}
        />:<CustomImage
            src={Images.clockIcon}
            imageStyle={{ width: isEqual(type, "month") ? 30 : 20 }}
        />}

      </div>
      {_.isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingDateInput;
