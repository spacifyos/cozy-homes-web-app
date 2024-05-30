import { getServerSideProps } from "@/src/utils/getStatic";
import { useTranslation, withTranslation } from "next-i18next";
import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useReCaptcha } from "next-recaptcha-v3";
import RecaptchaWrapper from "@/components/RecaptchaWrapper";
import { useEffect, useState } from "react";
import _ from "lodash";
import Toast from "@/src/utils/Toast";
import Constant from "@/src/utils/Constant";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import LoadingOverlay from "@/components/LoadingOverlay";

export { getServerSideProps };

const SignUp = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { executeRecaptcha, loaded } = useReCaptcha();

  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpStatus, setSignUpStatus] = useState(false);

  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [countryCode, setCountryCode] = useState("+60");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  useEffect(() => {
    if (signUpStatus) {
      router.replace("my-stay");
    }
  }, [signUpStatus]);

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

    const recaptchaToken = await executeRecaptcha("form_submit");

    const postData = {
      name: nameValue,
      phone_prefix: countryCode,
      phone_suffix: phoneValue,
      email: emailValue,
      password: passwordValue,
      token: recaptchaToken,
    };

    console.log(postData);
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
    await apiRequest.signUpRequest(postData, setSignUpLoading, setSignUpStatus);
  };

  return (
    <CustomHeader hideGoBackButton>
      <div className="body-container py-4">
        <div className="py-6 mb-4">
          <CustomText
            textClassName="primary-text font-bold leading-10"
            styles={{ fontSize: 34 }}
          >
            {t("signUp.letGetStarted")}
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
            className="p-3 global-box-shadow primaryWhite-bg-color py-10"
            style={{ borderRadius: "0 0 10px 10px" }}
          >
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
                placeholder={t("signUp.phoneNumber") + " (12 345 6789)"}
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
              className="input input-bordered w-full primaryWhite-bg-color mb-8 user-input"
              value={confirmPasswordValue}
              onChange={onChangeConfirmPasswordValue}
            />

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
    </CustomHeader>
  );
};

export default withTranslation("common")(RecaptchaWrapper(SignUp));
