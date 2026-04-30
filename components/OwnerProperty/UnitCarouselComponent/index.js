import { get, isEmpty, isEqual, map, size } from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import * as ownerSelector from "@/src/selectors/owner";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Icons from "@/components/Icons";

const UnitCarouselComponent = ({ data, selectedSlide, onSlideChange }) => {
  return (
    <div className="">
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
              value: ownerSelector.getTotalRoom(item),
              icon: Icons.bedIconActive,
            },
            {
              name: "Car Park",
              value: `${ownerSelector.getTotalCarPark(item)}`,
              icon: Icons.carParkIconActive,
            },
            {
              name: "Room Occupancy",
              value: `${ownerSelector.getTotalRoomOccupancy(item)}%`,
              icon: Icons.occupancyIconActive,
            },
            {
              name: "Car Park Occupancy",
              value: `${ownerSelector.getTotalCarParkOccupancy(item)}%`,
              icon: Icons.carParkOccupancyIconActive,
            },
          ];

          return (
            <SwiperSlide key={unitName}>
              <div
                style={{
                  background: `url(${isEmpty(unitImage) ? Images.logo : unitImage}) no-repeat center center`,
                  backgroundSize: "contain",
                }}
                className="owner-property-banner global-border-radius"
              >
                <div
                  style={{ height: 250, backgroundColor: "rgba(0,0,0,0.7)" }}
                  className="global-border-radius flex flex-col justify-between p-3"
                >
                  <div className="pt-4 pl-4">
                    <div className="flex pb-1">
                      <CustomText
                        textClassName={`text-xs text-white ${isEqual(unitStatus, "Available") ? "bg-aqua" : "bg-error"} px-4 pb-0.5 rounded`}
                      >
                        {isEqual(unitStatus, "Available")
                          ? "Not Rented"
                          : "Rented"}
                      </CustomText>
                    </div>

                    <CustomText textClassName="text-white font-bold text-base">
                      {isEmpty(unitName) ? "-" : unitName}
                    </CustomText>
                  </div>

                  <div className="flex pt-1">
                    {map(infoLists, (list, index) => {
                      const name = get(list, ["name"], "");
                      const value = get(list, ["value"], "");
                      const icon = get(list, ["icon"], "");

                      return (
                        <div
                          className="p-2 flex flex-col items-center justify-center"
                          style={{ minWidth: 70 }}
                          key={index}
                        >
                          <CustomImage
                            src={icon}
                            imageStyle={{ width: 22, height: 22 }}
                          />

                          <CustomText textClassName="text-white text-base font-bold">
                            {value}
                          </CustomText>
                          <CustomText
                            textClassName="text-white text-xs text-center"
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

export default UnitCarouselComponent;
