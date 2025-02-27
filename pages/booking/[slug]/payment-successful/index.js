import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { get, isEmpty } from "lodash";
import Toast from "@/src/utils/Toast";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const PaymentSuccessful = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const email = get(router, ["query", "email"], "");

  const onClickGoMainPage = () => {
    router.replace("/");
  };

  const onClickGoToBookingOverview = () => {
    if (isEmpty(id)) {
      return Toast.error(
        "This booking id is invalid, please contact your agent.",
      );
    }

    router.replace(`/booking/${id}/overview`);
  };

  return (
    <div className="flex flex-col justify-center items-center relative bg-primary-background h-screen">
      <NextSeo title="Booking Payment Successful - Spacify Asia" />

      {/*<div className="absolute top-5 right-5 cursor-pointer">*/}
      {/*  <CustomImage*/}
      {/*    src={Images.closeIconBlack}*/}
      {/*    imageStyle={{ width: 20 }}*/}
      {/*    onClick={onClickGoMainPage}*/}
      {/*  />*/}
      {/*</div>*/}

      <CustomImage
        src={Images.paymentSuccessIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />
      <CustomText textClassName="font-bold pt-4" styles={{ fontSize: "25px" }}>
          Payment Successful
      </CustomText>
      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="text-xs text-center">
          Your booking was successful. We will process the tenancy agreement. An
          email confirmation will be sent to email{" "}
          <span className="underline">{isEmpty(email) ? "" : email}</span>.
        </CustomText>
      </div>
      <CustomButton
        buttonClassName="btn-primary"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={"View Booking"}
        onClick={onClickGoToBookingOverview}
      />
    </div>
  );
};

export default PaymentSuccessful;
