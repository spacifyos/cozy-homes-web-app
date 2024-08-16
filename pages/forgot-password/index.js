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
import CustomHeader from "@/components/CustomHeader";
import { NextSeo } from "next-seo";
import { useSelector } from "react-redux";
import * as commonSelector from "@/src/selectors/common";

export { getServerSideProps };

const ForgotPassword = () => {
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
      type: selectedRole,
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
      type: "tenant",
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
      type: "tenant",
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
    router.replace("/sign-in");
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
          />
        );
    }
  };

  const onClickGoBack = () => {
    router.back();
  };

  return (
    <CustomHeader onClickGoBack={onClickGoBack}>
      <NextSeo title="Forgot Password - Spacify Asia" />
      <div className="body-container mb-4" style={{ paddingTop: "" }}>
        <div className="py-6">
          <CustomText
            textClassName="primary-text font-bold leading-10"
            styles={{ fontSize: 36 }}
          >
            Reset Password
          </CustomText>
        </div>

        <div className="w-full">
          <div className="p-4 global-box-shadow primaryWhite-bg-color py-8 global-border-radius">
            {renderContent(step)}
          </div>
        </div>

        <LoadingOverlay loading={otpRequestLoading || forgotPasswordLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(ForgotPassword);
