export const postRequestPhoneVerificationCodeRequest = (phoneData) => ({
  type: "POST_REQUEST_PHONE_VERIFICATION_CODE_REQUEST",
  phoneData,
});

export const postRequestPhoneVerificationCodeSuccess = (item, password) => ({
  type: "POST_REQUEST_PHONE_VERIFICATION_CODE_SUCCESS",
  item,
  password,
});

export const postRequestPhoneVerificationCodeFailure = (message) => ({
  type: "POST_REQUEST_PHONE_VERIFICATION_CODE_FAILURE",
  message,
});

export const verifyPhoneVerificationCodeRequest = (postData) => ({
  type: "VERIFY_PHONE_VERIFICATION_CODE_REQUEST",
  postData,
});

export const verifyPhoneVerificationCodeSuccess = (item) => ({
  type: "VERIFY_PHONE_VERIFICATION_CODE_SUCCESS",
  item,
});

export const verifyPhoneVerificationCodeFailure = (message) => ({
  type: "VERIFY_PHONE_VERIFICATION_CODE_FAILURE",
  message,
});

export const setMobileNumberAndMobilePrefix = (mobileNumber, mobilePrefix) => ({
  type: "verification/SET_MOBILE_NUMBER_AND_MOBILE_PREFIX",
  mobileNumber,
  mobilePrefix,
});

export const verifyPhoneVerificationCodeForgotPasswordRequest = (
  phoneData
) => ({
  type: "verification/VERIFY_PHONE_VERIFICATION_CODE_FORGOT_PASSWORD_REQUEST",
  phoneData,
});

export const verifyPhoneVerificationCodeForgotPasswordSuccess = (item) => ({
  type: "VERIFY_PHONE_VERIFICATION_CODE_FORGOT_PASSWORD_SUCCESS",
  item,
});

export const verifyPhoneVerificationCodeForgotPasswordFailure = (message) => ({
  type: "VERIFY_PHONE_VERIFICATION_CODE_FORGOT_PASSWORD_FAILURE",
  message,
});
