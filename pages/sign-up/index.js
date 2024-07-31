import { getServerSideProps } from "@/src/utils/getStatic";
import { useTranslation, withTranslation } from "next-i18next";
import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import _, { isEmpty, isEqual } from "lodash";
import Toast from "@/src/utils/Toast";
import Constant from "@/src/utils/Constant";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";
import { NextSeo } from "next-seo";
import {
  DEFAULT_ONLOAD_NAME,
  DEFAULT_SCRIPT_ID,
  SCRIPT_URL,
  Turnstile,
} from "@marsidev/react-turnstile";
import Script from "next/script";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";

export { getServerSideProps };

const SignUp = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const ref = useRef();

  const [signUpLoading, setSignUpLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("tenant");
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [recaptchaToken, setRecaptchaToken] = useState("");

  const onClickToSignIn = () => {
    router.push("/sign-in");
  };

  const handleSubmit = async () => {
    if (
      _.isEmpty(nameValue) ||
      _.isEmpty(passwordValue) ||
      _.isEmpty(emailValue) ||
      _.isEmpty(passwordValue) ||
      _.isEmpty(confirmPasswordValue)
    ) {
      return Toast.error("All fields are required.");
    }

    if (!_.includes(emailValue, "@")) {
      return Toast.error("Invalid email format, need '@' symbol.");
    }

    if (!_.isEqual(passwordValue, confirmPasswordValue)) {
      return Toast.error("Password and Confirm Password not same.");
    }

    const postData = {
      type: selectedRole,
      name: nameValue,
      phone_prefix: countryCode,
      phone_suffix: phoneValue,
      email: emailValue,
      password: passwordValue,
      password_confirmation: confirmPasswordValue,
      token: recaptchaToken,
    };

    await signUpRequest(postData);
  };

  const onChangeNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const onChangePhoneValue = (e) => {
    setPhoneValue(e.target.value);
  };

  const onChangeEmailValue = (e) => {
    setEmailValue(e.target.value);
  };

  const onChangePasswordValue = (e) => {
    setPasswordValue(e.target.value);
  };

  const onChangeConfirmPasswordValue = (e) => {
    setConfirmPasswordValue(e.target.value);
  };

  const onChangeCountryCode = (e) => {
    setCountryCode(e.target.value);
  };

  const signUpRequest = async (postData) => {
    await apiRequest.signUpRequest(
      postData,
      setSignUpLoading,
      signUpSuccessCallback,
    );
  };

  const signUpSuccessCallback = () => {
    router.push({
      pathname: "/otp-verification",
      query: { phoneNumber: countryCode + phoneValue, type: selectedRole },
    });
  };

  return (
    <div className="bg-color">
      <NextSeo title="Sign Up - Spacify Asia" />
      <div className="body-container py-4">
        <div className="pb-6 flex flex-col items-center">
          <CustomImage
            src={Images.logoHorizontalColor}
            imageStyle={{ width: 180 }}
            className="mb-2"
          />

          <CustomText
            textClassName="primary-text font-bold leading-10"
            styles={{ fontSize: 36 }}
          >
            Let’s Get Started
          </CustomText>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2">
            <div onClick={onClickToSignIn} className="cursor-pointer">
              <CustomText
                textClassName="text-center p-4 primary-text font-bold font-size-large"
                styles={{
                  borderRadius: "10px 10px 0 0",
                  backgroundColor: "#E8E8E8",
                  color: "#C3C4C6",
                }}
              >
                {t("signUp.signIn")}
              </CustomText>
            </div>

            <CustomText
              textClassName="text-center p-4 primaryWhite-bg-color primary-text font-bold font-size-large"
              styles={{ borderRadius: "10px 10px 0 0" }}
            >
              {t("signUp.signUp")}
            </CustomText>
          </div>
          <div
            className="p-3 global-box-shadow primaryWhite-bg-color py-5"
            style={{ borderRadius: "0 0 10px 10px" }}
          >
            <CustomText textClassName="pb-4 font-bold font-size-large">
              Sign up with ...
            </CustomText>

            <div className="grid grid-cols-2 gap-2 mb-8">
              <CustomButton
                buttonClassName={`${isEqual(selectedRole, "tenant") ? "primary-btn" : "default-btn-outline"}`}
                buttonText={t("signIn.tenant")}
                onClick={() => setSelectedRole("tenant")}
              />
              <CustomButton
                buttonClassName={`${isEqual(selectedRole, "owner") ? "primary-btn" : "default-btn-outline"}`}
                buttonText={t("signIn.owner")}
                onClick={() => setSelectedRole("owner")}
              />
            </div>

            <input
              type="text"
              placeholder={t("signUp.yourName")}
              className="input input-bordered w-full primaryWhite-bg-color mb-4 user-input"
              value={nameValue}
              onChange={onChangeNameValue}
            />

            <div className="grid grid-cols-3 gap-2 mb-4">
              <select
                className="select select-bordered w-full max-w-xs primaryWhite-bg-color user-input"
                value={countryCode}
                onChange={onChangeCountryCode}
              >
                {_.map(Constant.PHONE_PREFIX, (item) => {
                  const name = _.get(item, ["name"], "");
                  const value = _.get(item, ["value"], "");

                  return (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  );
                })}
              </select>

              <input
                type="number"
                placeholder={"12 345 6789"}
                className="input input-bordered w-full primaryWhite-bg-color col-span-2 user-input"
                value={phoneValue}
                onChange={onChangePhoneValue}
              />
            </div>

            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full primaryWhite-bg-color mb-4 user-input"
              value={emailValue}
              onChange={onChangeEmailValue}
            />

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
              className="input input-bordered w-full primaryWhite-bg-color mb-4 user-input"
              value={confirmPasswordValue}
              onChange={onChangeConfirmPasswordValue}
            />

            <div className="mb-4">
              <Script
                id={DEFAULT_SCRIPT_ID}
                src={SCRIPT_URL}
                strategy="beforeInteractive"
              />

              <Turnstile
                siteKey={process.env.CLOUDFLARE_RECAPTCHA_SITE}
                ref={ref}
                options={{ refreshExpired: "manual", theme: "light" }}
                onExpire={() => ref.current?.reset()}
                onError={(err) => console.error(err)}
                onSuccess={(token) => setRecaptchaToken(token)}
              />
              {/*<Turnstile*/}
              {/*  theme="light"*/}
              {/*  sitekey={process.env.CLOUDFLARE_RECAPTCHA_SITE}*/}
              {/*  onVerify={(token) => setRecaptchaToken(token)}*/}
              {/*/>*/}
            </div>

            <div className="flex justify-center mb-8">
              <CustomButton
                buttonClassName="primary-btn w-2/4 mb-2"
                buttonText="Sign Up"
                onClick={handleSubmit}
              />
            </div>

            <CustomText textClassName="font-size-small mb-5">
              By using our services, you are deemed unconditionally agree,
              consent and be bound by our terms and conditions and privacy
              policy.
            </CustomText>

            <CustomText textClassName="font-size-xxsmall text-center disable-text">
              This site is protected by reCAPTCHA and the Google{" "}
              <span className="underline">Privacy Policy</span> and{" "}
              <span className="underline">Terms of Service</span> apply.
            </CustomText>
          </div>
        </div>

        <LoadingOverlay loading={signUpLoading} />
      </div>
    </div>
  );
};

export default withTranslation("common")(SignUp);
