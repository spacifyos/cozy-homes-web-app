import _ from "lodash";
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

  return (
    <a href={route} className="feature-container" ref={targetRef}>
      <div
        className={`feature-icon-container ${disable ? "" : "primaryWhite-bg-color"}`}
        style={{ width: dimensions, height: dimensions, minHeight: dimensions }}
      >
        <CustomImage src={icon} imageStyle={{ width: 45, height: 45 }} />
      </div>

      <CustomText textClassName={`text-xs font-bold h-full text-center ${disable ? "disable-text" : ""}`}>
        {disable ? "Coming Soon" : name}
      </CustomText>
    </a>
  );
};

export default FeatureComponent;
