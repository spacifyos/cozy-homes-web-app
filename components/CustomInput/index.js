import CustomText from "@/components/CustomText";
import _ from "lodash";

const CustomInput = ({ icon = false, label, inputType }) => {
  return (
    <label className="input input-bordered flex items-center gap-2">
      {!_.isEmpty(label) ? <CustomText>{label}</CustomText> : false}
      {!_.isEmpty(icon) ? icon : false}
      <input
        type={inputType}
        className="grow input-primary"
        placeholder="Email"
      />
    </label>
  );
};

export default CustomInput;
