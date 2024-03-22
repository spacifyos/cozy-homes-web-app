import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const MeterSection = ({ t }) => {
  return (
    <div className="pb-7">
      <CustomText textClassName="font-size-xlarge font-bold pb-2">
        {t("myStay.myMeter")}
      </CustomText>

      <MeterComponent t={t} />
    </div>
  );
};

export default MeterSection;
