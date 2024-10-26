import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { get, isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useState } from "react";

const DesktopFeaturedRoomSection = ({ onClickViewMore, data, loading }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = get(value, ["activeIndex"], 0);
    setSelectedSlide(activeIndex);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.outlineStartIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <div className="flex gap-2 pl-2">
            <CustomText textClassName="font-size-xxlarge font-bold primary-text">
              Featured Rooms
            </CustomText>
            <CustomText textClassName="font-size-xxlarge font-bold">
              Just For You
            </CustomText>
          </div>
        </div>

        <CustomButton
          buttonText="View More"
          buttonClassName="primary-btn btn-sm"
          onClick={onClickViewMore}
        />
      </div>
      <div
        className="gap-1 flex items-center justify-center"
        style={{ height: 255 }}
      >
        {loading ? (
          <div className="flex-1 flex">
            {map(Array(5), (item, index) => (
              <Skeleton width="100%" height={200} key={index} />
            ))}
          </div>
        ) : isEmpty(data) ? (
          <div className="flex justify-center">
            <CustomEmptyBox emptyTitle="Property not available now." />
          </div>
        ) : (
          <Swiper
            style={{ width: "100%" }}
            onSlideChange={onSlideChange}
            slidesPerView={6}
            spaceBetween={10}
            loop={false}
            pagination={{
              clickable: false,
              enabled: false,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
            }}
            // navigation={true}
            modules={[Pagination, Navigation]}
          >
            {map(data, (item, index) => {
              return (
                <SwiperSlide style={{ minWidth: 100 }} key={index}>
                  <ListingCardComponent
                    item={item}
                    imageHeight={200}
                    imageWidth="100%"
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default DesktopFeaturedRoomSection;
