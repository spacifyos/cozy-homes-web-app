import { isEmpty, map, get } from "lodash";
import CustomText from "@/components/CustomText";

const CustomSelect = ({
  placeholder,
  optionList,
  label,
  className,
  onChange,
  styles,
  value,
  hideDefaultOption = false,
  selectClassName = "",
  selectStyles,
  hideShadow = false,
}) => {
  return (
    <label
      for={isEmpty(label) ? placeholder : label}
      style={styles}
      className={`form-control w-full default-select ${hideShadow ? "" : "global-box-shadow"} ${className}`}
    >
      {!isEmpty(label) ? <CustomText>{label}</CustomText> : false}
      <select
        id={isEmpty(label) ? placeholder : label}
        className={`select select-bordered text-sm ${selectClassName}`}
        style={selectStyles}
        onChange={onChange}
        value={value}
        required
      >
        {hideDefaultOption ? (
          false
        ) : (
          <option selected value="">
            {placeholder}
          </option>
        )}

        {map(optionList, (item, index) => {
          const name = get(item, ["name"], "");
          const label = get(item, ["label"], "");
          const value = get(item, ["value"], "");

          return (
            <option key={index} value={value}>
              {isEmpty(name) ? label : name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
