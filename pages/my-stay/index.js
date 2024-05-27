import CustomHeader from "@/components/CustomHeader";
import UserSection from "@/components/MyStay/UserSection";
import TenancySection from "@/components/MyStay/TenancySection";
import FeatureSection from "@/components/MyStay/FeatureSection";
import MeterSection from "@/components/MyStay/MeterSection";
import InvoiceSection from "@/components/MyStay/InvoiceSection";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AuthWrapper from "@/components/AuthWrapper";
import * as authAction from "@/src/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import * as authSelector from "@/src/selectors/auth";
import _ from "lodash";
import LoadingOverlay from "@/components/LoadingOverlay";
import * as tenancyAction from "@/src/actions/tenancy";
import * as tenancySelector from "@/src/selectors/tenancy";

export { getServerSideProps };

const list = [{ status: "Paid" }, { status: "Unpaid" }, { status: "Paid" }];

const MyStay = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

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

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isChecked, setIsChecked] = useState(true);

  useEffect(() => {
    if (_.isEmpty(userProfileData)) {
      fetchUserprofileData();
    }
  }, [userProfileData]);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
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

  const onClickGoToMyTenancy = (id) => {
    router.push(`/my-tenancy/${id}`);
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
    <CustomHeader
      pageTitle={t("pageTitle.myStay")}
      hideGoBackButton
      hideRightButton
      padding
    >
      <div className="body-container pb-24">
        <UserSection t={t} data={userProfileData} />

        <TenancySection
          t={t}
          onClickGoToMyTenancy={onClickGoToMyTenancy}
          onChangeAutoPay={onChangeAutoPay}
          isChecked={isChecked}
        />

        {/*<FeatureSection*/}
        {/*  t={t}*/}
        {/*  onClickToAgreement={onClickToAgreement}*/}
        {/*  onClickToHelpCenter={onClickToHelpCenter}*/}
        {/*/>*/}

        <MeterSection
          t={t}
          onClickTopUp={onClickTopUp}
          onClickToMeterOverview={onClickToMeterOverview}
          onClickToMeterList={onClickToMeterList}
        />

        <InvoiceSection
          t={t}
          onClickSelectCategory={onClickSelectCategory}
          selectedCategory={selectedCategory}
          onClickToInvoiceList={onClickToInvoiceList}
          list={list}
          onClickToOverviewPage={onClickToOverviewPage}
        />

        <LoadingOverlay loading={userProfileLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(AuthWrapper(MyStay));
