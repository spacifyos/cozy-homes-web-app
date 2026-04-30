import _, { isString } from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { useEffect, useRef, useState } from "react";

const MeterFeatureComponent = ({ name, icon, onClick }) => {
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
    <div
      className="flex flex-col justify-center items-center text-center cursor-pointer"
      onClick={onClick}
      ref={targetRef}
    >
      <div
        className="meter-feature-component"
        style={{ width: dimensions, height: dimensions, minHeight: dimensions }}
      >
        {isSvgIcon ? (
          <IconComponent size={45} className="text-primary" />
        ) : (
          <CustomImage src={icon} imageStyle={{ width: 45, height: 45 }} />
        )}
      </div>

      <CustomText textClassName="text-xs font-bold h-full">
        {name}
      </CustomText>
    </div>
  );
};

export default MeterFeatureComponent;
