import _ from "lodash";

export const getSmartMeterListingData = (state) =>
  _.get(state, ["meter", "smartMeterListing", "data"], null);
export const getSmartMeterListingPagination = (state) =>
    _.get(state, ["meter", "smartMeterListing", "pagination"], null);
export const getSmartMeterListingLoading = (state) =>
  _.get(state, ["meter", "smartMeterListing", "loading"], false);

export const getSmartMeterOverviewData = (state, id) =>
  _.get(state, ["meter", "smartMeterOverview", id, "data"], null);
export const getSmartMeterOverviewLoading = (state) =>
  _.get(state, ["meter", "smartMeterOverview", "loading"], false);
