import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import _ from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";

const RoomPicCarousel = ({ imageUrl, onClickPopupImage }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = _.get(value, ["activeIndex"], 0);
    setSelectedSlide(activeIndex);
  };

  return (
    <div>
      <Swiper
        onSlideChange={onSlideChange}
        className="mySwiper"
        style={{ margin: 0, width: "100%", cursor: "pointer" }}
      >
        {_.isEmpty(imageUrl) ? (
          <SwiperSlide style={{ borderRadius: 15, overflow: "hidden" }}>
            <CustomImage
              src={Images.imageNotFound}
              className="w-full"
              imageStyle={{ height: 300, objectFit: "cover" }}
            />
          </SwiperSlide>
        ) : (
          _.map(imageUrl, (item, index) => {
            return (
              <SwiperSlide
                style={{ borderRadius: 15, overflow: "hidden" }}
                key={index}
              >
                <CustomImage
                  src={item}
                  className="w-full"
                  imageStyle={{ height: 300, objectFit: "cover" }}
                  onClick={() => onClickPopupImage(item)}
                />
              </SwiperSlide>
            );
          })
        )}
      </Swiper>

      {_.isEmpty(imageUrl) ? (
        false
      ) : (
        <div className="my-4 flex justify-center items-center">
          {_.map(imageUrl, (item, index) => {
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
      )}
    </div>
  );
};

export default RoomPicCarousel;
