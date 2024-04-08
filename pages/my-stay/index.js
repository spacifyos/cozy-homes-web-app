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

  const onClickSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const onClickTopUp = () => {
    router.push("/my-meter/123");
  };

  return (
    <CustomHeader pageTitle={t("pageTitle.myStay")} hideGoBackButton hideRightButton padding>
      <div className="body-container">
        <UserSection t={t} />

        <TenancySection t={t} />

        <FeatureSection t={t} />

        <MeterSection t={t} onClickTopUp={onClickTopUp} />

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
