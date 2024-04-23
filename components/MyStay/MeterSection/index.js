import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const MeterSection = ({
  t,
  onClickTopUp,
  onClickToMeterOverview,
  onClickToMeterList,
}) => {
  return (
    <div className="pb-7">
      <div className="flex justify-between items-end">
        <CustomText textClassName="section-title">
          {t("myStay.myMeter")}
        </CustomText>

        <CustomText
          textClassName="font-size-small pb-2 cursor-pointer"
          onClick={onClickToMeterList}
        >
          {"View more"}
        </CustomText>
      </div>

      <MeterComponent
        t={t}
        onClickTopUp={onClickTopUp}
        onClickToMeterOverview={onClickToMeterOverview}
      />
    </div>
  );
};

export default MeterSection;
