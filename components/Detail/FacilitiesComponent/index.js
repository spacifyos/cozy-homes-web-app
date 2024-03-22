import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";


const FacilitiesComponent = ({ item }) => {
    const name = _.get(item, ["name"], "");
    const icon = _.get(item, ["icon"], "");

    return (
        <div className="flex flex-row gap-2 p-2 w-1/2">

                <CustomImage src={icon} width={15} />


            <CustomText textClassName="disable-text font-size-xsmall">{name}</CustomText>

        </div>
    );
};

export default FacilitiesComponent;