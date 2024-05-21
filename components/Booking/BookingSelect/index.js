import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const BookingSelect = ({
  className,
  placeholder,
  errorMessage,
  title,
  lists,
  name,
  rightIcon = Images.downIcon,
}) => {
  return (
    <label className={`form-control w-full mb-2 ${className}`}>
      <CustomText textClassName="input-title">{title}</CustomText>
      <div className="booking-wrapper booking-select-container flex justify-between">
        <select className="booking-select" name={name} required>
          <option disabled value="">
            {placeholder}
          </option>
          {_.map(lists, (list) => {
            const name = _.get(list, ["name"], "");
            const value = _.get(list, ["value"], "");

            return (
              <option key={value} value={value}>
                {name}
              </option>
            );
          })}
        </select>

        <CustomImage src={rightIcon} width={10} height={10} />
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
