import CustomHeader from "@/components/CustomHeader";
import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import _, { isEmpty, isEqual } from "lodash";
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
import { NextSeo } from "next-seo";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import PropertyInfoComponent from "@/components/Owner/PropertyInfoComponent";
import InvoiceSummary from "@/components/OwnerMyInvoice/InvoiceSummary";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";

export { getServerSideProps };

const OwnerMyInvoice = () => {
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
  const [isOpenFilterModal, setIsOpenFilterModal] = useState(false);

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
    router.push(`/owner/my-invoice/${code}`);
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
    setIsOpenFilterModal(false);
    // Helper.documentGetElementById("invoice_filter_modal").close();
  };

  const onClickOpenFilter = () => {
    const { invoiceNumber, dateFrom, dateTo } = filterParams;

    setInvoiceNumberValue(invoiceNumber);
    setDateFromValue(dateFrom);
    setDateToValue(dateTo);

    setIsOpenFilterModal(true);
    // Helper.documentGetElementById("invoice_filter_modal").showModal();
  };

  const isFilter = () => {
    const { invoiceNumber, dateFrom, dateTo } = filterParams;

    return !isEmpty(invoiceNumber) || !isEmpty(dateFrom) || !isEmpty(dateTo);
  };

  return (
    <div className="flex flex-col flex-1 owner-bg-color">
      <div className="body-container">
        <div
          className={`flex items-center justify-between overflow-hidden py-5`}
        >
          <div className="flex justify-center items-center">
            <div onClick={onClickGoBack} className="cursor-pointer">
              <CustomImage
                className={"me-5 w-2.5 cursor-pointer"}
                src={Images.leftIconWhite}
              />
            </div>

            <CustomText
              textClassName={"font-bold white-text"}
              styles={{ fontSize: 18 }}
            >
              My Invoice
            </CustomText>
          </div>

          <div style={{ width: 25, height: 25 }} className="relative">
            <CustomImage
              src={Images.filterProWhiteIcon}
              imageStyle={{ width: 25, height: 25 }}
              onClick={onClickOpenFilter}
              className="cursor-pointer"
            />
            {isFilter() ? (
              <div
                className="w-2.5 h-2.5 rounded-2xl primaryWhite-bg-color absolute z-10"
                style={{ top: -10, left: -10 }}
              ></div>
            ) : (
              false
            )}
          </div>
        </div>

        {invoiceSummaryDataLoading ? (
          <div
            className="w-full flex justify-center"
            style={{ minHeight: 120, height: 120 }}
          >
            <span className="loading loading-spinner loading-lg primary-text"></span>
          </div>
        ) : (
          <InvoiceSummary data={invoiceSummaryData} />
        )}
      </div>
      <NextSeo title="My Invoice - Spacify Asia" />

      <div className="body-container primaryWhite-bg-color pb-1 flex flex-col flex-1 pt-5">
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
          isOpenFilterModal={isOpenFilterModal}
        />

        <LoadingOverlay
          loading={invoiceListingLoading && isEmpty(invoiceListingData)}
        />
      </div>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerMyInvoice));
