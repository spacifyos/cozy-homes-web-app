import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as verificationAction from "@/src/actions/verification";
import * as verificationSelector from "@/src/selectors/verification";
import Toast from "@/src/utils/Toast";

function* postRequestPhoneVerificationCode({ phoneData }) {
  try {
    const response = yield call(
      api.postRequestPhoneVerificationCode,
      phoneData
    );

    const { data, code, message } = response.data;

    const verificationToken =
      verificationSelector.getPhoneVerificationItemToken(data);

    if (code === 200) {
      if (!_.isEmpty(verificationToken)) {
        Toast.success(message);
      }
      yield put(
        verificationAction.postRequestPhoneVerificationCodeSuccess(data)
      );
    } else {
      Toast.error(message);
      yield put(verificationAction.postRequestPhoneVerificationCodeFailure);
    }
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      verificationAction.postRequestPhoneVerificationCodeFailure
    );
  }
}

function* watcherVerifyPhoneVerificationCode({ postData }) {
  try {
    const response = yield call(api.verifyPhoneVerificationCode, postData);

    const { data, success, message, code } = response.data;
    const token = _.get(data, ["token"], null);
    if (code === 200 && !_.isEmpty(token)) {
      Toast.success(message);
      yield put(verificationAction.verifyPhoneVerificationCodeSuccess(data));
      // yield put(authActions.updateAccessTokenInLocal(token));
      // NavigationService.navigate("App");
    } else if (code === 200) {
      Toast.success(message);
      yield put(verificationAction.verifyPhoneVerificationCodeSuccess(data));
      // NavigationService.navigate("Login");
    } else {
      Toast.error(message);
      yield put(verificationAction.verifyPhoneVerificationCodeFailure(message));
    }
  } catch (error) {
    yield call(
      httpErrorHelpers,
      error,
      verificationAction.verifyPhoneVerificationCodeFailure
    );
  }
}

// function* watcherVerifyPhoneVerificationCodeForgetPassword({ phoneData }, effects) {
//     const { call, put } = effects;
//
//     try {
//         const response = yield call(api.verifyPhoneVerificationCode, phoneData);
//         const { data, message, code } = response.data;
//         //const token = _.get(data, ["token"], null);
//         if (code === 200) {
//             // && !_.isEmpty(token)
//             Toast.success(message);
//             yield put(verificationAction.verifyPhoneVerificationCodeForgotPasswordSuccess(data));
//         } else {
//             Toast.error(message);
//             yield put(verificationAction.verifyPhoneVerificationCodeForgotPasswordFailure(message));
//         }
//     } catch (error) {
//         yield call(
//             httpErrorHelpers,
//             error,
//             verificationAction.verifyPhoneVerificationCodeForgotPasswordFailure,
//             effects
//         );
//     }
// }

function* verificationSaga() {
  yield all([
    takeLatest(
      "POST_REQUEST_PHONE_VERIFICATION_CODE_REQUEST",
      postRequestPhoneVerificationCode
    ),
    takeLatest(
      "VERIFY_PHONE_VERIFICATION_CODE_REQUEST",
      watcherVerifyPhoneVerificationCode
    ),
  ]);
}

export default verificationSaga;
