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

export { getServerSideProps };

const MyTenancy = ({}) => {
  const { t } = useTranslation("common");
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const onClickGoBack = () => {
    router.back();
  };
  const onClickChangeAutoPay = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      document.getElementById("myTenancy_Unsubscribe_modal").showModal();
    } else {
      document.getElementById("canvas_modal").showModal();
    }
  };
  return (
    <CustomHeader
      pageTitle={t("pageTitle.myTenancy")}
      hideBgImage
      onClickGoBack={onClickGoBack}
      rightButtonIcon={Images.saveIcon}
      rightSecondButtonIcon={Images.shareIcon}
    >
      <div className="body-container pb-9">
        <TenancyUserSection t={t} />
        <TenancyDetail
          t={t}
          onClickChangeAutoPay={onClickChangeAutoPay}
          isChecked={isChecked}
        />
        <TenancyFeeDetail t={t} />
        <EAgreement t={t} />
        <InsuranceSection t={t} />
        <UnsubscribeAutoPayModal t={t} />
        <SubscribeAutoPayModal t={t} />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyTenancy);
