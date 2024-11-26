import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";

const DesktopCheapestRoomSection = ({ onClickViewMore, data, loading }) => {
  return (
    <div className="container mx-auto xl:py-10 lg:py-8 md:py-6 sm:py-6 py-4">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.outlineStartIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <div className="flex gap-2 pl-2">
            <CustomText textClassName="xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm font-bold">
              <span className="primary-text">Cheapest Rooms</span> Just For You
            </CustomText>
          </div>
        </div>

        <div className="flex items-center">
          <CustomText
            textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"
            onClick={() => onClickViewMore()}
          >
            View More
          </CustomText>

          <CustomImage src={Images.rightIcon} className="w-1.5" />
        </div>
      </div>

      <div className="gap-1 flex items-center justify-center">
        {loading ? (
            <div className="flex flex-1">
              <div className="xl:flex flex-1 hidden">
                {map(Array(7), (item, index) => (
                    <Skeleton
                        width="100%"
                        className="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28"
                        key={index}
                    />
                ))}
              </div>
              <div className="xl:hidden lg:flex flex-1 hidden">
                {map(Array(5), (item, index) => (
                    <Skeleton
                        width="100%"
                        className="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28"
                        key={index}
                    />
                ))}
              </div>
              <div className="xl:hidden lg:hidden md:flex flex-1 hidden">
                {map(Array(5), (item, index) => (
                    <Skeleton
                        width="100%"
                        className="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28"
                        key={index}
                    />
                ))}
              </div>
              <div className="xl:hidden lg:hidden md:hidden sm:flex flex-1 hidden">
                {map(Array(4), (item, index) => (
                    <Skeleton
                        width="100%"
                        className="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28"
                        key={index}
                    />
                ))}
              </div>
              <div className="xl:hidden lg:hidden md:hidden sm:hidden flex-1 flex">
                {map(Array(3), (item, index) => (
                    <Skeleton
                        width="100%"
                        className="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28"
                        key={index}
                    />
                ))}
              </div>
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
              530: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              380: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              343: {
                slidesPerView: 2,
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
                    imageClassName="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28 w-full"
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

export default DesktopCheapestRoomSection;
