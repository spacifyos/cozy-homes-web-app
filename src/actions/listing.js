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
