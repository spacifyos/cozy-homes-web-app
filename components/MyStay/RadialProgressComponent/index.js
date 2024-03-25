import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";

const RadialProgressComponent = ({ t }) => {
  const [remainingDay, setRemainingDay] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNumber = remainingDay + 1;
      const newPercentage = (newNumber / 365) * 100;

      if (newPercentage <= 70) {
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
        "--size": "8rem",
        "--thickness": "0.5rem",
      }}
      role="progressbar"
    >
      <div className="flex-col flex justify-end items-center">
        <CustomText textClassName="font-size-xxsmall disable-text line-clamp-1">
          {t("myStay.tenancyRemaining")}
        </CustomText>
        <CustomText textClassName="font-size-xxlarge primary-text font-bold">
          {remainingDay}
        </CustomText>
        <CustomText textClassName="font-size-small">days</CustomText>
      </div>
    </div>
  );
};

export default RadialProgressComponent;
