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

const SignIn = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");
  const routeQueryTab = get(routeQuery, ["tab"], "my-property");

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Sign In - CozyHomes" />

      <DesktopLayout
        hideNav
        isMinHeight={false}
        // loading={otpRequestLoading || forgotPasswordLoading}
      >
        <div className="container mx-auto max-w-screen-md flex-1 flex flex-col justify-start items-start py-10">
          <div
            className={`flex flex-col items-center justify-center w-full bg-primary-background`}
          >
            <CustomText
              styles={{ fontSize: 32 }}
              textClassName="italic font-bold text-primary"
            >
              Welcome To
            </CustomText>

            <CustomImage
              src={Images.logoHorizontalColor}
              className="mb-4 w-3/5 xl:h-24 lg:h-24 md:h-24 sm:h-16 h-16"
            />

            <a
              href={`/sign-in/${Constant.TENANT}`}
              className="global-box-shadow mb-6 xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-3/4 w-full cursor-pointer"
              style={{ borderRadius: 20 }}
            >
              <CustomImage
                src={Images.tenantCard}
                imageStyle={{ width: "100%" }}
              />
            </a>

            <a
              href={`/sign-in/${Constant.OWNER}`}
              className="global-box-shadow xl:w-3/4 lg:w-3/4 md:w-3/4 sm:w-3/4 w-full cursor-pointer"
              style={{ borderRadius: 20 }}
            >
              <CustomImage
                src={Images.ownerCard}
                imageStyle={{ width: "100%" }}
              />
            </a>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default AuthWrapper(SignIn);
