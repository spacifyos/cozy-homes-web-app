import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceAction from "@/src/actions/invoice";
import * as invoiceSelector from "@/src/selectors/invoice";
import { useEffect } from "react";
import { get, isEmpty, isEqual, map } from "lodash";
import moment from "moment";
import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import AuthWrapper from "@/components/AuthWrapper";

export { getServerSideProps };

const PaymentSuccessful = ({ id }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const userType = get(router, ["query", "type"], "");

  const getInvoiceOverviewRequest = (id) =>
    dispatch(invoiceAction.getInvoiceOverviewRequest(id));
  const invoiceOverviewData = useSelector((state) =>
    invoiceSelector.getInvoiceOverviewData(state, id),
  );
  const invoiceOverviewLoading = useSelector((state) =>
    invoiceSelector.getInvoiceOverviewLoading(state),
  );

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
  const paidAt = invoiceSelector.getPaidAt(invoiceOverviewData);

  useEffect(() => {
    fetchInvoiceOverviewData(id);
  }, [id]);

  const fetchInvoiceOverviewData = (id) => {
    getInvoiceOverviewRequest(id);
  };

  const onClickClose = () => {
    if (isEqual(userType, "owner")) {
      return router.replace(`/user/owner`);
    } else {
      return router.replace(`/user/my-property`);
    }
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Invoice Payment Successful - Spacify Asia" />

      <DesktopLayout
        loading={invoiceOverviewLoading}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul>
                {/*<li>*/}
                {/*  <a href={"/user/my-property"}>*/}
                {/*    <CustomText textClassName="text-base disable-text">*/}
                {/*      My Property*/}
                {/*    </CustomText>*/}
                {/*  </a>*/}
                {/*</li>*/}
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
                  <CustomText textClassName="text-base">
                    Invoice Payment
                  </CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickClose}
              />
              <CustomText textClassName="text-base">Back to Home</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col justify-center items-center">
          <CustomImage
            src={Images.successIcon}
            className="xl:w-40 lg:w-36 md:w-32 sm:w-28 w-28"
          />

          {/*<CustomText textClassName="font-bold" styles={{ fontSize: 24 }}>*/}
          {/*  {t("invoiceSuccessful.spacifyCoinsEarned")}*/}
          {/*</CustomText>*/}

          {/*<CustomText textClassName="primary-text font-bold text-lg">*/}
          {/*  3,800*/}
          {/*</CustomText>*/}
          <CustomText textClassName="font-bold text-lg">
            Congratulations
          </CustomText>
        </div>

        <div className="flex flex-col global-border-radius primaryWhite-bg-color py-2 px-4 global-box-shadow w-full my-7">
          <div className="flex items-center justify-center py-4">
            <CustomImage src={Images.checkGreenIcon} className="mr-2 w-6" />
            <CustomText textClassName="black-text font-bold text-base">
              Payment Completed
            </CustomText>
          </div>

          <div className="divider-line" style={{ margin: 0 }}></div>

          <div className="flex flex-col items-center py-4">
            <CustomText textClassName="primary-text font-bold text-base">
              RM{isEmpty(totalAmount) ? "0" : totalAmount}
            </CustomText>
            <CustomText textClassName="disable-text text-xs">
              {isEmpty(paidAt)
                ? moment(new Date()).format("DD MMM YYYY HH:mm")
                : paidAt}
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
              value={isEmpty(billTo) ? "-" : billTo}
              label={"Bill To"}
            />
            <CustomLabelValue
              value={isEmpty(code) ? "-" : code}
              label="Invoice Number"
            />
            <CustomLabelValue
              value={isEmpty(property) ? "-" : property}
              label={"Property"}
            />
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

            <CustomText textClassName="text-xs disable-text">
              Items
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
                            textClassName={`black-text text-sm font-bold`}
                          >
                            {itemName}
                          </CustomText>
                          <CustomText textClassName={`text-xs disable-text`}>
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
              <CustomText textClassName="col-span-1 black-text text-sm font-bold">
                Subtotal
              </CustomText>
              <CustomText textClassName="col-span-1 black-text text-sm font-bold text-end">
                RM{isEmpty(grandTotal) ? "0" : grandTotal}
              </CustomText>
              <CustomText textClassName="col-span-1 black-text text-sm font-bold">
                Tax
              </CustomText>
              <CustomText textClassName="col-span-1 black-text text-sm font-bold text-end">
                RM{isEmpty(tax) ? "0" : tax}
              </CustomText>
            </div>

            <div
              className="divider-line"
              style={{ marginTop: 10, marginBottom: 10 }}
            ></div>

            <div className="grid grid-cols-2 gap-2">
              <CustomText textClassName="col-span-1 black-text text-sm font-bold">
                Total Amount
              </CustomText>
              <CustomText textClassName="col-span-1 primary-text text-sm font-bold text-end">
                RM{isEmpty(totalAmount) ? "0" : totalAmount}
              </CustomText>
            </div>

            <div
              className="divider-line"
              style={{ marginTop: 10, marginBottom: 0 }}
            ></div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(PaymentSuccessful));
