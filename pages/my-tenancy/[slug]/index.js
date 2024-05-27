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
import { useState } from "react";
import UnsubscribeAutoPayModal from "@/components/MyTenancy/UnsubscribeAutoPayModal";
import * as tenancyAction from "@/src/actions/tenancy";
import * as tenancySelector from "@/src/selectors/tenancy";
import { useDispatch, useSelector } from "react-redux";

export { getServerSideProps };

const MyTenancy = ({}) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();

  const getTenancyOverviewRequest = (id) =>
    dispatch(tenancyAction.getTenancyOverviewRequest(id));
  const tenancyOverviewData = useSelector((state) =>
    tenancySelector.getBookingOverviewData(state),
  );
  const tenancyOverviewLoading = useSelector((state) =>
    tenancySelector.getTenancyListingLoading(state),
  );

  const [isChecked, setIsChecked] = useState(false);

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
        <TenancyUserSection t={t} />

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
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyTenancy);
