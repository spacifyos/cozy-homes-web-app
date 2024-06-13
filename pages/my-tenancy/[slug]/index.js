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

export { getServerSideProps };

const MyTenancy = ({ code }) => {
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
    tenancySelector.getTenancyOverviewData(state),
  );
  const tenancyOverviewLoading = useSelector((state) =>
    tenancySelector.getTenancyOverviewLoading(state),
  );

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    fetchUserprofileData();
    fetchTenancyOverview(code);
  }, []);

  const fetchUserprofileData = () => {
    getUserProfileRequest();
  };

  const fetchTenancyOverview = (code) => {
    getTenancyOverviewRequest(code);
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
      document.getElementById("myTenancy_Unsubscribe_modal").showModal();
    } else {
      document.getElementById("myTenancy_Subscribe_modal").showModal();
    }
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myTenancy")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      // rightButtonIcon={Images.downloadIcon}
      // rightSecondButtonIcon={Images.shareIcon}
    >
      <div className="body-container pb-4">
        <TenancyUserSection t={t} data={userProfileData} />

        <TenancyDetail
          t={t}
          onChangeAutoPay={onChangeAutoPay}
          isChecked={isChecked}
        />

        <TenancyFeeDetail t={t} />

        {/*<EAgreement*/}
        {/*  t={t}*/}
        {/*  onClickToAgreementOverview={onClickToAgreementOverview}*/}
        {/*/>*/}

        {/*<InsuranceSection t={t} />*/}

        {/*<UnsubscribeAutoPayModal t={t} />*/}

        {/*<SubscribeAutoPayModal t={t} />*/}

        <LoadingOverlay loading={userProfileLoading} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyTenancy);
