import CustomText from "@/components/CustomText";
import CustomButton from "@/components/CustomButton";
import { isEmpty, map } from "lodash";
import Skeleton from "@/components/Skeleton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ListingCardComponent from "@/components/Search/ListingCardComponent";

const DesktopCarouselListingSection = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center pb-4">
        <div className="flex gap-2">
          <CustomText textClassName="font-size-xxlarge font-bold primary-text">
            Featured Rooms
          </CustomText>
          <CustomText textClassName="font-size-xxlarge font-bold">
            Just For You
          </CustomText>
        </div>
        <CustomButton
          buttonText="View More"
          buttonClassName="primary-btn btn-sm"
        />
      </div>
      <div className="gap-1">
        {false ? (
          <div className="flex" style={{ height: 144 }}>
            {map(Array(4), (item, index) => (
              <Skeleton width={105} height={105} key={index} />
            ))}
          </div>
        ) : isEmpty(Array(10)) ? (
          <div className="flex justify-center" style={{ height: 144 }}>
            <CustomEmptyBox emptyTitle="Property not available now." />
          </div>
        ) : (
          <Swiper
            style={{ width: "100%" }}
            slidesPerView={6}
            spaceBetween={32}
            loop={true}
            pagination={{
              clickable: true,
              enabled: false,
            }}
            // navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper explore-swiper"
          >
            {map(Array(10), (item, index) => {
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

export default DesktopCarouselListingSection;
