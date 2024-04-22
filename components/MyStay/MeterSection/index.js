import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const MeterSection = ({ t, onClickTopUp, onClickToMyMeter }) => {
  return (
    <div className="pb-7">
      <div className="flex justify-between items-end">
        <CustomText textClassName="section-title">
          {t("myStay.myMeter")}
        </CustomText>

        <CustomText textClassName="font-size-small pb-2 cursor-pointer">
          {"View more"}
        </CustomText>
      </div>

      <MeterComponent
        t={t}
        onClickTopUp={onClickTopUp}
        onClickToMyMeter={onClickToMyMeter}
      />
    </div>
  );
};

export default MeterSection;
