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

export const getName = (state) => _.get(state, ["name"], "");
export const getWifi = (state) => _.get(state, ["wifi"], "");
export const getPower = (state) => _.get(state, ["power"], "");
export const getBalanceUnit = (state) => _.get(state, ["balance_unit"], "");
export const getCreatedAt = (state) => _.get(state, ["created_at"], "");
export const getTotalUnit = (state) => _.get(state, ["total_unit"], "");
export const getTotalUsage = (state) => _.get(state, ["total_usage"], "");
