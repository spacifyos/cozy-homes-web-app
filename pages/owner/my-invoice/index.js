import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import _, { isEmpty, isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import FilterModal from "@/components/MyInvoice/FilterModal";
import * as invoiceAction from "@/src/actions/invoice";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceSelector from "@/src/selectors/invoice";
import LoadingOverlay from "@/components/LoadingOverlay";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { NextSeo } from "next-seo";
import CustomImage from "@/components/CustomImage";
import InvoiceSummary from "@/components/OwnerMyInvoice/InvoiceSummary";
import OwnerAuthWrapper from "@/components/OwnerAuthWrapper";
import CustomOwnerHeader from "@/components/CustomOwnerHeader";
import CustomText from "@/components/CustomText";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopInvoiceSummaryComponent from "@/components/MyInvoice/DesktopInvoiceSummaryComponent";
import DesktopFilterModal from "@/components/MyInvoice/DesktopFilterModal";
import Helper from "@/src/utils/Helper";

export { getServerSideProps };

const OwnerMyInvoice = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("All");
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
    setIsOpenFilterModal(false);
    Helper.documentGetElementById("desktop_invoice_filter_modal").close();
  };

  const onClickOpenFilter = (responsive) => {
    const { invoiceNumber, dateFrom, dateTo } = filterParams;

    setInvoiceNumberValue(invoiceNumber);
    setDateFromValue(dateFrom);
    setDateToValue(dateTo);

    if (isEqual(responsive, "desktop")) {
      Helper.documentGetElementById("desktop_invoice_filter_modal").showModal();
    } else {
      setIsOpenFilterModal(true);
    }
  };

  const isFilter = () => {
    const { invoiceNumber, dateFrom, dateTo } = filterParams;

    return !isEmpty(invoiceNumber) || !isEmpty(dateFrom) || !isEmpty(dateTo);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My Invoice | Owner - Spacify Asia" />

      <DesktopLayout
        loading={invoiceListingLoading && isEmpty(invoiceListingData)}
        rightButtonIcon={Images.filterProIcon}
        isFiltered={isFilter()}
        onClickRightButton={() => onClickOpenFilter("desktop")}
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul className="flex-wrap">
              <li>
                <a href={"/owner"}>
                  <CustomText textClassName="text-base disable-text">
                    My Property
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="font-size-xlarge font-bold">
                  Invoice
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="flex flex-col flex-1">
          {invoiceSummaryDataLoading ? (
            <div
              className="w-full flex justify-center"
              style={{ minHeight: 120, height: 120 }}
            >
              <span className="loading loading-spinner loading-lg primary-text"></span>
            </div>
          ) : (
            <DesktopInvoiceSummaryComponent data={invoiceSummaryData} />
          )}

          <div className="flex items-center pb-5">
            <CustomButton
              buttonText="All"
              buttonClassName={`btn-sm ${isEqual(selectedCategory, "All") ? "primary-btn" : "default-btn"} mr-2`}
              textClassName="text-xs"
              onClick={() => onClickSelectCategory("All")}
            />
            <CustomButton
              buttonText="Unpaid"
              buttonClassName={`btn-sm ${isEqual(selectedCategory, "Unpaid") ? "primary-btn" : "default-btn"} mr-2`}
              textClassName="text-xs"
              onClick={() => onClickSelectCategory("Unpaid")}
            />
            <CustomButton
              buttonText="Paid"
              buttonClassName={`btn-sm ${isEqual(selectedCategory, "Paid") ? "primary-btn" : "default-btn"} mr-2`}
              textClassName="text-xs"
              onClick={() => onClickSelectCategory("Paid")}
            />
          </div>

          {isEmpty(invoiceListingData) ? (
            <div className="flex flex-1 items-center justify-center py-10">
              <CustomEmptyBox emptyTitle="No invoice found" />
            </div>
          ) : (
            <InvoiceComponent
              type="owner"
              data={invoiceListingData}
              t={t}
              onClickToOverView={onClickToOverView}
            />
          )}

          {hasMorePage && lastPage > 1 && !isEmpty(invoiceListingData) ? (
            <div className="flex justify-center pt-4">
              <CustomButton
                buttonClassName="primary-btn min-h-9 h-9 w-32"
                buttonText="Load More"
                textClassName="text-xs"
                loading={invoiceListingLoading && !isEmpty(invoiceListingData)}
                onClick={onClickLoadMore}
              />
            </div>
          ) : (
            false
          )}

          <DesktopFilterModal
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
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(OwnerAuthWrapper(OwnerMyInvoice));
