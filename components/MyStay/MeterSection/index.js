import CustomText from "@/components/CustomText";
import MeterComponent from "@/components/MyStay/MeterComponent";

const MeterSection = () => {
  return (
    <div className="pb-7">
      <CustomText textClassName="font-size-xxlarge font-bold pb-2">
        My Meter
      </CustomText>

      <MeterComponent />
    </div>
  );
};

export default MeterSection;
