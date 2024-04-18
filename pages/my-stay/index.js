import CustomHeader from "@/components/CustomHeader";
import UserSection from "@/components/MyStay/UserSection";
import TenancySection from "@/components/MyStay/TenancySection";
import FeatureSection from "@/components/MyStay/FeatureSection";
import MeterSection from "@/components/MyStay/MeterSection";
import InvoiceSection from "@/components/MyStay/InvoiceSection";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import { useState } from "react";
import { useRouter } from "next/router";

export { getServerSideProps };

const MyStay = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [selectedCategory, setSelectedCategory] = useState("Unpaid");
  const [isChecked, setIsChecked] = useState(true);

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickToMyMeter = () => {
    router.push("/my-meter/123");
  };
  const onClickTopUp = () => {
    router.push("/top-up-meter");
  };

  const onClickToAgreement = () => {
    router.push("/e-agreement");
  };

  const onClickGoToMyTenancy = () => {
    router.push("/my-tenancy/123");
  };

  const onClickChangeAutoPay = () => {
    setIsChecked(!isChecked);
  };

  return (
    <CustomHeader
      pageTitle={t("pageTitle.myStay")}
      hideGoBackButton
      hideRightButton
      padding
    >
      <div className="body-container pb-24">
        <UserSection t={t} />

        <TenancySection
          t={t}
          onClickGoToMyTenancy={onClickGoToMyTenancy}
          onClickChangeAutoPay={onClickChangeAutoPay}
          isChecked={isChecked}
        />

        <FeatureSection t={t} onClickToAgreement={onClickToAgreement} />

        <MeterSection
          t={t}
          onClickTopUp={onClickTopUp}
          onClickToMyMeter={onClickToMyMeter}
        />

        <InvoiceSection
          t={t}
          onClickSelectCategory={onClickSelectCategory}
          selectedCategory={selectedCategory}
        />
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyStay);
