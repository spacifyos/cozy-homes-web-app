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
        placeholder={t("signUp.yourPassword")}
        className="input input-bordered w-full primaryWhite-bg-color mb-4 user-input"
        value={passwordValue}
        onChange={onChangePasswordValue}
      />

      <input
        type="password"
        placeholder={t("signUp.confirmYourPassword")}
        className="input input-bordered w-full primaryWhite-bg-color mb-8 user-input"
        value={confirmPasswordValue}
        onChange={onChangeConfirmPasswordValue}
      />

      <div className="grid grid-cols-4">
        <CustomButton
          buttonText="Submit"
          buttonClassName={`${isEqual(typeQuery, Constant.TENANT) ? "secondary-btn" : "primary-btn"} col-start-2 col-span-2`}
          onClick={onClickSubmitChangePassword}
        />
      </div>
    </div>
  );
};

export default ThirdStep;
