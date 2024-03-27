import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import {useState, useEffect} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const RoomPicCarousel = ( ) => {
    const [currentImageIndexes, setCurrentImageIndexes] = useState([0, 0, 0, 0]);

    const generateHandleImageClick = (index) => {
        return () => {
            setCurrentImageIndexes(prevIndexes => {
                const newIndexes = [...prevIndexes];
                newIndexes[index] = newIndexes[index] === 0 ? 1 : 0;
                return newIndexes;
            });
        };
    };

    return (
        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode={false}
            className=""
            containerClass=""
            dotListClass=""
            draggable
            focusOnSelect
            infinite
            itemClass="pb-7"
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 3,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                }
            }}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >
            {[...Array(5)].map((_, index) => {
                const handleImageClick = generateHandleImageClick(index);
                return (
                    <div key={index}>
                        <img
                            src={currentImageIndexes[index] === 0 ? Images.bookMarks : Images.bookMarks_s}
                            onClick={handleImageClick}
                            className="btn-sm absolute top-4 right-1"
                        />
                        <img src={Images.listingDefaultImage} className="w-full carousel-img"/>
                    </div>
                );
            })}
        </Carousel>
    );
};

export default RoomPicCarousel;
