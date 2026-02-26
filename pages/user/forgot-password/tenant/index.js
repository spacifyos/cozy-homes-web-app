import CustomText from "@/components/CustomText";
import { isEmpty, isEqual, get } from "lodash";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import FirstStep from "@/components/ForgotPassword/FirstStep";
import SecondStep from "@/components/ForgotPassword/SecondStep";
import ThirdStep from "@/components/ForgotPassword/ThirdStep";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Toast from "@/src/utils/Toast";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import * as commonSelector from "@/src/selectors/common";
import Constant from "@/src/utils/Constant";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

export { getServerSideProps };

const ForgotPasswordTenant = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const initialTime = 60;

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const phonePrefixOption = commonSelector.getPhonePrefix(selectOptionData);

  const [step, setStep] = useState(1);
  const [phonePrefix, setPhonePrefix] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedRole, setSelectedRole] = useState("tenant");

  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isResendEnabled, setIsResendEnabled] = useState(true);
  const [otpRequestLoading, setOtpRequestLoading] = useState(false);
  const [otpVerifyLoading, setOtpVerifyLoading] = useState(false);
  const [otpToken, setOtpToken] = useState("");

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);

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
    if (isEmpty(phonePrefix) || isEmpty(phoneNumber)) {
      return Toast.error("All fields are required.");
    }

    setTimeLeft(initialTime);
    setIsResendEnabled(false);

    const postData = {
      case: "reset_password",
      destination: phonePrefix + phoneNumber,
      type: Constant.TENANT,
    };

    await apiRequest.postOtpRequest(
      postData,
      setOtpRequestLoading,
      otpRequestSuccess,
    );
  };

  const otpRequestSuccess = (res) => {
    setStep(2);
    setOtpToken(get(res, ["token"], ""));
  };

  const onClickSendOtp = async () => {
    await handleSendOtp();
  };

  const handleResend = async () => {
    await handleSendOtp();
  };

  const onClickSubmit = async () => {
    const postData = {
      otp: otp,
      token: otpToken,
      type: Constant.TENANT,
      phone_number: phonePrefix + phoneNumber,
    };

    await apiRequest.postOtpVerify(
      postData,
      setOtpVerifyLoading,
      otpVerifySuccess,
    );
  };

  const otpVerifySuccess = () => {
    setStep(3);
  };

  const onChangePhonePrefix = (e) => {
    setPhonePrefix(e.target.value);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onChangePasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const onChangeConfirmPasswordValue = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const onClickSubmitChangePassword = async () => {
    if (isEmpty(passwordValue) || isEmpty(confirmPasswordValue)) {
      return Toast.error("All fields are required.");
    }

    if (!isEqual(passwordValue, confirmPasswordValue)) {
      return Toast.error("Password and Confirm Password not same.");
    }

    const postData = {
      type: Constant.TENANT,
      phone_number: phonePrefix + phoneNumber,
      password: passwordValue,
      password_confirmation: confirmPasswordValue,
      otp_token: otpToken,
    };

    await apiRequest.postForgotPasswordRequest(
      postData,
      setForgotPasswordLoading,
      forgotPasswordSuccess,
    );
  };

  const forgotPasswordSuccess = () => {
    console.log("forgotPasswordSuccess");
    router.replace(`/sign-in/tenant`);
  };

  const renderContent = (step) => {
    switch (step) {
      case 1:
        return (
          <FirstStep
            phonePrefixOption={phonePrefixOption}
            t={t}
            setStep={setStep}
            phonePrefix={phonePrefix}
            phoneNumber={phoneNumber}
            selectedRole={selectedRole}
            onChangePhonePrefix={onChangePhonePrefix}
            onChangePhoneNumber={onChangePhoneNumber}
            setSelectedRole={setSelectedRole}
            onClickSendOtp={onClickSendOtp}
            typeQuery={Constant.TENANT}
          />
        );
      case 2:
        return (
          <SecondStep
            setStep={setStep}
            otp={otp}
            setOtp={setOtp}
            timeLeft={timeLeft}
            isResendEnabled={isResendEnabled}
            otpVerifyLoading={otpVerifyLoading}
            handleResend={handleResend}
            onClickSubmit={onClickSubmit}
            phonePrefix={phonePrefix}
            phoneNumber={phoneNumber}
            typeQuery={Constant.TENANT}
          />
        );
      case 3:
        return (
          <ThirdStep
            t={t}
            setStep={setStep}
            passwordValue={passwordValue}
            confirmPasswordValue={confirmPasswordValue}
            onChangePasswordValue={onChangePasswordValue}
            onChangeConfirmPasswordValue={onChangeConfirmPasswordValue}
            onClickSubmitChangePassword={onClickSubmitChangePassword}
            typeQuery={Constant.TENANT}
          />
        );
      default:
        return (
          <FirstStep
            t={t}
            setStep={setStep}
            phonePrefix={phonePrefix}
            phoneNumber={phoneNumber}
            selectedRole={selectedRole}
            onChangePhonePrefix={onChangePhonePrefix}
            onChangePhoneNumber={onChangePhoneNumber}
            setSelectedRole={setSelectedRole}
            typeQuery={Constant.TENANT}
          />
        );
    }
  };

  const onClickGoBack = () => {
    router.replace(`/`);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(125.08deg, #18407E 54.69%, #D71440 96.79%)",
      }}
      className={`min-h-screen pb-4`}
    >
      <NextSeo title="Forgot Password - CozyHomes" />

      <div className="body-container">
        <div onClick={onClickGoBack} className="cursor-pointer pt-5">
          <CustomImage
            className={"me-5 cursor-pointer"}
            src={Images.leftIconWhite}
            imageStyle={{ width: 10, height: 10 }}
          />
        </div>

        <div className="py-6 flex flex-col items-center">
          <CustomImage
            src={Images.logoBlackWithText}
            imageStyle={{ width: 120 }}
            className="mb-2"
          />

          <CustomText
            textClassName="text-white font-bold leading-10"
            styles={{ fontSize: 32 }}
          >
            Reset Password
          </CustomText>
        </div>

        <div className="w-full">
          <div className="p-3 global-box-shadow bg-white pb-10 global-border-radius">
            <CustomText textClassName="text-center pb-1 pt-3 font-bold text-lg">
              Reset password as
            </CustomText>

            <CustomText
              textClassName={`text-center pb-6 font-bold text-lg italic leading-10`}
              styles={{
                color: "#18407E",
                fontSize: 32,
              }}
            >
              Tenant
            </CustomText>

            {renderContent(step)}
          </div>
        </div>

        <LoadingOverlay loading={otpRequestLoading || forgotPasswordLoading} />
      </div>
    </div>
  );
};

export default withTranslation("common")(ForgotPasswordTenant);
