import Images from "@/src/utils/Image";
import _ from "lodash";
import MeterFeatureComponent from "@/components/MyMeter/MeterFeatureComponent";

const MeterFeature = ({ t }) => {
    const featureLists = [
        { name: t("myMeter.topUp"), icon: Images.qrIcon },
        // { name: "Smart Lock", icon: Images.lockIcon },
        { name: t("myMeter.clearBalance"), icon: Images.agreementIcon },
        { name: t("myMeter.usage"), icon: Images.helpIcon },
        { name: t("myMeter.disconnect"), icon: Images.helpIcon },
    ];

    return (
        <div className="grid grid-cols-4 gap-6 flex justify-center pb-7 pt-8">
            {_.map(featureLists, (item) => {
                return <MeterFeatureComponent item={item} />;
            })}
        </div>
    );
};

export default MeterFeature;