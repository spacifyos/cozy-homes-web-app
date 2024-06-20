import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { useEffect, useRef, useState } from "react";

const FeatureComponent = ({
  name,
  icon,
  onClickToNextPage,
  onClickToHelpCenter,
  disable = false,
}) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  return (
    <div
      className="feature-container"
      ref={targetRef}
      onClick={onClickToNextPage}
    >
      <div
        className={`feature-icon-container ${disable ? "" : "primaryWhite-bg-color"}`}
        style={{ width: dimensions, height: dimensions, minHeight: dimensions }}
        onClick={onClickToHelpCenter}
      >
        <CustomImage src={icon} imageStyle={{ width: 45, height: 45 }} />
      </div>

      <CustomText textClassName="font-size-xsmall font-bold h-full text-center">
        {disable ? "Coming Soon" : name}
      </CustomText>
    </div>
  );
};

export default FeatureComponent;
