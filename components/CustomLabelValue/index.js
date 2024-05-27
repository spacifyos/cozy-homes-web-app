import CustomText from "@/components/CustomText";

const CustomLabelValue = ({
  label,
  value,
  className = "",
  highlight = false,
}) => {
  return (
    <div className={`pb-2 ${className}`}>
      <CustomText textClassName={`disable-text font-size-xxsmall font-normal`}>
        {label}
      </CustomText>
      <CustomText
        textClassName={`font-size-small ${highlight ? "primary-text" : "black-text"}`}
      >
        {value}
      </CustomText>
    </div>
  );
};

export default CustomLabelValue;
