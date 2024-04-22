import CustomText from "@/components/CustomText";
import _ from "lodash";

const BookingSelect = ({
  className,
  placeholder,
  errorMessage,
  title,
  lists,
  name,
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      <CustomText textClassName="input-title">{title}</CustomText>
      <div className="booking-wrapper">
        <select className="booking-select" name={name} required>
          <option disabled selected value="">
            {placeholder}
          </option>
          {_.map(lists, (list) => {
            const name = _.get(list, ["name"], "");
            const value = _.get(list, ["value"], "");

            return <option value={value}>{name}</option>;
          })}
        </select>
      </div>
      {_.isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingSelect;
