import _ from "lodash";
export const getListingBannerData = (state) =>
  _.get(state, ["listing", "listingBanner", "data"], null);

export const getListingBannerDataLoading = (state) =>
  _.get(state, ["listing", "listingBanner", "loading"], false);
