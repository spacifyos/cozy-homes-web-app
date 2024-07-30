import { get, isEmpty, map, size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import * as ownerSelector from "@/src/selectors/owner";

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
              name: "Unit",
              value: ownerSelector.getTotalUnits(item),
              icon: Images.spaceIcon,
            },
            {
              name: "Room",
              value: ownerSelector.getTotalRoom(item),
              icon: Images.bedIconActive,
            },
            {
              name: "Occupancy",
              value: `${ownerSelector.getOccupancy(item)}%`,
              icon: Images.percentIconActive,
            },
            {
              name: "Room Vacant",
              value: `${ownerSelector.getRoomVacant(item)}%`,
              icon: Images.percentIconActive,
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
                  style={{ height: 250, backgroundColor: "rgba(0,0,0,0.5)" }}
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
                    {map(infoLists, (list) => {
                      const name = get(list, ["name"], "");
                      const value = get(list, ["value"], "");
                      const icon = get(list, ["icon"], "");

                      return (
                        <div className="p-2 flex items-end justify-center">
                          <CustomImage
                            src={icon}
                            imageStyle={{ width: 20, height: 20 }}
                          />

                          <div className="pl-2">
                            <CustomText textClassName="white-text font-size-xlarge font-bold leading-4">
                              {value}
                            </CustomText>
                            <CustomText textClassName="white-text font-size-xxsmall">
                              {name}
                            </CustomText>
                          </div>
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
