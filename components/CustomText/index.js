import Scaling from "@/src/utils/Scaling";
import { isEmpty } from "lodash";

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
      className={`text-black ${textClassName} ${isEmpty(lineClamp) || lineClamp == 0 ? "" : Scaling.getLineClamp(lineClamp)}`}
      style={{ ...styles }}
    >
      {children}
    </p>
  );
};

export default CustomText;
