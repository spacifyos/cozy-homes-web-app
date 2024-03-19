import CustomText from "@/components/CustomText";

const RadialProgressComponent = ({ t }) => {
  return (
      <div
          className="radial-progress primaryWhite-bg-color text-primary-content border-16 border-secondary-color"
          style={{ "--value": 70, "--size": "8rem", "--thickness": "0.5rem" }}
          role="progressbar"
      >
        <div className="flex-col flex justify-end items-center">
          <CustomText textClassName="font-size-xxsmall disable-text line-clamp-1">
            {t("myStay.tenancyRemaining")}
          </CustomText>
          <CustomText textClassName="font-size-xxlarge primary-text font-bold">
            9999
          </CustomText>
          <CustomText textClassName="font-size-small">days</CustomText>
        </div>
      </div>
  );
};

export default RadialProgressComponent;
