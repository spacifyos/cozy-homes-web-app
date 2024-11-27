import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as authActions from "@/src/actions/auth";
import AuthManager from "@/src/utils/AuthManager";
import Router from "next/router";

function* getUserProfileRequest({}) {
  try {
    const response = yield call(api.getUserProfile);

    const { data, code, message } = response.data;

    yield put(authActions.getUserProfileSuccess(data));
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      authActions.getUserProfileFailure,
      true,
    );
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
    Router.replace("/").then(() => Router.reload());
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
