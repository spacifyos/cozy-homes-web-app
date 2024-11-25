import CustomText from "@/components/CustomText";

const CustomLabelValue = ({
  label,
  value,
  className = "",
  highlight = false,
  styles,
}) => {
  return (
    <div className={`pb-2 ${className}`} style={styles}>
      <CustomText textClassName={`disable-text text-xs font-normal`}>
        {label}
      </CustomText>
      <CustomText
        textClassName={`text-sm ${highlight ? "primary-text" : "black-text"} font-bold`}
      >
        {value}
      </CustomText>
    </div>
  );
};

export default CustomLabelValue;
