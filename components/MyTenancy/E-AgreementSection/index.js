import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
const Eagreement = ({t}) => {

    return (
        <div className="global-box-shadow global-border-radius primaryWhite-bg-color p-4">
            <CustomText textClassName="disable-text font-size-xxsmall">E-Agreement</CustomText>

            <div className="divider divider-step-section" style={{margin: 0}}></div>
            <div className="flex flex-col justify-center items-center">
                <CustomImage
                    src={Images.noDataIcon}
                    width={40}
                />
            </div>
        </div>
    );
};

export default Eagreement;