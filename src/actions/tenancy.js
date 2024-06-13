export const getTenancyListingRequest = () => ({
  type: "GET_TENANCY_LISTING_REQUEST",
});

export const getTenancyListingSuccess = (data) => ({
  type: "GET_TENANCY_LISTING_SUCCESS",
  data,
});

export const getTenancyListingFailure = (messages) => ({
  type: "GET_TENANCY_LISTING_FAILURE",
  messages,
});

export const getTenancyOverviewRequest = (id) => ({
  type: "GET_TENANCY_OVERVIEW_REQUEST",
  id,
});

export const getTenancyOverviewSuccess = (code, data) => ({
  type: "GET_TENANCY_OVERVIEW_SUCCESS",
  code,
  data,
});

export const getTenancyOverviewFailure = (messages) => ({
  type: "GET_TENANCY_OVERVIEW_FAILURE",
  messages,
});
