import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import CustomButton from "@/components/CustomButton";
import { useEffect, useState } from "react";
import CustomDropdown from "@/components/CustomDropdown";

export { getServerSideProps };

const InvoiceOverview = () => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [openDownloadModal, setOpenDownloadModal] = useState(false);

  const onClickGoBack = () => {
    router.back();
  };

  const onClickDownload = () => {
    setOpenDownloadModal(!openDownloadModal);
  };

  const onClickToPayment = (id) => {
    router.push(`/my-invoice/${id}/payment-successful`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myInvoiceOverview")}
      onClickGoBack={onClickGoBack}
      hideBgImage
      rightContent={
        <CustomImage
          src={Images.downloadIcon}
          height={25}
          width={25}
          className="cursor-pointer"
          onClick={onClickDownload}
        />
      }
      rightSecondButtonIcon={Images.shareIcon}
    >
      <div className="body-container relative pt-6 pb-4 flex justify-center">
        <div className="primary-bg-color p-2 global-border-radius absolute top-0">
          <CustomImage
            src={Images.invoiceIcon}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>
        <div className="global-box-shadow global-border-radius p-5 primaryWhite-bg-color pt-10 w-full">
          <div className="flex justify-between">
            <CustomLabelValue
              value="XXXXXXXXXXX"
              label={t("invoiceOverview.invoiceNumber")}
            />
            <div className="pb-2">
              <CustomText textClassName="font-size-xxsmall disable-text">
                {t("invoiceOverview.status")}
              </CustomText>
              <StatusLabel status="pending" />
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue
            value="John Doe"
            label={t("invoiceOverview.billTo")}
          />
          <CustomLabelValue
            value="M Vertica, A-01-01, Room 1"
            label={t("invoiceOverview.property")}
          />

          <div className="flex justify-between items-center">
            <CustomLabelValue
              value="19 Aug 2023"
              label={t("invoiceOverview.invoiceDate")}
            />
            <CustomLabelValue
              value="30 Nov 2023"
              label={t("invoiceOverview.dueDate")}
            />
          </div>

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
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="grid grid-cols-2 gap-2 pt-4">
            <CustomButton
              buttonText={t("invoiceOverview.cancel")}
              buttonClassName="default-btn-outline"
            />

            <CustomButton
              buttonText={t("invoiceOverview.payNow")}
              buttonClassName="primary-btn"
              onClick={() => onClickToPayment(1)}
            />
          </div>
        </div>

        {openDownloadModal ? (
          <CustomDropdown
            top={-14}
            items={[
              { title: t("invoiceOverview.downloadInvoice") },
              { title: t("invoiceOverview.downloadReceipt") },
            ]}
          />
        ) : (
          false
        )}
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(InvoiceOverview);
