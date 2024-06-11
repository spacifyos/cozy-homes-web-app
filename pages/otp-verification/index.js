import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import { useRouter } from "next/router";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

const OtpVerification = () => {
  const router = useRouter();
  const initialTime = 60;

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const [otpToken, setOtpToken] = useState("");

  const isOtpValid = _.size(otp) == 6;

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      setIsResendEnabled(true);
    }
  }, [timeLeft]);

  const handleSendOtp = async () => {
    setTimeLeft(initialTime);
    setIsResendEnabled(false);

    const postData = {
      case: "reset_password",
      destination: "+60187834039",
      type: "tenant",
    };

    await apiRequest.postOtpRequest(
      postData,
      setOtpRequestLoading,
      otpRequestSuccess,
    );
  };

  const otpRequestSuccess = (res) => {
    setOtpToken(_.get(res, ["token"], ""));
  };

  const handleResend = async () => {
    await handleSendOtp();
  };

  const onClickSubmit = async () => {
    const postData = {
      otp: otp,
      token: otpToken,
    };

    await apiRequest.postOtpVerify(
      postData,
      setOtpVerifyLoading,
      otpVerifySuccess,
    );
  };

  const otpVerifySuccess = () => {
    router.replace("/my-stay");
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader onClickGoBack={onClickGoBack}>
      <div className="body-container py-4 flex flex-col items-center overflow-hidden">
        <CustomText
          textClassName="primary-text font-bold leading-10 pb-5 text-center"
          styles={{ fontSize: 34 }}
        >
          Otp Verification
        </CustomText>

        <CustomText textClassName="pb-5 text-center">
          Enter the 6 digit code that we sent you on your mobile number.
        </CustomText>

        <CustomText textClassName="pb-5 font-size-small disable-text text-center">
          Sent to +91 9878 977 771
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

        <CustomText textClassName="pb-5 font-size-small disable-text text-center">
          Not received code yet.
        </CustomText>

        <CustomText
          textClassName="pb-5 font-size-small primary-text text-center cursor-pointer"
          onClick={isResendEnabled ? handleResend : () => {}}
        >
          {isResendEnabled ? `Resend OTP` : `Resend OTP in ${timeLeft} seconds`}
        </CustomText>

        <CustomButton
          buttonClassName={`${isOtpValid ? "primary-btn" : "disable-btn"} w-36 flex`}
          buttonText="Verify Code"
          disable={!isOtpValid || otpRequestLoading || otpVerifyLoading}
          loading={otpRequestLoading || otpVerifyLoading}
          onClick={onClickSubmit}
        />
      </div>
    </CustomHeader>
  );
};

export default OtpVerification;
