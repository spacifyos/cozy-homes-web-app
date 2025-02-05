import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomHeader from "@/components/CustomHeader";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

export { getServerSideProps };

const AgencySignUp = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickToSignIn = () => {
    router.push("/agency-sign-in");
  };

  return (
    <CustomHeader hideGoBackButton>
      <div className="body-container py-4">
        <div className="py-6 mb-4">
          <CustomText
            textClassName="text-primary font-bold leading-10"
            styles={{ fontSize: 34 }}
          >
            {t("signUp.letGetStarted")}
          </CustomText>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-2">
            <div onClick={onClickToSignIn} className="cursor-pointer">
              <CustomText
                textClassName="text-center p-4 text-primary font-bold text-base"
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
              textClassName="text-center p-4 bg-white text-primary font-bold text-base"
              styles={{ borderRadius: "10px 10px 0 0" }}
            >
              {t("signUp.signUp")}
            </CustomText>
          </div>
          <div
            className="p-3 global-box-shadow bg-white py-10"
            style={{ borderRadius: "0 0 10px 10px" }}
          >
            <input
              type="email"
              placeholder={t("signUp.companyEmail")}
              className="input input-bordered w-full bg-white mb-4 user-input"
            />

            <input
              type="text"
              placeholder={t("signUp.companyName")}
              className="input input-bordered w-full bg-white mb-4 user-input"
            />

            <input
              type="text"
              placeholder={t("signUp.yourName")}
              className="input input-bordered w-full bg-white mb-4 user-input"
            />

            <div className="grid grid-cols-3 gap-2 mb-4">
              <select className="select select-bordered w-full max-w-xs bg-white user-input">
                <option selected>+60 Malaysia</option>
              </select>

              <input
                type="text"
                placeholder={t("signUp.phoneNumber")}
                className="input input-bordered w-full bg-white col-span-2 user-input"
              />
            </div>

            <input
              type="text"
              placeholder={t("signUp.conmpanyDomain")}
              className="input input-bordered w-full bg-white mb-1 user-input"
            />

            <CustomText textClassName="text-disable text-xs mb-4">
              {t("signUp.domainInfo")}
            </CustomText>

            <input
              type="password"
              placeholder={t("signUp.yourPassword")}
              className="input input-bordered w-full bg-white mb-4 user-input"
            />

            <input
              type="password"
              placeholder={t("signUp.confirmYourPassword")}
              className="input input-bordered w-full bg-white mb-8 user-input"
            />

            <div className="flex justify-center mb-8">
              <CustomButton
                buttonClassName="btn-primary w-2/4 mb-2"
                buttonText={t("signUp.signUpForFree")}
              />
            </div>

            <CustomText textClassName="text-sm mb-5">
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
    </CustomHeader>
  );
};

export default withTranslation("common")(AgencySignUp);
