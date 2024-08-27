import Images from "@/src/utils/Image";
import CustomImage from "@/components/CustomImage";
import { isEmpty, map, get } from "lodash";
import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { useState } from "react";

const BannerCarousel = ({ listingBannerData, listingBannerDataLoading }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = _.get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  return (
    <div className="my-3">
      {isEmpty(listingBannerData) ? (
        <div className="flex justify-center items-center relative">
          <CustomImage
            src={Images.logoImage}
            className="banner-default-image"
          />
        </div>
      ) : (
        <div>
          <Swiper
            onSlideChange={onSlideChange}
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards]}
            className="mySwiper explore-banner"
          >
            {map(listingBannerData, (item, index) => {
              const image = get(item, ["image_url"], "");

              return (
                <SwiperSlide key={index} style={{}}>
                  <CustomImage
                    src={image}
                    imageStyle={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="my-4 flex justify-center items-center">
            {map(listingBannerData, (item, index) => {
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
