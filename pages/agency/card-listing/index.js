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
import FilterSection from "@/components/PropertyCardView/FilterSection";
import PropertySelectionComponent from "@/components/PropertyCardView/PropertySelectionComponent";
import DesktopUnitContent from "@/components/PropertyCardView/DesktopUnitContent";
import MobileUnitContent from "@/components/PropertyCardView/MobileUnitContent";
import CinemaUnitContent from "@/components/PropertyCardView/CinemaUnitContent";
import CardViewModal from "@/components/PropertyCardView/CardViewModal";
import Helper from "@/src/utils/Helper";

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

  const [selectedRoom, setSelectedRoom] = useState(null);
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
  const [isCinemaView, setIsCinemaView] = useState(false);

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

  const onClickSelectRoomDetail = (data) => {
    setSelectedRoom(data);

    Helper.documentGetElementById("card_view_modal").showModal();
  };

  const onChangeViewMode = (e) => {
    setIsCinemaView(!isCinemaView);
  };

  return (
    <div className="min-h-screen bg-white">
      <NextSeo title="Agency Property Card View - Spacify Asia" />

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
          <FilterSection
            isOpenFilter={isOpenFilter}
            setIsOpenFilter={setIsOpenFilter}
            propertyOption={propertyOption}
            onChangePropertyValue={onChangePropertyValue}
            propertyValue={propertyValue}
            unitOption={unitOption}
            onChangeUnitValue={onChangeUnitValue}
            unitValue={unitValue}
            bedroomOption={bedroomOption}
            onChangeBedroomValue={onChangeBedroomValue}
            bedroomValue={bedroomValue}
            bathroomOption={bathroomOption}
            onChangeBathroomValue={onChangeBathroomValue}
            bathroomValue={bathroomValue}
            onChangeStatusValue={onChangeStatusValue}
            statusValue={statusValue}
            onClickReset={onClickReset}
          />

          <div className="flex justify-end items-center pb-4">
            <label className="cursor-pointer flex items-center gap-2">
              <input
                onChange={onChangeViewMode}
                type="checkbox"
                checked={isCinemaView}
                className="toggle"
              />
              <span className="xl:text-sm lg:text-sm md:text-sm sm:text-xs text-xs text-black">
                {`${isCinemaView ? "Cinema" : "Card"} View`}
              </span>
            </label>
          </div>

          <div className="grid grid-cols-12 xl:gap-8 lg:gap-8 md:gap-8 sm:gap-4 gap-4 relative pb-4">
            <PropertySelectionComponent
              propertyListing={propertyListing}
              onClickSelectProperty={onClickSelectProperty}
              selectedPropertyId={selectedPropertyId}
            />

            {isCinemaView ? (
              <CinemaUnitContent
                unitListing={unitListing}
                onClickSelectRoomDetail={onClickSelectRoomDetail}
              />
            ) : (
              <>
                <DesktopUnitContent
                  unitListing={unitListing}
                  onClickShareBooking={onClickShareBooking}
                />
                <MobileUnitContent
                  unitListing={unitListing}
                  onClickShareBooking={onClickShareBooking}
                />
              </>
            )}
          </div>
        </div>

        <CardViewModal
          data={selectedRoom}
          onClickShareBooking={onClickShareBooking}
        />
      </DesktopLayout>
    </div>
  );
};

export default withTranslation("common")(AgencyAuthWrapper(CardListing));
