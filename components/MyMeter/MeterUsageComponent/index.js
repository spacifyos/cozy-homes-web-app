import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";

const MeterUsageComponent = ({ t }) => {
    return (
        <div className="MeterUsageContainer">
            <div className="flex items-center">
                <div className="flex items-center primary-bg-color p-3 global-border-radius mb-1 mr-2">
                    <CustomImage src={Images.meterIcon} width={20} height={20}/>
                    <div className="flex flex-col pl-4">
                        <CustomText textClassName="meterSmallText">
                            {t("myMeter.availableUnit")}
                        </CustomText>
                        <div className="flex flex-row">
                            <CustomText textClassName="meterText">99999</CustomText>
                            <CustomText textClassName="meterSmallText pl-1 pt-2">unit</CustomText>
                        </div>
                    </div>
                </div>

                <div className="MeterInsidecontainer">

                    <CustomText textClassName="disable-text font-size-xsmall italic">15 Dec 2022</CustomText>

                    <div className="flex items-center pt-1 gap-5">
                        <CustomLabelValue
                            label={t("myMeter.totalUsage(Unit)")}
                            value={"0.55"}
                        />
                        <CustomLabelValue
                            label={t("myMeter.totalUnit")}
                            value={"5.00"}
                        />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default MeterUsageComponent;
