import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const MeterSection = ({ t }) => {
  return (
    <div className="pb-7">
      <CustomText textClassName="section-title">
        {t("myStay.myMeter")}
      </CustomText>

      <MeterComponent t={t} />
    </div>
  );
};

export default MeterSection;
