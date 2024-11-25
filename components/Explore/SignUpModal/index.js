import DesktopModal from "@/components/DesktopModal";
import { get, includes, isEmpty, isEqual, map, toLower } from "lodash";
import Constant from "@/src/utils/Constant";
import { NextSeo } from "next-seo";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import Script from "next/script";
import {
  DEFAULT_SCRIPT_ID,
  SCRIPT_URL,
  Turnstile,
} from "@marsidev/react-turnstile";
import CustomButton from "@/components/CustomButton";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as commonSelector from "@/src/selectors/common";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import UserTypeSelectSection from "@/components/Explore/UserTypeSelectSection";

const SignUpModal = ({ userType, setUserType }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
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
      type: toLower(userType),
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
        type: toLower(userType),
      },
    });
  };

  return (
    <DesktopModal id="sign_up_modal" closeButtonPosition>
      {isEmpty(userType) ? (
        <UserTypeSelectSection setUserType={setUserType} />
      ) : (
        <div
          style={{
            background: isEqual(userType, Constant.OWNER)
              ? "linear-gradient(125.08deg, #D71440 44.39%, #F9A533 96.79%)"
              : "linear-gradient(125.08deg, #F05A22 54.69%, #D71440 96.79%)",
          }}
        >
          <div className="p-6">
            <form method="dialog" className={`flex justify-end `}>
              <button
                className="btn btn-sm btn-circle btn-ghost right-2"
                onClick={() => setUserType("")}
              >
                <CustomImage
                  src={Images.closeIconWhite}
                  imageStyle={{ width: 20, height: 20 }}
                />
              </button>
            </form>
            <div className="pb-6 flex flex-col items-center">
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
              <div className="p-6 global-box-shadow primaryWhite-bg-color global-border-radius">
                <CustomText textClassName="text-center pb-1 font-bold text-lg">
                  You’re signing up as
                </CustomText>

                <CustomText
                  textClassName={`text-center pb-6 font-bold text-lg italic leading-10`}
                  styles={{
                    color: isEqual(userType, Constant.TENANT)
                      ? "#F05A22"
                      : "#D71440",
                    fontSize: 32,
                  }}
                >
                  {userType}
                </CustomText>

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
                    buttonClassName={`${isEqual(userType, Constant.TENANT) ? "secondary-btn" : "primary-btn"} w-2/4 mb-2`}
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
      )}
    </DesktopModal>
  );
};

export default SignUpModal;
