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
      <div className="booking-wrapper booking-select-container flex justify-between">
        <select className="booking-select" name={name} title={title} {...props}>
          <option disabled value="">
            {placeholder}
          </option>
          {_.map(lists, (list) => {
            const label = _.get(list, ["label"], "");
            const value = _.get(list, ["value"], "");

            return (
              <option key={value} value={value}>
                {label}
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
