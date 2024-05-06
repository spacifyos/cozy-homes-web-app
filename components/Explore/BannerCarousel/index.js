import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import _ from "lodash";
import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { useState } from "react";
import LoadingOverlay from "@/components/LoadingOverlay";

const BannerCarousel = ({ listingBannerData, listingBannerDataLoading }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = _.get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  return (
    <div className="my-3">
      {_.isEmpty(listingBannerData) ? (
        <div className="flex justify-center items-center relative">
          <CustomImage src={Images.banner1Image} width={300} />
        </div>
      ) : (
        <div>
          <Swiper
            onSlideChange={onSlideChange}
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper"
          >
            {_.map(listingBannerData, (item, index) => {
              const image = _.get(item, ["image_url"], "");

              return (
                <SwiperSlide key={index}>
                  <CustomImage src={image} width={320} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="my-4 flex justify-center items-center">
            {_.map(listingBannerData, (item, index) => {
              return (
                <div
                  key={index}
                  className={
                    index === selectedSlide ? "banner-dot-active" : "banner-dot"
                  }
                ></div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCarousel;
