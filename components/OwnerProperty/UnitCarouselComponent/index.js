import { get, isEmpty, isEqual, map, size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import * as ownerSelector from "@/src/selectors/owner";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import SpaceDetailComponent from "@/components/OwnerProperty/SpaceDetailComponent";

const UnitCarouselComponent = ({ data, selectedSlide, onSlideChange }) => {
  return (
    <div className="body-container">
      <Swiper
        className="mySwiper cursor-grab mt-6"
        onSlideChange={onSlideChange}
        style={{ width: "100%" }}
      >
        {map(data, (item, index) => {
          const unitName = ownerSelector.getUnitName(item);
          const unitImage = ownerSelector.getUnitImage(item);
          const unitStatus = ownerSelector.getUnitStatus(item);

          const infoLists = [
            {
              name: "Room",
              value: ownerSelector.getTotalRooms(item),
              icon: Images.bedIconActive,
            },
            {
              name: "Occupancy",
              value: `${ownerSelector.getTotalUnitOccupancy(item)}%`,
              icon: Images.percentIconActive,
            },
            {
              name: "Room Vacant",
              value: `${ownerSelector.getTotalRoomVacant(item)}%`,
              icon: Images.percentIconActive,
            },
          ];

          return (
            <SwiperSlide key={unitName}>
              <div
                style={{
                  background: `url(${isEmpty(unitImage) ? Images.logoImage : unitImage}) no-repeat center center`,
                  backgroundSize: "contain",
                }}
                className="owner-property-banner global-border-radius"
              >
                <div
                  style={{ height: 250, backgroundColor: "rgba(0,0,0,0.5)" }}
                  className="global-border-radius flex flex-col justify-end p-3"
                >
                  <div className="flex pb-1">
                    <CustomText
                      textClassName={`font-size-xsmall white-text ${isEqual(unitStatus, "Available") ? "available-bg-color" : "error-bg-color"} px-4 py-0.5 rounded`}
                    >
                      {unitStatus}
                    </CustomText>
                  </div>

                  <CustomText textClassName="white-text font-bold font-size-xlarge">
                    {isEmpty(unitName) ? "-" : unitName}
                  </CustomText>

                  <div className="flex pt-1">
                    {map(infoLists, (list, index) => {
                      const name = get(list, ["name"], "");
                      const value = get(list, ["value"], "");
                      const icon = get(list, ["icon"], "");

                      return (
                        <div
                          className="p-2 flex items-end justify-center"
                          key={index}
                        >
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

export default UnitCarouselComponent;
