import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import _ from "lodash";

const RadialProgressComponent = ({
  t,
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

  return (
    <div
      className="radial-progress primaryWhite-bg-color primary-text border-16 border-secondary-color"
      style={{
        "--value": percentage,
        "--size": `${dimensions > 200 ? dimensions * 0.6 : dimensions * 0.8}px`,
        "--thickness": "0.5rem",
      }}
      role="progressbar"
    >
      <div className="flex-col flex justify-end items-center">
        <CustomText textClassName="font-size-xxsmall disable-text line-clamp-1">
          {t("myStay.tenancyRemaining")}
        </CustomText>
        <CustomText textClassName="font-size-xxlarge primary-text font-bold">
          {tenancyRemaining}
        </CustomText>
        <CustomText textClassName="font-size-small">
          {t("myStay.days")}
        </CustomText>
      </div>
    </div>
  );
};

export default RadialProgressComponent;
