import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { get, isEqual } from "lodash";
import Constant from "@/src/utils/Constant";
import BottomNavigate from "@/components/BottomNavigate";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";

export { getServerSideProps };

const SignInType = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

  return (
    <div className={`min-h-screen flex flex-col items-center px-10 bg-color`}>
      <CustomText
        styles={{ fontSize: 32, paddingTop: "5vh" }}
        textClassName="italic font-bold primary-text"
      >
        Welcome To
      </CustomText>

      <CustomImage
        src={Images.logoHorizontalColor}
        imageStyle={{ width: 150 }}
        className="mb-4"
      />

      <a
        href={`/sign-in?type=${Constant.TENANT}`}
        className="global-box-shadow global-border-radius mb-6 w-full cursor-pointer"
      >
        <CustomImage src={Images.tenantCard} imageStyle={{ width: "100%" }} />
      </a>

      <a
        href={`/sign-in?type=${Constant.OWNER}`}
        className="global-box-shadow global-border-radius w-full cursor-pointer"
      >
        <CustomImage src={Images.ownerCard} imageStyle={{ width: "100%" }} />
      </a>

      <BottomNavigate t={t} routeName={routeName} routeQuery={routeQuery} />
    </div>
  );
};

export default withTranslation("common")(SignInType);
