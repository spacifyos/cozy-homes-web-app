export const getInvoiceListingRequest = () => ({
  type: "GET_INVOICE_LISTING_REQUEST",
});

export const getInvoiceListingSuccess = (data) => ({
  type: "GET_INVOICE_LISTING_SUCCESS",
  data,
});

export const getInvoiceListingFailure = (messages) => ({
  type: "GET_INVOICE_LISTING_FAILURE",
  messages,
});

export const getInvoiceOverviewRequest = (id) => ({
  type: "GET_INVOICE_OVERVIEW_REQUEST",
  id,
});

export const getInvoiceOverviewSuccess = (id, data) => ({
  type: "GET_INVOICE_OVERVIEW_SUCCESS",
  id,
  data,
});

export const getInvoiceOverviewFailure = (messages) => ({
  type: "GET_INVOICE_OVERVIEW_FAILURE",
  messages,
});

export const getInvoiceSummaryRequest = () => ({
  type: "GET_INVOICE_SUMMARY_REQUEST",
});

export const getInvoiceSummarySuccess = (data) => ({
  type: "GET_INVOICE_SUMMARY_SUCCESS",
  data,
});

export const getInvoiceSummaryFailure = (messages) => ({
  type: "GET_INVOICE_SUMMARY_FAILURE",
  messages,
});
