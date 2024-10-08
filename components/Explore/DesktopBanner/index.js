import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import Image from "next/image";

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
          const image = get(item, ["image_url"], "/images/desktop_banner.png");

          return (
            <SwiperSlide key={index} style={{}}>
              <Image
                loader={() => image}
                loading="lazy"
                alt={"image"}
                src={image}
                width={0}
                height={0}
                style={{ width: "100%", height: 500, objectFit: "cover" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DesktopBanner;
