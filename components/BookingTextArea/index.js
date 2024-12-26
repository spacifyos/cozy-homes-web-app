import CustomText from "@/components/CustomText";
import _ from "lodash";

const BookingTextArea = ({
  className,
  placeholder,
  errorMessage,
  title,
  name,
  bgColor = "bg-color",
  ...props
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      <CustomText textClassName="input-title">{title}</CustomText>
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
