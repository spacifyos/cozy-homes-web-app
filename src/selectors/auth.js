import _ from "lodash";

export const getAuthToken = (auth) =>
  _.get(auth, ["loginRequest", "token"], "");
export const getAuthLoginLoading = (state) =>
  _.get(state, ["loginRequest", "loading"], false);
export const getAuthLoginStatus = (state) =>
  _.get(state, ["loginRequest", "status"], false);
export const getForgetPasswordStatus = (auth) =>
  _.get(auth, ["forgetPasswordStatus"], "");
export const getUpdatePasswordStatus = (auth) =>
  _.get(auth, ["updatePasswordStatus"], false);
export const getAuthSignUpLoading = (state) =>
  _.get(state, ["signUpRequest", "loading"], false);
export const getAuthSignUpData = (state) =>
  _.get(state, ["signUpRequest", "data"], null);
export const getAuthSignUpStatus = (state) =>
  _.get(state, ["signUpRequest", "status"], false);
export const getPostForgetPasswordStatus = (state) =>
  _.get(state, ["auth", "forgotPassword", "status"], false);
export const getPostForgetPasswordLoading = (state) =>
  _.get(state, ["auth", "forgotPassword", "loading"], false);
export const getPostForgetPasswordItemToken = (state) =>
  _.get(state, ["auth", "forgotPassword", "item", "token"], null);
export const getPostResetPasswordWithPhoneStatus = (state) =>
  _.get(state, ["auth", "resetPasswordWithPhone", "status"], false);
export const getPostResetPasswordWithPhoneLoading = (state) =>
  _.get(state, ["auth", "resetPasswordWithPhone", "loading"], false);
export const getPostResetPasswordWithPhoneItemToken = (state) =>
  _.get(state, ["auth", "resetPasswordWithPhone", "item", "token"], null);
export const getPostResetPasswordWithEmailStatus = (state) =>
  _.get(state, ["auth", "resetPasswordWithEmail", "status"], false);
export const getPostResetPasswordWithEmailLoading = (state) =>
  _.get(state, ["auth", "resetPasswordWithEmail", "loading"], false);

