import CustomHeader from "@/components/CustomHeader";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useRouter } from "next/router";
import Images from "@/src/utils/Image";
import TenancyUserSection from "@/components/MyTenancy/TenancyUserSection";
import TenancyDetail from "@/components/MyTenancy/TenancyDetail";
import TenancyFeeDetail from "@/components/MyTenancy/TenancyFeeDetail";
import SubscribeAutoPayModal from "@/components/MyTenancy/SubscribeAutoPayModal";
import EAgreement from "@/components/MyTenancy/E-AgreementSection";
import InsuranceSection from "@/components/MyTenancy/InsuranceSection";
import { useEffect, useState } from "react";
import UnsubscribeAutoPayModal from "@/components/MyTenancy/UnsubscribeAutoPayModal";
import * as tenancyAction from "@/src/actions/tenancy";
import * as tenancySelector from "@/src/selectors/tenancy";
import { useDispatch, useSelector } from "react-redux";
import * as authAction from "@/src/actions/auth";
import * as authSelector from "@/src/selectors/auth";
import LoadingOverlay from "@/components/LoadingOverlay";
import Helper from "@/src/utils/Helper";
import { NextSeo } from "next-seo";
import AuthWrapper from "@/components/AuthWrapper";
import DesktopLayout from "@/components/DesktopLayout";
import CustomText from "@/components/CustomText";

export { getServerSideProps };

const MyPropertyOverview = ({ id }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const getUserProfileRequest = () =>
    dispatch(authAction.getUserProfileRequest());
  const userProfileData = useSelector((state) =>
    authSelector.getUserProfileData(state),
  );
  const userProfileLoading = useSelector((state) =>
    authSelector.getUserProfileLoading(state),
  );

  const getTenancyOverviewRequest = (id) =>
    dispatch(tenancyAction.getTenancyOverviewRequest(id));
  const tenancyOverviewData = useSelector((state) =>
    tenancySelector.getTenancyOverviewData(state, id),
  );
  const tenancyOverviewLoading = useSelector((state) =>
    tenancySelector.getTenancyOverviewLoading(state),
  );

  const [isChecked, setIsChecked] = useState(false);

  const oneTimeFee = tenancySelector.getOneTimeFee(tenancyOverviewData);
  const recurringFee = tenancySelector.getRecurringFee(tenancyOverviewData);
  const tenancyCode = tenancySelector.getTenancyCode(tenancyOverviewData);

  useEffect(() => {
    fetchUserprofileData();
  }, []);

  useEffect(() => {
    if (!tenancyOverviewLoading) fetchTenancyOverview(id);
  }, [id]);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const fetchTenancyOverview = (id) => {
    getTenancyOverviewRequest(id);
  };

  const onClickGoBack = () => {
    router.back();
  };

  const onClickToAgreementOverview = (id) => {
    router.push(`/e-agreement/${id}`);
  };

  const onChangeAutoPay = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      Helper.documentGetElementById("myTenancy_Unsubscribe_modal").showModal();
    } else {
      Helper.documentGetElementById("myTenancy_Subscribe_modal").showModal();
    }
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="My Property Overview - Spacify Asia" />

      <DesktopLayout
        loading={userProfileLoading || tenancyOverviewLoading}
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <a href={"/my-property"}>
                  <CustomText textClassName="text-base disable-text">
                    My Property
                  </CustomText>
                </a>
              </li>
              <li>
                <CustomText textClassName="font-size-xlarge font-bold">
                  {tenancyCode}
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="gap-6 flex flex-col">
          <TenancyUserSection t={t} data={userProfileData} />

          <TenancyDetail
            t={t}
            onChangeAutoPay={onChangeAutoPay}
            isChecked={isChecked}
            data={tenancyOverviewData}
          />

          <TenancyFeeDetail title={"One Time Charges"} data={oneTimeFee} />

          <TenancyFeeDetail title={"Monthly Charges"} data={recurringFee} />

          {/*<EAgreement*/}
          {/*  t={t}*/}
          {/*  onClickToAgreementOverview={onClickToAgreementOverview}*/}
          {/*/>*/}

          {/*<UnsubscribeAutoPayModal t={t} />*/}

          {/*<SubscribeAutoPayModal t={t} />*/}
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AuthWrapper(MyPropertyOverview));
