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
  return (
    <div className="container mx-auto xl:py-10 lg:py-8 md:py-6 sm:py-6 py-4">
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

        <div className="flex items-center">
          <CustomText
            textClassName="cursor-pointer pr-1.5"
            onClick={onClickViewMore}
          >
            View More
          </CustomText>

          <CustomImage src={Images.rightIcon} className="w-1.5" />
        </div>
      </div>
      <div className="gap-1 flex items-center justify-center">
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
            className="mySwiper"
            style={{ width: "100%" }}
            loop={true}
            breakpoints={{
              1280: {
                slidesPerView: 7,
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              420: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              375: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
            }}
            // navigation={true}
            modules={[Pagination, Navigation]}
          >
            {map(data, (item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ListingCardComponent
                    item={item}
                    imageClassName="h-24 xl:h-40 lg:h-32 md:h-32 sm:h-32 w-full"
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
