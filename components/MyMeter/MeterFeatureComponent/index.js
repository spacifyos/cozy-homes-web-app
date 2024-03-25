import _ from "lodash";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";

const MeterFeatureComponent = ({ item }) => {
    const name = _.get(item, ["name"], "");
    const icon = _.get(item, ["icon"], "");

    return (
        <div className="flex flex-col justify-center items-center text-center">
            <div className="meter-feature-component">
                <CustomImage src={icon} height={50} width={50} />

            </div>

            <CustomText textClassName="font-size-xsmall font-bold h-full">{name}</CustomText>

        </div>
    );
};

export default MeterFeatureComponent;
