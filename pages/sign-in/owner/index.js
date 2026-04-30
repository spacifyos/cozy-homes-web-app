import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import { get, isEmpty, map } from "lodash";
import * as authSelector from "@/src/selectors/auth";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Toast from "@/src/utils/Toast";
import AuthManager from "@/src/utils/AuthManager";
import { NextSeo } from "next-seo";
import * as commonSelector from "@/src/selectors/common";
import { useSelector } from "react-redux";
import Link from "next/link";
import Constant from "@/src/utils/Constant";
import DesktopLayout from "@/components/DesktopLayout";
import AuthWrapper from "@/components/AuthWrapper";
import {
  OwnerIllustration,
  EyeOpenIcon,
  EyeOffIcon,
  ChevronLeftIcon,
} from "@/components/Icons";

const SignInOwner = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

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
      .push({ pathname: `/sign-up/${Constant.OWNER}` })
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
        <div className="container mx-auto max-w-screen-md flex-1 flex flex-col py-8 px-4">
          <button
            onClick={() => router.push("/sign-in")}
            className="flex items-center text-muted hover:text-secondary transition self-start mb-4 cursor-pointer"
          >
            <ChevronLeftIcon size={14} className="mr-1" />
            <CustomText textClassName="text-sm">Back</CustomText>
          </button>

          <div className="flex flex-col items-center pb-6">
            <div
              className="flex items-center justify-center rounded-full bg-secondary-background mb-4"
              style={{ width: 88, height: 88 }}
            >
              <OwnerIllustration size={56} className="text-secondary" />
            </div>

            <CustomText
              textClassName="text-xs font-bold uppercase tracking-widest text-secondary pb-1"
            >
              Owner Sign In
            </CustomText>
            <CustomText
              textClassName="font-bold text-black"
              styles={{ fontSize: 28 }}
            >
              Welcome back
            </CustomText>
            <CustomText textClassName="text-sm text-muted pt-1">
              Sign in to manage your properties
            </CustomText>
          </div>

          <div className="w-full">
            <div className="p-6 global-box-shadow bg-white global-border-radius">
              <div className="mb-4">
                <CustomText textClassName="text-xs font-bold text-black pb-2">
                  Phone Number
                </CustomText>
                <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 grid-cols-3 gap-2">
                  <select
                    className="select select-bordered w-full bg-white user-input"
                    value={phonePrefix}
                    onChange={(e) => setPhonePrefix(e.target.value)}
                  >
                    {map(phonePrefixOption, (list) => (
                      <option key={get(list, ["value"])} value={get(list, ["value"])}>
                        {get(list, ["label"])}
                      </option>
                    ))}
                  </select>

                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="number"
                    placeholder="12 345 6789"
                    className="input input-bordered w-full bg-white col-span-2 user-input"
                  />
                </div>
              </div>

              <div className="mb-2">
                <CustomText textClassName="text-xs font-bold text-black pb-2">
                  Password
                </CustomText>
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="input input-bordered w-full bg-white pr-10 user-input"
                    onKeyDown={handleKeyDown}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="text-muted" />
                    ) : (
                      <EyeOpenIcon className="text-muted" />
                    )}
                  </button>
                </div>
              </div>

              <Link href={`/user/forgot-password?type=owner`}>
                <CustomText textClassName="text-right text-xs text-secondary underline cursor-pointer pb-5">
                  Forgot password?
                </CustomText>
              </Link>

              <CustomButton
                buttonClassName="btn-secondary w-full mb-4"
                buttonText="Sign In"
                onClick={onClickToLogin}
                loading={signInLoading}
              />

              <div className="flex justify-center items-center mb-3">
                <CustomText textClassName="text-sm text-muted">
                  Don't have an account?
                </CustomText>
                <div onClick={onClickToSignUp} className="cursor-pointer pl-1">
                  <CustomText textClassName="text-secondary font-bold text-sm underline">
                    Sign up
                  </CustomText>
                </div>
              </div>

              <CustomText textClassName="text-xxs text-center text-muted leading-relaxed">
                By signing in, you agree to our terms and privacy policy. This
                site is protected by reCAPTCHA.
              </CustomText>
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default AuthWrapper(SignInOwner);
