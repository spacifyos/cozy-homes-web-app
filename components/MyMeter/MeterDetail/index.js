import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomLabelValue from "@/components/CustomLabelValue";

const MeterDetail= ({ t }) => {
    return (
        <div className="response">
            <div className="containerItem flex flex-col items-center" >
                <div className="primary-bg-color p-4 global-border-radius mb-1 mr-2">
                    <CustomImage src={Images.meterIcon} width={22} height={20}/>
                </div>
                <CustomText textClassName="primary-text font-bold">
                    M Vertica
                </CustomText>

                <CustomText textClassName="font-bold ">
                    A-01-01, Room 1 Smart Meter
                </CustomText>

            </div>

            <div className="flex flex-col items-start">

                <CustomLabelValue
                    label={t("myMeter.serialNumber")}
                    value={"BeLive-SM123456789"}
                />
                    <CustomText textClassName="font-size-xxsmall disable-text">
                        {t("myMeter.meterStatus")}
                    </CustomText>

                <div className="flex items-center pb-2">
                    <div className="flex items-center pr-4 gap-1">
                        <CustomImage src={Images.onIcon} height={18} width={18}/>
                        <CustomText textClassName="power-on-text">Wifi</CustomText>
                    </div>
                    <div className="flex items-center gap-1">
                        <CustomImage src={Images.offIcon} height={18} width={18}/>
                        <CustomText textClassName="disable-text">Power</CustomText>
                    </div>
                </div>

                <div className="flex items-center pb-2 gap-5">
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