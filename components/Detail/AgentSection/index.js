import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";

const AgentSection = ({ t }) => {
    return (
        <div className="">
            <div className="flex-row flex primaryWhite-bg-color global-box-shadow global-border-radius p-3">
                <CustomImage
                    src={Images.agent}
                    width={60}
                    className="global-border-radius"
                />
            </div>
        </div>
    );
};

export default AgentSection;