import Scaling from "@/src/utils/Scaling";

const CustomText = ({
  children,
  styles,
  textColor,
  size = "normal",
  fontWeight = "normal",
  textClassName,
  lineClamp,
}) => {
  return (
    <p
      className={`${textClassName} ${Scaling.getLineClamp(lineClamp)}`}
      style={{
        color: textColor,
        fontSize: Scaling.getFontSize(size),
        fontWeight: Scaling.getFontWeight(fontWeight),
        ...styles,
      }}
    >
      {children}
    </p>
  );
};

export default CustomText;
