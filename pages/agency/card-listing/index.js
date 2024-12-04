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
import { filter, isEmpty, isEqual, map, toString } from "lodash";
import * as listingSelector from "@/src/selectors/listing";
import Toast from "@/src/utils/Toast";
import CustomSelect from "@/components/CustomSelect";
import * as reportSelector from "@/src/selectors/report";
import CustomButton from "@/components/CustomButton";
import CustomEmptyBox from "@/components/CustomEmptyBox";

export { getServerSideProps };

const CardListing = () => {
  const { t } = useTranslation("common");

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
    setUnitOption(targetUnit);
    setUnitListing([]);
    setUnitFilterParams(null);
  };

  const onChangeUnitValue = (e) => {
    setUnitFilterParams({
      ...unitFilterParams,
      ...{ unit_id: e.target.value },
    });
  };

  const onClickReset = () => {
    setPropertyFilterParams(null);
    setUnitFilterParams(null);
  };

  return (
    <div className="min-h-screen primaryWhite-bg-color">
      <NextSeo title="Agency Sign In - Spacify Asia" />

      <DesktopLayout
        hideNav
        // footerPaddingBottom="pb-20"
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
        <div className="container mx-auto xl:pb-8 lg:pb-8 md:pb-8 sm:pb-8 pb-8">
          <div className="grid grid-cols-5 gap-2 pb-7">
            <CustomSelect
              className="col-span-2"
              placeholder={"Property"}
              optionList={propertyOption}
              onChange={onChangePropertyValue}
              // value={stateValue}
            />

            <CustomSelect
              className="col-span-2"
              placeholder={"Unit"}
              optionList={unitOption}
              onChange={onChangeUnitValue}
              // value={stateValue}
            />

            <CustomButton
              buttonClassName="primary-btn"
              buttonText="Reset"
              onClick={onClickReset}
            />
          </div>

          <div className="grid grid-cols-12 xl:gap-8 lg:gap-8 md:gap-8 sm:gap-4 gap-4 relative">
            <div className="xl:col-span-2 lg:col-span-2 md:col-span-3 sm:col-span-3 col-span-4 relative">
              <div className="gap-4 flex flex-col h-screen overflow-y-scroll sticky top-4">
                {map(propertyListing, (list) => {
                  const imageUrl = listingSelector.getImageUrl(list);
                  const name = listingSelector.getName(list);
                  const propertyId = listingSelector.getId(list);

                  return (
                    <div
                      className={`flex flex-col justify-center items-center p-2 global-border-radius border cursor-pointer bg-white ${isEqual(propertyId, selectedPropertyId) ? "border-primary" : "border"}`}
                      onClick={() => onClickSelectProperty(propertyId)}
                    >
                      <CustomImage
                        className="w-16 h-16 overflow-hidden cover"
                        src={
                          isEmpty(imageUrl) ? Images.imageNotFound : imageUrl
                        }
                      />

                      <CustomText
                        textClassName={`text-xs text-center pt-1 ${isEqual(propertyId, selectedPropertyId) ? "text-primary" : "text-black"}`}
                      >
                        {isEmpty(name) ? "-" : name}
                      </CustomText>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="col-span-10 xl:flex lg:flex md:hidden sm:hidden hidden flex-col gap-4 relative">
              {isEmpty(unitListing) ? (
                <div className="flex justify-center items-center h-screen">
                  <CustomEmptyBox />
                </div>
              ) : (
                <div className="flex flex-col gap-4 sticky top-4 ">
                  {map(unitListing, (list) => {
                    const name = listingSelector.getName(list);
                    const rooms = listingSelector.getRooms(list);

                    return (
                      <div className="border global-border-radius overflow-hidden relative">
                        <div className="px-4 pt-4 sticky">
                          <CustomText textClassName="text-base">
                            {isEmpty(name) ? "-" : name}
                          </CustomText>
                        </div>
                        <div className="flex gap-4 overflow-x-scroll p-4">
                          {map(rooms, (room) => {
                            const bathroom = listingSelector.getBathroom(room);
                            const bedType = listingSelector.getBedType(room);
                            const bookingLink =
                              listingSelector.getBookingLink(room);
                            const gender = listingSelector.getGender(room);
                            const isAvailableBook =
                              listingSelector.isAvailableBook(room);
                            const rental = listingSelector.getRental(room);
                            const spaceType =
                              listingSelector.getSpaceType(room);
                            const status = listingSelector.getStatus(room);

                            return (
                              <div
                                className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-occupied-light"} p-4 global-border-radius flex flex-col gap-2 min-w-64`}
                              >
                                <div
                                  className={`flex justify-between items-center pb-2`}
                                >
                                  <CustomText
                                    textClassName={`text-white text-xs ${isAvailableBook ? "bg-available" : "bg-occupied"} py-1 px-2 global-border-radius`}
                                  >
                                    {isAvailableBook
                                      ? "Available"
                                      : "Not Available"}
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
                                        ? () => onClickShareBooking(bookingLink)
                                        : () => {}
                                    }
                                  />
                                </div>

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
                                    src={Images.genderIconActive}
                                    className="w-4"
                                  />
                                  <CustomText textClassName="text-xs">
                                    {isEmpty(gender) ? "-" : gender}
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

            <div className="md:col-span-9 sm:col-span-9 col-span-8 xl:hidden lg:hidden md:block sm:block relative">
              {isEmpty(unitListing) ? (
                <div className="flex justify-center items-center h-screen">
                  <CustomEmptyBox />
                </div>
              ) : (
                <div className="flex flex-col gap-4 sticky top-4 ">
                  {map(unitListing, (list) => {
                    const name = listingSelector.getName(list);
                    const rooms = listingSelector.getRooms(list);

                    return (
                      <div className="collapse border global-border-radius">
                        <input type="checkbox" />
                        <div className="collapse-title">
                          <CustomText textClassName="text-base">
                            {isEmpty(name) ? "-" : name}
                          </CustomText>
                        </div>
                        <div className="collapse-content">
                          <div className="grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
                            {map(rooms, (room) => {
                              const bathroom =
                                listingSelector.getBathroom(room);
                              const bedType = listingSelector.getBedType(room);
                              const bookingLink =
                                listingSelector.getBookingLink(room);
                              const gender = listingSelector.getGender(room);
                              const isAvailableBook =
                                listingSelector.isAvailableBook(room);
                              const rental = listingSelector.getRental(room);
                              const spaceType =
                                listingSelector.getSpaceType(room);
                              const status = listingSelector.getStatus(room);

                              return (
                                <div
                                  className={`${isEqual(status, "vacant") ? "bg-available-light" : "bg-occupied-light"} p-4 global-border-radius flex flex-col gap-2`}
                                >
                                  <div
                                    className={`flex justify-between items-center`}
                                  >
                                    <CustomText
                                      textClassName={`text-white text-xs ${isAvailableBook ? "bg-available" : "bg-occupied"} py-1 px-2 global-border-radius`}
                                    >
                                      {isAvailableBook
                                        ? "Available"
                                        : "Not Available"}
                                    </CustomText>

                                    <CustomImage
                                      src={
                                        isEmpty(isAvailableBook)
                                          ? Images.shareIconActive
                                          : Images.shareIconDisable
                                      }
                                      className="w-4 cursor-pointer"
                                      onClick={
                                        isEmpty(isAvailableBook)
                                          ? () =>
                                              onClickShareBooking(bookingLink)
                                          : () => {}
                                      }
                                    />
                                  </div>

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
                                      src={Images.genderIconActive}
                                      className="w-4"
                                    />
                                    <CustomText textClassName="text-xs">
                                      {isEmpty(gender) ? "-" : gender}
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
                                </div>
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
