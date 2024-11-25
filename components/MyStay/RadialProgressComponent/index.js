import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";

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
      className="radial-progress primaryWhite-bg-color primary-text border-16 border-secondary-color global-box-shadow"
      style={{
        "--value": percentage,
        "--size": `${dimensions > 250 ? dimensions * 0.25 :dimensions > 290 ? dimensions * 0.4 : dimensions > 200 ? dimensions * 0.6 : dimensions * 0.8}px`,
        "--thickness": "0.5rem",
      }}
      role="progressbar"
    >
      <div className="flex-col flex justify-end items-center pt-1 px-2">
        <CustomText textClassName="font-size-xxsmall disable-text line-clamp-2 text-center">
          {t("myStay.tenancyRemaining")}
        </CustomText>
        <CustomText textClassName="font-size-xlarge primary-text font-bold">
          {tenancyRemaining === 0 ? "0" : tenancyRemaining}
        </CustomText>
        <CustomText textClassName="text-xs">
          {t("myStay.days")}
        </CustomText>
      </div>
    </div>
  );
};

export default RadialProgressComponent;
