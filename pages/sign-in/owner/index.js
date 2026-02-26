import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { useState } from "react";
import { get, isEmpty, map } from "lodash";
import * as authSelector from "@/src/selectors/auth";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Toast from "@/src/utils/Toast";
import AuthManager from "@/src/utils/AuthManager";
import { NextSeo } from "next-seo";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import * as commonSelector from "@/src/selectors/common";
import { useSelector } from "react-redux";
import Link from "next/link";
import Constant from "@/src/utils/Constant";
import DesktopLayout from "@/components/DesktopLayout";
import AuthWrapper from "@/components/AuthWrapper";

const SignInOwner = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeQuery = get(router, ["query"], "");

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );

  const [signInLoading, setSignInLoading] = useState(false);

  const [phonePrefix, setPhonePrefix] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const phonePrefixOption = commonSelector.getPhonePrefix(selectOptionData);

  const onClickToSignUp = () => {
    router
      .push({
        pathname: `/sign-up/${Constant.OWNER}`,
      })
      .then(() => router.reload());
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
      type: Constant.OWNER,
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

      return router.replace(`/loading`);
    } else {
      return router.push({
        pathname: "/user/otp-verification",
        query: { phoneNumber: userPhoneNumber, type: Constant.OWNER },
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

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Sign In | Owner - CozyHomes" />

      <DesktopLayout hideNav isMinHeight={false}>
        <div className="container mx-auto max-w-screen-md flex-1 flex flex-col justify-start items-start py-10">
          {/*<div*/}
          {/*  style={{*/}
          {/*    background:*/}
          {/*      "linear-gradient(125.08deg, #D71440 44.39%, #F9A533 96.79%)",*/}
          {/*  }}*/}
          {/*  className={`min-h-screen pb-4`}*/}
          {/*>*/}
          <div className="body-container">
            <div className="pb-6 flex flex-col items-center">
              {/*<CustomImage*/}
              {/*  src={Images.logoHorizontalColor}*/}
              {/*  className="mb-4 h-16 w-3/4"*/}
              {/*/>*/}

              <CustomText
                textClassName="text-black font-bold leading-10"
                styles={{ fontSize: 32 }}
              >
                Welcome Back,
              </CustomText>
              <CustomText
                textClassName="text-secondary font-bold leading-10"
                styles={{ fontSize: 32 }}
              >
                Owner
              </CustomText>
            </div>

            <div className="w-full">
              <div className="p-6 global-box-shadow bg-white global-border-radius">
                <CustomText textClassName="text-center pb-6 font-bold text-lg">
                  Sign In
                </CustomText>

                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-2 mb-4">
                  <select
                    className="select select-bordered w-full max-w-xs bg-white user-input"
                    value={phonePrefix}
                    onChange={onChangePhonePrefix}
                  >
                    {map(phonePrefixOption, (list) => {
                      const name = get(list, ["label"], "");
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
                    placeholder="12 345 6789"
                    className="input input-bordered w-full bg-white xl:col-span-2 lg:col-span-2 md:col-span-2 sm:col-span-1 col-span-1 user-input"
                  />
                </div>

                <div className="relative mb-8">
                  <input
                    value={password}
                    onChange={onChangePassword}
                    type={showPassword ? "text" : "password"}
                    placeholder={"Password"}
                    className="input input-bordered w-full bg-white pr-10 user-input"
                    onKeyDown={handleKeyDown}
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

                <div className="flex justify-center pb-2">
                  <CustomButton
                    buttonClassName={`btn-secondary w-2/4 mb-2`}
                    buttonText={"Sign In"}
                    onClick={onClickToLogin}
                  />
                </div>

                <Link href={`/user/forgot-password?type=owner`}>
                  <CustomText textClassName="text-center pb-2 underline cursor-pointer">
                    Forgot Password
                  </CustomText>
                </Link>

                <div className="flex justify-center items-center mb-5">
                  <CustomText>Don’t have account? Click </CustomText>
                  <div onClick={onClickToSignUp} className="cursor-pointer">
                    <CustomText textClassName="text-primary font-bold pl-1 underline">
                      here
                    </CustomText>
                  </div>
                </div>

                <CustomText textClassName="text-sm my-5 text-center">
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
          {/*</div>*/}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default AuthWrapper(SignInOwner);
