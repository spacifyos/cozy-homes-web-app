import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";

const MeterUsageComponent = ({ t, onClickToMeterOverview }) => {
  return (
    <div
      className="meter-usage-component cursor-pointer"
      onClick={
        onClickToMeterOverview ? () => onClickToMeterOverview(1) : () => {}
      }
    >
      <div className="flex items-center">
        <div className="meter-usage-inside-container">
          <CustomImage src={Images.meterIcon} width={35} height={35} />
          <div className="flex flex-col px-2">
            <CustomText textClassName="font-size-xxsmall white-text">
              {t("myMeterOverview.availableUnit")}
            </CustomText>
            <div className="flex flex-row justify-center items-end">
              <CustomText textClassName="font-size-large white-text">
                99999
              </CustomText>
              <CustomText textClassName="font-size-xxsmall white-text pl-1">
                {t("myMeterOverview.unit")}
              </CustomText>
            </div>
          </div>
        </div>

        <div className="flex flex-col pl-3">
          <CustomText textClassName="disable-text font-size-xsmall italic">
            15 Dec 2022
          </CustomText>

          <div className="flex items-center pt-1 gap-5">
            <CustomLabelValue
              label={t("myMeterOverview.totalUsage(Unit)")}
              value={"0.55"}
            />
            <CustomLabelValue
              label={t("myMeterOverview.totalUnit")}
              value={"5.00"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterUsageComponent;
