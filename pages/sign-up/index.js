import { getServerSideProps } from "@/src/utils/getStatic";
import { useTranslation, withTranslation } from "next-i18next";
import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";

export { getServerSideProps };

const SignUp = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const onClickToSignIn = () => {
    router.push("/sign-in");
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

            />

            <div className="grid grid-cols-3 gap-2 mb-4">
              <select className="select select-bordered w-full max-w-xs primaryWhite-bg-color user-input">
                <option selected>+60 Malaysia</option>
              </select>

              <input
                type="text"
                placeholder={t("signUp.phoneNumber")}
                className="input input-bordered w-full primaryWhite-bg-color col-span-2 user-input"
              />
            </div>

            <input
              type="password"
              placeholder={t("signUp.yourPassword")}
              className="input input-bordered w-full primaryWhite-bg-color mb-4 user-input"
            />

            <input
              type="password"
              placeholder={t("signUp.confirmYourPassword")}
              className="input input-bordered w-full primaryWhite-bg-color mb-8 user-input"
            />

            <div className="flex justify-center mb-8">
              <CustomButton
                buttonClassName="primary-btn w-2/4 mb-2"
                buttonText={t("signUp.signUpForFree")}
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
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(SignUp);
