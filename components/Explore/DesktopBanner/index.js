import { Swiper, SwiperSlide } from "@/src/lib/swiper/swiper-react";
import { EffectCards } from "@/src/lib/swiper/modules/index.mjs";
import { get, isEmpty, map } from "lodash";
import CustomImage from "@/components/CustomImage";
import Image from "next/image";
import Images from "@/src/utils/Image";
import * as listingSelector from "@/src/selectors/listing";
import { Navigation, Pagination } from "swiper/modules";

const DesktopBanner = ({ imageData }) => {
  return (
    <div className="xl:py-10 lg:py-8 md:py-6 sm:py-6 py-4 container mx-auto ">
      <Swiper
        className="mySwiper"
        style={{ width: "100%" }}
        loop={true}
        breakpoints={{
          1280: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          520: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          420: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
          375: {
            slidesPerView: 1,
            spaceBetween: 15,
          },
        }}
        // navigation={true}
        modules={[Pagination, Navigation]}
      >
        {map(imageData, (image, index) => {
          const banner = listingSelector.getMobileImageUrl(image);

          return (
            <SwiperSlide style={{ minWidth: 100 }} className="" key={index}>
              <div
                key={index}
                className="relative w-full rounded-3xl overflow-hidden"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  loader={({ src, width, quality }) =>
                    `${src}?w=${width}&q=${quality || 75}`
                  }
                  src={isEmpty(banner) ? Images.imageNotFound : banner}
                  alt="Banner"
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default DesktopBanner;
