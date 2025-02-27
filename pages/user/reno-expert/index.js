import CustomHeader from "@/components/CustomHeader";
import { useRouter } from "next/router";
import BottomNavigate from "@/components/BottomNavigate";
import { get } from "lodash";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import DesktopLayout from "@/components/DesktopLayout";

export { getServerSideProps };

const Testing = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

  const onClickGoBack = () => {
    router.back();
  };

  const onClickChangeTab = (route) => {
    router.push(route);
  };

  return (
    <div className="min-h-screen bg-white">
      <DesktopLayout
        hideFooter
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <CustomText textClassName="text-base">RenoXpert</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">RenoXpert</CustomText>
            </div>
          </div>
        }
      >
        <iframe
          src="https://staging.renoxpert.my/owner/home"
          style={{ width: "100%", height: "100%" }}
        />
      </DesktopLayout>
    </div>

    // {/*<BottomNavigate*/}
    // {/*  t={t}*/}
    // {/*  routeName={routeName}*/}
    // {/*  routeQuery={routeQuery}*/}
    // {/*  onClickChangeTab={onClickChangeTab}*/}
    // {/*/>*/}
  );
};

export default withTranslation("common")(Testing);
