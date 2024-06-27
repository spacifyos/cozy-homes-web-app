import CustomHeader from "@/components/CustomHeader";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { isEmpty, isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import MyInvoiceComponent from "@/components/MyInvoice/MyInvoiceComponent";
import FilterModal from "@/components/MyInvoice/FilterModal";
import * as invoiceAction from "@/src/actions/invoice";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceSelector from "@/src/selectors/invoice";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import {NextSeo} from "next-seo";

export { getServerSideProps };

const MyInvoice = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("Unpaid");
  const [filterParams, setFilterParams] = useState({
    invoiceNumber: "",
    dateFrom: "",
    dateTo: "",
  });

  const getInvoiceListingRequest = (
    paymentStatus,
    perPage,
    page,
    filterParams,
  ) =>
    dispatch(
      invoiceAction.getInvoiceListingRequest(
        paymentStatus,
        perPage,
        page,
        filterParams,
      ),
    );
  const invoiceListingData = useSelector((state) =>
    invoiceSelector.getInvoiceListingData(state, selectedCategory),
  );
  const invoiceListingLoading = useSelector((state) =>
    invoiceSelector.getInvoiceListingLoading(state, selectedCategory),
  );
  const invoiceListingPagination = useSelector((state) =>
    invoiceSelector.getInvoiceListingPagination(state, selectedCategory),
  );

  const getInvoiceSummaryRequest = () =>
    dispatch(invoiceAction.getInvoiceSummaryRequest());
  const invoiceSummaryData = useSelector((state) =>
    invoiceSelector.getInvoiceSummaryData(state),
  );
  const invoiceSummaryDataLoading = useSelector((state) =>
    invoiceSelector.getInvoiceSummaryLoading(state),
  );

  const [dateFromValue, setDateFromValue] = useState("");
  const [dateToValue, setDateToValue] = useState("");
  const [invoiceNumberValue, setInvoiceNumberValue] = useState("");

  const hasMorePage = invoiceSelector.getHasMorePages(invoiceListingPagination);
  const lastPage = invoiceSelector.getLastPage(invoiceListingPagination);
  const currentPage = invoiceSelector.getCurrentPage(invoiceListingPagination);

  useEffect(() => {
    fetchInvoiceListingData(selectedCategory, 20, 1, filterParams);
  }, [selectedCategory, filterParams]);

  const fetchInvoiceListingData = (
    paymentStatus,
    perPage,
    page,
    filterParams,
  ) => {
    getInvoiceListingRequest(paymentStatus, perPage, page, filterParams);
  };

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

  const onClickToOverView = (code) => {
    router.push(`my-invoice/${code}`);
  };

  const onClickLoadMore = () => {
    fetchInvoiceListingData(
      selectedCategory,
      20,
      currentPage + 1,
      filterParams,
    );
  };

  const onChangeInvoiceNumber = (e) => {
    setInvoiceNumberValue(e.target.value);
  };

  const onClickCancel = () => {
    handleCloseFilter();
  };

  const onClickSubmit = () => {
    setFilterParams({
      invoiceNumber: invoiceNumberValue,
      dateFrom: dateFromValue,
      dateTo: dateToValue,
    });

    handleCloseFilter();
  };

  const onClickReset = () => {
    setInvoiceNumberValue("");
    setDateToValue("");
    setDateFromValue("");
  };

  const handleCloseFilter = () => {
    document.getElementById("invoice_filter_modal").close();
  };

  const onClickOpenFilter = () => {
    const { invoiceNumber, dateFrom, dateTo } = filterParams;

    setInvoiceNumberValue(invoiceNumber);
    setDateFromValue(dateFrom);
    setDateToValue(dateTo);

    document.getElementById("invoice_filter_modal").showModal();
  };

  const isFilter = () => {
    const { invoiceNumber, dateFrom, dateTo } = filterParams;

    return !isEmpty(invoiceNumber) || !isEmpty(dateFrom) || !isEmpty(dateTo);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myInvoice")}
      rightButtonIcon={Images.filterProIcon}
      hideBgImage
      onClickGoBack={onClickGoBack}
      isFiltered={isFilter()}
      onClickRightButton={onClickOpenFilter}
    >
      <NextSeo title="My Invoice Page - Spacify Asia" />
      <div className="body-container pb-1 flex flex-col flex-1">
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
            buttonClassName={`btn-sm ${isEqual(selectedCategory, "Unpaid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Unpaid")}
          />
          <CustomButton
            buttonText="Paid"
            buttonClassName={`btn-sm ${isEqual(selectedCategory, "Paid") ? "primary-btn" : "default-btn"} mr-2`}
            textClassName="font-size-xsmall"
            onClick={() => onClickSelectCategory("Paid")}
          />
        </div>

        {isEmpty(invoiceListingData) ? (
          <div className="flex flex-1 items-center justify-center">
            <CustomEmptyBox />
          </div>
        ) : (
          <InvoiceComponent
            data={invoiceListingData}
            t={t}
            onClickToOverView={onClickToOverView}
          />
        )}

        {hasMorePage && lastPage > 1 && !isEmpty(invoiceListingData) ? (
          <div className="flex justify-center pb-3 pt-1">
            <CustomButton
              buttonClassName="primary-btn min-h-9 h-9 w-32"
              buttonText="Load More"
              textClassName="font-size-xsmall"
              loading={invoiceListingLoading && !isEmpty(invoiceListingData)}
              onClick={onClickLoadMore}
            />
          </div>
        ) : (
          false
        )}

        <FilterModal
          t={t}
          dateFromValue={dateFromValue}
          onChangeDateFrom={onChangeDateFrom}
          dateToValue={dateToValue}
          onChangeDateTo={onChangeDateTo}
          invoiceNumberValue={invoiceNumberValue}
          onChangeInvoiceNumber={onChangeInvoiceNumber}
          onClickCancel={onClickCancel}
          onClickSubmit={onClickSubmit}
          onClickReset={onClickReset}
        />

        <LoadingOverlay
          loading={invoiceListingLoading && isEmpty(invoiceListingData)}
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyInvoice);
