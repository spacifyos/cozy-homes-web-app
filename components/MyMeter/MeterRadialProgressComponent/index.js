import CustomText from "@/components/CustomText";

const MeterRadialProgressComponent = ({ t }) => {
    return (
        <div
            className="radial-progress primaryWhite-bg-color primary-text border-16 border-secondary-color"
            style={{"--value": 70, "--size": "8rem", "--thickness": "0.5rem"}}
            role="progressbar"
        >
            <div className="flex-col flex justify-column items-center">

                <div className="flex-row flex gap-1">
                    <CustomText textClassName="font-size-xxlarge primary-text font-bold">
                        0.55
                    </CustomText>

                    <CustomText textClassName="font-size-xxsmall disable-text line-clamp-1 unit">
                        {t("myMeter.unit")}
                    </CustomText>
                </div>


                <CustomText textClassName="font-size-xxsmall font-bold">10 Feb 2024</CustomText>
            </div>
        </div>
    );
};

export default MeterRadialProgressComponent;