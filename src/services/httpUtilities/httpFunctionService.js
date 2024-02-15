import api from "@/src/services/httpUtilities/httpService";
import _ from "lodash";
import Toast from "@/src/utils/Toast";
import { httpFunctionErrorResponse } from "@/src/services/httpUtilities/httpFunctionErrorResponse";

const apiRequest = async (
  api,
  successCallback,
  failureCallback,
  successMessage = "",
  ignoreSuccessMessage = false,
) => {
  try {
    const res = await api();

    const status = _.get(res, ["status"], 0);
    const message = _.get(res, ["messages"], "");

    if (status === 200 || status === 204) {
      successCallback();

      if (!ignoreSuccessMessage) {
        Toast.success(_.isEmpty(message) ? successMessage : message);
      }
    }
  } catch (err) {
    failureCallback();
    httpFunctionErrorResponse(err, false);
  }
};

const loginRequest = (postData, successCallback, failureCallback) => {
  apiRequest(
    () => api.loginAccount(postData),
    successCallback,
    failureCallback,
  );
};

export default {
  loginRequest,
};
