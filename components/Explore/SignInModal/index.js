import { get, isEmpty, isEqual, map, toLower } from "lodash";
import Constant from "@/src/utils/Constant";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import * as commonSelector from "@/src/selectors/common";
import { useState } from "react";
import Toast from "@/src/utils/Toast";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import * as authSelector from "@/src/selectors/auth";
import AuthManager from "@/src/utils/AuthManager";
import DesktopModal from "@/components/DesktopModal";

const SignInModal = ({ typeQuery = "Tenant" }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeQuery = get(router, ["query"], "");

  const selectOptionData = useSelector((state) =>
    commonSelector.getSelectOptionData(state),
  );

  const [signInLoading, setSignInLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState("tenant");
  const [phonePrefix, setPhonePrefix] = useState("+60");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const phonePrefixOption = commonSelector.getPhonePrefix(selectOptionData);

  const onClickToSignUp = () => {
    router
      .push({
        pathname: `/sign-up`,
        query: { type: typeQuery },
      })
      .then(() => router.reload());u1
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
      type: toLower(typeQuery),
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

  return (
    <DesktopModal id="sign_in_modal" closeButtonPosition>
      <div
        style={{
          background: isEqual(typeQuery, Constant.OWNER)
            ? "linear-gradient(125.08deg, #D71440 44.39%, #F9A533 96.79%)"
            : "linear-gradient(125.08deg, #F05A22 54.69%, #D71440 96.79%)",
        }}
      >
        <div className="p-6">
          <form method="dialog" className={`flex justify-end `}>
            <button className="btn btn-sm btn-circle btn-ghost right-2">
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
              className="mb-4"
            />

            <CustomText
              textClassName="white-text font-bold leading-10"
              styles={{ fontSize: 32 }}
            >
              Welcome Back, {typeQuery}
            </CustomText>
          </div>

          <div className="w-full">
            <div className="p-6 global-box-shadow primaryWhite-bg-color global-border-radius">
              <CustomText textClassName="text-center pb-6 font-bold font-size-xxlarge">
                Sign In
              </CustomText>

              <div className="grid grid-cols-3 gap-2 mb-4">
                <select
                  className="select select-bordered w-full max-w-xs primaryWhite-bg-color user-input"
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

              <div className="flex justify-center pb-2">
                <CustomButton
                  buttonClassName={`${isEqual(typeQuery, Constant.TENANT) ? "secondary-btn" : "primary-btn"} primary-btn w-2/4 mb-2`}
                  buttonText={t("signIn.signIn")}
                  onClick={onClickToLogin}
                />
              </div>

              <Link href={`/forgot-password?type=${typeQuery}`}>
                <CustomText textClassName="text-center pb-2 underline cursor-pointer">
                  {t("signIn.forgotPassword")}
                </CustomText>
              </Link>

              <div className="flex justify-center items-center mb-5">
                <CustomText>Don’t have account? Click </CustomText>
                <div onClick={onClickToSignUp} className="cursor-pointer">
                  <CustomText textClassName="primary-text font-bold pl-1 underline">
                    here
                  </CustomText>
                </div>
              </div>

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
      </div>
    </DesktopModal>
  );
};

export default SignInModal;
