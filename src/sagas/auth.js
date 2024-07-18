import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as authActions from "@/src/actions/auth";
import Toast from "@/src/utils/Toast";
import AuthManager from "@/src/utils/AuthManager";
import Router from "next/router";

// function* watcherForgetPasswordRequest({ email }, effects) {
//     const { call, put } = effects;
//
//     try {
//         const response = yield call(api.forgetPassword, email);
//
//         const { messages } = response.data;
//
//         if (!_.isEmpty(messages)) {
//             Toast.success(messages[0].text);
//         }
//
//         yield put(authActions.forgetPasswordSuccess());
//     } catch (error) {
//         yield call(httpErrorHelpers, error, authActions.forgetPasswordFailure, effects);
//     }
// }

function* getUserProfileRequest({}) {
  try {
    const response = yield call(api.getUserProfile);

    const { data, code, message } = response.data;

    yield put(authActions.getUserProfileSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, authActions.getUserProfileFailure);
  }
}

function* signOutAccountRequest() {
  try {
    yield put(authActions.clearAccessToken());

    yield put(authActions.signOutAccountSuccess());
  } catch (error) {
    yield call(httpErrorHelpers, error, authActions.signOutAccountFailure);
  }
}

// function* watcherChangeUserPasswordRequest({ password, confirm_password }, effects) {
//     const { call, put } = effects;
//
//     try {
//         const response = yield call(api.changePassword, password, confirm_password);
//
//         const { messages, success } = response.data;
//
//         if (!_.isEmpty(messages)) {
//             success ? Toast.success(messages[0].text) : Toast.error(messages[0].text);
//         }
//
//         yield put(authActions.changeUserPasswordSuccess(success));
//     } catch (error) {
//         yield call(httpErrorHelpers, error, authActions.changeUserPasswordFailure, effects);
//     }
// }
//
// function* navigateToLoginPage() {
//     NavigationService.navigate("Login");
// }
//
// function* navigateToApp() {
//     NavigationService.navigate("App");
// }
//
// function* watcherUpdateAccessToken({ token }) {
//     AuthManager.setToken(token).then(() => {});
//
//     api.setHeaderToken(token);
// }
//
function* clearAccessToken() {
  AuthManager.removeLoginType();
  AuthManager.removeToken().then(() => Router.replace("/sign-in"));
}

//
// function* watcherPostForgetPassword({ phoneData }, effects) {
//     const { call, put } = effects;
//
//     try {
//         const response = yield call(api.requestForgetPassword, phoneData);
//
//         const { data, code, message } = response.data;
//
//         if (code === 202) {
//             Toast.success(message);
//             yield put(authActions.postForgetPasswordSuccess(data));
//         }
//     } catch (error) {
//         yield call(httpErrorHelpers, error, authActions.postForgetPasswordFailure, effects);
//     }
// }
//
// function* watcherPutForgotPasswordRequest({ putData }, effects) {
//     const { call, put } = effects;
//
//     try {
//         const response = yield call(api.requestResetPassword, putData);
//
//         const { data, code, message } = response.data;
//         if (code === 200) {
//             Toast.success(message);
//             yield put(authActions.postResetPasswordWithPhoneSuccess(data));
//         } else {
//             yield put(authActions.postResetPasswordWithPhoneFailure(message));
//         }
//     } catch (error) {
//         yield call(httpErrorHelpers, error, authActions.postResetPasswordWithPhoneFailure, effects);
//     }
// }
//
// function* watcherPostResetPasswordWithEmail({ resetData }, effects) {
//     const { call, put } = effects;
//
//     try {
//         const response = yield call(api.requestForgetPasswordWithToken, resetData);
//
//         const { data, code, message } = response.data;
//
//         if (code === 200) {
//             yield put(authActions.postResetPasswordWithEmailSuccess());
//         }
//     } catch (error) {
//         yield call(httpErrorHelpers, error, authActions.postResetPasswordWithEmailFailure, effects);
//     }
// }

function* authSaga() {
  yield all([
    takeLatest("GET_USER_PROFILE_REQUEST", getUserProfileRequest),
    takeLatest("SIGN_OUT_ACCOUNT_REQUEST", signOutAccountRequest),
    takeLatest("CLEAR_ACCESS_TOKEN", clearAccessToken),
  ]);
}

export default authSaga;
