import _ from "lodash";

export const getTenancyListingData = (state) =>
  _.get(state, ["tenancy", "tenancyListing", "data"], null);
export const getTenancyListingLoading = (state) =>
  _.get(state, ["tenancy", "tenancyListing", "loading"], false);

export const getTenancyOverviewData = (state, id) =>
  _.get(state, ["tenancy", "tenancyOverview", id, "data"], null);
export const getTenancyOverviewLoading = (state) =>
  _.get(state, ["tenancy", "tenancyOverview", "loading"], false);

export const getName = (state) => _.get(state, ["name"], "");
export const getAddress = (state) => _.get(state, ["address"], "");
export const getTenancyCode = (state) => _.get(state, ["tenancy_code"], "");
export const getTenancyPeriod = (state) => _.get(state, ["tenancy_period"], "");
export const getRentalFee = (state) => _.get(state, ["rental_fee"], "");
export const getTenancyRemainingDay = (state) =>
  _.get(state, ["tenancy_remaining_day"], "");
export const getCreatedAt = (state) => _.get(state, ["created_at"], "");
