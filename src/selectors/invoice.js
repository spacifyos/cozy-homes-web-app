import _ from "lodash";

export const getInvoiceListingData = (state) =>
  _.get(state, ["invoice", "tenancyListing", "data"], null);
export const getInvoiceListingPagination = (state) =>
  _.get(state, ["invoice", "tenancyListing", "pagination"], null);
export const getInvoiceListingLoading = (state) =>
  _.get(state, ["invoice", "tenancyListing", "loading"], false);

export const getInvoiceOverviewData = (state, id) =>
  _.get(state, ["invoice", "tenancyOverview", id, "data"], null);
export const getInvoiceOverviewLoading = (state) =>
  _.get(state, ["invoice", "tenancyOverview", "loading"], false);

export const getInvoiceNumber = (state) => _.get(state, ["invoice_number"], "");
export const getStatus = (state) => _.get(state, ["status"], "");
export const getIsPaid = (state) => _.get(state, ["is_paid"], "");
export const getRentalFee = (state) => _.get(state, ["rental_fee"], "");
export const getDueDate = (state) => _.get(state, ["due_date"], "");
export const getUpdatedAt = (state) => _.get(state, ["updated_at"], "");
export const getTotalPay = (state) => _.get(state, ["total_pay"], "");
export const getOverdue = (state) => _.get(state, ["overdue"], "");
export const getDueSoon = (state) => _.get(state, ["due_Soon"], "");
export const getBillTo = (state) => _.get(state, ["bill_to"], "");
export const getProperty = (state) => _.get(state, ["property"], "");
export const getTenancyCode = (state) => _.get(state, ["tenancy_code"], "");
export const getSchedule = (state) => _.get(state, ["schedule"], "");
export const getSubtotal = (state) => _.get(state, ["subtotal"], "");
export const getTax = (state) => _.get(state, ["tax"], "");
export const getTotalAmount = (state) => _.get(state, ["total_amount"], "");
