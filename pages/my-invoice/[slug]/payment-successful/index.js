import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
export { getServerSideProps };

const PaymentSuccessful = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const onClickClose = () => {
    router.back();
  };

  return (
    <div className="relative p-4 pt-10 bg-color flex flex-col items-center">
      <CustomImage
        src={Images.cancelIcon}
        className="absolute right-5 top-5"
        height={20}
        width={20}
        onClick={onClickClose}
      />

      <CustomImage
        src={Images.successIcon}
        imageStyle={{ width: 150, height: 150 }}
      />

      <CustomText textClassName="font-bold" styles={{ fontSize: 24 }}>
        {t("invoiceSuccessful.roomzCoinsEarned")}
      </CustomText>

      <CustomText textClassName="primary-text font-bold font-size-xxlarge">
        3,800
      </CustomText>
      <CustomText textClassName="disable-text font-size-small">
        {t("invoiceSuccessful.paymentCompleted")}
      </CustomText>

      <div className="flex flex-col global-border-radius primaryWhite-bg-color py-2 px-4 global-box-shadow w-full my-7">
        <div className="flex items-center justify-center py-4">
          <CustomImage
            src={Images.checkGreenIcon}
            className="mr-2"
            width={30}
            height={30}
          />
          <CustomText textClassName="black-text font-bold font-size-xlarge">
            {t("invoiceSuccessful.congratulations")}
          </CustomText>
        </div>

        <div className="divider-line" style={{ margin: 0 }}></div>

        <div className="flex flex-col items-center py-4">
          <CustomText textClassName="primary-text font-bold font-size-xlarge">
            RM770.00
          </CustomText>
          <CustomText textClassName="disable-text font-size-xsmall">
            15 Dec 2022, 03:23 PM
          </CustomText>
        </div>
      </div>

      <div className="relative pt-6 flex justify-center w-full">
        <div className="primary-bg-color p-2 global-border-radius absolute top-0">
          <CustomImage
            src={Images.invoiceIcon}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>
        <div className="global-box-shadow global-border-radius p-5 primaryWhite-bg-color pt-10 w-full">
          <CustomLabelValue
            value="John Doe"
            label={t("invoiceOverview.billTo")}
          />
          <CustomLabelValue
            value="M Vertica, A-01-01, Room 1"
            label={t("invoiceOverview.property")}
          />
          <CustomLabelValue
            value="ABCXXXXXXXXXXXXXXX"
            label={t("invoiceOverview.tenancyCode")}
          />
          <CustomLabelValue
            value="Scheduled Manual Pay"
            label={t("invoiceOverview.schedule")}
          />

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomText textClassName="font-size-xxsmall disable-text">
            {t("invoiceOverview.items")}
          </CustomText>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="grid grid-cols-2 gap-2">
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold">
              {t("invoiceOverview.subtotal")}
            </CustomText>
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold text-end">
              RM750.00
            </CustomText>
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold">
              {t("invoiceOverview.tax")}
            </CustomText>
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold text-end">
              RM10.00
            </CustomText>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="grid grid-cols-2 gap-2">
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold">
              {t("invoiceOverview.totalAmount")}
            </CustomText>
            <CustomText textClassName="col-span-1 primary-text font-size-small font-bold text-end">
              RM760.00
            </CustomText>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 0 }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("common")(PaymentSuccessful);
