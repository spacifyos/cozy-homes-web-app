import Images from "@/src/utils/Image";
import CustomButton from "@/components/CustomButton";
import { isEmpty, isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import InvoiceComponent from "@/components/MyStay/InvoiceComponent";
import FilterModal from "@/components/MyInvoice/FilterModal";
import * as invoiceAction from "@/src/actions/invoice";
import { useDispatch, useSelector } from "react-redux";
import * as invoiceSelector from "@/src/selectors/invoice";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { NextSeo } from "next-seo";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopInvoiceSummaryComponent from "@/components/MyInvoice/DesktopInvoiceSummaryComponent";
import DesktopFilterModal from "@/components/MyInvoice/DesktopFilterModal";
import Helper from "@/src/utils/Helper";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";

export { getServerSideProps };

const MyInvoice = () => {
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
      <NextSeo title="My Invoice - Spacify Asia" />

      <DesktopLayout
        loading={invoiceListingLoading && isEmpty(invoiceListingData)}
        rightButtonIcon={Images.filterProIcon}
        isFiltered={isFilter()}
        onClickRightButton={() => onClickOpenFilter("desktop")}
        pageBreadcrumbs={
          <div>
            <div className="breadcrumbs text-sm xl:block lg:block md:block sm:hidden hidden">
              <ul className="flex-wrap">
                {/*<li>*/}
                {/*  <a href={"/user/my-property"}>*/}
                {/*    <CustomText textClassName="text-base disable-text">*/}
                {/*      My Property*/}
                {/*    </CustomText>*/}
                {/*  </a>*/}
                {/*</li>*/}
                <li>
                  <CustomText textClassName="text-base">My Invoice</CustomText>
                </li>
              </ul>
            </div>

            <div className="xl:hidden lg:hidden md:hidden sm:flex flex gap-4">
              <CustomImage
                src={Images.leftIcon}
                className="w-2"
                onClick={onClickGoBack}
              />
              <CustomText textClassName="text-base">My Invoice</CustomText>
            </div>
          </div>
        }
      >
        <div className="flex flex-col flex-1 h-full">
          {invoiceSummaryDataLoading ? (
            <div
              className="w-full flex justify-center"
              style={{ minHeight: 120, height: 120 }}
            >
              <span className="loading loading-spinner loading-lg primary-text"></span>
            </div>
          ) : isEmpty(invoiceSummaryData) ? (
            false
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
            <div className="flex flex-1 items-center justify-center py-10 h-full">
              <CustomEmptyBox emptyTitle="No invoice found" />
            </div>
          ) : (
            <InvoiceComponent
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
        </div>
      </DesktopLayout>

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
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(MyInvoice));
