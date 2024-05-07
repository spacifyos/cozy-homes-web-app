import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import Carousel from "react-multi-carousel";
import _ from "lodash";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

const RoomPicCarousel = () => {
  const imageUrls = [Images.listingDefaultImage, Images.room, Images.roomView];
  const imageList = [];

  return (
    <Swiper className="mySwiper" style={{ margin: 0, width: "100%" }}>
      {_.isEmpty(imageList) ? (
        <SwiperSlide>
          <CustomImage
            src={Images.listingDefaultImage}
            className="carousel-img"
          />
        </SwiperSlide>
      ) : (
        _.map(imageList, (item) => {
          const imageUrl = "";

          return (
            <SwiperSlide>
              <CustomImage src={imageUrl} className="carousel-img" />
            </SwiperSlide>
          );
        })
      )}
    </Swiper>
  );
};

export default RoomPicCarousel;
