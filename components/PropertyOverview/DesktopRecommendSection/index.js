import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ListingCardComponent from "@/components/Search/ListingCardComponent";

const DesktopRecommendSection = ({ data, loading, onClickViewMore }) => {
  return (
    <div className="pt-10 pb-4">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.recommendIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <div className="flex gap-2 pl-2">
            <CustomText textClassName="xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm font-bold">
              <span className="primary-text">Recommend</span> For You
            </CustomText>
          </div>
        </div>

        <div className="flex items-center">
          <CustomText
            textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"
            onClick={onClickViewMore}
          >
            View More
          </CustomText>

          <CustomImage src={Images.rightIcon} className="w-1.5" />
        </div>
      </div>
      <div className="gap-1 flex justify-center items-center">
        {loading ? (
          <div className="flex flex-1">
            {map(Array(3), (item, index) => (
              <Skeleton
                width="100%"
                className="h-24 xl:h-40 lg:h-32 md:h-32 sm:h-32"
                key={index}
              />
            ))}
          </div>
        ) : isEmpty(data) ? (
          <div className="flex justify-center">
            <CustomEmptyBox
              emptyTitle="No recommend property found"
              emptyDesc="Recommend property not available for now. "
            />
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

export default DesktopRecommendSection;
