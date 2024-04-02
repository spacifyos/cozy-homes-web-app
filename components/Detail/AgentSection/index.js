import CustomText from "@/components/CustomText";
import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";

const AgentSection = ({t}) => {
    return (
        <div className="sticky bottom-5 w-full pt-5" style={{maxWidth: 470}}>
            <div
                className=" primaryWhite-bg-color rounded-2xl global-box-shadow relative "
                style={{overflow: "hidden"}}
            >
                <div className=" flex-row flex p-2 pl-3 justify-between items-center">
                    <div className="relative ">
                        <CustomImage
                            src={Images.agentIcon}
                            width={43}
                            className="rounded-2xl"
                        />
                        <div
                            className="flex flex-col bottom-0 absolute primaryWhite-bg-color rounded-2xl"
                            style={{right: -3}}
                        >
                            <CustomImage src={Images.paidIcon} width={14}/>
                        </div>
                    </div>

                    <div className="flex flex-col items-start pl-2 flex-1">
                        <CustomText textClassName="font-size-xsmall font-bold line-clamp-1">
                            Razak bin Osman
                        </CustomText>
                        <CustomText textClassName="disable-text font-size-xxsmall">
                            {t("propertyDetail.memberSince")} 2023-08-08
                        </CustomText>
                        <CustomText textClassName="font-size-xxsmall power-on-text">
                            15 Active Listing
                        </CustomText>
                    </div>

                    <div className="flex gap-2 items-center flex-2 pr-1">
                        <div className="p-2 global-box-shadow global-border-radius " style={{ width: 35, height: 35}}>
                            <CustomImage
                                src={Images.scheduleIcon}
                                width={28}

                            />
                        </div>
                        <div className="p-2 global-box-shadow global-border-radius"  style={{ width: 35, height: 35}}>
                            <CustomImage
                                src={Images.callIcon}
                                width={28}

                            />
                        </div>
                        <div  className="global-box-shadow global-border-radius"  style={{ width: 35, height: 35}}>
                            <CustomImage
                                src={Images.whatsappIcon}
                                width={45}

                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 justify-center items-center ">
                    <div className="flex secondary-bg-color h-full pb-2 px-4 pt-3 justify-between items-center">
                        <div className="flex flex-col leading-4">
                            <CustomText textClassName="font-size-xsmall">
                                Total move in cost
                            </CustomText>
                            <CustomText textClassName="font-size-small primary-text font-bold">
                                RM1,020
                            </CustomText>
                        </div>

                        <CustomImage
                            src={Images.inforIconActive}
                            width={15}
                        />

                    </div>
                    <div className="primary-bg-color gap-4 h-full p-2 px-4 flex flex-row justify-between items-center">
                        <CustomText textClassName="font-size-large font-bold white-text">
                            Book Now
                        </CustomText>
                        <CustomImage
                            src={Images.righWhiteIcon}
                            width={6}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentSection;
