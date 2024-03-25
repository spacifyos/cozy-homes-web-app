import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";

const RoomPicCarousel = () => {
    return (
        <div className="pb-5">
            <div className="carousel w-full RoompicContainer">
                <div id="item1" className="carousel-item w-full relative">
                    <CustomImage
                        className="btn-sm absolute right-0"
                        src={Images.bookMarks}
                    />
                    <img src={Images.listingDefaultImage}
                         className="w-full"/>

                </div>
                <div id="item2" className="carousel-item w-full relative">
                    <CustomImage
                        className="btn-sm absolute right-0"
                        src={Images.bookMarks}
                    />
                    <img src={Images.listingDefaultImage}
                         className="w-full"/>
                </div>
                <div id="item3" className="carousel-item w-full relative">
                    <CustomImage
                        className="btn-sm absolute right-0"
                        src={Images.bookMarks}
                    />
                    <img src={Images.listingDefaultImage}
                         className="w-full"/>
                </div>
                <div id="item4" className="carousel-item w-full relative">
                    <CustomImage
                        className="btn-sm absolute right-0"
                        src={Images.bookMarks}
                    />
                    <img src={Images.listingDefaultImage}
                         className="w-full"/>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="dot-btn" tabIndex="1"></a>
                <a href="#item2" className="dot-btn" tabIndex="2"></a>
                <a href="#item3" className="dot-btn" tabIndex="3"></a>
                <a href="#item4" className="dot-btn" tabIndex="4"></a>
            </div>
        </div>


    )

};

export default RoomPicCarousel;
