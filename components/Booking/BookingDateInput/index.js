import CustomText from "@/components/CustomText";
import _ from "lodash";
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
      >
        <input
          type="date"
          placeholder={placeholder}
          className={`${bgColor} ${inputClassName} flex-1 w-full resize-input-icon`}
          name={name}
          onChange={onChange}
          disabled={disabled}
          title={title}
          {...props}
        />

        <CustomImage
          src={Images.calendarIcon}
          imageStyle={{ width: 20, height: 20 }}
        />
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
