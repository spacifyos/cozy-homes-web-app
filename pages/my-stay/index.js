import CustomHeader from "@/components/CustomHeader";
import UserSection from "@/components/MyStay/UserSection";
import TenancySection from "@/components/MyStay/TenancySection";
import FeatureSection from "@/components/MyStay/FeatureSection";
import MeterSection from "@/components/MyStay/MeterSection";
import InvoiceSection from "@/components/MyStay/InvoiceSection";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";

export { getServerSideProps };

const MyStay = () => {
  const { t } = useTranslation("common");

  return (
    <CustomHeader pageTitle={t("pageTitle.myStay")} hideGoBackButton padding>
      <div className="pb-23 global-horizontal-padding">
        <UserSection t={t} />

        <TenancySection t={t} />

        <FeatureSection t={t} />

        <MeterSection t={t} />

        <InvoiceSection t={t}/>
      </div>
    </CustomHeader>
  );
};

export default withTranslation("common")(MyStay);
