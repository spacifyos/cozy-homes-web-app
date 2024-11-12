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
import BottomNavigate from "@/components/BottomNavigate";
import { get } from "lodash";
import DesktopLayout from "@/components/DesktopLayout";
import DesktopFeatureSection from "@/components/MyStay/DesktopFeatureSection";

export { getServerSideProps };

const MyStay = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const routeName = get(router, ["route"], "");
  const routeQuery = get(router, ["query"], "");

  const [selectedCategory, setSelectedCategory] = useState("HomeAll");

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

  const onChangeAutoPay = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My Stay - Spacify Asia" />

      <DesktopLayout page="My Property">
        <div className="pb-16">
          <UserSection t={t} data={userProfileData} />

          <TenancySection
            t={t}
            onChangeAutoPay={onChangeAutoPay}
            isChecked={isChecked}
            data={tenancyListingData}
          />

          <DesktopFeatureSection t={t} />

          <MeterSection t={t} data={meterListingData} />

          <InvoiceSection
            t={t}
            onClickSelectCategory={onClickSelectCategory}
            selectedCategory={selectedCategory}
            data={invoiceListingData}
          />
        </div>
      </DesktopLayout>

      {/*<CustomHeader pageTitle="My Property" hideGoBackButton hideRightButton>*/}
      {/*  <div className="body-container pb-24">*/}
      {/*    <UserSection t={t} data={userProfileData} />*/}

      {/*    <TenancySection*/}
      {/*        t={t}*/}
      {/*        onChangeAutoPay={onChangeAutoPay}*/}
      {/*        isChecked={isChecked}*/}
      {/*        data={tenancyListingData}*/}
      {/*    />*/}

      {/*    <FeatureSection t={t} />*/}

      {/*    <MeterSection t={t} data={meterListingData} />*/}

      {/*    <InvoiceSection*/}
      {/*        t={t}*/}
      {/*        onClickSelectCategory={onClickSelectCategory}*/}
      {/*        selectedCategory={selectedCategory}*/}
      {/*        data={invoiceListingData}*/}
      {/*    />*/}

      {/*    <LoadingOverlay*/}
      {/*        loading={*/}
      {/*            userProfileLoading ||*/}
      {/*            tenancyListingLoading ||*/}
      {/*            invoiceListingLoading ||*/}
      {/*            meterListingLoading*/}
      {/*        }*/}
      {/*    />*/}
      {/*  </div>*/}

      <BottomNavigate t={t} routeName={routeName} routeQuery={routeQuery} />
      {/*</CustomHeader>*/}
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(MyStay));
