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

const DesktopNearbyRoomSection = ({ data, loading, onClickViewMore }) => {
  return (
    <div className="pt-10">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.nearbyIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <CustomText textClassName="text-lg font-bold primary-text pl-2">
            Nearby Rooms
          </CustomText>
        </div>

        <CustomButton
          buttonText="View More"
          buttonClassName="primary-btn btn-sm"
          onClick={onClickViewMore}
        />
      </div>
      <div
        className="gap-1 flex justify-center items-center"
        style={{ height: 255 }}
      >
        {loading ? (
          <div className="flex flex-1">
            {map(Array(5), (item, index) => (
              <Skeleton width="100%" height={200} key={index} />
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
            {map(data, (item, index) => {
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
