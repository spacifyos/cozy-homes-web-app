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

const DesktopNearbyRoomSection = ({ recommendedList }) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.nearbyIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="font-size-xxlarge font-bold primary-text pl-2">
            Nearby Rooms
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
        ) : isEmpty(recommendedList) ? (
          <div className="flex justify-center" style={{ height: 144 }}>
            <CustomEmptyBox
              emptyTitle="No recommend property found"
              emptyDesc="Recommend property not available for now. "
            />
          </div>
        ) : (
          <Swiper
            style={{ width: "100%" }}
            slidesPerView={5}
            spaceBetween={10}
            loop={true}
            pagination={{
              clickable: true,
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
            className="mySwiper explore-swiper"
          >
            {map(recommendedList, (item, index) => {
              return (
                <SwiperSlide style={{ minWidth: 100 }} key={index}>
                  <ListingCardComponent item={item} imageHeight={200} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default DesktopNearbyRoomSection;
