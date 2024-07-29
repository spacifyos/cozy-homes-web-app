import _ from "lodash";

export const getUserProfileData = (auth) =>
  _.get(auth, ["auth", "userProfile", "data"], null);
export const getUserProfileLoading = (state) =>
  _.get(state, ["auth", "userProfile", "loading"], false);

export const getSignOutAccountLoading = (state) =>
  _.get(state, ["auth", "signOutRequest", "loading"], false);

export const getForgetPasswordStatus = (auth) =>
  _.get(auth, ["forgetPasswordStatus"], "");
export const getUpdatePasswordStatus = (auth) =>
  _.get(auth, ["updatePasswordStatus"], false);

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

export const getId = (state) => _.get(state, ["id"], "");
export const getUuid = (state) => _.get(state, ["uuid"], "");
export const getToken = (state) => _.get(state, ["token"], "");
export const getType = (state) => _.get(state, ["type"], "");
export const getName = (state) => _.get(state, ["name"], "");
export const getEmail = (state) => _.get(state, ["email"], "");
export const getPhoneNumber = (state) => _.get(state, ["phone_number"], "");
export const getIsAccountVerify = (state) =>
  _.get(state, ["isAccountVerified"], "");
export const getUserVerify = (state) =>
  _.get(state, ["user", "isAccountVerified"], false);
export const getUserPhoneNumber = (state) =>
  _.get(state, ["user", "phone_number"], "");
export const getUserToken = (state) => _.get(state, ["user", "token"], "");
