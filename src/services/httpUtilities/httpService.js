import apiInstance, {
  AUTH_TOKEN_HEADER,
  AUTH_AGENT_TOKEN_HEADER,
} from "./httpManager";
import _ from "lodash";
import httpManager from "./httpManager";

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

const loginAccount = (data) => apiInstance.post("/oauth/token", data);

const signUpAccount = (data) => apiInstance.post("/auth/register", data);

const getUserProfile = () => apiInstance.get("/self");

export default {
  signUpAccount,
  setHeaderLanguage,
  getCommonData,
  getUserProfile,
  loginAccount,
};
