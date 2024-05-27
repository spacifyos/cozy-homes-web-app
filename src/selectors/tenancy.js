import _ from "lodash";

export const getTenancyListingData = (state) =>
  _.get(state, ["listing", "tenancyListing", "data"], null);
export const getTenancyListingLoading = (state) =>
  _.get(state, ["listing", "tenancyListing", "loading"], false);

export const getBookingOverviewData = (state, id) =>
  _.get(state, ["listing", "tenancyOverview", id, "data"], null);
export const getBookingOverviewLoading = (state) =>
  _.get(state, ["listing", "tenancyOverview", "loading"], false);
