import { NextSeo } from "next-seo";
import DesktopLayout from "@/components/DesktopLayout";
import { useTranslation, withTranslation } from "next-i18next";
import { getServerSideProps } from "@/src/utils/getStatic";
import AgencyAuthWrapper from "@/components/AgencyAuthWrapper";
import CustomImage from "@/components/CustomImage";
import Images from "@/src/utils/Image";
import CustomText from "@/components/CustomText";
import { useEffect, useState } from "react";
import apiRequest from "@/src/services/httpUtilities/apiRequest";
import {
  filter,
  isEmpty,
  isEqual,
  map,
  toString,
  get,
  includes,
  concat,
  remove,
} from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Toast from "@/src/utils/Toast";
import CustomSelect from "@/components/CustomSelect";
import * as reportSelector from "@/src/selectors/report";
import CustomButton from "@/components/CustomButton";
import CustomEmptyBox from "@/components/CustomEmptyBox";
import * as listingAction from "@/src/actions/listing";
import { useDispatch, useSelector } from "react-redux";

export { getServerSideProps };

const CardListing = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const getListingTagOptionRequest = () =>
    dispatch(listingAction.getListingTagOptionRequest());
  const listingTagOptionData = useSelector((state) =>
    listingSelector.getListingTagOptionData(state),
  );
  const listingTagOptionDataLoading = useSelector((state) =>
    listingSelector.getListingTagOptionDataLoading(state),
  );

  const [propertyListing, setPropertyListing] = useState([]);
  const [propertyListingLoading, setPropertyListingLoading] = useState(false);

  const [unitListing, setUnitListing] = useState([]);
  const [unitListingLoading, setUnitListingLoading] = useState(false);

  const [propertyOption, setPropertyOption] = useState([]);
  const [propertyOptionLoading, setPropertyOptionLoading] = useState(false);

  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [unitFilterParams, setUnitFilterParams] = useState(null);
  const [propertyFilterParams, setPropertyFilterParams] = useState(null);
  const [unitOption, setUnitOption] = useState([]);

  const [propertyValue, setPropertyValue] = useState("");
  const [unitValue, setUnitValue] = useState("");
  const [statusValue, setStatusValue] = useState(false);

  const [bedroomValue, setBedroomValue] = useState("");
  const [bathroomValue, setBathroomValue] = useState("");

  const bathroomOption = get(listingTagOptionData, ["bathroom"], []);
  const bedroomOption = get(listingTagOptionData, ["bedroom"], []);

  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    if (isEmpty(listingTagOptionData)) {
      fetchListingTagOption();
    }
  }, []);

  const fetchListingTagOption = () => {
    getListingTagOptionRequest();
  };

  useEffect(() => {
    if (!isEmpty(unitFilterParams)) {
      fetchUnitListing(unitFilterParams);
    }
  }, [unitFilterParams]);

  useEffect(() => {
    fetchPropertyListing(propertyFilterParams);
  }, [propertyFilterParams]);

  useEffect(() => {
    fetchPropertyOption();
  }, []);

  const fetchPropertyOption = async () => {
    await apiRequest.getPropertyOptionRequest(
      setPropertyOptionLoading,
      propertyOptionSuccessCallback,
    );
  };

  const propertyOptionSuccessCallback = (res) => {
    setPropertyOption(res);
  };

  const fetchPropertyListing = async (postData) => {
    await apiRequest.postPropertyListingCardViewRequest(
      postData,
      setPropertyListingLoading,
      propertyListingSuccessCallback,
    );
  };

  const propertyListingSuccessCallback = (res) => {
    setPropertyListing(res);
  };

  const fetchUnitListing = async (id) => {
    await apiRequest.postUnitCardViewRequest(
      id,
      setUnitListingLoading,
      unitListingSuccessCallback,
    );
  };

  const unitListingSuccessCallback = (res) => {
    setUnitListing(res);
  };

  const onClickSelectProperty = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setUnitFilterParams({ property_id: propertyId });
  };

  const onClickShareBooking = (url) => {
    navigator.clipboard.writeText(url);

    Toast.success("Copied link to clipboard.");
  };

  const onChangePropertyValue = (e) => {
    const filterProperty = filter(propertyOption, (item) =>
      isEqual(toString(item.value), e.target.value),
    );
    const targetUnit = reportSelector.getUnitOption(filterProperty[0]);

    setPropertyFilterParams({
      id: e.target.value,
    });

    setPropertyValue(e.target.value);
    setUnitOption(targetUnit);
    setUnitListing([]);
    setUnitFilterParams(null);
  };

  const onChangeUnitValue = (e) => {
    setUnitFilterParams({
      ...unitFilterParams,
      ...{ unit_id: e.target.value },
    });
    setUnitValue(e.target.value);
  };

  const onChangeStatusValue = (e) => {
    setUnitFilterParams({
      ...unitFilterParams,
      ...{ is_available_listing: e.target.value },
    });
    setStatusValue(e.target.value);
  };

  const onChangeBedroomValue = (e) => {
    setUnitFilterParams((preState) => {
      const preTags = get(preState, ["tags"], []);
      const checkPreTags = remove(
        preTags,
        (preTag) => !includes(preTag, "bed"),
      );

      return {
        ...unitFilterParams,
        ...{
          tags: isEmpty(e.target.value)
            ? checkPreTags
            : concat(checkPreTags, e.target.value),
        },
      };
    });
    setBedroomValue(e.target.value);
  };

  const onChangeBathroomValue = (e) => {
    setUnitFilterParams((preState) => {
      const preTags = get(preState, ["tags"], []);
      const checkPreTags = remove(
        preTags,
        (preTag) => !includes(preTag, "bathroom"),
      );

      return {
        ...unitFilterParams,
        ...{
          tags: isEmpty(e.target.value)
            ? checkPreTags
            : concat(checkPreTags, e.target.value),
        },
      };
    });
    setBathroomValue(e.target.value);
  };

  const onClickReset = () => {
    setPropertyFilterParams(null);
    setUnitFilterParams(null);
    setUnitListing([]);
    setPropertyValue("");
    setUnitValue("");
    setBathroomValue("");
    setBedroomValue("");
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Agency Sign In - Spacify Asia" />

      <DesktopLayout
        hideNav
        loading={
          propertyListingLoading || unitListingLoading || propertyOptionLoading
        }
        pageBreadcrumbs={
          <div className="breadcrumbs text-sm">
            <ul>
              <li>
                <CustomText textClassName="text-base">
                  Property Listing
                </CustomText>
              </li>
            </ul>
          </div>
        }
      >
        <div className="container mx-auto flex flex-col flex-1 h-full">
          <div
            className={`grid xl:grid-cols-11 lg:grid-cols-11 md:grid-cols-11 sm:grid-cols-11 grid-cols-11 gap-2 ${isOpenFilter ? "pb-2" : "pb-7"}`}
          >
            <CustomSelect
              className="xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-9 col-span-9"
              placeholder={"Property"}
              optionList={propertyOption}
              onChange={onChangePropertyValue}
              value={propertyValue}
            />

            <CustomSelect
              className="w-full xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 col-span-5 xl:block lg:block md:block hidden"
              placeholder={"Unit"}
              optionList={unitOption}
              onChange={onChangeUnitValue}
              value={unitValue}
            />

            <div
              className="bg-white xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2 flex justify-center items-center global-box-shadow global-border-radius cursor-pointer"
              onClick={() => setIsOpenFilter(!isOpenFilter)}
            >
              <CustomImage src={Images.filterProIcon} className="h-6 w-6" />
            </div>
          </div>

          {isOpenFilter ? (
            <div className="grid xl:grid-cols-10 lg:grid-cols-10 md:grid-cols-10 sm:grid-cols-10 grid-cols-10 gap-2 pb-7">
              <CustomSelect
                className="xl:col-span-5 lg:col-span-5 md:col-span-5 sm:col-span-5 col-span-5 xl:hidden lg:hidden md:hidden"
                placeholder={"Unit"}
                optionList={unitOption}
                onChange={onChangeUnitValue}
                value={unitValue}
              />

              <CustomSelect
                className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-5 col-span-5"
                placeholder={"Bedroom"}
                optionList={bedroomOption}
                onChange={onChangeBedroomValue}
                value={bedroomValue}
              />

              <CustomSelect
                className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-4"
                placeholder={"Bathroom"}
                optionList={bathroomOption}
                onChange={onChangeBathroomValue}
                value={bathroomValue}
              />

              <CustomSelect
                className="xl:col-span-3 lg:col-span-3 md:col-span-3 sm:col-span-4 col-span-4"
                placeholder={"Status"}
                optionList={[
                  { label: "Available", value: true },
                  { label: "Not Available", value: false },
                ]}
                onChange={onChangeStatusValue}
                value={statusValue}
              />

              <CustomButton
                buttonClassName="btn-primary xl:col-span-1 lg:col-span-1 md:col-span-1 sm:col-span-2 col-span-2"
                buttonText="Reset"
                onClick={onClickReset}
              />
            </div>
          ) : (
            false
          )}

          <div className="grid grid-cols-12 xl:gap-8 lg:gap-8 md:gap-8 sm:gap-4 gap-4 relative pb-4">
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
                  const roomOccupancyRate =
                    listingSelector.getRoomOccupancyRate(list);
                  const totalRoom = listingSelector.getTotalRoom(list);
                  const totalOccupiedRoom =
                    listingSelector.getTotalOccupiedRoom(list);
                  const totalVacantRoom =
                    listingSelector.getTotalVacantRoom(list);

                  return (
                    <div
                      className={`flex flex-col justify-center items-center p-2 global-border-radius border cursor-pointer bg-white min-w-28 ${isEqual(propertyId, selectedPropertyId) ? "border-primary" : "border"}`}
                      onClick={() => onClickSelectProperty(propertyId)}
                    >
                      <CustomImage
                        className="w-16 h-16 overflow-hidden cover"
                        src={
                          isEmpty(imageUrl) ? Images.imageNotFound : imageUrl
                        }
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

            <div className="col-span-10 xl:flex lg:flex md:hidden sm:hidden hidden flex-col gap-4 relative">
              {isEmpty(unitListing) ? (
                <div className="bg-white flex justify-center items-center h-screen border global-border-radius">
                  <CustomEmptyBox />
                </div>
              ) : (
                <div className="flex flex-col gap-4 sticky top-4 ">
                  {map(unitListing, (list) => {
                    const name = listingSelector.getName(list);
                    const rooms = listingSelector.getRooms(list);
                    const isOccupied = listingSelector.getIsOccupied(list);

                    return (
                      <div className="bg-white border global-border-radius overflow-hidden relative">
                        <div className="px-4 pt-4 sticky">
                          <div className="flex items-center gap-2">
                            <CustomText textClassName="text-base">
                              {isEmpty(name) ? "-" : name}
                            </CustomText>

                            <CustomText
                              textClassName={`${isOccupied ? "bg-error" : "bg-available"} text-xs global-border-radius px-2 py-1 text-white`}
                            >
                              {isOccupied ? "Fully" : "Partial"}
                            </CustomText>
                          </div>

                          <div className="flex gap-4 overflow-x-scroll p-4">
                            {map(rooms, (room) => {
                              const bathroom = get(room, ["bathroom"], "");
                              const bedType = listingSelector.getBedType(room);
                              const bookingLink =
                                listingSelector.getBookingLink(room);
                              const propertyOverview =
                                listingSelector.getPropertyOverviewLink(room);
                              const name = listingSelector.getName(room);
                              const isAvailableBook =
                                listingSelector.isAvailableBook(room);
                              const rental = listingSelector.getRental(room);
                              const spaceType =
                                listingSelector.getSpaceType(room);
                              const status = listingSelector.getStatus(room);

                              return (
                                <a
                                  target={
                                    isAvailableBook && isEqual(status, "vacant")
                                      ? "_blank"
                                      : "_self"
                                  }
                                  href={
                                    isAvailableBook && isEqual(status, "vacant")
                                      ? propertyOverview
                                      : "#"
                                  }
                                  className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} p-4 global-border-radius flex flex-col gap-2 min-w-64`}
                                >
                                  <div
                                    className={`flex justify-between items-center`}
                                  >
                                    <CustomText
                                      textClassName={`text-white text-xxs ${
                                        !isAvailableBook &&
                                        isEqual(status, "vacant")
                                          ? "bg-disable"
                                          : isEqual(status, "vacant")
                                            ? "bg-available"
                                            : "bg-error"
                                      } py-1 px-2 global-border-radius`}
                                    >
                                      {!isAvailableBook &&
                                      isEqual(status, "vacant")
                                        ? "N / A"
                                        : isEqual(status, "vacant")
                                          ? "Vacant"
                                          : "Occupied"}
                                    </CustomText>

                                    <CustomImage
                                      src={
                                        isAvailableBook
                                          ? Images.shareIconActive
                                          : Images.shareIconDisable
                                      }
                                      className={`w-4 ${isAvailableBook ? "cursor-pointer" : ""}`}
                                      onClick={
                                        isAvailableBook
                                          ? () =>
                                              onClickShareBooking(bookingLink)
                                          : () => {}
                                      }
                                    />
                                  </div>

                                  <CustomText textClassName="text-xs">
                                    {isEmpty(name) ? "-" : name}
                                  </CustomText>

                                  <div className="flex items-center gap-2">
                                    <CustomImage
                                      src={Images.bathroomIconActive}
                                      className="w-4"
                                    />
                                    <CustomText textClassName="text-xs">
                                      {isEmpty(bathroom) ? "-" : bathroom}
                                    </CustomText>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <CustomImage
                                      src={Images.bedTypeIconActive}
                                      className="w-4"
                                    />
                                    <CustomText textClassName="text-xs">
                                      {isEmpty(bedType) ? "-" : bedType}
                                    </CustomText>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <CustomImage
                                      src={Images.spaceTypeIconActive}
                                      className="w-4"
                                    />
                                    <CustomText textClassName="text-xs">
                                      {isEmpty(spaceType) ? "-" : spaceType}
                                    </CustomText>
                                  </div>

                                  <div
                                    className="divider-line bg-black"
                                    style={{ margin: "8px 0" }}
                                  ></div>

                                  <CustomText textClassName="text-sm">
                                    RM{isEmpty(rental) ? "0" : rental}/month
                                  </CustomText>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="md:col-span-12 sm:col-span-12 col-span-12 xl:hidden lg:hidden md:block sm:block block relative">
              {isEmpty(unitListing) ? (
                <div className="flex justify-center items-center h-screen">
                  <CustomEmptyBox />
                </div>
              ) : (
                <div className="flex flex-col gap-4 sticky top-4 ">
                  {map(unitListing, (list) => {
                    const name = listingSelector.getName(list);
                    const rooms = listingSelector.getRooms(list);
                    const isOccupied = listingSelector.getIsOccupied(list);

                    return (
                      <div className="bg-white collapse border global-border-radius">
                        <input type="checkbox" />
                        <div className="collapse-title">
                          <div className="flex items-center gap-2">
                            <CustomText textClassName="text-base">
                              {isEmpty(name) ? "-" : name}
                            </CustomText>

                            <CustomText
                              textClassName={`${isOccupied ? "bg-error" : "bg-available"} text-xs global-border-radius px-2 py-1 text-white`}
                            >
                              {isOccupied ? "Fully" : "Partial"}
                            </CustomText>
                          </div>
                        </div>
                        <div className="collapse-content">
                          <div className="grid md:grid-cols-5 sm:grid-cols-4 grid-cols-3 gap-2">
                            {map(rooms, (room) => {
                              const bathroom = get(room, ["bathroom"], "");
                              const bedType =
                                listingSelector.getAbbrBedType(room);
                              const bookingLink =
                                listingSelector.getBookingLink(room);
                              const propertyOverview =
                                listingSelector.getPropertyOverviewLink(room);
                              const name = listingSelector.getName(room);
                              const isAvailableBook =
                                listingSelector.isAvailableBook(room);
                              const rental = listingSelector.getRental(room);
                              const spaceType =
                                listingSelector.getAbbrSpaceType(room);
                              const status = listingSelector.getStatus(room);

                              return (
                                <a
                                  target={
                                    isAvailableBook && isEqual(status, "vacant")
                                      ? "_blank"
                                      : "_self"
                                  }
                                  href={
                                    isAvailableBook && isEqual(status, "vacant")
                                      ? propertyOverview
                                      : "#"
                                  }
                                  className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-error-light"} p-2 global-border-radius flex flex-col gap-1`}
                                >
                                  <div
                                    className={`flex justify-between items-center`}
                                  >
                                    <div className="flex items-center gap-1">
                                      <CustomText
                                        textClassName={`text-white text-xxs ${
                                          !isAvailableBook &&
                                          isEqual(status, "vacant")
                                            ? "bg-disable"
                                            : isEqual(status, "vacant")
                                              ? "bg-available"
                                              : "bg-error"
                                        } px-1 rounded`}
                                      >
                                        {!isAvailableBook &&
                                        isEqual(status, "vacant")
                                          ? "N / A"
                                          : isEqual(status, "vacant")
                                            ? "V"
                                            : "O"}
                                      </CustomText>

                                      <CustomText textClassName="text-xxs bg-primary text-white px-1 rounded">
                                        {isEmpty(spaceType) ? "-" : spaceType}
                                      </CustomText>
                                    </div>

                                    <CustomImage
                                      src={
                                        isEmpty(isAvailableBook)
                                          ? Images.shareIconActive
                                          : Images.shareIconDisable
                                      }
                                      className="w-3 cursor-pointer"
                                      onClick={
                                        isEmpty(isAvailableBook)
                                          ? () =>
                                              onClickShareBooking(bookingLink)
                                          : () => {}
                                      }
                                    />
                                  </div>

                                  <CustomText textClassName="text-xxs line-clamp-1">
                                    {isEmpty(name) ? "-" : name}
                                  </CustomText>

                                  <div className="flex items-center justify-start gap-1">
                                    <CustomText textClassName="text-xs bg-primary text-white px-1 rounded">
                                      {isEmpty(bedType) ? "-" : bedType}
                                    </CustomText>

                                    <CustomText>|</CustomText>

                                    <CustomText textClassName="text-xs bg-primary text-white px-1 rounded">
                                      {isEmpty(bathroom) ? "-" : bathroom}
                                    </CustomText>
                                  </div>

                                  <CustomText textClassName="text-xs">
                                    RM{isEmpty(rental) ? "0" : rental}
                                  </CustomText>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AgencyAuthWrapper(CardListing));
