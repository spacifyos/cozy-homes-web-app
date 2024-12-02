import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { get, isEmpty } from "lodash";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const PaymentFailed = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const message = get(router, ["query", "message"], "");

  const onClickGoMainPage = () => {
    router.replace("/");
  };

  return (
    <div className="flex flex-col justify-center items-center relative bg-color h-screen">
      <NextSeo title="Payment Failed - Spacify Asia" />
      {/*<CustomImage*/}
      {/*  src={Images.cancelIcon}*/}
      {/*  imageStyle={{ width: "20px" }}*/}
      {/*  className=" absolute top-5 right-5 cursor-pointer"*/}
      {/*  onClick={onClickGoMainPage}*/}
      {/*/>*/}

      <CustomImage
        src={Images.failIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />

      <CustomText textClassName="font-bold pt-4" styles={{ fontSize: "25px" }}>
        {t("payment.paymentFailed")}
      </CustomText>

      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="text-xs text-center">
          {isEmpty(message) ? "" : message}
        </CustomText>
      </div>

      <CustomButton
        buttonClassName="primary-btn"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={"Back to home page"}
        onClick={onClickGoMainPage}
      />
    </div>
  );
};

export default PaymentFailed;
