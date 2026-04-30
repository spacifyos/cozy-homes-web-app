import { useTranslation, withTranslation } from "next-i18next";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { isEmpty, isEqual, includes, map, get } from "lodash";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import { NextSeo } from "next-seo";
import {
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
import DesktopLayout from "@/components/DesktopLayout";
import AuthWrapper from "@/components/AuthWrapper";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
      pathname: "/user/otp-verification",
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
    <div className="min-h-screen bg-white">
      <NextSeo title="Sign Up | Tenant - CozyHomes" />

      <DesktopLayout hideNav isMinHeight={false}>
        <div className="container mx-auto max-w-screen-md flex-1 flex flex-col justify-start items-start pb-10">
          <div className="pt-10">
            <div className="pb-6 flex flex-col items-center">
              <CustomText
                textClassName="text-black font-bold leading-10"
                styles={{ fontSize: 32 }}
              >
                Let’s Get Started
              </CustomText>
            </div>

            <div className="w-full">
              <div className="p-6 global-box-shadow bg-white pb-10 global-border-radius">
                <CustomText textClassName="text-center pb-1 pt-3 font-bold text-lg ">
                  You’re signing up as
                </CustomText>

                <CustomText
                  textClassName="text-primary text-center font-bold leading-10 pb-6"
                  styles={{ fontSize: 32 }}
                >
                  Tenant
                </CustomText>

                <input
                  type="text"
                  placeholder={"Your Name"}
                  className="input input-bordered w-full bg-white mb-4 user-input"
                  value={nameValue}
                  onChange={onChangeNameValue}
                />

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <select
                    className="select select-bordered w-full max-w-xs bg-white user-input"
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
                    className="input input-bordered w-full bg-white col-span-2 user-input"
                    value={phoneValue}
                    onChange={onChangePhoneValue}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full bg-white mb-4 user-input"
                  value={emailValue}
                  onChange={onChangeEmailValue}
                />

                <div className="relative mb-4">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={"Your Password"}
                    className="input input-bordered w-full bg-white pr-10 user-input"
                    value={passwordValue}
                    onChange={onChangePasswordValue}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.01-2.86 2.92-5.1 5.24-6.52" />
                        <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9.27 3.11 11 8a12.18 12.18 0 0 1-4.06 5.15" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={"Confirm Your Password"}
                    className="input input-bordered w-full bg-white pr-10 user-input"
                    value={confirmPasswordValue}
                    onChange={onChangeConfirmPasswordValue}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5 0-9.27-3.11-11-8 1.01-2.86 2.92-5.1 5.24-6.52" />
                        <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c5 0 9.27 3.11 11 8a12.18 12.18 0 0 1-4.06 5.15" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>

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
                    buttonClassName={`btn-primary w-2/4 mb-2`}
                    buttonText="Sign Up for FREE"
                    onClick={handleSubmit}
                  />
                </div>

                <CustomText textClassName="text-sm mb-5 text-center">
                  By using our services, you are deemed unconditionally agree,
                  consent and be bound by our terms and conditions and privacy
                  policy.
                </CustomText>

                <CustomText textClassName="text-xs text-center text-disable">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <span className="underline">Privacy Policy</span> and{" "}
                  <span className="underline">Terms of Service</span> apply.
                </CustomText>
              </div>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default AuthWrapper(SignUpTenant);
