export const getUserProfileRequest = () => ({
  type: "GET_USER_PROFILE_REQUEST",
});

export const getUserProfileSuccess = (data) => ({
  type: "GET_USER_PROFILE_SUCCESS",
  data,
});

export const getUserProfileFailure = (messages) => ({
  type: "GET_USER_PROFILE_FAILURE",
  messages,
});

export const updateAccessToken = (token) => ({
  type: "UPDATE_ACCESS_TOKEN",
  token,
});

export const updateAccessTokenInLocal = (token) => ({
  type: "auth/UPDATE_ACCESS_TOKEN",
  token,
});

export const rehydrateAuthState = (data) => ({
  type: "auth/REHYDRATE_AUTH_STATE",
  data,
});

export const signOutAccountRequest = () => ({
  type: "SIGN_OUT_ACCOUNT_REQUEST",
});

export const signOutAccountSuccess = () => ({
  type: "SIGN_OUT_ACCOUNT_SUCCESS",
});

export const signOutAccountFailure = (messages) => ({
  type: "SIGN_OUT_ACCOUNT_FAILURE",
  messages,
});

export const clearAccessToken = () => ({
  type: "CLEAR_ACCESS_TOKEN",
});

export const changeUserPasswordRequest = (password, confirm_password) => ({
  type: "auth/CHANGE_USER_PASSWORD_REQUEST",
  password,
  confirm_password,
});

export const changeUserPasswordSuccess = (success) => ({
  type: "CHANGE_USER_PASSWORD_SUCCESS",
  success,
});

export const changeUserPasswordFailure = (messages) => ({
  type: "CHANGE_USER_PASSWORD_FAILURE",
  messages,
});

export const postResetPasswordWithEmailRequest = (resetData) => ({
  type: "auth/POST_RESET_PASSWORD_WITH_EMAIL_REQUEST",
  resetData,
});

export const postResetPasswordWithEmailSuccess = () => ({
  type: "POST_RESET_PASSWORD_WITH_EMAIL_SUCCESS",
});

export const postResetPasswordWithEmailFailure = () => ({
  type: "POST_RESET_PASSWORD_WITH_EMAIL_FAILURE",
});

export const postResetPasswordWithPhoneRequest = (putData) => ({
  type: "auth/POST_RESET_PASSWORD_WITH_PHONE_REQUEST",
  putData,
});

export const postResetPasswordWithPhoneSuccess = (data) => ({
  type: "POST_RESET_PASSWORD_WITH_PHONE_SUCCESS",
  data,
});

export const postResetPasswordWithPhoneFailure = () => ({
  type: "POST_RESET_PASSWORD_WITH_PHONE_FAILURE",
});

export const postForgetPasswordRequest = (phoneData) => ({
  type: "auth/POST_FORGET_PASSWORD_REQUEST",
  phoneData,
});

export const postForgetPasswordSuccess = (data) => ({
  type: "POST_FORGET_PASSWORD_SUCCESS",
  data,
});

export const postForgetPasswordFailure = () => ({
  type: "POST_FORGET_PASSWORD_FAILURE",
});
