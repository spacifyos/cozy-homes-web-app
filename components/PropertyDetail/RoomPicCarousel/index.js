import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import _ from "lodash";
import Image from "next/image";

const RoomPicCarousel = () => {
  const imageUrls = [Images.listingDefaultImage, Images.room, Images.roomView];
  const imageList = _.map(imageUrls, (url, index) => (
    <img src={url} className="w-full carousel-img" key={index} />
  ));

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
            min: 1024,
          },
          items: 1,
          partialVisibilityGutter: 40,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
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
      {imageList}
    </Carousel>
  );
};

export default RoomPicCarousel;
