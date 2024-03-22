import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomLabelValue from "@/components/CustomLabelValue";

const MeterUsageComponent = ({ t }) => {
    return (
        <div className="MeterUsageContainer">
            <div className="flex items-center">
                <div className="flex items-center primary-bg-color p-3 global-border-radius mb-1 mr-2">
                    <CustomImage src={Images.meterIcon} width={45} height={45}/>
                    <div className="flex flex-col pl-2">
                        <CustomText textClassName="meterSmallText">
                            {t("myMeter.availableUnit")}
                        </CustomText>
                        <div className="flex flex-row justify-center items-end">
                            <CustomText textClassName="meterText">99999</CustomText>
                            <CustomText textClassName="meterSmallText pl-1">unit</CustomText>
                        </div>
                    </div>
                </div>

                <div className="MeterInsidecontainer">

                    <CustomText textClassName="disable-text font-size-xxsmall italic">15 Dec 2022</CustomText>

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
