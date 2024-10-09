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

const DesktopPromotionSection = () => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.promotionIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="font-size-xxlarge font-bold white-text pl-2">
            Special Promotion
          </CustomText>
        </div>
      </div>

      <div className="gap-1" style={{ height: 250 }}>
        {false ? (
          <div className="flex">
            {map(Array(4), (item, index) => (
              <Skeleton width={105} height={105} key={index} />
            ))}
          </div>
        ) : isEmpty(Array(10)) ? (
          <div className="flex justify-center">
            <CustomEmptyBox emptyTitle="Property not available now." />
          </div>
        ) : (
          <Swiper
            style={{ width: "100%" }}
            slidesPerView={4}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
              enabled: false,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3,
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
            className="mySwiper explore-swiper"
          >
            {map(Array(5), (item, index) => {
              return (
                <SwiperSlide style={{ minWidth: 100 }} key={index}>
                  <div className="primaryWhite-bg-color flex justify-center global-border-radius">
                    <CustomImage
                      src={Images.logoImage}
                      imageStyle={{ width: 300, height: 250 }}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default DesktopPromotionSection;
