import _ from "lodash";

export const getListingData = (state) =>
  _.get(state, ["listing", "listing", "data"], null);
export const getListingDataLoading = (state) =>
  _.get(state, ["listing", "listing", "loading"], false);

export const getListingBannerData = (state) =>
  _.get(state, ["listing", "listingBanner", "data"], null);
export const getListingBannerDataLoading = (state) =>
  _.get(state, ["listing", "listingBanner", "loading"], false);

export const getListingTagOptionData = (state) =>
  _.get(state, ["listing", "listingTagOption", "data"], null);
export const getListingTagOptionDataLoading = (state) =>
  _.get(state, ["listing", "listingTagOption", "loading"], false);

export const getListingPropertyData = (state) =>
  _.get(state, ["listing", "listingProperty", "data"], null);
export const getListingPropertyDataLoading = (state) =>
  _.get(state, ["listing", "listingProperty", "loading"], false);

export const getListingPropertyDetailData = (state, id) =>
  _.get(state, ["listing", "listingPropertyDetail", id, "data"], null);
export const getListingPropertyDetailDataLoading = (state) =>
  _.get(state, ["listing", "listingPropertyDetail", "loading"], false);

export const getListingCancellationData = (state) =>
  _.get(state, ["listing", "listingCancellation", "data"], null);
export const getListingCancellationDataLoading = (state) =>
  _.get(state, ["listing", "listingCancellation", "loading"], false);

export const getPopularUniCollege = (state) =>
  _.get(state, ["uni_college_profile"], []);
export const getPopularCondo = (state) => _.get(state, ["popular_condo"], []);
export const getName = (state) => _.get(state, ["name"], "");
export const getImageUrl = (state) => _.get(state, ["image_url"], "");
export const getImageUrlActive = (state) =>
  _.get(state, ["image_url_active"], "");
export const getImagesUrl = (state) => _.get(state, ["images_url"], []);
export const getId = (state) => _.get(state, ["id"], 0);
export const getPropertyId = (state) => _.get(state, ["property_id"], 0);
export const getProfileId = (state) => _.get(state, ["profile_id"], "");
export const getFacilityTag = (state) => _.get(state, ["facility_tags"], []);
export const getGeneralTag = (state) => _.get(state, ["general_tags"], []);
export const getCode = (state) => _.get(state, ["code"], "");
export const getDescription = (state) => _.get(state, ["description"], "");
export const getRental = (state) => _.get(state, ["rental"], "");
export const getFees = (state) => _.get(state, ["fees"], "");
export const getRecommended = (state) => _.get(state, ["recommended"], []);
export const getFacilities = (state) => _.get(state, ["facilities"], []);
export const getBathroom = (state) => _.get(state, ["bathroom"], "");
export const getBedType = (state) => _.get(state, ["bed_type"], "");
export const getPropertyName = (state) => _.get(state, ["property_name"], "");
export const getUnitRoomName = (state) => _.get(state, ["unit_room_name"], "");
export const getGender = (state) => _.get(state, ["gender"], "");
export const getAddress = (state) => _.get(state, ["address"], "");
export const getPicMemberStartDate = (state) =>
  _.get(state, ["pic_member_start_date"], new Date());
export const getPicName = (state) => _.get(state, ["pic_name"], "");
export const getContactNumber = (state) => _.get(state, ["contact_number"], "");
export const getHtmlContent = (state) => _.get(state, ["html_content"], "");
