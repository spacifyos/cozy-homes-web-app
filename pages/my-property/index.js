import CustomHeader from "@/components/CustomHeader";
import UserSection from "@/components/MyStay/UserSection";
import TenancySection from "@/components/MyStay/TenancySection";
import FeatureSection from "@/components/MyStay/FeatureSection";
import MeterSection from "@/components/MyStay/MeterSection";
import InvoiceSection from "@/components/MyStay/InvoiceSection";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/AuthWrapper";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as tenancyAction from "@/src/actions/tenancy";
import * as tenancySelector from "@/src/selectors/tenancy";
import * as invoiceAction from "@/src/actions/invoice";
import * as invoiceSelector from "@/src/selectors/invoice";
import * as meterAction from "@/src/actions/meter";
import * as meterSelector from "@/src/selectors/meter";
import { NextSeo } from "next-seo";

export { getServerSideProps };

const MyStay = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState("HomeUnpaid");

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const getTenancyListingRequest = () =>
    dispatch(tenancyAction.getTenancyListingRequest());
  const tenancyListingData = useSelector((state) =>
    tenancySelector.getTenancyListingData(state),
  );
  const tenancyListingLoading = useSelector((state) =>
    tenancySelector.getTenancyListingLoading(state),
  );

  const getInvoiceListingRequest = (paymentStatus, perPage, page) =>
    dispatch(
      invoiceAction.getInvoiceListingRequest(paymentStatus, perPage, page),
    );
  const invoiceListingData = useSelector((state) =>
    invoiceSelector.getInvoiceListingData(state, selectedCategory),
  );
  const invoiceListingLoading = useSelector((state) =>
    invoiceSelector.getInvoiceListingLoading(state, selectedCategory),
  );

  const getMeterListingRequest = (per_page, page) =>
    dispatch(meterAction.getMeterListingRequest(per_page, page));
  const meterListingData = useSelector((state) =>
    meterSelector.getMeterListingData(state),
  );
  const meterListingLoading = useSelector((state) =>
    meterSelector.getMeterListingLoading(state),
  );

  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    fetchInvoiceListingData(selectedCategory);
  }, [selectedCategory]);

  const fetchInvoiceListingData = (paymentStatus, perPage = 3, page = 1) => {
    getInvoiceListingRequest(paymentStatus, perPage, page);
  };

  useEffect(() => {
    fetchUserprofileData();
    fetchTenancyListing();
    fetchMeterListingData();
  }, []);

  const fetchMeterListingData = (per_page = 1, page = 1) => {
    getMeterListingRequest(per_page, page);
  };

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const fetchTenancyListing = () => {
    getTenancyListingRequest();
  };

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickToMeterOverview = (id) => {
    router.push(`/my-meter/${id}`);
  };

  const onClickTopUp = (id) => {
    router.push(`/my-meter/${id}/top-up-meter`);
  };

  const onClickToAgreement = () => {
    router.push("/e-agreement");
  };

  const onClickGoToMyTenancy = (code) => {
    router.push(`/my-tenancy/${code}`);
  };

  const onChangeAutoPay = () => {
    setIsChecked(!isChecked);
  };

  const onClickToInvoiceList = () => {
    router.push("/my-invoice");
  };

  const onClickToOverviewPage = (id) => {
    router.push(`/my-invoice/${id}`);
  };

  const onClickToMeterList = () => {
    router.push("/my-meter");
  };
  const onClickToHelpCenter = () => {
    router.push("/help-center");
  };

  return (
    <CustomHeader pageTitle="My Property" hideGoBackButton hideRightButton>
      <NextSeo title="My Stay - Spacify Asia" />
      
      <div className="body-container pb-24">
        <UserSection t={t} data={userProfileData} />

        <TenancySection
          t={t}
          onClickGoToMyTenancy={onClickGoToMyTenancy}
          onChangeAutoPay={onChangeAutoPay}
          isChecked={isChecked}
          data={tenancyListingData}
        />

        <FeatureSection
          t={t}
          onClickToAgreement={onClickToAgreement}
          onClickToHelpCenter={onClickToHelpCenter}
        />

        <MeterSection
          t={t}
          onClickTopUp={onClickToMeterOverview}
          onClickToMeterOverview={onClickToMeterOverview}
          onClickToMeterList={onClickToMeterList}
          data={meterListingData}
        />

        <InvoiceSection
          t={t}
          onClickSelectCategory={onClickSelectCategory}
          selectedCategory={selectedCategory}
          onClickToInvoiceList={onClickToInvoiceList}
          data={invoiceListingData}
          onClickToOverviewPage={onClickToOverviewPage}
        />

        <LoadingOverlay
          loading={
            userProfileLoading ||
            tenancyListingLoading ||
            invoiceListingLoading ||
            meterListingLoading
          }
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(AuthWrapper(MyStay));
