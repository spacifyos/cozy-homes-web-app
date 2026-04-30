import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { get, isEmpty, isEqual, toLower } from "lodash";
import Constant from "@/src/utils/Constant";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";

const ResetPassword = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeQuery = get(router, ["query"], "");
  const typeQuery = get(routeQuery, ["type"], "");
  const tokenQuery = get(routeQuery, ["token"], "");
  const emailQuery = get(routeQuery, ["email"], "");

  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const [verifyTokenLoading, setVerifyTokenLoading] = useState(false);

  useEffect(() => {
    if (!isEmpty(typeQuery) && !isEmpty(tokenQuery) && !isEmpty(emailQuery)) {
      postResetPasswordVerify({
        type: typeQuery,
        email: emailQuery,
        token: tokenQuery,
      });
    }
  }, []);

  const postResetPasswordVerify = async (postData) => {
    await apiRequest.postResetPasswordVerifyRequest(
      postData,
      setVerifyTokenLoading,
      verifyTokenSuccess,
      verifyTokenError,
    );
  };

  const verifyTokenSuccess = () => {
    Toast.success("Token Verify Success!");
  };

  const verifyTokenError = () => {
    router.replace("/401");
  };

  const onClickSubmitChangePassword = async () => {
    if (isEmpty(passwordValue) || isEmpty(confirmPasswordValue)) {
      return Toast.error("All fields are required.");
    }

    if (!isEqual(passwordValue, confirmPasswordValue)) {
      return Toast.error("Password and Confirm Password not same.");
    }

    const postData = {
      type: typeQuery,
      email: emailQuery,
      password: passwordValue,
      password_confirmation: confirmPasswordValue,
      token: tokenQuery,
    };

    await apiRequest.postResetPasswordRequest(
      postData,
      setResetPasswordLoading,
      resetPasswordSuccess,
    );
  };

  const resetPasswordSuccess = () => {
    router.replace(`/`);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Reset Password - CozyHomes" />

      <DesktopLayout hideNav isMinHeight={false}>
        <div className="container mx-auto max-w-screen-md flex-1 flex flex-col justify-start items-start xl:pt-20 lg:pt-20 md:pt-20 sm:pt-20 pt-10">
          <CustomText textClassName="text-primary font-bold text-center w-full xl:text-3xl lg:text-2xl md:text-2xl sm:text-2xl text-2xl xl:pb-10 lg:pb-10 md:pb-10 sm:pb-5 pb-5">
            Reset Password
          </CustomText>

          <div className="bg-white border global-border-radius w-full flex flex-col justify-center items-center p-6">
            <div className="w-full">
              <CustomText
                textClassName={`text-center pb-6 font-bold text-2xl italic leading-10`}
                styles={{
                  color: isEqual(typeQuery, Constant.TENANT)
                    ? "#005566"
                    : "#D71440",
                }}
              >
                {typeQuery}
              </CustomText>

              <div>
                <input
                  type="password"
                  placeholder={"Your Password"}
                  className="input input-bordered w-full bg-white mb-4 user-input"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />

                <input
                  type="password"
                  placeholder={"Confirm Your Password"}
                  className="input input-bordered w-full bg-white mb-8 user-input"
                  value={confirmPasswordValue}
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                />

                <div className="grid grid-cols-4">
                  <CustomButton
                    buttonText="Submit"
                    buttonClassName={`${isEqual(typeQuery, Constant.TENANT) ? "btn-secondary" : "btn-primary"} col-start-2 col-span-2`}
                    onClick={onClickSubmitChangePassword}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(ResetPassword);
