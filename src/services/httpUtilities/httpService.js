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

const signInAccount = (data) => apiInstance.post("/auth/login", data);

const signUpAccount = (data) => apiInstance.post("/auth/register", data);

const postOtpRequest = (data) => apiInstance.post("/otp", data);

const getUserProfile = () => apiInstance.get("/user-profile");

const postChangePassword = (postData) =>
  apiInstance.patch("/user-profile/password", postData);

const postEditProfile = (postData) =>
  apiInstance.patch("/user-profile", postData);

const getListing = () => apiInstance.get("/listing");

const getListingBanner = () => apiInstance.get("/listing/banner");

const getListingTagOption = () => apiInstance.post("/listing/tag-options");

const getListingProperty = (postData) =>
  apiInstance.post("/listing/property-listings", postData);

const getListingPropertyDetail = (id) =>
  apiInstance.get(`/listing/property-details/${id}`);

const getListingCancellation = () => apiInstance.get(`/listing/cancellation`);

const getBookingOverview = (id) => apiInstance.get(`/${id}`);

export default {
  signUpAccount,
  setHeaderLanguage,
  getCommonData,
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
};
