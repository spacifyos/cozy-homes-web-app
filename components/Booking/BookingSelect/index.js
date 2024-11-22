import CustomText from "@/components/CustomText";
import { map, get, isEmpty } from "lodash";
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
  bgColor = "bg-color",
  ...props
}) => {
  return (
    <label className={`form-control w-full ${className}`}>
      {isEmpty(title) ? (
        false
      ) : (
        <div className="flex items-center" style={{ height: 19 }}>
          {required ? (
            <CustomText textClassName="error-message pr-1">*</CustomText>
          ) : (
            false
          )}
          <CustomText textClassName="input-title">{title}</CustomText>
        </div>
      )}

      <div
        className={`${bgColor} booking-select-container flex justify-between`}
      >
        <select className="booking-select" name={name} title={title} {...props}>
          <option disabled value="">
            {placeholder}
          </option>
          {map(lists, (list) => {
            const label = get(list, ["label"], "");
            const value = get(list, ["value"], "");

            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>

        <CustomImage src={rightIcon} imageStyle={{ width: 10 }} />
      </div>
      {isEmpty(errorMessage) ? (
        false
      ) : (
        <CustomText textClassName="error-message">* {errorMessage}</CustomText>
      )}
    </label>
  );
};

export default BookingSelect;
