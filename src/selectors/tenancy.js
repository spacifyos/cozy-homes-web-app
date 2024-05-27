import _ from "lodash";

export const getTenancyListingData = (state) =>
  _.get(state, ["listing", "tenancyListing", "data"], null);
export const getTenancyListingLoading = (state) =>
  _.get(state, ["listing", "tenancyListing", "loading"], false);
