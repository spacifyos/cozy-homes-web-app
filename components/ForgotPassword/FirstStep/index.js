import { isEqual, map, get } from "lodash";
import CustomButton from "@/components/CustomButton";
import Constant from "@/src/utils/Constant";

const FirstStep = ({
  t,
  phonePrefix,
  phoneNumber,
  selectedRole,
  onChangePhonePrefix,
  onChangePhoneNumber,
  setSelectedRole,
  onClickSendOtp,
  phonePrefixOption,
  typeQuery,
}) => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-8">
        <select
          className="select select-bordered w-full primaryWhite-bg-color user-input"
          value={phonePrefix}
          onChange={onChangePhonePrefix}
        >
          {map(phonePrefixOption, (list) => {
            const name = get(list, ["label"], "");
            const value = get(list, ["value"], "");

            return (
              <option key={value} value={value}>
                {name}
              </option>
            );
          })}
        </select>

        <input
          value={phoneNumber}
          onChange={onChangePhoneNumber}
          type="number"
          placeholder={t("signIn.phoneNumber")}
          className="input input-bordered w-full primaryWhite-bg-color col-span-2 user-input"
        />
      </div>

      <div className="grid grid-cols-4">
        <CustomButton
          buttonText="Send Code"
          buttonClassName={`${isEqual(typeQuery, Constant.TENANT) ? "secondary-btn" : "primary-btn"} col-start-2 col-span-2`}
          onClick={onClickSendOtp}
        />
      </div>
    </div>
  );
};

export default FirstStep;
