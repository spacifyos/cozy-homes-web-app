import { getServerSideProps } from "@/src/utils/getStatic";
import { useTranslation, withTranslation } from "next-i18next";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { isEmpty, isEqual, includes, map, get, toLower } from "lodash";
import Toast from "@/src/utils/Toast";
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
import { useSelector } from "react-redux";
import * as commonSelector from "@/src/selectors/common";
import Constant from "@/src/utils/Constant";
import Link from "next/link";

export { getServerSideProps };

const SignUpTenant = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const typeQuery = get(router, ["query", "type"], "Tenant");
  const ref = useRef();

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );
  const phonePrefixOption = commonSelector.getPhonePrefix(selectOptionData);

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
      isEmpty(nameValue) ||
      isEmpty(passwordValue) ||
      isEmpty(emailValue) ||
      isEmpty(passwordValue) ||
      isEmpty(confirmPasswordValue)
    ) {
      return Toast.error("All fields are required.");
    }

    if (!includes(emailValue, "@")) {
      return Toast.error("Invalid email format, need '@' symbol.");
    }

    if (!isEqual(passwordValue, confirmPasswordValue)) {
      return Toast.error("Password and Confirm Password not same.");
    }

    const postData = {
      type: Constant.TENANT,
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
      query: {
        phoneNumber: countryCode + phoneValue,
        type: Constant.TENANT,
      },
    });
  };

  const onClickGoBack = () => {
    router.replace(`/sign-in/${Constant.TENANT}`);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(125.08deg, #F05A22 54.69%, #D71440 96.79%)",
      }}
      className={`min-h-screen pb-4`}
    >
      <NextSeo title="Sign Up - Spacify Asia" />

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
            src={Images.blackLogo}
            imageStyle={{ width: 120 }}
            className="mb-2"
          />

          <CustomText
            textClassName="white-text font-bold leading-10"
            styles={{ fontSize: 32 }}
          >
            Let’s Get Started
          </CustomText>
        </div>

        <div className="w-full">
          {/*<div className="grid grid-cols-2">*/}
          {/*  <div onClick={onClickToSignIn} className="cursor-pointer">*/}
          {/*    <CustomText*/}
          {/*      textClassName="text-center p-4 primary-text font-bold font-size-large"*/}
          {/*      styles={{*/}
          {/*        borderRadius: "10px 10px 0 0",*/}
          {/*        backgroundColor: "#E8E8E8",*/}
          {/*        color: "#C3C4C6",*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      {t("signUp.signIn")}*/}
          {/*    </CustomText>*/}
          {/*  </div>*/}

          {/*  <CustomText*/}
          {/*    textClassName="text-center p-4 primaryWhite-bg-color primary-text font-bold font-size-large"*/}
          {/*    styles={{ borderRadius: "10px 10px 0 0" }}*/}
          {/*  >*/}
          {/*    {t("signUp.signUp")}*/}
          {/*  </CustomText>*/}
          {/*</div>*/}
          <div className="p-3 global-box-shadow primaryWhite-bg-color pb-10 global-border-radius">
            <CustomText textClassName="text-center pb-1 pt-3 font-bold font-size-xxlarge">
              You’re signing up as
            </CustomText>

            <CustomText
              textClassName={`text-center pb-6 font-bold font-size-xxlarge italic leading-10`}
              styles={{
                color: "#F05A22",
                fontSize: 32,
              }}
            >
              Tenant
            </CustomText>

            {/*<div className="grid grid-cols-2 gap-2 mb-8">*/}
            {/*  <CustomButton*/}
            {/*    buttonClassName={`${isEqual(selectedRole, "tenant") ? "primary-btn" : "default-btn-outline"}`}*/}
            {/*    buttonText={t("signIn.tenant")}*/}
            {/*    onClick={() => setSelectedRole("tenant")}*/}
            {/*  />*/}
            {/*  <CustomButton*/}
            {/*    buttonClassName={`${isEqual(selectedRole, "owner") ? "primary-btn" : "default-btn-outline"}`}*/}
            {/*    buttonText={t("signIn.owner")}*/}
            {/*    onClick={() => setSelectedRole("owner")}*/}
            {/*  />*/}
            {/*</div>*/}

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
                {map(phonePrefixOption, (item) => {
                  const name = get(item, ["label"], "");
                  const value = get(item, ["value"], "");

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

            <div className="flex justify-center pb-2">
              <CustomButton
                buttonClassName={`secondary-btn w-2/4 mb-2`}
                buttonText="Sign Up for FREE"
                onClick={handleSubmit}
              />
            </div>

            <CustomText textClassName="text-sm mb-5">
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

export default withTranslation("common")(SignUpTenant);
