import Scaling from "@/src/utils/Scaling";

const CustomText = ({ children, styles, textClassName = "", lineClamp }) => {
  return (
    <p
      className={`${textClassName} ${Scaling.getLineClamp(lineClamp)} black-text font-size-normal`}
      style={{ ...styles }}
    >
      {children}
    </p>
  );
};

export default CustomText;
