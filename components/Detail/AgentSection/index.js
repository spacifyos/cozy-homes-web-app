import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";

const AgentSection = ({ t }) => {
    return (
        <div className="sticky bottom-3 w-full" style={{maxWidth: 470}}>
            <div className=" primaryWhite-bg-color rounded-2xl global-box-shadow relative"
                 style={{overflow: "hidden"}}>
                <div className=" flex-row flex p-2 ">
                    <div className="relative">
                        <CustomImage
                            src={Images.agent}
                            width={60}
                            className="rounded-2xl"
                        />
                        <div className="flex flex-col bottom-0 absolute" style={{right:-10}}>
                            {/*<div className="p-1 global-border-radius mb-1">*/}
                            <CustomImage src={Images.paidIcon} width={20} height={20}/>
                            {/*</div>*/}
                        </div>
                    </div>


                    <div className="flex flex-col items-start pl-5 ">
                        <CustomText textClassName="font-size-small font-bold pt-2">
                            Razak bin Osman
                        </CustomText>
                        <CustomText textClassName="disable-text font-size-xxsmall">
                            Member since 2023-08-08
                        </CustomText>
                        <CustomText textClassName="font-size-small pt-1" styles={{color: "#41C0BE"}}>
                            15 Active Listing
                        </CustomText>
                    </div>

                    <div className="flex-row flex pl-8 gap-2 pt-2 items-center">
                        <CustomImage
                            src={Images.call}
                            width={40}
                            className="global-border-radius global-box-shadow p-1"
                        />
                        <CustomImage
                            src={Images.whatsapp}
                            width={40}
                        />
                    </div>

                </div>

                <div className="grid grid-flow-col flex flex-row primary-bg-color p-1 justify-center items-center">
                    <CustomText textClassName="font-size-xxlarge font-bold" styles={{color: "#ffffff"}}>
                        RM750
                    </CustomText>
                    <CustomText textClassName="font-size-large pl-1" styles={{color: "#ffffff"}}>
                        /month
                    </CustomText>

                </div>

            </div>
        </div>
    );
};

export default AgentSection;