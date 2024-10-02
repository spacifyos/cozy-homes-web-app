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

function* clearAccessToken() {
  AuthManager.removeLoginType();
  AuthManager.removeToken().then(() => {
    // Router.reload();
    Router.replace("/sign-in?tab=my-property");
  });
}

function* authSaga() {
  yield all([
    takeLatest("GET_USER_PROFILE_REQUEST", getUserProfileRequest),
    takeLatest("SIGN_OUT_ACCOUNT_REQUEST", signOutAccountRequest),
    takeLatest("CLEAR_ACCESS_TOKEN", clearAccessToken),
  ]);
}

export default authSaga;
