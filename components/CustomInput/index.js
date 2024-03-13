import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";

const CustomInput = ({
  leftIcon = '',
  rightIcon = '',
  label,
  inputType,
  placeholder,
  className,
}) => {
  return (
    <label
      className={`input input-bordered flex items-center gap-2 default-input ${className}`}
    >
      {!_.isEmpty(label) ? <CustomText>{label}</CustomText> : false}
      {!_.isEmpty(leftIcon) ? leftIcon : false}
      <input
        type={inputType}
        className="grow input-primary primaryWhite-bg-color"
        placeholder={placeholder}
      />
      {!_.isEmpty(rightIcon) ? (
        <CustomImage src={rightIcon} height={20} width={20} />
      ) : (
        false
      )}
    </label>
  );
};

export default CustomInput;
