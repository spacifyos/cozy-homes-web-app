import api from "@/src/services/httpUtilities/httpService";
import _ from "lodash";
import Toast from "@/src/utils/Toast";
import { apiRequestErrorResponse } from "@/src/services/httpUtilities/apiRequestErrorResponse";

const apiRequest = async (
  api,
  setLoading,
  successCallback = () => {},
  errorCallback = () => {},
  successMessage = "",
  ignoreSuccessMessage = false,
) => {
  try {
    setLoading(true);
    const res = await api;

    const data = _.get(res, ["data", "data"], "");
    const code = _.get(res, ["data", "code"], 0);
    const message = _.get(res, ["data", "message"], "");

    if (code === 200 || code === 204) {
      setLoading(false);
      successCallback(data);

      if (!ignoreSuccessMessage) {
        Toast.success(_.isEmpty(message) ? successMessage : message);
      }
    }
  } catch (err) {
    setLoading(false);
    errorCallback();
    apiRequestErrorResponse(err, false);
  }
};

const signInRequest = async (postData, setLoading, successCallback) => {
  await apiRequest(api.signInAccount(postData), setLoading, successCallback);
};

const signUpRequest = async (postData, setLoading, successCallback) => {
  await apiRequest(api.signUpAccount(postData), setLoading, successCallback);
};

const postChangePasswordRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postChangePassword(postData),
    setLoading,
    successCallback,
  );
};

const postEditProfileRequest = async (postData, setLoading) => {
  await apiRequest(api.postEditProfile(postData), setLoading);
};

const postBookingCreateRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postBookingCreate(postData),
    setLoading,
    successCallback,
  );
};

const postOtpRequest = async (postData, setLoading, successCallback) => {
  await apiRequest(api.postOtpRequest(postData), setLoading, successCallback);
};

const postOtpVerify = async (postData, setLoading, successCallback) => {
  await apiRequest(api.postOtpVerify(postData), setLoading, successCallback);
};

const postAuthVerify = async (postData, setLoading, successCallback) => {
  await apiRequest(api.postAuthVerify(postData), setLoading, successCallback);
};

const postForgotPasswordRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postForgotPassword(postData),
    setLoading,
    successCallback,
  );
};

const getInvoicePaymentLinkRequest = async (
  code,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getInvoicePaymentLink(code),
    setLoading,
    successCallback,
  );
};

const postSyncMeterRequest = async (id, setLoading, successCallback) => {
  await apiRequest(api.postSyncMeter(id), setLoading, successCallback);
};

const postMeterTopUpRequest = async (
  id,
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.postMeterTopUp(id, postData),
    setLoading,
    successCallback,
  );
};

export default {
  signInRequest,
  signUpRequest,
  postChangePasswordRequest,
  postEditProfileRequest,
  postBookingCreateRequest,
  postOtpRequest,
  postOtpVerify,
  postAuthVerify,
  postForgotPasswordRequest,
  getInvoicePaymentLinkRequest,
  postSyncMeterRequest,
  postMeterTopUpRequest,
};
