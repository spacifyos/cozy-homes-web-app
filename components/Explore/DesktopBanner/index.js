import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { get, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import Image from "next/image";

const DesktopBanner = ({ onSlideChange }) => {
  return (
    <div>
      {/*<Swiper*/}
      {/*  onSlideChange={onSlideChange}*/}
      {/*  effect={"cards"}*/}
      {/*  grabCursor={true}*/}
      {/*  modules={[EffectCards]}*/}
      {/*  className="mySwiper"*/}
      {/*>*/}
      {/*  {map([1], (item, index) => {*/}
      {/*    const image = get(item, ["image_url"], "/images/desktop_banner.png");*/}

      {/*    return (*/}
      {/*      <SwiperSlide key={index} style={{}}>*/}
      <Image
        loader={() => "/images/desktop_banner.png"}
        loading="lazy"
        alt={"image"}
        src={"/images/desktop_banner.png"}
        width={0}
        height={0}
        className="xl:object-cover lg:object-cover md:object-contain sm:object-contain object-contain xl:h-125 lg:125 md:h-full sm:full h-full"
        style={{ width: "100%" }}
      />
      {/*      </SwiperSlide>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</Swiper>*/}
    </div>
  );
};

export default DesktopBanner;
