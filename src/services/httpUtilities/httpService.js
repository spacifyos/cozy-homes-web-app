import apiInstance, {
  AUTH_TOKEN_HEADER,
  AUTH_AGENT_TOKEN_HEADER,
} from "./httpManager";
import _ from "lodash";

const version = "v1";

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
const getCommonData = () => apiInstance.get(`${version}/common`);
const getSelectOption = () => apiInstance.get(`/select-options`);

const signInAccount = (data) => apiInstance.post("/auth/login", data);

const signUpAccount = (data) => apiInstance.post("/auth/register", data);

const postOtpRequest = (data) => apiInstance.post("/otp", data);

const postOtpVerify = (data) => apiInstance.post("/auth/verify", data);

const postForgotPassword = (postData) =>
  apiInstance.post(`/auth/forgot-password`, postData);

const getUserProfile = () => apiInstance.get("/user-profile");

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

const getTenancyOverview = (code) => apiInstance.get(`/tenancy/${code}`);

const getInvoiceSummary = () => apiInstance.get("/invoice/summary");

export default {
  signUpAccount,
  setHeaderLanguage,
  getCommonData,
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
  postForgotPassword,
  getTenancyListing,
  getTenancyOverview,
  getInvoiceSummary,
};
