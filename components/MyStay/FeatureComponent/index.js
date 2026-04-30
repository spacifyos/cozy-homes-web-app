import _, { isString } from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { useEffect, useRef, useState } from "react";

const FeatureComponent = ({ name, icon, disable = false, route = "#" }) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  const isSvgIcon = !isString(icon) && icon != null;
  const IconComponent = isSvgIcon ? icon : null;

  return (
    <a href={route} className="feature-container" ref={targetRef}>
      <div
        className={`feature-icon-container bg-white w-16 h-16 min-h-16 mb-2`}
      >
        {isSvgIcon ? (
          <IconComponent size={24} className={disable ? "text-disable" : "text-primary"} />
        ) : (
          <CustomImage src={icon} className="w-6" />
        )}
      </div>

      <CustomText
        textClassName={`text-xs font-bold h-full text-center ${disable ? "text-disable" : ""}`}
      >
        {disable ? "Coming Soon" : name}
      </CustomText>
    </a>
  );
};

export default FeatureComponent;
