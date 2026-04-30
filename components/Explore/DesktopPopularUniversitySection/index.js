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
import Icons from "@/components/Icons";

const DesktopPopularUniversitySection = ({
  onClickViewMore,
  data,
  loading,
}) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Icons.collegeIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm font-bold text-primary pl-2">
            Popular University/College
          </CustomText>
        </div>

        {/*<div className="flex items-center">*/}
        {/*  <CustomText*/}
        {/*    textClassName="cursor-pointer pr-1.5 xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs"*/}
        {/*    onClick={() => onClickViewMore()}*/}
        {/*  >*/}
        {/*    View More*/}
        {/*  </CustomText>*/}

        {/*  <CustomImage src={Icons.rightIconBlack} className="w-1.5" />*/}
        {/*</div>*/}
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
          <div className="flex justify-center h-32 2xl:h-40 xl:h-36 lg:h-36 md:h-32 sm:h-32">
            <CustomEmptyBox
            variant="default"
            emptyTitle="No campuses to show"
            emptyDesc="We'll feature popular universities and colleges here soon."
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

export default DesktopPopularUniversitySection;
