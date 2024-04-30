import _ from "lodash";
import CustomText from "@/components/CustomText";

const CustomSelect = ({
  placeholder,
  optionList,
  label,
  className,
  onChange,
  styles,
}) => {
  return (
    <label
      style={styles}
      className={`form-control w-full max-w-xs default-select ${className}`}
    >
      {!_.isEmpty(label) ? <CustomText>{label}</CustomText> : false}
      <select className="select select-bordered" onChange={onChange} required>
        <option disabled selected value="">
          {placeholder}
        </option>
        {_.map(optionList, (item) => {
          const name = _.get(item, ["name"], "");
          const value = _.get(item, ["value"], "");

          return <option key={name} value={value}>{name}</option>;
        })}
      </select>
    </label>
  );
};

export default CustomSelect;
