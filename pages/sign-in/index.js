import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useEffect, useState } from "react";
import _ from "lodash";

export { getServerSideProps };

const SignIn = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const role = _.get(router, ["query", "role"], "");

  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (!_.isEmpty(role)) {
      setSelectedRole(role);
    } else {
      setSelectedRole("tenant");
    }
  }, [role]);

  const onClickChangeRole = (selectedRole) => {
    router.push(`/sign-in?role=${selectedRole}`);
  };

  const onClickToAgencySignIn = () => {
    router.push("/agency-sign-in");
  };

  const onClickToSignUp = () => {
    router.push("/sign-up");
  };

  const onClickToLogin = () => {
    router.push("/explore");
  };

  return (
    <CustomHeader hideGoBackButton>
      <div className="body-container py-4">
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
            <CustomText textClassName="pb-2 font-bold font-size-large">
              {t("signIn.iAm")} ...
            </CustomText>

            <div className="grid grid-cols-3 gap-2 mb-8">
              <CustomButton
                buttonClassName={`${_.isEqual(selectedRole, "tenant") ? "primary-btn" : "default-btn-outline"}`}
                buttonText={t("signIn.tenant")}
                onClick={() => onClickChangeRole("tenant")}
              />
              <CustomButton
                buttonClassName={`${_.isEqual(selectedRole, "owner") ? "primary-btn" : "default-btn-outline"}`}
                buttonText={t("signIn.owner")}
                onClick={() => onClickChangeRole("owner")}
              />
              <CustomButton
                buttonClassName="default-btn-outline"
                buttonText={t("signIn.agency")}
                onClick={onClickToAgencySignIn}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <select className="select select-bordered w-full max-w-xs primaryWhite-bg-color">
                <option selected>+60 Malaysia</option>
              </select>

              <input
                type="text"
                placeholder={t("signIn.phoneNumber")}
                className="input input-bordered w-full primaryWhite-bg-color col-span-2"
              />
            </div>

            <input
              type="password"
              placeholder={t("signIn.password")}
              className="input input-bordered w-full primaryWhite-bg-color mb-8"
            />

            <div className="flex justify-center">
              <CustomButton
                buttonClassName="primary-btn w-2/4 mb-2"
                buttonText={t("signIn.signIn")}
                onClick={onClickToLogin}
              />
            </div>

            <CustomText textClassName="text-center mb-5 underline cursor-pointer">
              {t("signIn.forgotPassword")}
            </CustomText>

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
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(SignIn);
