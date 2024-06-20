export const getAgreementListingRequest = (
  status,
  perPage,
  page,
  filterParams,
) => ({
  type: "GET_AGREEMENT_LISTING_REQUEST",
  status,
  perPage,
  page,
  filterParams,
});

export const getAgreementListingSuccess = (data, status) => ({
  type: "GET_AGREEMENT_LISTING_SUCCESS",
  data,
  status,
});

export const getAgreementListingFailure = (messages) => ({
  type: "GET_AGREEMENT_LISTING_FAILURE",
  messages,
});

export const getAgreementOverviewRequest = (id) => ({
  type: "GET_AGREEMENT_OVERVIEW_REQUEST",
  id,
});

export const getAgreementOverviewSuccess = (id, data) => ({
  type: "GET_AGREEMENT_OVERVIEW_SUCCESS",
  id,
  data,
});

export const getAgreementOverviewFailure = (messages) => ({
  type: "GET_AGREEMENT_OVERVIEW_FAILURE",
  messages,
});
