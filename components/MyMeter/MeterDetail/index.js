import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";


const MeterDetail= ({ t }) => {
    return (
    <div className="meter-response">
        <div className="flex flex-1 flex-col items-center">
            <div className="primary-bg-color p-3 global-border-radius">
                <CustomImage src={Images.meterIcon} width={40} height={40}/>
            </div>
                <CustomText textClassName="primary-text font-bold">
                    M Vertica
                </CustomText>

                <CustomText textClassName="line-clamp-2 text-center">
                    A-01-01, Room 1 Smart Meter
                </CustomText>
            </div>

            <div className="divider divider-horizontal px-4"></div>
            <div className="flex flex-col items-start flex-1">

                <CustomLabelValue
                    label={t("myMeter.serialNumber")}
                    value={"BeLive-SM123456789"}
                />
                <CustomText textClassName="font-size-xxsmall disable-text">
                    {t("myMeter.meterStatus")}
                </CustomText>

                <div className="flex items-center pt-1">
                    <div className="flex items-center pr-4 gap-1">
                        <CustomImage src={Images.onIcon} height={15} width={15}/>
                        <CustomText textClassName="power-on-text font-size-xxsmall">Wifi</CustomText>
                    </div>
                    <div className="flex items-center gap-1">
                        <CustomImage src={Images.offIcon} height={15} width={15}/>
                        <CustomText textClassName="disable-text font-size-xxsmall">Power</CustomText>
                    </div>
                </div>

                <div className="flex items-center gap-5 pt-2">
                    <CustomLabelValue
                        label={t("myMeter.usedUnit")}
                        value={"28.9"}
                    />
                    <CustomLabelValue
                        label={t("myMeter.unitPrice")}
                        value={"RM0.80"}
                    />
                </div>
            </div>

        </div>
    );
};

export default MeterDetail;