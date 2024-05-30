import api from "@/src/services/httpUtilities/httpService";
import _ from "lodash";
import Toast from "@/src/utils/Toast";
import { apiRequestErrorResponse } from "@/src/services/httpUtilities/apiRequestErrorResponse";

const apiRequest = async (
  api,
  setLoading,
  setStatus,
  successCallback,
  successMessage = "",
  ignoreSuccessMessage = false,
) => {
  try {
    setLoading(true);
    setStatus(false);
    const res = await api;

    const data = _.get(res, ["data", "data"], "");
    const code = _.get(res, ["data", "code"], 0);
    const message = _.get(res, ["data", "message"], "");

    if (code === 200 || code === 204) {
      setLoading(false);
      setStatus(true);
      successCallback(data);

      if (!ignoreSuccessMessage) {
        Toast.success(_.isEmpty(message) ? successMessage : message);
      }
    }
  } catch (err) {
    setLoading(false);
    setStatus(false);
    apiRequestErrorResponse(err, false);
  }
};

const signInRequest = async (
  postData,
  setLoading,
  setStatus,
  successCallback,
) => {
  await apiRequest(
    api.signInAccount(postData),
    setLoading,
    setStatus,
    successCallback,
  );
};

const signUpRequest = async (
  postData,
  setLoading,
  setStatus,
  successCallback,
) => {
  await apiRequest(
    api.signUpAccount(postData),
    setLoading,
    setStatus,
    successCallback,
  );
};

export default {
  signInRequest,
  signUpRequest,
};
