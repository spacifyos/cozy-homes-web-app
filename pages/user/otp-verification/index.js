import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import CustomButton from "@/components/CustomButton";
import { size, get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import AuthManager from "@/src/utils/AuthManager";
import * as authSelector from "@/src/selectors/auth";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import { withTranslation, useTranslation } from "next-i18next";

const OtpVerification = () => {
  const router = useRouter();
  const initialTime = 60;
  const phoneNumber = get(router, ["query", "phoneNumber"], "");
  const type = get(router, ["query", "type"], "");

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const [otpToken, setOtpToken] = useState("");

  const isOtpValid = size(otp) == 6;

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

  useEffect(() => {
    if (!isEmpty(phoneNumber)) {
      handleSendOtp(phoneNumber);
    }
  }, [phoneNumber]);

  const handleSendOtp = async (phoneNumber) => {
    setTimeLeft(initialTime);
    setIsResendEnabled(false);

    const postData = {
      case: "account_verification",
      destination: phoneNumber,
      type: type,
    };

    await apiRequest.postOtpRequest(
      postData,
      setOtpRequestLoading,
      otpRequestSuccess,
    );
  };

  const otpRequestSuccess = (res) => {
    setOtpToken(get(res, ["token"], ""));
  };

  const handleResend = async () => {
    await handleSendOtp(phoneNumber);
  };

  const onClickSubmit = async () => {
    const postData = {
      otp: otp,
      token: otpToken,
      type: type,
      phone_number: phoneNumber,
    };

    await apiRequest.postAuthVerify(
      postData,
      setOtpVerifyLoading,
      otpVerifySuccess,
    );
  };

  const otpVerifySuccess = (res) => {
    const isUserVerify = authSelector.getIsAccountVerify(res);
    const authToken = authSelector.getToken(res);

    if (!isEmpty(authToken) && isUserVerify) {
      AuthManager.setToken(authToken);

      router.replace("/user/my-property");
    } else {
      router.replace("/sign-in");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Otp Verification - Spacify Asia" />

      <DesktopLayout hideNav isMinHeight={false}>
        <div className="container mx-auto max-w-screen-md flex-1 flex flex-col justify-start items-start xl:pt-20 lg:pt-20 md:pt-20 sm:pt-20 pt-10">
          <CustomText textClassName="text-primary font-bold text-center w-full xl:text-3xl lg:text-2xl md:text-2xl sm:text-2xl text-2xl xl:pb-10 lg:pb-10 md:pb-10 sm:pb-5 pb-5">
            Otp Verification
          </CustomText>

          <div className="bg-white border global-border-radius w-full flex flex-col justify-center items-center p-6">
            <CustomText textClassName="pb-5 text-center">
              Enter the 6 digit code that we sent you on your mobile number.
            </CustomText>

            <CustomText textClassName="pb-5 text-sm text-disable text-center">
              Sent to {isEmpty(phoneNumber) ? "-" : phoneNumber}
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

            <CustomText textClassName="pb-5 text-sm text-disable text-center">
              Not received code yet.
            </CustomText>

            <CustomText
              textClassName="pb-5 text-sm text-primary text-center cursor-pointer"
              onClick={isResendEnabled ? handleResend : () => {}}
            >
              {isResendEnabled
                ? `Resend OTP`
                : `Resend OTP in ${timeLeft} seconds`}
            </CustomText>

            <CustomButton
              buttonClassName={`${isOtpValid ? "btn-primary" : "btn-disable"} w-36 flex`}
              buttonText="Verify Code"
              disable={!isOtpValid || otpRequestLoading || otpVerifyLoading}
              loading={otpRequestLoading || otpVerifyLoading}
              onClick={onClickSubmit}
            />
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OtpVerification);
