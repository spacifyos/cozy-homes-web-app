export const signUpAccountRequest = (data) => ({
  type: "SIGN_UP_ACCOUNT_REQUEST",
  data,
});

export const signUpAccountSuccess = (data, success) => ({
  type: "SIGN_UP_ACCOUNT_SUCCESS",
  data,
  success,
});

export const signUpAccountFailure = (messages) => ({
  type: "SIGN_UP_ACCOUNT_FAILURE",
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

export const forgetPasswordRequest = (email) => ({
  type: "auth/FORGET_PASSWORD_REQUEST",
  email,
});

export const forgetPasswordSuccess = (messages) => ({
  type: "FORGET_PASSWORD_SUCCESS",
  messages,
});

export const forgetPasswordFailure = (messages) => ({
  type: "FORGET_PASSWORD_FAILURE",
  messages,
});

export const loginWithFacebookRequest = (
  fbAccessToken,
  userID,
  referrerCode
) => ({
  type: "auth/LOGIN_WITH_FACEBOOK_REQUEST",
  fbAccessToken,
  userID,
  referrerCode,
});

export const loginWithFacebookSuccess = (token) => ({
  type: "LOGIN_WITH_FACEBOOK_SUCCESS",
  token,
});

export const loginWithFacebookFailure = (messages) => ({
  type: "LOGIN_WITH_FACEBOOK_FAILURE",
  messages,
});

export const loginAccountRequest = (loginData) => ({
  type: "LOGIN_ACCOUNT_REQUEST",
  loginData,
});

export const loginAccountSuccess = (token) => ({
  type: "LOGIN_ACCOUNT_SUCCESS",
  token,
});

export const loginAccountFailure = (messages) => ({
  type: "LOGIN_ACCOUNT_FAILURE",
  messages,
});

export const rehydrateAuthState = (data) => ({
  type: "auth/REHYDRATE_AUTH_STATE",
  data,
});
export const logoutAccountRequest = () => ({
  type: "LOG_OUT_ACCOUNT_REQUEST",
});

export const logoutAccountSuccess = () => ({
  type: "LOG_OUT_ACCOUNT_SUCCESS",
});

export const logoutAccountFailure = (messages) => ({
  type: "LOG_OUT_ACCOUNT_FAILURE",
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
