import CustomHeader from "@/components/CustomHeader";
import UserSection from "@/components/MyStay/UserSection";
import TenancySection from "@/components/MyStay/TenancySection";
import FeatureSection from "@/components/MyStay/FeatureSection";
import MeterSection from "@/components/MyStay/MeterSection";
import InvoiceSection from "@/components/MyStay/InvoiceSection";

const MyStay = () => {
  return (
    <CustomHeader pageTitle={"My Stay"} hideGoBackButton padding>
      <div className="pb-23">
        <UserSection />

        <TenancySection />

        <FeatureSection />

        <MeterSection />

        <InvoiceSection />
      </div>
    </CustomHeader>
  );
};

export default MyStay;
