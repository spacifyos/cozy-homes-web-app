import CustomText from "@/components/CustomText";
import _ from "lodash";

const BookingInput = ({
  inputClassName,
  placeholder,
  errorMessage,
  title,
  name,
}) => {
  return (
    <label className={`form-control w-full ${inputClassName}`}>
      <CustomText textClassName="input-title">{title}</CustomText>
      <input
        type="text"
        placeholder={placeholder}
        className="booking-input"
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

export default BookingInput;
