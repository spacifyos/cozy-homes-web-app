import { get, isEmpty, map, size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as ownerSelector from "@/src/selectors/owner";
import {
  getCarParkVacant,
  getOccupancyCarPark,
  getOccupancyRoom,
  getTotalCarPark,
} from "@/src/selectors/owner";

const PropertyCarouselComponent = ({
  data,
  onClickToPropertyDetail,
  showLabel,
}) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onSlideChange = (value) => {
    const activeIndex = get(value, ["activeIndex"], 0);

    setSelectedSlide(activeIndex);
  };

  return (
    <div>
      <Swiper
        className="mySwiper cursor-grab mt-6"
        onSlideChange={onSlideChange}
        style={{ width: "100%" }}
      >
        {map(data, (item, index) => {
          const propertyName = ownerSelector.getPropertyName(item);
          const propertyAddress = ownerSelector.getPropertyAddress(item);
          const propertyImage = ownerSelector.getPropertyImage(item);
          const propertyId = ownerSelector.getPropertyId(item);

          const infoLists = [
            {
              name: "Room",
              value: ownerSelector.getTotalRoom(item),
              icon: Images.bedIconActive,
            },
            {
              name: "Car Park",
              value: `${ownerSelector.getTotalCarPark(item)}`,
              icon: Images.carParkOccupancyIcon,
            },
            {
              name: "Room Occupancy",
              value: `${ownerSelector.getOccupancyRoom(item)}%`,
              icon: Images.occupancyIcon,
            },
            {
              name: "Car Park Occupancy",
              value: `${ownerSelector.getOccupancyCarPark(item)}%`,
              icon: Images.carParkOccupancyIcon,
            },
          ];

          return (
            <SwiperSlide
              key={index}
              onClick={() => onClickToPropertyDetail(propertyId)}
            >
              <div
                style={{
                  background: `url(${isEmpty(propertyImage) ? Images.logoImage : propertyImage}) no-repeat center center`,
                  backgroundSize: "contain",
                }}
                className="owner-property-banner global-border-radius"
              >
                <div
                  style={{ height: 250, backgroundColor: "rgba(0,0,0,0.7)" }}
                  className="global-border-radius flex flex-col justify-end p-3"
                >
                  {showLabel ? (
                    <div className="flex pb-1">
                      <CustomText textClassName="font-size-xsmall white-text available-bg-color px-4 py-0.5 rounded">
                        Available
                      </CustomText>
                    </div>
                  ) : (
                    false
                  )}

                  <CustomText textClassName="white-text font-bold font-size-xlarge">
                    {isEmpty(propertyName) ? "-" : propertyName}
                  </CustomText>
                  <CustomText textClassName="white-text font-size-xsmall font-light">
                    {isEmpty(propertyAddress) ? "-" : propertyAddress}
                  </CustomText>

                  <div className="flex pt-2">
                    {map(infoLists, (list, index) => {
                      const name = get(list, ["name"], "");
                      const value = get(list, ["value"], "");
                      const icon = get(list, ["icon"], "");

                      return (
                        <div
                          className="p-2 flex flex-col items-center justify-center"
                          style={{ width: 60 }}
                          key={index}
                        >
                          <CustomImage
                            src={icon}
                            imageStyle={{ width: 22, height: 22 }}
                          />

                          <CustomText textClassName="white-text font-size-xlarge font-bold">
                            {value}
                          </CustomText>
                          <CustomText
                            textClassName="white-text font-size-xxsmall text-center"
                            styles={{ height: 30 }}
                          >
                            {name}
                          </CustomText>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {size(data) > 1 ? (
        <div className="mt-5 flex justify-center items-center">
          {map(data, (item, index) => {
            return (
              <div
                key={index}
                className={
                  index === selectedSlide ? "banner-dot-active" : "banner-dot"
                }
              ></div>
            );
          })}
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default PropertyCarouselComponent;
