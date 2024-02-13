import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as authActions from "@/src/actions/auth";
import Toast from "@/src/utils/Toast";
import AuthManager from "@/src/utils/AuthManager";

function* watcherSignUpAccountRequest({ data, referrerCode }) {
  try {
    const response = yield call(api.signUpAccount, data, referrerCode);

    const { success, code, message } = response.data;

    if (code === 200) {
      yield put(authActions.signUpAccountSuccess(response.data));
    } else if (code === 202) {
      yield put(authActions.signUpAccountSuccess(response.data));
    } else {
      Toast.error(message);
      yield put(authActions.signUpAccountFailure());
    }
  } catch (error) {
    yield call(httpErrorHelpers, error, authActions.signUpAccountFailure);
  }
}

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
//
function* loginRequest({ loginData }) {
  try {
    const response = yield call(api.loginAccount, loginData);

    const { data, code, message } = response.data;
    // if (code === 200) {
    //   const { access_token } = data;
    //   yield put(authActions.updateAccessToken(access_token));

    yield put(authActions.loginAccountSuccess(data.access_token));
    // } else {
    //   Toast.error(message);
    //   yield put(authActions.loginAccountFailure());
    // }
  } catch (error) {
    yield call(httpErrorHelpers, error, authActions.loginAccountFailure);
  }
}

function* logoutAccountRequest(payload) {
  try {
    yield put(authActions.clearAccessToken());

    yield put(authActions.logoutAccountSuccess());
  } catch (error) {
    yield call(httpErrorHelpers, error, authActions.logoutAccountFailure);
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
  AuthManager.removeTenantUserToken().then(() => {});
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
    takeLatest("LOGIN_ACCOUNT_REQUEST", loginRequest),
    takeLatest("LOG_OUT_ACCOUNT_REQUEST", logoutAccountRequest),
    takeLatest("CLEAR_ACCESS_TOKEN", clearAccessToken),
    takeLatest("SIGN_UP_ACCOUNT_REQUEST", watcherSignUpAccountRequest),
  ]);
}

export default authSaga;
