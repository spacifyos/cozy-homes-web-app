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

const DesktopPromotionSection = ({ onClickViewMore, data, loading }) => {
  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.promotionIconWhite}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="xl:text-lg lg:text-lg md:text-base sm:text-sm text-sm font-bold text-white pl-2">
            Special Promotion
          </CustomText>
        </div>
      </div>

      <div className="gap-1">
        {loading ? (
          <div className="flex">
            {map(Array(3), (item, index) => (
              <Skeleton
                hideText
                width={"100%"}
                className="h-40 xl:h-52 lg:h-52 md:h-44 sm:h-40"
                key={index}
              />
            ))}
          </div>
        ) : isEmpty(data) ? (
          <div className="flex justify-center h-32 2xl:h-40 xl:h-36 lg:h-36 md:h-32 sm:h-32">
            <CustomEmptyBox
              emptyTitle="Promotion not available now."
              textColor="#FFFFFF"
            />
          </div>
        ) : (
          <Swiper
            className="mySwiper explore-swiper"
            style={{ width: "100%" }}
            loop={true}
            pagination={{
              clickable: true,
              enabled: false,
            }}
            breakpoints={{
              1280: {
                slidesPerView: 4,
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
                slidesPerView: 3,
                spaceBetween: 10,
              },
              420: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              343: {
                slidesPerView: 2,
                spaceBetween: 10,
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
                    imageClassName="h-40 xl:h-52 lg:h-52 md:h-44 sm:h-40 w-full"
                    hideLabel
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

export default DesktopPromotionSection;
