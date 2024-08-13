import api from "@/src/services/httpUtilities/httpService";
import _, { isEmpty, get } from "lodash";
import Toast from "@/src/utils/Toast";
import { apiRequestErrorResponse } from "@/src/services/httpUtilities/apiRequestErrorResponse";
import axios from "axios";
import moment from "moment";

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

    const status = get(res, ["status"], 0);
    const data = get(res, ["data", "data"], "");
    const config = get(res, ["data", "config"], "");
    const code = get(res, ["data", "code"], 0);
    const message = get(res, ["data", "message"], "");

    if (status === 200 || code === 200 || code === 204) {
      setLoading(false);
      successCallback(isEmpty(data) ? config : data);

      if (!ignoreSuccessMessage) {
        Toast.success(isEmpty(message) ? successMessage : message);
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
  failureCallback,
) => {
  await apiRequest(
    api.postChangePassword(postData),
    setLoading,
    successCallback,
    failureCallback,
  );
};

const postEditProfileRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(api.postEditProfile(postData), setLoading, successCallback);
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

const getRootDataRequest = async (
  setLoading,
  successCallback,
  successMessage = "Success",
) => {
  await apiRequest(
    api.getRootData(),
    setLoading,
    successCallback,
    () => {},
    successMessage,
  );
};

const getAgreementPdf = async (id, setLoading, successCallback) => {
  await apiRequest(api.getAgreementPdf(id), setLoading, successCallback);
};

const getAgreementDownload = async (id, setLoading, successCallback) => {
  await apiRequest(
    api.getAgreementPdfDownload(id),
    setLoading,
    successCallback,
  );
};

const postAgreeAgreement = async (id, setLoading, successCallback) => {
  await apiRequest(api.postAgreeAgreement(id), setLoading, successCallback);
};

const postSignAgreement = async (id, postData, setLoading, successCallback) => {
  await apiRequest(
    api.postSignAgreement(id, postData),
    setLoading,
    successCallback,
  );
};

const patchUserPinNumber = async (
  postData,
  setLoading,
  successCallback,
  failureCallback,
) => {
  await apiRequest(
    api.patchUserPinNumber(postData),
    setLoading,
    successCallback,
    failureCallback,
  );
};

const downloadFileRequest = async (url, headers, fileName) => {
  try {
    const response = await axios.get(url, {
      headers,
      responseType: "blob",
    });

    const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");
    fileLink.href = fileUrl;
    fileLink.setAttribute(
      "download",
      `${isEmpty(fileName) ? moment().format("YYYYMMDDHHmmss") : fileName}.pdf`,
    );

    // specify the file name and extension
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};

const getOwnerPropertyList = async (setLoading, successCallback) => {
  await apiRequest(
    api.getOwnerPropertyList(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getOwnerPropertyOverview = async (id, setLoading, successCallback) => {
  await apiRequest(
    api.getOwnerPropertyOverview(id),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getOwnerTransaction = async (setLoading, successCallback) => {
  await apiRequest(
    api.getOwnerTransaction(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const getUChatUserRequest = async (setLoading, successCallback) => {
  await apiRequest(
    api.getUserProfile(),
    setLoading,
    successCallback,
    () => {},
    "",
    true,
  );
};

const postUpdateBankDetailRequest = async (
  postData,
  setLoading,
  successCallback,
) => {
  await apiRequest(api.getUserProfile(postData), setLoading, successCallback);
};

const getWalletTransactionListingRequest = async (
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getWalletTransactionListing(),
    setLoading,
    successCallback,
  );
};

const getWalletTransactionDetailRequest = async (
  id,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getWalletTransactionDetail(id),
    setLoading,
    successCallback,
  );
};

const getOwnerReportListingRequest = async (
  params,
  setLoading,
  successCallback,
) => {
  await apiRequest(
    api.getOwnerReportListing(params),
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
  getRootDataRequest,
  getAgreementPdf,
  getAgreementDownload,
  postAgreeAgreement,
  postSignAgreement,
  patchUserPinNumber,
  downloadFileRequest,
  getOwnerPropertyList,
  getOwnerPropertyOverview,
  getOwnerTransaction,
  getUChatUserRequest,
  postUpdateBankDetailRequest,
  getWalletTransactionListingRequest,
  getWalletTransactionDetailRequest,
  getOwnerReportListingRequest,
};
