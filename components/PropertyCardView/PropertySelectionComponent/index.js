import { isEmpty, isEqual, map } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";

const PropertySelectionComponent = ({
  propertyListing,
  onClickSelectProperty,
  selectedPropertyId,
}) => {
  return (
    <div className="xl:col-span-2 lg:col-span-2 md:col-span-12 sm:col-span-12 col-span-12 relative">
      <div className="gap-4 flex xl:flex-col lg:flex-col md:flex-row sm:flex-row flex-row xl:h-screen lg:h-screen overflow-y-scroll sticky top-4">
        {map(propertyListing, (list) => {
          const imageUrl = listingSelector.getImageUrl(list);
          const name = listingSelector.getName(list);
          const propertyId = listingSelector.getId(list);
          const carParkOccupancyRate =
            listingSelector.getCarParkOccupancyRate(list);
          const totalCarPark = listingSelector.getTotalCarPark(list);
          const totalOccupiedCarPark =
            listingSelector.getTotalOccupiedCarPark(list);
          const totalVacantCarPark =
            listingSelector.getTotalVacantCarPark(list);
          const roomOccupancyRate = listingSelector.getRoomOccupancyRate(list);
          const totalRoom = listingSelector.getTotalRoom(list);
          const totalOccupiedRoom = listingSelector.getTotalOccupiedRoom(list);
          const totalVacantRoom = listingSelector.getTotalVacantRoom(list);

          return (
            <div
              className={`flex flex-col justify-center items-center p-2 global-border-radius border cursor-pointer bg-white min-w-28 ${isEqual(propertyId, selectedPropertyId) ? "border-primary" : "border"}`}
              onClick={() => onClickSelectProperty(propertyId)}
            >
              <CustomImage
                className="w-16 h-16 overflow-hidden cover"
                src={isEmpty(imageUrl) ? Images.imageNotFound : imageUrl}
              />

              <CustomText
                textClassName={`text-xxs text-center pt-1 ${isEqual(propertyId, selectedPropertyId) ? "text-primary" : "text-black"} line-clamp-2`}
              >
                {isEmpty(name) ? "-" : name}
              </CustomText>

              {/*<div className="xl:block lg:block hidden">*/}
              {/*  <CustomText textClassName="text-xxs text-center">{`R: ${totalOccupiedRoom}/${totalRoom} (${totalVacantRoom}) - OR: ${roomOccupancyRate}%`}</CustomText>*/}
              {/*  <CustomText textClassName="text-xxs text-center">{`CP: ${totalOccupiedCarPark}/${totalCarPark} (${totalVacantCarPark}) - OR: ${carParkOccupancyRate}%`}</CustomText>*/}
              {/*</div>*/}

              {/*<div className="xl:hidden lg:hidden block">*/}
              {/*  <CustomText textClassName="text-xxs text-center">{`R: ${totalOccupiedRoom}/${totalRoom} (${totalVacantRoom})`}</CustomText>*/}
              {/*  <CustomText textClassName="text-xxs text-center">{`OR: ${roomOccupancyRate}%`}</CustomText>*/}
              {/*  <CustomText textClassName="text-xxs text-center">{`CP: ${totalOccupiedCarPark}/${totalCarPark} (${totalVacantCarPark})`}</CustomText>*/}
              {/*  <CustomText textClassName="text-xxs text-center">{`OR: ${carParkOccupancyRate}%`}</CustomText>*/}
              {/*</div>*/}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertySelectionComponent;
