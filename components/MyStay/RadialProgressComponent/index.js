import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

const RadialProgressComponent = ({
  dimensions,
  tenancyRemaining,
  totalDays,
}) => {
  const [remainingDay, setRemainingDay] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = remainingDay + 1;
      const newPercentage = (newNumber / totalDays) * 100;

      if (newNumber <= tenancyRemaining) {
        setRemainingDay(newNumber);
        setPercentage(newPercentage);
      } else {
        clearInterval(interval);
      }
    }, 3);

    return () => clearInterval(interval);
  }, [remainingDay]);

  const calculateChartSize = (dimensions) => {
    if (dimensions > 290) {
      return dimensions * 0.4;
    } else if (
      dimensions > 260 ||
      dimensions > 240 ||
      dimensions > 230 ||
      dimensions > 200
    ) {
      return dimensions * 0.6;
    } else {
      return dimensions * 0.55;
    }
  };

  return (
    <div
      className="radial-progress primaryWhite-bg-color primary-text border-16 border-secondary-color global-box-shadow"
      style={{
        "--value": percentage,
        "--size": `${calculateChartSize(dimensions)}px`,
        "--thickness": "0.5rem",
      }}
      role="progressbar"
    >
      <div className="flex-col flex justify-end items-center pt-1 px-2">
        <CustomText textClassName="text-xs disable-text line-clamp-2 text-center">
          Tenancy Remaining
        </CustomText>
        <CustomText textClassName="text-sm primary-text font-bold">
          {tenancyRemaining === 0 ? "0" : tenancyRemaining}
        </CustomText>
        <CustomText textClassName="text-xs">Days</CustomText>
      </div>
    </div>
  );
};

export default RadialProgressComponent;
