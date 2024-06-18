import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as verificationAction from "@/src/actions/verification";
import * as verificationSelector from "@/src/selectors/verification";
import Toast from "@/src/utils/Toast";

function* verificationSaga() {
  yield all([]);
}

export default verificationSaga;
