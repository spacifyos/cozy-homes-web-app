import _ from "lodash";
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
      {!_.isEmpty(label) ? <CustomText>{label}</CustomText> : false}
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

        {_.map(optionList, (item) => {
          const name = _.get(item, ["name"], "");
          const value = _.get(item, ["value"], "");

          return (
            <option key={name} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
