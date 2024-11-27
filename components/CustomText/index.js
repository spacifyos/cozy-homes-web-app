import Scaling from "@/src/utils/Scaling";

const CustomText = ({
  children,
  styles,
  textClassName = "",
  lineClamp = 1,
  onClick,
}) => {
  return (
    <p
      onClick={onClick}
      className={`black-text ${textClassName} ${Scaling.getLineClamp(lineClamp)}`}
      style={{ ...styles }}
    >
      {children}
    </p>
  );
};

export default CustomText;
