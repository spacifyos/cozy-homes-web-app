import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import { useEffect, useRef, useState } from "react";

const MeterFeatureComponent = ({ item }) => {
  const name = _.get(item, ["name"], "");
  const icon = _.get(item, ["icon"], "");
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState(0);

  useEffect(() => {
    if (targetRef.current) {
      setDimensions(targetRef.current.offsetWidth);
    }
  }, [targetRef]);

  return (
    <div
      className="flex flex-col justify-center itemFs-center text-center"
      ref={targetRef}
    >
      <div
        className="meter-feature-component"
        style={{ width: dimensions, height: dimensions, minHeight: dimensions }}
      >
        <CustomImage src={icon} imageStyle={{ width: 45, height: 45 }} />
      </div>

      <CustomText textClassName="font-size-xsmall font-bold h-full">
        {name}
      </CustomText>
    </div>
  );
};

export default MeterFeatureComponent;
