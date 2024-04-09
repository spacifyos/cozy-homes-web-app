import Scaling from "@/src/utils/Scaling";

const CustomText = ({ children, styles, textClassName = "", lineClamp }) => {
  return (
    <p
      className={`black-text font-size-normal ${textClassName} ${Scaling.getLineClamp(lineClamp)}`}
      style={{ ...styles }}
    >
      {children}
    </p>
  );
};

export default CustomText;
