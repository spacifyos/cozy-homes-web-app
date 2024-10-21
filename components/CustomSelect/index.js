import { map, get, isEmpty } from "lodash";
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
}) => {
  return (
    <label
      style={styles}
      className={`form-control w-full max-w-xs default-select ${className}`}
    >
      {!isEmpty(label) ? <CustomText>{label}</CustomText> : false}
      <select
        className={`select select-bordered font-size-small ${selectClassName}`}
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
          const value = get(item, ["value"], "");
          const label = get(item, ["label"], "");

          return (
            <option key={isEmpty(name) ? label : name} value={value}>
              {isEmpty(name) ? label : name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
