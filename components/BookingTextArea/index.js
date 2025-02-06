import CustomText from "@/components/CustomText";
import _ from "lodash";

const BookingTextArea = ({
  className,
  placeholder,
  errorMessage,
  title,
  name,
  bgColor = "bg-primary-background",
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

      <textarea
        typeof="text"
        placeholder={placeholder}
        className={`booking-textarea ${bgColor}`}
        name={name}
        required
        {...props}
      />
      {_.isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingTextArea;
