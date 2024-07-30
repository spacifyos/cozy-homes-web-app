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
