import CustomButton from "@/components/CustomButton";
import { isEqual } from "lodash";
import Constant from "@/src/utils/Constant";

const ThirdStep = ({
  t,
  passwordValue,
  confirmPasswordValue,
  onChangePasswordValue,
  onChangeConfirmPasswordValue,
  onClickSubmitChangePassword,
  typeQuery,
}) => {
  return (
    <div>
      <input
        type="password"
        placeholder={"Your Password"}
        className="input input-bordered w-full bg-white mb-4 user-input"
        value={passwordValue}
        onChange={onChangePasswordValue}
      />

      <input
        type="password"
        placeholder={"Confirm Your Password"}
        className="input input-bordered w-full bg-white mb-8 user-input"
        value={confirmPasswordValue}
        onChange={onChangeConfirmPasswordValue}
      />

      <div className="grid grid-cols-4">
        <CustomButton
          buttonText="Submit"
          buttonClassName={`${isEqual(typeQuery, Constant.TENANT) ? "btn-secondary" : "btn-primary"} col-start-2 col-span-2`}
          onClick={onClickSubmitChangePassword}
        />
      </div>
    </div>
  );
};

export default ThirdStep;
