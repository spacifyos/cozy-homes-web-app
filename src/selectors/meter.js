import _ from "lodash";

export const getMeterListingData = (state) =>
  _.get(state, ["meter", "meterListing", "data"], null);
export const getMeterListingPagination = (state) =>
  _.get(state, ["meter", "meterListing", "pagination"], null);
export const getMeterListingLoading = (state) =>
  _.get(state, ["meter", "meterListing", "loading"], false);

export const getMeterOverviewData = (state, id) =>
  _.get(state, ["meter", "meterOverview", id, "data"], null);
export const getMeterOverviewLoading = (state) =>
  _.get(state, ["meter", "meterOverview", "loading"], false);

export const getId = (state) => _.get(state, ["id"], "");
export const getName = (state) => _.get(state, ["name"], "");
export const getWifi = (state) => _.get(state, ["is_online"], "");
export const getPower = (state) => _.get(state, ["is_relay_connected"], "");
export const getBalanceUnit = (state) => _.get(state, ["remaining_unit"], "");
export const getSerialNumber = (state) => _.get(state, ["vendor_meter_id"], "");
export const getCreatedAt = (state) => _.get(state, ["created_at"], "");
export const getTotalUnit = (state) => _.get(state, ["total_unit"], "");
export const getUnitPrice = (state) => _.get(state, ["unit_price"], "0");
export const getLastConnectAt = (state) => _.get(state, ["last_connected_at"], "");
export const getTotalUsage = (state) => _.get(state, ["total_usage"], "");
export const getHasMorePages = (state) =>
  _.get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => _.get(state, ["total"], 1);
export const getCurrentPage = (state) => _.get(state, ["current_page"], 1);
export const getLastPage = (state) => _.get(state, ["last_page"], 1);
export const getPropertyName = (state) => _.get(state, ["property_name"], 1);
export const getUrl = (state) => _.get(state, ["url"], "");

