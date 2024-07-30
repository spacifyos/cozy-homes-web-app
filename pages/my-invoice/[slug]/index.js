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
import { useEffect, useRef, useState } from "react";
import CustomDropdown from "@/components/CustomDropdown";
import * as invoiceAction from "@/src/actions/invoice";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceSelector from "@/src/selectors/invoice";
import LoadingOverlay from "@/components/LoadingOverlay";
import { isEmpty, map, get, isEqual, upperCase } from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Constant from "@/src/utils/Constant";
import Helper from "@/src/utils/Helper";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import { browserName, detect } from "detect-browser-es";
import { NextSeo } from "next-seo";
import AuthManager from "@/src/utils/AuthManager";
import AuthWrapper from "@/components/AuthWrapper";

export { getServerSideProps };

const InvoiceOverview = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const targetTagA = useRef();

  const getInvoiceOverviewRequest = (id) =>
    dispatch(invoiceAction.getInvoiceOverviewRequest(id));
  const invoiceOverviewData = useSelector((state) =>
    invoiceSelector.getInvoiceOverviewData(state, id),
  );
  const invoiceOverviewLoading = useSelector((state) =>
    invoiceSelector.getInvoiceOverviewLoading(state),
  );

  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [getInvoicePaymentLinkLoading, setGetInvoicePaymentLinkLoading] =
    useState(false);

  const code = invoiceSelector.getInvoiceNumber(invoiceOverviewData);
  const paymentStatus = invoiceSelector.getPaymentStatus(invoiceOverviewData);
  const status = invoiceSelector.getStatus(invoiceOverviewData);
  const dueDate = invoiceSelector.getDueDate(invoiceOverviewData);
  const totalAmount = invoiceSelector.getTotalAmount(invoiceOverviewData);
  const billTo = invoiceSelector.getBillTo(invoiceOverviewData);
  const property = invoiceSelector.getProperty(invoiceOverviewData);
  const invoiceDate = invoiceSelector.getInvoiceDate(invoiceOverviewData);
  const tenancyCode = invoiceSelector.getTenancyCode(invoiceOverviewData);
  const schedule = invoiceSelector.getSchedule(invoiceOverviewData);
  const tax = invoiceSelector.getTax(invoiceOverviewData);
  const grandTotal = invoiceSelector.getGrandtotal(invoiceOverviewData);
  const items = invoiceSelector.getItems(invoiceOverviewData);
  const invoiceDocument = invoiceSelector.getDocument(invoiceOverviewData);
  const receiptDocument = invoiceSelector.getReceipt(invoiceOverviewData);

  const [rootDataLoading, setRootDataLoading] = useState(false);
  const [targetOpenDocument, setTargetOpenDocument] = useState("");
  const [gallerySecretKey, setGallerySecretKey] = useState("");
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!isEmpty(gallerySecretKey) && !isEmpty(targetOpenDocument)) {
      fetchDocumentData(targetOpenDocument, gallerySecretKey);
    }
  }, [gallerySecretKey, targetOpenDocument]);

  useEffect(() => {
    fetchInvoiceOverviewData(id);
  }, [id]);

  const fetchInvoiceOverviewData = (id) => {
    getInvoiceOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickDownload = () => {
    setOpenDownloadModal(!openDownloadModal);
  };

  // const onClickToPayment = (id) => {
  //   router.push(`/my-invoice/${id}/payment-successful`);
  // };

  const onClickToPayment = async (code) => {
    if (!isEmpty(code)) {
      await getPaymentInvoiceLink(code);
    }
  };

  const getPaymentInvoiceLink = async (code) => {
    await apiRequest.getInvoicePaymentLinkRequest(
      code,
      setGetInvoicePaymentLinkLoading,
      getInvoicePaymentLinkSuccess,
    );
  };

  const getInvoicePaymentLinkSuccess = (res) => {
    const url = invoiceSelector.getUrl(res);

    if (!isEmpty(url)) {
      window.open(url, "_self");
    }
  };

  const onClickDownloadDocument = async (url) => {
    if (
      isEqual(targetOpenDocument, url) &&
      !isEmpty(gallerySecretKey) &&
      !isEmpty(targetOpenDocument)
    ) {
      await fetchDocumentData(targetOpenDocument, gallerySecretKey);
      return;
    }

    setTargetOpenDocument(url);

    await apiRequest.getRootDataRequest(
      setRootDataLoading,
      getRootDataSuccessCallback,
    );
  };

  const getRootDataSuccessCallback = (res) => {
    const chiper1 = get(res, ["chiper1"], "");
    const chiper2 = get(res, ["chiper2"], "");

    setGallerySecretKey(Helper.generateSecretKey(chiper1, chiper2));
  };

  const fetchDocumentData = async (url, key) => {
    const headers = {
      "Content-Type": "application/json",
      AGSC: key,
      Authorization: await AuthManager.retrieveToken().then((value) => {
        return `Bearer ${value}`;
      }),
    };

    setDownloading(true);

    axios
      .get(url, { headers: headers })
      .then(async (response) => {
        const resUrl = get(response, ["data", "data", "url"], "");

        if (!isEmpty(resUrl)) {
          await apiRequest.downloadFileRequest(resUrl, {});
          // window.open(
          //   resUrl,
          //   `${isEqual(detect().name, "safari") ? "_self" : "_blank"}`,
          // );
        }
      })
      .catch((error) => {
        Toast.error("Download document failed");
      })
      .finally(() => setDownloading(false));
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
      // rightSecondButtonIcon={Images.shareIcon}
    >
      <NextSeo title="Invoice Overview - Spacify Asia" />
      <div className="body-container relative py-6 flex justify-center">
        <div className="primary-bg-color p-2 ps-2.5 global-border-radius absolute top-0">
          <CustomImage
            src={Images.invoiceIcon}
            imageStyle={{ width: 35, height: 35 }}
          />
        </div>
        <div className="global-box-shadow global-border-radius p-5 primaryWhite-bg-color pt-10 w-full">
          <div className="flex justify-between">
            <CustomLabelValue
              value={isEmpty(code) ? "-" : code}
              label={t("invoiceOverview.invoiceNumber")}
              highlight
            />
            <div className="pb-2">
              <CustomText textClassName="font-size-xxsmall disable-text">
                {t("invoiceOverview.status")}
              </CustomText>
              <StatusLabel status={paymentStatus} />
            </div>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomLabelValue
            value={isEmpty(billTo) ? "-" : billTo}
            label={t("invoiceOverview.billTo")}
          />
          <CustomLabelValue
            value={isEmpty(property) ? "-" : property}
            label={t("invoiceOverview.property")}
          />

          <div className="flex justify-between items-center">
            <CustomLabelValue
              value={isEmpty(invoiceDate) ? "-" : invoiceDate}
              label={t("invoiceOverview.invoiceDate")}
            />
            <CustomLabelValue
              value={isEmpty(dueDate) ? "-" : dueDate}
              label={t("invoiceOverview.dueDate")}
              highlight
            />
          </div>

          <CustomLabelValue
            value={isEmpty(tenancyCode) ? "-" : tenancyCode}
            label={t("invoiceOverview.tenancyCode")}
          />
          <CustomLabelValue
            value={isEmpty(schedule) ? "-" : schedule}
            label={t("invoiceOverview.schedule")}
          />

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <CustomText textClassName="font-size-xxsmall disable-text">
            {t("invoiceOverview.items")}
          </CustomText>

          <div className="gap-2">
            {isEmpty(items)
              ? false
              : map(items, (item, index) => {
                  const itemName = get(item, ["name"], "");
                  const unitPrice = get(item, ["unit_price"], 0);
                  const quantity = get(item, ["quantity"], 1);

                  return (
                    <div
                      className="flex justify-between items-center pt-2"
                      key={index}
                    >
                      <div className="">
                        <CustomText
                          textClassName={`black-text font-size-small font-bold`}
                        >
                          {itemName}
                        </CustomText>
                        <CustomText
                          textClassName={`font-size-xxsmall disable-text`}
                        >
                          RM{unitPrice} per unit
                        </CustomText>
                      </div>

                      <CustomText textClassName={`black-text font-bold`}>
                        X{quantity}
                      </CustomText>
                    </div>
                  );
                })}
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          <div className="grid grid-cols-2 gap-2">
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold">
              {t("invoiceOverview.subtotal")}
            </CustomText>
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold text-end">
              RM{isEmpty(grandTotal) ? "0" : grandTotal}
            </CustomText>
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold">
              {t("invoiceOverview.tax")}
            </CustomText>
            <CustomText textClassName="col-span-1 black-text font-size-small font-bold text-end">
              RM{isEmpty(tax) ? "0" : tax}
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
              RM{isEmpty(totalAmount) ? "0" : totalAmount}
            </CustomText>
          </div>

          <div
            className="divider-line"
            style={{ marginTop: 10, marginBottom: 10 }}
          ></div>

          {!isEqual(upperCase(paymentStatus), Constant.PAID) ? (
            <div className="grid grid-cols-2 gap-2 pt-4">
              <CustomButton
                buttonText={t("invoiceOverview.cancel")}
                buttonClassName="default-btn-outline"
                onClick={onClickGoBack}
              />

              <CustomButton
                buttonText={t("invoiceOverview.payNow")}
                buttonClassName="primary-btn"
                onClick={() => onClickToPayment(code)}
              />
            </div>
          ) : (
            false
          )}
        </div>

        {openDownloadModal ? (
          <CustomDropdown
            onClickDownloadDocument={onClickDownloadDocument}
            top={-14}
            items={[
              {
                name: "Review Invoice",
                value: invoiceDocument,
              },
              {
                name: "Review Receipt",
                value: receiptDocument,
              },
            ]}
          />
        ) : (
          false
        )}

        <LoadingOverlay
          loading={
            invoiceOverviewLoading ||
            getInvoicePaymentLinkLoading ||
            rootDataLoading ||
            downloading
          }
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(AuthWrapper(InvoiceOverview));
