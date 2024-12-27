import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useRouter } from "next/router";
import CustomButton from "@/components/CustomButton";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";

export { getServerSideProps };

const PaymentFailure = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickBackToInvoiceOverview = () => {
    router.replace(`/user/my-property`);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Invoice Payment Failed - Spacify Asia" />

      <DesktopLayout
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/user/my-property"}>
                  <CustomText textClassName="text-base disable-text">
                    My Property
                  </CustomText>
                </a>
              </li>
              <li>
                <a href={"/user/my-invoice"}>
                  <CustomText textClassName="text-base disable-text">
                    Invoice
                  </CustomText>
                </a>
              </li>
              <li>
                <a href={`/user/my-invoice/${id}`}>
                  <CustomText textClassName="text-base disable-text">
                    {id}
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="text-base font-bold">
                  Invoice Payment
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="flex flex-col justify-center items-center">
          <div className="absolute top-5 right-5 cursor-pointer">
            <CustomImage
              src={Images.cancelIcon}
              imageStyle={{ width: 20 }}
              onClick={onClickBackToInvoiceOverview}
            />
          </div>

          <CustomImage
            src={Images.failIcon}
            className="xl:w-40 lg:w-36 md:w-32 sm:w-28 w-28"
          />

          <CustomText
            textClassName="font-bold pt-4"
            styles={{ fontSize: "25px" }}
          >
            Payment Failed
          </CustomText>

          <div className="pb-4 px-10 pt-4">
            <CustomText textClassName="text-xs text-center">
              Sorry. We encounter an error while processing your payment. Please
              try again later.
            </CustomText>
          </div>

          <CustomButton
            buttonClassName="primary-btn"
            buttonStyles={{ padding: "5px 30px" }}
            buttonText={"Back to Home"}
            onClick={onClickBackToInvoiceOverview}
          />
        </div>
      </DesktopLayout>
    </div>
  );
};

export default PaymentFailure;
