import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const PaymentFailed = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickGoMainPage = () => {
    router.replace("/");
  };

  const onClickPaymentFail = () => {
    if (isEmpty(id)) {
      return Toast.error(
        "This booking id is invalid, please contact your agent.",
      );
    }

    router.replace(`/booking/${id}/overview`);
  };

  return (
    <div className="flex flex-col justify-center items-center relative bg-primary-background h-screen">
      <NextSeo title="Booking Payment Failed - Spacify Asia" />

      {/*<div className="absolute top-5 right-5 cursor-pointer">*/}
      {/*  <CustomImage*/}
      {/*    src={Images.cancelIcon}*/}
      {/*    imageStyle={{ width: 20 }}*/}
      {/*    onClick={onClickGoMainPage}*/}
      {/*  />*/}
      {/*</div>*/}

      <CustomImage
        src={Images.failIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />

      <CustomText textClassName="font-bold pt-4" styles={{ fontSize: "25px" }}>
          Payment Failed
      </CustomText>

      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="text-xs text-center">
          Sorry. We encounter an error while processing your payment. Please try
          again later.
        </CustomText>
      </div>

      <CustomButton
        buttonClassName="btn-primary"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={"View Booking"}
        onClick={onClickPaymentFail}
      />
    </div>
  );
};

export default PaymentFailed;
