import _ from "lodash";

export const getTenancyListingData = (state) =>
  _.get(state, ["tenancy", "tenancyListing", "data"], null);
export const getTenancyListingLoading = (state) =>
  _.get(state, ["tenancy", "tenancyListing", "loading"], false);

export const getTenancyOverviewData = (state, code) =>
  _.get(state, ["tenancy", "tenancyOverview", code, "data"], null);
export const getTenancyOverviewLoading = (state) =>
  _.get(state, ["tenancy", "tenancyOverview", "loading"], false);

export const getName = (state) => _.get(state, ["name"], "");
export const getPropertyName = (state) =>
  _.get(state, ["property", "name"], "");
export const getUnitName = (state) => _.get(state, ["unit", "name"], "");
export const getRoomName = (state) => _.get(state, ["room", "name"], "");
export const getAddress = (state) => _.get(state, ["address"], "");
export const getTenancyCode = (state) => _.get(state, ["code"], "");
export const getTenancyPeriod = (state) => _.get(state, ["period"], "");
export const getInitialRentalFee = (state) =>
  _.get(state, ["initial_rental_fee"], "");
export const getTenancyRemainingDay = (state) =>
  _.get(state, ["remaining_days"], "");
export const getCreatedAt = (state) => _.get(state, ["created_at"], "");
