import { get } from "lodash";

export const getAgreementListingData = (state, status) =>
  get(state, ["agreement", "agreementListing", status, "data"], null);
export const getAgreementListingPagination = (state, status) =>
  get(state, ["agreement", "agreementListing", status, "pagination"], null);
export const getAgreementListingLoading = (state, status) =>
  get(state, ["agreement", "agreementListing", status, "loading"], false);

export const getAgreementOverviewData = (state, id) =>
  get(state, ["agreement", "agreementOverview", id, "data"], null);
export const getAgreementOverviewLoading = (state) =>
  get(state, ["agreement", "agreementOverview", "loading"], false);

export const getReferenceNumber = (state) => get(state, ["reference_number"], "");
export const getStatus = (state) => get(state, ["status"], "");
export const getProperty = (state) => get(state, ["property"], "");
export const getTenurePeriod = (state) => get(state, ["tenure_period"], "");
export const getAgree = (state) => get(state, ["agree"], false);
export const getSigned = (state) => get(state, ["code"], false);
export const getService = (state) => get(state, ["service"], "");
export const getDate = (state) => get(state, ["date"], "");
export const getAgreeDate = (state) => get(state, ["agree_date"], "");
export const getSignedDate = (state) => get(state, ["signed_date"], "");
export const getTenantName = (state) => get(state, ["tenant_name"], "");
export const getStampingStatus = (state) => get(state, ["stamping_status"], "");
