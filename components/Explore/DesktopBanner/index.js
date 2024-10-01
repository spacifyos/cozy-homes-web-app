import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";

const DesktopBanner = ({ onSlideChange }) => {
  return (
    <div>
      <Swiper
        onSlideChange={onSlideChange}
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {map([1], (item, index) => {
          const image = get(
            item,
            ["image_url"],
            "/images/photo-kuala-lumpur-skyline-view-city-skyscrapers-with-beautiful-sky-afternoon 1.png",
          );

          return (
            <SwiperSlide key={index} style={{}}>
              <CustomImage
                src={image}
                imageStyle={{
                  width: "100%",
                  height: 400,
                  objectFit: "cover",
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DesktopBanner;
