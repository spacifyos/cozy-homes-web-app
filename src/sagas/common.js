import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "@/src/services/httpUtilities/httpService";
import httpErrorHelpers from "@/src/services/httpUtilities/httpErrorHelpers";
import * as commonAction from "@/src/actions/common";

function* getSelectOptionRequest({}) {
  try {
    const response = yield call(api.getSelectOption);

    const { data, code, message } = response.data;

    yield put(commonAction.getSelectOptionSuccess(data));
  } catch (error) {
    yield call(httpErrorHelpers, error, commonAction.getSelectOptionFailure);
  }
}

function* CommonSaga() {
  yield all([takeLatest("GET_SELECT_OPTION_REQUEST", getSelectOptionRequest)]);
}

export default CommonSaga;
