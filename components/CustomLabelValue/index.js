import CustomText from "@/components/CustomText";

const CustomLabelValue = ({
  label,
  changelabel = false,
  value,
  className = "pb-2",
  hideSecondValue = false,
  highlight = false,
  secondValue,
}) => {
  return (
    <div className={`${className}`}>
      <CustomText
        textClassName={`font-size-xxsmall ${changelabel ? "black-text" : "disable-text"}`}
      >
        {label}
      </CustomText>
      <CustomText
        textClassName={`font-size-small font-bold ${highlight ? "primary-text" : "black-text"}`}
      >
        {value}
      </CustomText>
      {hideSecondValue ? (
        false
      ) : (
        <CustomText textClassName="font-size-xxsmall primary-text">
          {secondValue}
        </CustomText>
      )}
    </div>
  );
};

export default CustomLabelValue;
