import CustomHeader from "@/components/CustomHeader";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import CustomText from "@/components/CustomText";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import MyInvoiceComponent from "@/components/MyInvoice/MyInvoiceComponent";
import FilterModal from "@/components/MyInvoice/FilterModal";
import moment from "moment/moment";
import * as invoiceAction from "@/src/actions/invoice";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceSelector from "@/src/selectors/invoice";
import LoadingOverlay from "@/components/LoadingOverlay";

export { getServerSideProps };

const invoice = [
  {
    date: "Nov 2024",
    list: [
      { status: "Paid" },
      { status: "Paid" },
      { status: "Paid" },
      { status: "Paid" },
    ],
  },
  {
    date: "Oct 2024",
    list: [
      { status: "Overdue" },
      { status: "Overdue" },
      { status: "Due Soon" },
      { status: "Due Soon" },
    ],
  },
];

const MyInvoice = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const getInvoiceListingRequest = () =>
    dispatch(invoiceAction.getInvoiceListingRequest());
  const invoiceListingData = useSelector((state) =>
    invoiceSelector.getInvoiceListingData(state),
  );
  const invoiceListingLoading = useSelector((state) =>
    invoiceSelector.getInvoiceListingLoading(state),
  );

  const getInvoiceSummaryRequest = () =>
    dispatch(invoiceAction.getInvoiceSummaryRequest());
  const invoiceSummaryData = useSelector((state) =>
    invoiceSelector.getInvoiceSummaryData(state),
  );
  const invoiceSummaryDataLoading = useSelector((state) =>
    invoiceSelector.getInvoiceSummaryLoading(state),
  );

  const [selectedCategory, setSelectedCategory] = useState("Unpaid");
  const [dateFromValue, setDateFromValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );
  const [dateToValue, setDateToValue] = useState(
    moment(new Date()).format("YYYY-MM-DD"),
  );

  useEffect(() => {
    fetchInvoiceSummary();
  }, []);

  const fetchInvoiceSummary = () => {
    getInvoiceSummaryRequest();
  };

  const onChangeDateFrom = (e) => {
    setDateFromValue(e.target.value);
  };

  const onChangeDateTo = (e) => {
    setDateToValue(e.target.value);
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToOverView = (id) => {
    router.push(`my-invoice/${id}`);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myInvoice")}
      rightButtonIcon={Images.filterProIcon}
      hideBgImage
      onClickGoBack={onClickGoBack}
      onClickRightButton={() =>
        document.getElementById("invoice_filter_modal").showModal()
      }
    >
      <div className="body-container pb-1">
        {invoiceSummaryDataLoading ? (
          <div
            className="w-full flex justify-center"
            style={{ minHeight: 120, height: 120 }}
          >
            <span className="loading loading-spinner loading-lg primary-text"></span>
          </div>
        ) : (
          <MyInvoiceComponent data={invoiceSummaryData} />
        )}

        <div className="flex items-center pb-3">
          <CustomButton
            buttonText="Unpaid"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Unpaid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Unpaid")}
          />
          <CustomButton
            buttonText="Paid"
            buttonClassName={`btn-sm ${_.isEqual(selectedCategory, "Paid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Paid")}
          />
        </div>

        {_.map(invoice, (item, index) => {
          const date = _.get(item, ["date"], "");
          const lists = _.get(item, ["list"], []);

          return (
            <div key={index} className="pb-4">
              <CustomText textClassName="section-title">{date}</CustomText>

              <div className="flex flex-col gap-3">
                {_.map(lists, (list, index) => (
                  <InvoiceComponent
                    key={index}
                    item={list}
                    t={t}
                    onClick={onClickToOverView}
                  />
                ))}
              </div>
            </div>
          );
        })}

        <div className="flex justify-center pb-3">
          <CustomButton
            buttonClassName="primary-btn min-h-9 h-9 w-32"
            buttonText="Load More"
            textClassName="font-size-xsmall"
            loading={false}
          />
        </div>

        <FilterModal
          t={t}
          dateFromValue={dateFromValue}
          onChangeDateFrom={onChangeDateFrom}
          dateToValue={dateToValue}
          onChangeDateTo={onChangeDateTo}
        />

        <LoadingOverlay />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyInvoice);
