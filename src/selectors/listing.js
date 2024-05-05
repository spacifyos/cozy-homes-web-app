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

export const getPopularUniCollege = (state) =>
  _.get(state, ["uni_college_profile"], []);
export const getPopularCondo = (state) => _.get(state, ["popular_condo"], []);
export const getName = (state) => _.get(state, ["name"], "");
export const getImageUrl = (state) => _.get(state, ["image_url"], "");
export const getPropertyId = (state) => _.get(state, ["property_id"], 0);
export const getFacilityTag = (state) => _.get(state, ["facility_tags"], []);
export const getGeneralTag = (state) => _.get(state, ["facility_tags"], []);
export const getCode = (state) => _.get(state, ["code"], "");
