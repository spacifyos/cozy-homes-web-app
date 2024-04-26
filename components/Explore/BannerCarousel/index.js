import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";
import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { useState } from "react";

const imageList = [
  Images.banner1Image,
  Images.banner2Image,
  Images.banner3Image,
  Images.banner1Image,
  Images.banner2Image,
  Images.banner3Image,
  Images.banner1Image,
  Images.banner2Image,
  Images.banner3Image,
];

const BannerCarousel = () => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = _.get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  return (
    <div className="my-3">
      <Swiper
        onSlideChange={onSlideChange}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {_.map(imageList, (item) => {
          return (
            <SwiperSlide>
              <CustomImage src={item} width={320} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="my-2 flex justify-center">
        {_.map(imageList, (item, index) => {
          return (
            <div
              className={
                index === selectedSlide ? "banner-dot-active" : "banner-dot"
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerCarousel;
