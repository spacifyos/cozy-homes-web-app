import { get, isEmpty, isEqual, map, toNumber } from "lodash";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as listingSelector from "@/src/selectors/listing";
import CustomText from "@/components/CustomText";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import { useState } from "react";
import Icons from "@/components/Icons";

const CinemaUnitContent = ({ unitListing, onClickSelectRoomDetail }) => {
  const [zoomIn, setZoomIn] = useState(true);

  return (
    <div className="md:col-span-12 sm:col-span-12 col-span-12 xl:col-span-10 lg:col-span-10">
      {isEmpty(unitListing) ? (
        <div className="bg-white border-disable border global-border-radius flex justify-center items-center h-screen">
          <CustomEmptyBox
          variant="room"
          emptyTitle="No units available"
          emptyDesc="There aren't any units to show for this property right now."
        />
        </div>
      ) : (
        <div className="bg-white border border-disable global-border-radius flex flex-col gap-4 p-4 sticky top-4">
          <div
            onClick={() => setZoomIn(!zoomIn)}
            className="flex justify-end items-center gap-1 cursor-pointer"
          >
            <CustomImage
              className="w-5 h-5"
              src={zoomIn ? Icons.zoomInIcon : Icons.zoomOutIcon}
            />
            <CustomText textClassName="text-sm">
              {zoomIn ? "50%" : "100%"}
            </CustomText>
          </div>

          {map(unitListing, (list) => {
            const name = listingSelector.getName(list);
            const rooms = listingSelector.getRooms(list);
            const isOccupied = listingSelector.getIsOccupied(list);

            return (
              <div className="" style={{ zoom: zoomIn ? "0.5" : "1" }}>
                <div className="flex items-center gap-2 pb-2">
                  <CustomText textClassName="xl:text-base ld:text-base md:text-base sm:text-sm text-sm">
                    {isEmpty(name) ? "-" : name}
                  </CustomText>

                  <CustomText
                    textClassName={`${isOccupied ? "bg-error" : "bg-available"} text-xs global-border-radius px-2 py-1 text-white`}
                  >
                    {isOccupied ? "Fully" : "Partial"}
                  </CustomText>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {map(rooms, (room) => {
                    const bathroom = listingSelector.getAbbrBathroom(room);
                    const bedType = listingSelector.getAbbrBedType(room);
                    const bookingLink = listingSelector.getBookingLink(room);
                    const propertyOverview =
                      listingSelector.getPropertyOverviewLink(room);
                    const name = listingSelector.getName(room);
                    const isAvailableBook =
                      listingSelector.isAvailableBook(room);
                    const rental = listingSelector.getRental(room);
                    const spaceType = listingSelector.getAbbrSpaceType(room);
                    const status = listingSelector.getStatus(room);
                    const bookingSettingLink =
                      listingSelector.getBookingSettingLink(room);

                    return (
                      <div
                        onClick={() => onClickSelectRoomDetail(room)}
                        className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} p-2 global-border-radius flex flex-col gap-1 cursor-pointer`}
                      >
                        <div className={`flex justify-between items-center`}>
                          <div className="flex items-center gap-1">
                            {/*<CustomText*/}
                            {/*  textClassName={`text-white text-xxs ${*/}
                            {/*    !isAvailableBook && isEqual(status, "vacant")*/}
                            {/*      ? "bg-disable"*/}
                            {/*      : isEqual(status, "vacant")*/}
                            {/*        ? "bg-available"*/}
                            {/*        : "bg-error"*/}
                            {/*  } px-1 rounded`}*/}
                            {/*>*/}
                            {/*  {!isAvailableBook && isEqual(status, "vacant")*/}
                            {/*    ? "N"*/}
                            {/*    : isEqual(status, "vacant")*/}
                            {/*      ? "V"*/}
                            {/*      : "O"}*/}
                            {/*</CustomText>*/}

                            <CustomImage
                              src={
                                isEqual(spaceType, "R")
                                  ? !isAvailableBook &&
                                    isEqual(status, "vacant")
                                    ? Icons.roomDisableIcon
                                    : isEqual(status, "vacant")
                                      ? Icons.roomAvailableIcon
                                      : Icons.roomOccupiedIcon
                                  : !isAvailableBook &&
                                      isEqual(status, "vacant")
                                    ? Icons.carDisableIcon
                                    : isEqual(status, "vacant")
                                      ? Icons.carAvailableIcon
                                      : Icons.carOccupiedIcon
                              }
                              className="w-5 h-5"
                            />

                            <div className="flex items-center justify-start gap-1">
                              <CustomText textClassName="text-xs bg-primary text-white px-1 rounded">
                                {isEmpty(bedType) ? "-" : bedType}
                              </CustomText>

                              <CustomText>|</CustomText>

                              <CustomText textClassName="text-xs bg-primary text-white px-1 rounded">
                                {isEmpty(bathroom) ? "-" : bathroom}
                              </CustomText>
                            </div>
                          </div>

                          {/*<CustomImage*/}
                          {/*  src={*/}
                          {/*    isEmpty(isAvailableBook)*/}
                          {/*      ? Icons.shareIconActive*/}
                          {/*      : Icons.shareIconDisable*/}
                          {/*  }*/}
                          {/*  className="w-3 cursor-pointer"*/}
                          {/*  onClick={*/}
                          {/*    isEmpty(isAvailableBook)*/}
                          {/*      ? () => onClickShareBooking(bookingLink)*/}
                          {/*      : () => {}*/}
                          {/*  }*/}
                          {/*/>*/}
                        </div>

                        {/*<CustomText textClassName="text-xxs line-clamp-1">*/}
                        {/*  {isEmpty(name) ? "-" : name}*/}
                        {/*</CustomText>*/}

                        <CustomText textClassName="text-xs">
                          RM{isEmpty(rental) ? "0" : toNumber(rental)}
                        </CustomText>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CinemaUnitContent;
