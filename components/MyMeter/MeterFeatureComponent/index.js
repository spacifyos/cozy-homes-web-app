import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";

const MeterFeatureComponent = ({ item }) => {
    const name = _.get(item, ["name"], "");
    const icon = _.get(item, ["icon"], "");

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="global-box-shadow global-border-radius p-3 mb-2 flex justify-center items-center min-h-20 primaryWhite-bg-color">
                <CustomImage src={icon} height={60} width={10} className="w-4/5"  />
            </div>

            <CustomText textClassName="containerFeatureText">{name}</CustomText>

        </div>
    );
};

export default MeterFeatureComponent;
