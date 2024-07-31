import apiInstance, {
  AUTH_TOKEN_HEADER,
  AUTH_AGENT_TOKEN_HEADER,
} from "./httpManager";
import { includes, isEmpty, isEqual } from "lodash";

/**
 * To update language in api header
 * @param locale
 */
const setHeaderLanguage = (locale) => {
  apiInstance.defaults.headers["Accept-Language"] = locale;
};

/**
 * To get common data
 */
const getRootData = () => apiInstance.get(`/root`);

const getSelectOption = () => apiInstance.get(`/select-options`);

const signInAccount = (data) => apiInstance.post("/auth/login", data);

const signUpAccount = (data) => apiInstance.post("/auth/register", data);

const postOtpRequest = (data) => apiInstance.post("/otp", data);

const postOtpVerify = (data) => apiInstance.post("/otp/verify", data);

const postAuthVerify = (data) => apiInstance.post("/auth/verify", data);

const postForgotPassword = (postData) =>
  apiInstance.post(`/auth/forgot-password`, postData);

const getUserProfile = () => apiInstance.get("/user-profile");

const patchUserPinNumber = (postData) =>
  apiInstance.patch("/user-profile/pin-number", postData);

const postChangePassword = (postData) =>
  apiInstance.patch("/user-profile/password", postData);

const postEditProfile = (postData) =>
  apiInstance.patch("/user-profile", postData);

const getListing = () => apiInstance.get("/listing");

const getListingBanner = () => apiInstance.get("/listing/banner");

const getListingTagOption = () => apiInstance.post("/listing/tag-options");

const getListingProperty = (postData, page) =>
  apiInstance.post(
    `/listing/property-listings?per_page=12&page=${page}`,
    postData,
  );

const getListingPropertyDetail = (id) =>
  apiInstance.get(`/listing/property-details/${id}`);

const getListingCancellation = () => apiInstance.get(`/listing/cancellation`);

const getBookingOverview = (id) => apiInstance.get(`/booking/${id}`);

const postBookingCreate = (postData) =>
  apiInstance.post(`/booking/create`, postData);

const getGalleryLinkRequest = () => apiInstance.get("/gallery");

const getTenancyListing = () => apiInstance.get("/tenancy");

const getTenancyOverview = (id) => apiInstance.get(`/tenancy/${id}`);

const getInvoiceSummary = () => apiInstance.get("/invoice/summary");

const getInvoiceListing = (paymentStatus, perPage, page, filterParams = {}) => {
  const status = includes(paymentStatus, "All")
    ? ""
    : includes(paymentStatus, "Unpaid")
      ? "&payment_status[]=1&payment_status[]=2"
      : "&payment_status[]=3";

  const { invoiceNumber, dateFrom, dateTo } = filterParams;

  return apiInstance.get(
    `/invoice?per_page=${perPage}${status}&page=${page}&invoice_number=${isEmpty(invoiceNumber) ? "" : invoiceNumber}&date_from=${isEmpty(dateFrom) ? "" : dateFrom}&date_to=${isEmpty(dateTo) ? "" : dateTo}`,
  );
};

const getInvoiceOverview = (id) => apiInstance.get(`/invoice/${id}`);

const getInvoicePaymentLink = (code) =>
  apiInstance.get(`/invoice/${code}/make-payment`);

const getMeterListing = (per_page, page) =>
  apiInstance.get(`/meter?per_page=${per_page}&page=${page}`);

const getMeterOverview = (id) => apiInstance.get(`/meter/${id}`);

const postSyncMeter = (id) => apiInstance.post(`/meter/${id}/sync-meter`);

const postMeterTopUp = (id, postData) =>
  apiInstance.post(`/meter/${id}/top-up`, postData);

const getAgreementListing = (status, perPage, page) => {
  return apiInstance.get(
    `/agreement?per_page=${perPage}&status=${status}&page=${page}`,
  );
};

const getAgreementOverview = (id) => apiInstance.get(`/agreement/${id}`);

const getAgreementPdf = (id) => apiInstance.get(`/agreement/${id}/pdf`);

const getAgreementPdfDownload = (id) =>
  apiInstance.get(`/agreement/${id}/download`);

const postAgreeAgreement = (id) => apiInstance.post(`/agreement/${id}/agree`);

const postSignAgreement = (id, postData) =>
  apiInstance.post(`/agreement/${id}/sign`, postData);

const getOwnerPropertyList = () => apiInstance.get(`/owner`);

const getOwnerPropertyOverview = (id) =>
  apiInstance.get(`/owner/property/${id}`);

const getOwnerTransaction = () => apiInstance.get(`/owner/transaction`);

export default {
  signUpAccount,
  setHeaderLanguage,
  getRootData,
  getSelectOption,
  getUserProfile,
  postChangePassword,
  postEditProfile,
  signInAccount,
  getListing,
  getListingBanner,
  getListingTagOption,
  getListingProperty,
  getListingPropertyDetail,
  getListingCancellation,
  getBookingOverview,
  postBookingCreate,
  getGalleryLinkRequest,
  postOtpRequest,
  postOtpVerify,
  postAuthVerify,
  postForgotPassword,
  getTenancyListing,
  getTenancyOverview,
  getInvoiceSummary,
  getInvoiceListing,
  getInvoiceOverview,
  getInvoicePaymentLink,
  getMeterListing,
  getMeterOverview,
  postSyncMeter,
  postMeterTopUp,
  getAgreementListing,
  getAgreementOverview,
  getAgreementPdf,
  getAgreementPdfDownload,
  postAgreeAgreement,
  postSignAgreement,
  patchUserPinNumber,
  getOwnerPropertyList,
  getOwnerPropertyOverview,
  getOwnerTransaction,
};
