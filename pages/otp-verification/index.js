import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import { useRouter } from "next/router";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import AuthManager from "@/src/utils/AuthManager";
import * as authSelector from "@/src/selectors/auth";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

const OtpVerification = () => {
  const router = useRouter();
  const initialTime = 60;
  const phoneNumber = _.get(router, ["query", "phoneNumber"], "");
  const type = _.get(router, ["query", "type"], "");

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

  useEffect(() => {
    if (!_.isEmpty(phoneNumber)) {
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
    setOtpToken(_.get(res, ["token"], ""));
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

    if (!_.isEmpty(authToken) && isUserVerify) {
      AuthManager.setToken(authToken);

      router.push("/my-property");
    } else {
      router.push("/");
    }
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Otp Verification - Spacify Asia" />

      <DesktopLayout
        hideNav
        loading={otpRequestLoading || otpVerifyLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <CustomText textClassName="text-base">
                    Otp Verification
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">
                Otp Verification
              </CustomText>
            </div>
          </div>
        }
      >
        <div className="container mx-auto flex-1 xl:pb-8 lg:pb-8 md:pb-8 sm:pb-8 pb-8 flex flex-col items-center justify-center h-screen">
          <div className="border global-border-radius w-full h-full flex-1 flex flex-col justify-center items-center px-10">
            <CustomText
              textClassName="primary-text font-bold leading-10 pb-5 text-center"
              styles={{ fontSize: 34 }}
            >
              Otp Verification
            </CustomText>

            <CustomText textClassName="pb-5 text-center">
              Enter the 6 digit code that we sent you on your mobile number.
            </CustomText>

            <CustomText textClassName="pb-5 text-sm disable-text text-center">
              Sent to {_.isEmpty(phoneNumber) ? "-" : phoneNumber}
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
              {isResendEnabled
                ? `Resend OTP`
                : `Resend OTP in ${timeLeft} seconds`}
            </CustomText>

            <CustomButton
              buttonClassName={`${isOtpValid ? "primary-btn" : "disable-btn"} w-36 flex`}
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

export default OtpVerification;
