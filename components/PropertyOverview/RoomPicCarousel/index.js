import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { isEmpty, get, map } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import Image from "next/image";

const RoomPicCarousel = ({ imageUrl, onClickPopupImage }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = get(value, ["activeIndex"], 0);
    setSelectedSlide(activeIndex);
  };

  return (
    <div className="xl:hidden lg:hidden md:hidden sm:block block">
      <Swiper
        onSlideChange={onSlideChange}
        className="mySwiper"
        style={{ margin: 0, width: "100%", cursor: "pointer" }}
      >
        {isEmpty(imageUrl) ? (
          <SwiperSlide
            style={{
              borderRadius: 15,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CustomImage
              src={Images.imageNotFound}
              imageStyle={{ height: 300, width: 300 }}
            />
          </SwiperSlide>
        ) : (
          map(imageUrl, (item, index) => {
            return (
              <SwiperSlide
                style={{ borderRadius: 15, overflow: "hidden" }}
                key={index}
              >
                <div
                  className="relative rounded-2xl global-box-shadow w-full overflow-hidden"
                  style={{ height: 300 }}
                  onClick={() => onClickPopupImage(index)}
                >
                  <Image
                    loader={() => item}
                    alt={item}
                    src={item}
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                    fill
                  />
                </div>
              </SwiperSlide>
            );
          })
        )}
      </Swiper>

      {!isEmpty(imageUrl) ? (
        <div className="my-4 flex justify-center items-center">
          {map(imageUrl, (item, index) => {
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
      ) : (
        false
      )}
    </div>
  );
};

export default RoomPicCarousel;
