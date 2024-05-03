import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };
const PaymentSuccessful = ({}) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const onClickGoMainPage = () => {
    router.push("/explore");
  };
  const onClickGoToBookingOverview = (id) => {
    router.push({
      pathname: `/booking/${id}/overview`,
      query: { paymentSuccess: true },
    });
  };
  return (
    <div className="flex flex-col justify-center items-center pt-32 relative">
      <CustomImage
        src={Images.cancelIcon}
        imageStyle={{ width: 20 }}
        className=" absolute top-5 right-5 cursor-pointer"
        onClick={onClickGoMainPage}
      />
      <CustomImage
        src={Images.successIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />
      <CustomText textClassName="font-bold pt-4" styles={{ fontSize: "25px" }}>
        {t("payment.paymentSuccessful")}
      </CustomText>
      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="font-size-xsmall text-center">
          Your booking was successful. We will process the tenancy agreement. An
          email confirmation will be sent to email{" "}
          <span className="underline">te**@gmail.com.</span>
        </CustomText>
      </div>
      <CustomButton
        buttonClassName="primary-btn"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={t("payment.viewBooking")}
        onClick={()=>onClickGoToBookingOverview(1)}
      />
    </div>
  );
};

export default PaymentSuccessful;
