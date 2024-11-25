import CustomText from "@/components/CustomText";
import OtpInput from "react-otp-input";
import CustomButton from "@/components/CustomButton";
import _, { isEqual } from "lodash";
import Constant from "@/src/utils/Constant";

const SecondStep = ({
  otp,
  timeLeft,
  isResendEnabled,
  otpVerifyLoading,
  handleResend,
  onClickSubmit,
  setOtp,
  phonePrefix,
  phoneNumber,
  typeQuery,
}) => {
  const isOtpValid = _.size(otp) == 6;

  return (
    <div className="w-full">
      <CustomText textClassName="pb-5 text-center">
        Enter the 6 digit code that we sent you on your mobile number.
      </CustomText>

      <CustomText textClassName="pb-5 text-sm disable-text text-center">
        Sent to {phonePrefix + phoneNumber}
      </CustomText>

      <div className="flex justify-center pb-7">
        <OtpInput
          containerStyle={{ flexWrap: "wrap" }}
          placeholder="-"
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputType="number"
          renderSeparator={<span className="w-2"></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            backgroundColor: "#FFFFFF",
            width: 45,
            height: 50,
            borderRadius: 10,
            boxShadow:
              "rgba(0, 0, 0, 0.1) 2px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
          }}
        />
      </div>

      <CustomText textClassName="pb-5 text-sm disable-text text-center">
        Not received code yet.
      </CustomText>

      <CustomText
        textClassName="pb-5 text-sm primary-text text-center cursor-pointer"
        onClick={isResendEnabled ? handleResend : () => {}}
      >
        {isResendEnabled ? `Resend OTP` : `Resend OTP in ${timeLeft} seconds`}
      </CustomText>

      <div className="grid grid-cols-4">
        <CustomButton
          buttonClassName={`${isOtpValid ? (isEqual(typeQuery, Constant.TENANT) ? "secondary-btn" : "primary-btn") : "disable-btn"} col-start-2 col-span-2`}
          buttonText="Verify Code"
          disable={!isOtpValid || otpVerifyLoading}
          loading={otpVerifyLoading}
          onClick={onClickSubmit}
        />
      </div>
    </div>
  );
};

export default SecondStep;
