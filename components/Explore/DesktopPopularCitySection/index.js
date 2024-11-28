import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import ListingCardComponent from "@/components/Explore/ListingCardComponent";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const DesktopPopularCitySection = ({ onClickViewMore, data, loading }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.klccIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm font-bold primary-text pl-2">
            Popular City
          </CustomText>
        </div>
        {/*<div className="flex items-center">*/}
        {/*  <CustomText*/}
        {/*    textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"*/}
        {/*    onClick={() => onClickViewMore()}*/}
        {/*  >*/}
        {/*    View More*/}
        {/*  </CustomText>*/}

        {/*  <CustomImage src={Images.rightIcon} className="w-1.5" />*/}
        {/*</div>*/}
      </div>

      <div className="hidden xl:block lg:block md:block sm:block ">
        <div style={{ minHeight: 410 }}>
          {loading ? (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-5">
              {map(Array(12), (item, index) => (
                <Skeleton
                  width="100%"
                  className="h-24 xl:h-44 lg:h-44 md:h-32 sm:h-32"
                  key={index}
                />
              ))}
            </div>
          ) : isEmpty(data) ? (
            <div
              className="flex justify-center items-center"
              style={{ minHeight: 410 }}
            >
              <CustomEmptyBox emptyTitle="Property not available now." />
            </div>
          ) : (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-5">
              {map(data, (item, index) => {
                return (
                  <ListingCardComponent
                    item={item}
                    imageClassName="h-24 xl:h-44 lg:h-44 md:h-32 sm:h-32"
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="xl:hidden lg:hidden md:hidden sm:hidden">
        {loading ? (
          <div className="flex" style={{ height: 144 }}>
            {map(Array(3), (item, index) => (
              <Skeleton
                className="h-28 2xl:h-40 xl:h-36 lg:h-36 md:h-28 sm:h-28"
                width={"100%"}
                key={index}
              />
            ))}
          </div>
        ) : isEmpty(data) ? (
          <div className="flex justify-center" style={{ height: 144 }}>
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
                <SwiperSlide style={{ minWidth: 100 }} key={index}>
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

export default DesktopPopularCitySection;
