import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomImage from "@/components/CustomImage";
import CustomLabelValue from "@/components/CustomLabelValue";
import CustomText from "@/components/CustomText";
import StatusLabel from "@/components/StatusLabel";
import CustomDropdown from "@/components/CustomDropdown";
import * as invoiceSelector from "@/src/selectors/invoice";
import { isEmpty, map, get, isEqual } from "lodash";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import Toast from "@/src/utils/Toast";
import { NextSeo } from "next-seo";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";
import Icons from "@/components/Icons";

export { getServerSideProps };

const OwnerInvoiceOverview = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");

  const [invoiceOverviewData, setInvoiceOverviewData] = useState(null);
  const [invoiceOverviewLoading, setInvoiceOverviewLoading] = useState(false);
  const [openDownloadModal, setOpenDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const code = invoiceSelector.getInvoiceNumber(invoiceOverviewData);
  const paymentStatus = invoiceSelector.getPaymentStatus(invoiceOverviewData);
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

  useEffect(() => {
    fetchInvoiceOverviewData();
  }, [id]);

  const fetchInvoiceOverviewData = async () => {
    await apiRequest.getInvoiceOverviewDetailRequest(
      id,
      setInvoiceOverviewLoading,
      (res) => setInvoiceOverviewData(res),
    );
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickDownload = () => {
    setOpenDownloadModal(!openDownloadModal);
  };

  const onClickDownloadDocument = async (url) => {
    try {
      setDownloading(true);

      const isInvoice = isEqual(url, invoiceDocument);
      const isReceipt = isEqual(url, receiptDocument);

      let response;
      let fileName;
      if (isInvoice) {
        response = await apiRequest.generateInvoicePdfRequest(code);
        fileName = `${isEmpty(code) ? "statement" : code}-statement`;
      } else if (isReceipt) {
        response = await apiRequest.generateInvoiceReceiptPdfRequest(code);
        fileName = `${isEmpty(code) ? "receipt" : code}-receipt`;
      } else {
        Toast.error("Invalid document type");
        return;
      }

      const documentUrl = get(response, ["data", "data"], "");

      if (isEmpty(documentUrl)) {
        Toast.error("Document URL not found");
        return;
      }

      await apiRequest.downloadFileRequest(
        documentUrl,
        undefined,
        fileName,
        "pdf",
      );
      setOpenDownloadModal(false);
    } catch (e) {
      Toast.error("Failed to download document");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Statement Overview | Owner - CozyHomes" />

      <DesktopLayout
        hideFooter
        loading={invoiceOverviewLoading || downloading}
        rightButtonIcon={Icons.downloadIconBlack}
        onClickRightButton={onClickDownload}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                <li>
                  <a href={"/user/owner/my-wallet"}>
                    <CustomText textClassName="text-base text-disable">
                      My Wallet
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
                src={Icons.leftIconBlack}
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
            <CustomImage src={Icons.invoiceIconWhite} className="w-6" />
          </div>
          <div className="global-box-shadow global-border-radius p-5 bg-white pt-10 w-full">
            <div className="flex justify-between">
              <CustomLabelValue
                value={isEmpty(code) ? "-" : code}
                label={"Statement Number"}
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
                label={"Statement Date"}
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
          </div>

          {openDownloadModal ? (
            <CustomDropdown
              onClickDownloadDocument={onClickDownloadDocument}
              top={-14}
              items={[
                {
                  name: "Download Statement",
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

export default withTranslation("common")(OwnerAuthWrapper(OwnerInvoiceOverview));
