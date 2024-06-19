export const getMeterListingRequest = (per_page, page) => ({
  type: "GET_METER_LISTING_REQUEST",
  per_page,
  page,
});

export const getMeterListingSuccess = (data) => ({
  type: "GET_METER_LISTING_SUCCESS",
  data,
});

export const getMeterListingFailure = (messages) => ({
  type: "GET_METER_LISTING_FAILURE",
  messages,
});

export const getMeterOverviewRequest = (id) => ({
  type: "GET_METER_OVERVIEW_REQUEST",
  id,
});

export const getMeterOverviewSuccess = (id, data) => ({
  type: "GET_METER_OVERVIEW_SUCCESS",
  id,
  data,
});

export const getMeterOverviewFailure = (messages) => ({
  type: "GET_METER_OVERVIEW_FAILURE",
  messages,
});
