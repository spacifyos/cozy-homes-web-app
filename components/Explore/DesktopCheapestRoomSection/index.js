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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center pb-4">
        <div className="flex items-center">
          <CustomImage
            src={Images.outlineStartIcon}
            imageStyle={{ width: 20, height: 20 }}
          />
          <div className="flex gap-2 pl-2">
            <CustomText textClassName="font-size-xxlarge font-bold primary-text">
              Cheapest Rooms
            </CustomText>
            <CustomText textClassName="font-size-xxlarge font-bold">
              Just For You
            </CustomText>
          </div>
        </div>

        <CustomButton
          buttonText="View More"
          buttonClassName="primary-btn btn-sm"
          onClick={onClickViewMore}
        />
      </div>

      <div className="gap-1 flex items-center justify-center">
        {loading ? (
          <div className="flex flex-1">
            {map(Array(5), (item, index) => (
              <Skeleton width={"100%"} height={200} key={index} />
            ))}
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
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              420: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              375: {
                slidesPerView: 3,
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
                    imageClassName="h-24 xl:h-44 lg:h-44 md:h-36 sm:h-32 w-full"
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
