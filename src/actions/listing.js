export const getListingRequest = () => ({
  type: "GET_LISTING_REQUEST",
});

export const getListingSuccess = (data) => ({
  type: "GET_LISTING_SUCCESS",
  data,
});

export const getListingFailure = (messages) => ({
  type: "GET_LISTING_FAILURE",
  messages,
});

export const getListingBannerRequest = () => ({
  type: "GET_LISTING_BANNER_REQUEST",
});

export const getListingBannerSuccess = (data) => ({
  type: "GET_LISTING_BANNER_SUCCESS",
  data,
});

export const getListingBannerFailure = (messages) => ({
  type: "GET_LISTING_BANNER_FAILURE",
  messages,
});
