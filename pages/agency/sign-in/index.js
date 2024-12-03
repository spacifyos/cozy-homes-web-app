import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import DesktopLayout from "@/components/DesktopLayout";
import { useState } from "react";
import { isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import Constant from "@/src/utils/Constant";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as authSelector from "@/src/selectors/auth";
import AuthManager from "@/src/utils/AuthManager";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const AgencySignIn = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const [signInLoading, setSignInLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClickToLogin = async () => {
    if (isEmpty(email)) {
      Toast.error("Email is required.");
      return;
    }

    if (isEmpty(password)) {
      Toast.error("Password is required.");
      return;
    }

    const postData = {
      type: "back-office",
      email: email,
      password: password,
    };

    await apiRequest.signInRequest(postData, setSignInLoading, signInSuccess);
  };

  const signInSuccess = (res) => {
    const authToken = authSelector.getToken(res);
    const isUserVerify = authSelector.getUserVerify(res);
    const userPhoneNumber = authSelector.getUserPhoneNumber(res);
    const userType = authSelector.getUserType(res);

    AuthManager.setToken(authToken);
    AuthManager.setLoginType(userType);

    return router.replace(`/agency/card-listing`);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Agency Sign In - Spacify Asia" />

      <DesktopLayout
        hideNav
        footerPaddingBottom="pb-20"
        loading={signInLoading}
      >
        <div className="container mx-auto py-4">
          <div className="py-6 mb-4">
            <CustomText
              textClassName="primary-text font-bold leading-10"
              styles={{ fontSize: 34 }}
            >
              {t("signIn.welcomeBack")}
            </CustomText>
          </div>

          <div className="w-full">
            <div className="p-3 global-box-shadow primaryWhite-bg-color py-10 global-border-radius">
              <input
                type="email"
                value={email}
                onChange={onChangeEmail}
                placeholder={t("signIn.email")}
                className="input input-bordered w-full primaryWhite-bg-color mb-4 user-input"
              />

              <input
                type="password"
                value={password}
                onChange={onChangePassword}
                placeholder={t("signIn.password")}
                className="input input-bordered w-full primaryWhite-bg-color mb-8 user-input"
              />

              <div className="flex justify-center pb-6">
                <CustomButton
                  buttonClassName="primary-btn w-2/4 mb-2"
                  buttonText={t("signIn.signIn")}
                  onClick={onClickToLogin}
                />
              </div>

              <CustomText textClassName="text-xs my-5 text-center">
                By using our services, you are deemed unconditionally agree,
                consent and be bound by our terms and conditions and privacy
                policy.
              </CustomText>

              <CustomText textClassName="text-xs text-center disable-text">
                This site is protected by reCAPTCHA and the Google{" "}
                <span className="underline">Privacy Policy</span> and{" "}
                <span className="underline">Terms of Service</span> apply.
              </CustomText>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AgencySignIn);
