import CustomText from "@/components/CustomText";
import _ from "lodash";

const BookingTextArea = ({
  className,
  placeholder,
  errorMessage,
  title,
  name,
  textareaClassName = "bg-color",
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      <CustomText textClassName="input-title">{title}</CustomText>
      <textarea
        typeof="text"
        placeholder={placeholder}
        className={`booking-textarea ${textareaClassName}`}
        name={name}
        required
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
