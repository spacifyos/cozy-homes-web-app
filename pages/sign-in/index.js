import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { get } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Constant from "@/src/utils/Constant";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import AuthWrapper from "@/components/AuthWrapper";
import {
  TenantIllustration,
  OwnerIllustration,
  ChevronRightIcon,
} from "@/components/Icons";

const RoleCard = ({
  href,
  Illustration,
  title,
  subtitle,
  description,
  accent, // "primary" | "secondary"
}) => {
  const isPrimary = accent === "primary";
  const ringClass = isPrimary
    ? "hover:border-primary"
    : "hover:border-secondary";
  const badgeClass = isPrimary
    ? "bg-primary-background"
    : "bg-secondary-background";
  const accentText = isPrimary ? "text-primary" : "text-secondary";
  const ctaBg = isPrimary ? "bg-primary" : "bg-secondary";

  return (
    <a
      href={href}
      className={`group relative flex flex-col bg-white global-border-radius global-box-shadow border-2 border-transparent ${ringClass} transition-all p-6 cursor-pointer w-full`}
    >
      <div
        className={`flex items-center justify-center rounded-full mb-5 ${badgeClass}`}
        style={{ width: 112, height: 112 }}
      >
        <Illustration size={72} className={accentText} />
      </div>

      <CustomText
        textClassName={`text-xs font-bold uppercase tracking-widest pb-1 ${accentText}`}
      >
        {subtitle}
      </CustomText>

      <CustomText
        textClassName="text-2xl font-bold text-black pb-2"
        styles={{ fontSize: 26 }}
      >
        {title}
      </CustomText>

      <CustomText textClassName="text-sm text-muted leading-relaxed pb-6" styles={{ whiteSpace: "pre-line" }}>
        {description}
      </CustomText>

      <div
        className={`mt-auto inline-flex items-center justify-between ${ctaBg} text-white rounded-full px-5 py-3 group-hover:opacity-90 transition`}
      >
        <CustomText textClassName="text-sm font-bold text-white">
          Continue
        </CustomText>
        <ChevronRightIcon size={16} className="text-white" />
      </div>
    </a>
  );
};

const SignIn = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Sign In - CozyHomes" />

      <DesktopLayout hideNav isMinHeight={false}>
        <div className="container mx-auto max-w-screen-lg flex-1 flex flex-col justify-between items-stretch py-10 gap-8 px-4">
          <div className="flex flex-col items-center text-center">
            <CustomText
              textClassName="font-bold text-black pb-2"
              styles={{ fontSize: 32 }}
            >
              Welcome to PropertyGuys Dashboard
            </CustomText>

            <CustomText textClassName="text-lg text-muted max-w-md">
              Tenancy details. Rent tracking. All in one place.
            </CustomText>

            <div className="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-5 pt-10 w-full">
              <RoleCard
                href={`/sign-in/${Constant.TENANT}`}
                Illustration={TenantIllustration}
                subtitle="For renters"
                title="I'm a Tenant"
                description={"Make payments.\nView tenancy details.\nAccess everything in one place."}
                accent="primary"
              />

              <RoleCard
                href={`/sign-in/${Constant.OWNER}`}
                Illustration={OwnerIllustration}
                subtitle="For landlords"
                title="I'm a Landlord"
                description={"Track rent.\nManage tenants.\nView your property performance."}
                accent="secondary"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <CustomText textClassName="text-center text-xs text-muted flex justify-center flex-wrap max-w-lg">
              By continuing, you agree to our
              <a
                href={process.env.TERMS_OF_USE}
                target="_blank"
                className="px-1 text-primary underline"
              >
                Terms of Use
              </a>
              and
              <a
                href={process.env.PRIVACY_OF_POLICY}
                target="_blank"
                className="pl-1 text-primary underline"
              >
                Privacy Policy
              </a>
              .
            </CustomText>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default AuthWrapper(SignIn);
