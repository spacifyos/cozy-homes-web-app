import _ from "lodash";

export const getInvoiceListingData = (state) =>
    _.get(state, ["invoice", "tenancyListing", "data"], null);
export const getInvoiceListingLoading = (state) =>
    _.get(state, ["invoice", "tenancyListing", "loading"], false);

export const getInvoiceOverviewData = (state, id) =>
    _.get(state, ["invoice", "tenancyOverview", id, "data"], null);
export const getInvoiceOverviewLoading = (state) =>
    _.get(state, ["invoice", "tenancyOverview", "loading"], false);
