import CustomText from "@/components/CustomText";
import _ from "lodash";
import CustomImage from "@/components/CustomImage";

const CustomInput = ({
  leftIcon = "",
  rightIcon = "",
  label,
  inputType,
  placeholder,
  className,
  required = false,
  labelClassName,
  autoFocus = false,
}) => {
  return (
    <label className={`flex flex-col ${className}`}>
      <div className="flex">
        {required ? (
          <CustomText textClassName="error-text pr-1">*</CustomText>
        ) : (
          false
        )}
        {!_.isEmpty(label) ? (
          <CustomText textClassName={`${labelClassName}`}>{label}</CustomText>
        ) : (
          false
        )}
      </div>

      <div
        className={`input input-bordered flex items-center gap-2 default-input `}
      >
        {!_.isEmpty(leftIcon) ? leftIcon : false}
        <input
          type={inputType}
          className="grow input-primary primaryWhite-bg-color"
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {!_.isEmpty(rightIcon) ? (
          <CustomImage src={rightIcon} height={20} width={20} />
        ) : (
          false
        )}
      </div>
    </label>
  );
};

export default CustomInput;
