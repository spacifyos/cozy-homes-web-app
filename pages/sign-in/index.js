import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useState } from "react";
import { get, isEmpty, map, isEqual } from "lodash";
import Constant from "@/src/utils/Constant";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Toast from "@/src/utils/Toast";
import AuthManager from "@/src/utils/AuthManager";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const SignIn = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeQuery = get(router, ["query"], null);

  const [signInLoading, setSignInLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("tenant");
  const [phonePrefix, setPhonePrefix] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const onClickToAgencySignIn = () => {
    router.push("/agency-sign-in");
  };

  const onClickToSignUp = () => {
    router.push({
      pathname: `/sign-up`,
    });
  };

  const onClickToLogin = async () => {
    if (isEmpty(phoneNumber)) {
      Toast.error("Phone number is required.");
      return;
    }

    if (isEmpty(password)) {
      Toast.error("Password is required.");
      return;
    }

    const postData = {
      type: selectedRole,
      phone_prefix: phonePrefix,
      phone_suffix: phoneNumber,
      password: password,
    };

    await apiRequest.signInRequest(postData, setSignInLoading, signInSuccess);
  };

  const signInSuccess = (res) => {
    const authToken = authSelector.getToken(res);
    const isUserVerify = authSelector.getUserVerify(res);
    const userPhoneNumber = authSelector.getUserPhoneNumber(res);
    const userType = authSelector.getUserType(res);

    if (!isEmpty(authToken) && isUserVerify) {
      AuthManager.setToken(authToken);
      AuthManager.setLoginType(userType);

      const tab = get(routeQuery, ["tab"], "");

      return router.replace(`/loading?tab=${tab}`);
    } else {
      return router.push({
        pathname: "/otp-verification",
        query: { phoneNumber: userPhoneNumber, type: selectedRole },
      });
    }
  };

  const onChangePhonePrefix = (e) => {
    setPhonePrefix(e.target.value);
  };

  const onChangePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await onClickToLogin();
    }
  };

  const onClickToForgotPassword = () => {
    router.push("/forgot-password");
  };

  return (
    <CustomHeader hideGoBackButton>
      <NextSeo title="Sign In - Spacify Asia" />
      <div className="body-container pt-4 pb-24">
        <div className="py-6 mb-4">
          <CustomText
            textClassName="primary-text font-bold leading-10"
            styles={{ fontSize: 34 }}
          >
            {t("signIn.welcomeBack")}
          </CustomText>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2">
            <CustomText
              textClassName="text-center p-4 primaryWhite-bg-color primary-text font-bold font-size-large"
              styles={{ borderRadius: "10px 10px 0 0" }}
            >
              {t("signIn.signIn")}
            </CustomText>

            <div onClick={onClickToSignUp} className="cursor-pointer">
              <CustomText
                textClassName="text-center p-4 primary-text font-bold font-size-large"
                styles={{
                  borderRadius: "10px 10px 0 0",
                  backgroundColor: "#E8E8E8",
                  color: "#C3C4C6",
                }}
              >
                {t("signIn.signUp")}
              </CustomText>
            </div>
          </div>
          <div
            className="p-3 global-box-shadow primaryWhite-bg-color py-10"
            style={{ borderRadius: "0 0 10px 10px" }}
          >
            <CustomText textClassName="pb-4 font-bold font-size-large">
              {t("signIn.iAm")} ...
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
              {/*<CustomButton*/}
              {/*  buttonClassName="default-btn-outline"*/}
              {/*  buttonText={t("signIn.agency")}*/}
              {/*  onClick={onClickToAgencySignIn}*/}
              {/*/>*/}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <select
                className="select select-bordered w-full max-w-xs primaryWhite-bg-color user-input"
                value={phonePrefix}
                onChange={onChangePhonePrefix}
              >
                {map(Constant.PHONE_PREFIX, (list) => {
                  const name = get(list, ["name"], "");
                  const value = get(list, ["value"], "");

                  return (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  );
                })}
              </select>

              <input
                value={phoneNumber}
                onChange={onChangePhoneNumber}
                type="number"
                placeholder={t("signIn.phoneNumber")}
                className="input input-bordered w-full primaryWhite-bg-color col-span-2 user-input"
              />
            </div>

            <input
              value={password}
              onChange={onChangePassword}
              type="password"
              placeholder={t("signIn.password")}
              className="input input-bordered w-full primaryWhite-bg-color mb-8 user-input"
              onKeyDown={handleKeyDown}
            />

            <div className="flex justify-center">
              <CustomButton
                buttonClassName="primary-btn w-2/4 mb-2"
                buttonText={t("signIn.signIn")}
                onClick={onClickToLogin}
              />
            </div>

            <CustomText
              textClassName="text-center mb-5 underline cursor-pointer"
              onClick={onClickToForgotPassword}
            >
              {t("signIn.forgotPassword")}
            </CustomText>

            <CustomText textClassName="font-size-small my-5">
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

        <LoadingOverlay loading={signInLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(SignIn);
