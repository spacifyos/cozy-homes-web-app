import _ from "lodash";
export const getPhoneVerificationItem = (state) =>
  _.get(state, ["requestVerification", "data"], null);
export const getPhoneVerificationRequestStatus = (state) =>
    _.get(state, ["requestVerification", "status"], false);
export const getPhoneVerificationRequestLoading = (state) =>
    _.get(state, ["requestVerification","loading"], false);