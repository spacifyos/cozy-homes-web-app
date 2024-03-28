import Images from "@/src/utils/Image";
import _ from "lodash";
import MeterFeatureComponent from "@/components/MyMeter/MeterFeatureComponent";

const MeterFeature = ({ t }) => {
    const featureLists = [
        { name: t("myMeter.topUp"), icon: Images.topUpIcon },
        { name: t("myMeter.clearBalance"), icon: Images.clearIcon },
        { name: t("myMeter.usage"), icon: Images.usageIcon },
        { name: t("myMeter.disconnect"), icon: Images.disconnect },
    ];

    return (
        <div className="grid grid-cols-4 gap-5 justify-center pb-7">
            {_.map(featureLists, (item) => {
                return <MeterFeatureComponent item={item} />;
            })}
        </div>
    );
};

export default MeterFeature;
