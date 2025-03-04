import CustomText from "@/components/CustomText";
import { useRouter } from "next/router";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { get } from "lodash";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import BottomNavigate from "@/components/BottomNavigate";
import Constant from "@/src/utils/Constant";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";

export { getServerSideProps };

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
            className={`flex flex-col items-center w-full bg-primary-background`}
          >
            <CustomText
              styles={{ fontSize: 32 }}
              textClassName="italic font-bold text-primary"
            >
              Welcome To
            </CustomText>

            <CustomImage
              src={Images.logoHorizontalColor}
              imageStyle={{ width: 150 }}
              className="mb-4"
            />

            <a
              href={`/sign-in/${Constant.TENANT}`}
              className="global-box-shadow global-border-radius mb-6 w-full cursor-pointer"
            >
              <CustomImage
                src={Images.tenantCard}
                imageStyle={{ width: "100%" }}
              />
            </a>

            <a
              href={`/sign-in/${Constant.OWNER}`}
              className="global-box-shadow global-border-radius w-full cursor-pointer"
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

export default withTranslation("common")(SignIn);
