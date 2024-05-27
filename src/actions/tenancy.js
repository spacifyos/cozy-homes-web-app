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
