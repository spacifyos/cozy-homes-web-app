import _ from "lodash";

export const getInvoiceListingData = (state, paymentStatus) =>
  _.get(state, ["invoice", "invoiceListing", paymentStatus, "data"], null);
export const getInvoiceListingPagination = (state, paymentStatus) =>
  _.get(
    state,
    ["invoice", "invoiceListing", paymentStatus, "pagination"],
    null,
  );
export const getInvoiceListingLoading = (state, paymentStatus) =>
  _.get(state, ["invoice", "invoiceListing", paymentStatus, "loading"], false);

export const getInvoiceSummaryData = (state) =>
  _.get(state, ["invoice", "invoiceSummary", "data"], null);
export const getInvoiceSummaryLoading = (state) =>
  _.get(state, ["invoice", "invoiceSummary", "loading"], false);

export const getInvoiceOverviewData = (state, id) =>
  _.get(state, ["invoice", "invoiceOverview", id, "data"], null);
export const getInvoiceOverviewLoading = (state) =>
  _.get(state, ["invoice", "invoiceOverview", "loading"], false);

export const getId = (state) => _.get(state, ["id"], "");
export const getItems = (state) => _.get(state, ["items"], []);
export const getInvoiceNumber = (state) => _.get(state, ["invoice_number"], "");
export const getStatus = (state) => _.get(state, ["status"], "");
export const getPaymentStatus = (state) => _.get(state, ["payment_status"], "");
export const getIsPaid = (state) => _.get(state, ["is_paid"], "");
export const getRentalFee = (state) => _.get(state, ["rental_fee"], "");
export const getInvoiceDate = (state) => _.get(state, ["invoice_date"], "");
export const getDueDate = (state) => _.get(state, ["invoice_due_date"], "");
export const getUpdatedAt = (state) => _.get(state, ["updated_at"], "");
export const getTotalPay = (state) => _.get(state, ["total_pay"], "");
export const getOverdue = (state) => _.get(state, ["overdue"], "");
export const getDueSoon = (state) => _.get(state, ["due_Soon"], "");
export const getBillTo = (state) => _.get(state, ["bill_to"], "");
export const getProperty = (state) => _.get(state, ["property"], "");
export const getTenancyCode = (state) => _.get(state, ["tenancy_code"], "");
export const getSchedule = (state) => _.get(state, ["schedule"], "");
export const getGrandtotal = (state) => _.get(state, ["grand_total"], "");
export const getTax = (state) => _.get(state, ["tax_amount"], "");
export const getTotalAmount = (state) => _.get(state, ["total_amount"], "");
export const getName = (state) => _.get(state, ["name"], "");
export const getTotalAmountText = (state) =>
  _.get(state, ["total_amount_text"], "");
export const getHasMorePages = (state) =>
  _.get(state, ["has_more_pages"], false);
export const getTotalPage = (state) => _.get(state, ["total"], 1);
export const getCurrentPage = (state) => _.get(state, ["current_page"], 1);
export const getLastPage = (state) => _.get(state, ["last_page"], 1);
export const getUrl = (state) => _.get(state, ["url"], "");
