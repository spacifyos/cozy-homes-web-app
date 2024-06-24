import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import _ from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

const RoomPicCarousel = ({ recommendedList, onClickToPropertyOverview }) => {
  return (
    <Swiper
      style={{ width: "100%", paddingBottom: 32 }}
      slidesPerView={2}
      spaceBetween={4}
      loop={true}
      pagination={{
        clickable: true,
      }}
      // navigation={true}
      modules={[Pagination, Navigation]}
      className="mySwiper property-overview-swiper"
    >
      {_.map(recommendedList, (item, index) => {
        const image = listingSelector.getImageUrl(item);
        const propertyName = listingSelector.getPropertyName(item);
        const unitRoomName = listingSelector.getUnitRoomName(item);
        const rental = listingSelector.getRental(item);
        const genderImage = listingSelector.getGender(item);
        const propertyId = listingSelector.getId(item);

        return (
          <SwiperSlide style={{ minWidth: 165 }} key={index}>
            <div
              className="carousel-item relative flex flex-col px-1 cursor-pointer"
              onClick={() => onClickToPropertyOverview(propertyId)}
            >
              <div
                className="flex flex-col left-3 top-3 absolute p-1"
                style={{
                  borderRadius: 15,
                  backgroundColor: "rgba(255,255,255,0.6)",
                }}
              >
                <CustomImage
                  src={Images.femaleUnitIcon}
                  width={20}
                  height={20}
                />
              </div>

              {/*<div className="flex flex-col left-3 top-12 absolute">*/}
              {/*  <div className="primaryWhite-bg-color p-1 global-border-radius mb-1">*/}
              {/*    <CustomImage src={Images.windowIcon} width={20} height={20} />*/}
              {/*  </div>*/}
              {/*</div>*/}

              <CustomImage
                src={_.isEmpty(image) ? Images.imageNotFound : image}
                imageStyle={{
                  height: 150,
                  width: "100%",
                  objectFit: _.isEmpty(image) ? "contain" : "cover",
                }}
                className=" rounded-2xl global-box-shadow"
              />

              <div className="pt-2">
                <CustomText textClassName="font-size-normal font-bold leading-5 line-clamp-1">
                  {propertyName}
                </CustomText>
                <CustomText textClassName="font-size-xsmall primary-text leading-4 line-clamp-1">
                  {unitRoomName}
                </CustomText>
                <div className="flex items-end">
                  <CustomText textClassName="font-size-large font-bold mr-2">
                    RM{rental}
                  </CustomText>
                  <CustomText textClassName="disable-text font-size-xsmall">
                    / month
                  </CustomText>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RoomPicCarousel;
