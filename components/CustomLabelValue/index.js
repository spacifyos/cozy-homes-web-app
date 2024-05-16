import CustomText from "@/components/CustomText";

const CustomLabelValue = ({
  label,
  value,
  className = "pb-2",
  highlight = false,
}) => {
  return (
    <div className={`${className}`}>
      <CustomText textClassName="font-size-xxsmall disable-text">
        {label}
      </CustomText>
      <CustomText
        textClassName={`font-size-small font-bold ${_.isEqual(highlight, true) ? "primary-text" : "black-text"}`}
      >
        {value}
      </CustomText>
    </div>
  );
};

export default CustomLabelValue;
