import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

const RoomPicCarousel = () => {
    return (
        <div className="">
            <div className="carousel pb-5">

                <div id="Recommenditem1" className="carousel-item relative">

                    <div className="p-1">

                        <div className="flex flex-col pl-2 pt-3 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.femaleUnitIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <div className="flex flex-col pl-2 pt-12 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.windowIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <img src={Images.filterDefaultImage}
                             className="w-40 rounded-2xl global-box-shadow"/>
                        <div className="pt-2">
                            <CustomText textClassName="font-size-normal font-bold leading-5 line-clamp-1">
                                M Vertica
                            </CustomText>
                            <CustomText textClassName="font-size-xsmall primary-text leading-4 line-clamp-1">
                                A-01-01, Room 2
                            </CustomText>
                            <div className="flex items-center">
                                <CustomText textClassName="font-size-large font-bold mr-2">
                                    RM 750
                                </CustomText>
                                <CustomText textClassName="disable-text">/ month</CustomText>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="Recommenditem2" className="carousel-item relative">

                    <div className="p-1">
                        <div className="flex flex-col pl-2 pt-3 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.femaleUnitIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <div className="flex flex-col pl-2 pt-12 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.windowIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <img src={Images.filterDefaultImage}
                             className="w-40 rounded-2xl global-box-shadow"/>
                        <div className="pt-2">
                            <CustomText textClassName="font-size-normal font-bold leading-5 line-clamp-1">
                                M Vertica
                            </CustomText>
                            <CustomText textClassName="font-size-xsmall primary-text leading-4 line-clamp-1">
                                A-01-01, Room 2
                            </CustomText>
                            <div className="flex items-center">
                                <CustomText textClassName="font-size-large font-bold mr-2">
                                    RM 750
                                </CustomText>
                                <CustomText textClassName="disable-text">/ month</CustomText>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="Recommenditem3" className="carousel-item relative">

                    <div className="p-1">
                        <div className="flex flex-col pl-2 pt-3 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.femaleUnitIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <div className="flex flex-col pl-2 pt-12 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.windowIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <img src={Images.filterDefaultImage}
                             className="w-40 rounded-2xl global-box-shadow"/>
                        <div className="pt-2">
                            <CustomText textClassName="font-size-normal font-bold leading-5 line-clamp-1">
                                M Vertica
                            </CustomText>
                            <CustomText textClassName="font-size-xsmall primary-text leading-4 line-clamp-1">
                                A-01-01, Room 2
                            </CustomText>
                            <div className="flex items-center">
                                <CustomText textClassName="font-size-large font-bold mr-2">
                                    RM 750
                                </CustomText>
                                <CustomText textClassName="disable-text">/ month</CustomText>
                            </div>
                        </div>
                    </div>

                </div>

                <div id="Recommenditem4" className="carousel-item relative">

                    <div className="p-1">
                        <div className="flex flex-col pl-2 pt-3 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.femaleUnitIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <div className="flex flex-col pl-2 pt-12 absolute">
                            <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">
                                <CustomImage src={Images.windowIcon} width={20} height={20}/>
                            </div>
                        </div>

                        <img src={Images.filterDefaultImage}
                             className="w-40 rounded-2xl global-box-shadow"/>
                        <div className="pt-2">
                            <CustomText textClassName="font-size-normal font-bold leading-5 line-clamp-1">
                                M Vertica
                            </CustomText>
                            <CustomText textClassName="font-size-xsmall primary-text leading-4 line-clamp-1">
                                A-01-01, Room 2
                            </CustomText>
                            <div className="flex items-center">
                                <CustomText textClassName="font-size-large font-bold mr-2">
                                    RM 750
                                </CustomText>
                                <CustomText textClassName="disable-text">/ month</CustomText>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#Recommenditem1" className="dot-btn " tabIndex="1"></a>
                <a href="#Recommenditem2" className="dot-btn " tabIndex="2"></a>
                <a href="#Recommenditem3" className="dot-btn " tabIndex="3"></a>
                <a href="#Recommenditem4" className="dot-btn " tabIndex="4"></a>
            </div>
        </div>


    )

};

export default RoomPicCarousel;
