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

export const getListingTagOptionRequest = () => ({
  type: "GET_LISTING_TAG_OPTION_REQUEST",
});

export const getListingTagOptionSuccess = (data) => ({
  type: "GET_LISTING_TAG_OPTION_SUCCESS",
  data,
});

export const getListingTagOptionFailure = (messages) => ({
  type: "GET_LISTING_TAG_OPTION_FAILURE",
  messages,
});

export const getListingPropertyRequest = (postData, page) => ({
  type: "GET_LISTING_PROPERTY_REQUEST",
  postData,
  page,
});

export const getListingPropertySuccess = (data) => ({
  type: "GET_LISTING_PROPERTY_SUCCESS",
  data,
});

export const getListingPropertyFailure = (messages) => ({
  type: "GET_LISTING_PROPERTY_FAILURE",
  messages,
});

export const getListingPropertyDetailRequest = (id) => ({
  type: "GET_LISTING_PROPERTY_DETAIL_REQUEST",
  id,
});

export const getListingPropertyDetailSuccess = (id, data) => ({
  type: "GET_LISTING_PROPERTY_DETAIL_SUCCESS",
  id,
  data,
});

export const getListingPropertyDetailFailure = (messages) => ({
  type: "GET_LISTING_PROPERTY_DETAIL_FAILURE",
  messages,
});

export const getListingCancellationRequest = () => ({
  type: "GET_LISTING_CANCELLATION_REQUEST",
});

export const getListingCancellationSuccess = (data) => ({
  type: "GET_LISTING_CANCELLATION_SUCCESS",
  data,
});

export const getListingCancellationFailure = (messages) => ({
  type: "GET_LISTING_CANCELLATION_FAILURE",
  messages,
});

export const getBookingOverviewRequest = (id) => ({
  type: "GET_BOOKING_OVERVIEW_REQUEST",
  id,
});

export const getBookingOverviewSuccess = (id, data) => ({
  type: "GET_BOOKING_OVERVIEW_SUCCESS",
  id,
  data,
});

export const getBookingOverviewFailure = (messages) => ({
  type: "GET_BOOKING_OVERVIEW_FAILURE",
  messages,
});
