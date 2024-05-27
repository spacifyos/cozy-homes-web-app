import _ from "lodash";

export const getTenancyListingData = (state) =>
  _.get(state, ["tenancy", "tenancyListing", "data"], null);
export const getTenancyListingLoading = (state) =>
  _.get(state, ["tenancy", "tenancyListing", "loading"], false);

export const getTenancyOverviewData = (state, id) =>
  _.get(state, ["tenancy", "tenancyOverview", id, "data"], null);
export const getTenancyOverviewLoading = (state) =>
  _.get(state, ["tenancy", "tenancyOverview", "loading"], false);
