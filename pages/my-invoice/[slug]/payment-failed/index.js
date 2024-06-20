import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

const PaymentFailure = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickBackToInvoiceOverview = () => {
    router.replace(`/my-invoice/${id}`);
  };

  return (
    <div className="flex flex-col justify-center items-center pt-32 relative">
      <CustomImage
        src={Images.cancelIcon}
        imageStyle={{ width: "20px" }}
        className=" absolute top-5 right-5 cursor-pointer"
        onClick={onClickBackToInvoiceOverview}
      />

      <CustomImage
        src={Images.failIcon}
        imageStyle={{ width: "150px", height: "150px" }}
      />

      <CustomText textClassName="font-bold pt-4" styles={{ fontSize: "25px" }}>
        {t("payment.paymentFailed")}
      </CustomText>

      <div className="pb-4 px-10 pt-4">
        <CustomText textClassName="font-size-xsmall text-center">
          Sorry. We encounter an error while processing your payment. Please try
          again later.
        </CustomText>
      </div>

      <CustomButton
        buttonClassName="primary-btn"
        buttonStyles={{ padding: "5px 30px" }}
        buttonText={"Back to invoice overview"}
        onClick={onClickBackToInvoiceOverview}
      />
    </div>
  );
};

export default PaymentFailure;
