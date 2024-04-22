import CustomText from "@/components/CustomText";

const CustomLabelValue = ({ label, value, className = "pb-2" }) => {
  return (
    <div className={`${className}`}>
      <CustomText textClassName="font-size-xxsmall disable-text">
        {label}
      </CustomText>
      <CustomText textClassName="primary-text font-size-small font-bold">
        {value}
      </CustomText>
    </div>
  );
};

export default CustomLabelValue;
