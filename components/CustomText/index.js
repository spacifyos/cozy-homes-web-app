import Scaling from "@/src/utils/Scaling";

const CustomText = ({
  children,
  styles,
  textClassName = "",
  lineClamp,
  onClick,
}) => {
  return (
    <p
      onClick={onClick}
      className={`black-text font-size-normal ${textClassName} ${Scaling.getLineClamp(lineClamp)}`}
      style={{ ...styles }}
    >
      {children}
    </p>
  );
};

export default CustomText;
