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
      style={styles}
      className={`form-control w-full default-select ${hideShadow ? "" : "global-box-shadow"} ${className}`}
    >
      {!isEmpty(label) ? <CustomText>{label}</CustomText> : false}
      <select
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

        {map(optionList, (item) => {
          const name = get(item, ["name"], "");
          const label = get(item, ["label"], "");
          const value = get(item, ["value"], "");

          return (
            <option key={name} value={value}>
              {isEmpty(name) ? label : name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
