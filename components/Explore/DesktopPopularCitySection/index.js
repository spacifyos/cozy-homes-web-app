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
          <CustomText textClassName="font-size-xxlarge font-bold primary-text pl-2">
            Popular City
          </CustomText>
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

      <div className="hidden xl:block lg:block md:block sm:block ">
        <div style={{ minHeight: 523 }}>
          {loading ? (
            <div className="grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 gap-5">
              {map(Array(12), (item, index) => (
                <Skeleton width="100%" height={160} key={index} />
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
            {map(Array(4), (item, index) => (
              <Skeleton
                width={"100%"}
                minWidth={100}
                height={100}
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
            style={{ width: "100%" }}
            slidesPerView={4}
            spaceBetween={10}
            loop={true}
            pagination={{
              clickable: true,
              enabled: false,
            }}
            // navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper explore-swiper"
          >
            {map(data, (item, index) => {
              return (
                <SwiperSlide style={{ minWidth: 100 }} key={index}>
                  <ListingCardComponent item={item} />
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
