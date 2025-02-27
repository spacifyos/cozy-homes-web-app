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
import { isEmpty, map, get, isEqual, upperCase } from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Constant from "@/src/utils/Constant";
import Helper from "@/src/utils/Helper";
import axios from "axios";
import Toast from "@/src/utils/Toast";
import { NextSeo } from "next-seo";
import AuthManager from "@/src/utils/AuthManager";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";

export { getServerSideProps };

const InvoiceOverview = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

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
        }
      })
      .catch((error) => {
        Toast.error("Download document failed");
      })
      .finally(() => setDownloading(false));
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Invoice Overview - Spacify Asia" />

      <DesktopLayout
        hideFooter
        loading={
          invoiceOverviewLoading ||
          getInvoicePaymentLinkLoading ||
          rootDataLoading ||
          downloading
        }
        rightContent={
          <CustomImage
            src={Images.downloadIconBlack}
            imageStyle={{ width: 25 }}
            className="cursor-pointer"
            onClick={onClickDownload}
          />
        }
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/my-invoice"}>
                    <CustomText textClassName="text-base text-disable">
                      My Invoice
                    </CustomText>
                  </a>
                </li>
                <li>
                  <CustomText textClassName="text-base">{id}</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIconBlack}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">{id}</CustomText>
            </div>
          </div>
        }
      >
        <div className="relative pt-6 flex justify-center">
          <div className="bg-primary p-3 global-border-radius absolute top-0">
            <CustomImage
              src={Images.invoiceIconWhite}
              className="w-6"
            />
          </div>
          <div className="global-box-shadow global-border-radius p-5 bg-white pt-10 w-full">
            <div className="flex justify-between">
              <CustomLabelValue
                value={isEmpty(code) ? "-" : code}
                label={"Invoice Number"}
                highlight
              />
              <div className="pb-2">
                <CustomText textClassName="text-xs text-disable">
                  {"Status"}
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
              label={"Bill To"}
            />
            <CustomLabelValue
              value={isEmpty(property) ? "-" : property}
              label={"Property"}
            />

            <div className="flex justify-between items-center">
              <CustomLabelValue
                value={isEmpty(invoiceDate) ? "-" : invoiceDate}
                label={"Invoice Date"}
              />
              <CustomLabelValue
                value={isEmpty(dueDate) ? "-" : dueDate}
                label={"Due Date"}
                highlight
              />
            </div>

            <CustomLabelValue
              value={isEmpty(tenancyCode) ? "-" : tenancyCode}
              label={"Tenancy Code"}
            />
            <CustomLabelValue
              value={isEmpty(schedule) ? "-" : schedule}
              label={"Schedule"}
            />

            <div
              className="divider-line"
              style={{ marginTop: 10, marginBottom: 10 }}
            ></div>

            <CustomText textClassName="text-xs text-disable">
              {"Items"}
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
                            textClassName={`text-black text-sm font-bold`}
                          >
                            {itemName}
                          </CustomText>
                          <CustomText textClassName={`text-xs text-disable`}>
                            RM{unitPrice} per unit
                          </CustomText>
                        </div>

                        <CustomText textClassName={`text-black font-bold`}>
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
              <CustomText textClassName="col-span-1 text-black text-sm font-bold">
                {"Subtotal"}
              </CustomText>
              <CustomText textClassName="col-span-1 text-black text-sm font-bold text-end">
                RM{isEmpty(grandTotal) ? "0" : grandTotal}
              </CustomText>
              <CustomText textClassName="col-span-1 text-black text-sm font-bold">
                {"Tax"}
              </CustomText>
              <CustomText textClassName="col-span-1 text-black text-sm font-bold text-end">
                RM{isEmpty(tax) ? "0" : tax}
              </CustomText>
            </div>

            <div
              className="divider-line"
              style={{ marginTop: 10, marginBottom: 10 }}
            ></div>

            <div className="grid grid-cols-2 gap-2">
              <CustomText textClassName="col-span-1 text-black text-sm font-bold">
                {"Total Amount"}
              </CustomText>
              <CustomText textClassName="col-span-1 text-primary text-sm font-bold text-end">
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
                  buttonText={"Cancel"}
                  buttonClassName="btn-primary-outline"
                  onClick={onClickGoBack}
                />

                <CustomButton
                  buttonText={"Pay Now"}
                  buttonClassName="btn-primary"
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
                  name: "Download Invoice",
                  value: invoiceDocument,
                },
                {
                  name: "Download Receipt",
                  value: receiptDocument,
                },
              ]}
            />
          ) : (
            false
          )}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(InvoiceOverview));
